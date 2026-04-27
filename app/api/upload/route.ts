import { requireSession } from "@/core/_shared/action";
import { CHAT_UPLOADS_BUCKET, getSupabaseServer } from "@/lib/supabase/server";

const MAX_BYTES = 5 * 1024 * 1024;
const SIGNED_URL_TTL_SECONDS = 60 * 60 * 24 * 7;

export async function POST(req: Request) {
  let session;
  try {
    session = await requireSession();
  } catch {
    return Response.json({ success: false, error: "No autenticado" }, { status: 401 });
  }

  const form = await req.formData();
  const file = form.get("file");

  if (!(file instanceof File)) {
    return Response.json(
      { success: false, error: "El campo 'file' es requerido" },
      { status: 400 },
    );
  }

  if (!file.type.startsWith("image/")) {
    return Response.json(
      { success: false, error: "Solo se permiten imágenes" },
      { status: 400 },
    );
  }

  if (file.size > MAX_BYTES) {
    return Response.json(
      { success: false, error: "La imagen no puede pesar más de 5 MB" },
      { status: 400 },
    );
  }

  const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
  const path = `${session.user.id}/${crypto.randomUUID()}.${ext}`;
  const supabase = getSupabaseServer();

  const { error: uploadError } = await supabase.storage
    .from(CHAT_UPLOADS_BUCKET)
    .upload(path, file, { contentType: file.type, upsert: false });

  if (uploadError) {
    return Response.json(
      { success: false, error: `Error al subir: ${uploadError.message}` },
      { status: 500 },
    );
  }

  const { data: signed, error: signError } = await supabase.storage
    .from(CHAT_UPLOADS_BUCKET)
    .createSignedUrl(path, SIGNED_URL_TTL_SECONDS);

  if (signError || !signed) {
    return Response.json(
      { success: false, error: "No se pudo generar la URL firmada" },
      { status: 500 },
    );
  }

  return Response.json({
    success: true,
    data: { url: signed.signedUrl, mediaType: file.type },
  });
}

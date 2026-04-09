"use client";

import { HugeiconsIcon } from "@hugeicons/react";
import { UserCircleIcon, Logout01Icon, SmartPhone01Icon } from "@hugeicons/core-free-icons";
import { Button } from "@/components/ui/button";
import { authClient, useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const { data: session, isPending } = useSession();
  const router = useRouter();

  const handleSignOut = async () => {
    await authClient.signOut();
    router.push("/login");
  };

  if (isPending) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-sm text-muted-foreground">Cargando...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full px-6 pt-12 pb-6 gap-8">
      {/* Avatar + nombre */}
      <div className="flex flex-col items-center gap-3">
        <div className="w-16 h-16 rounded-full bg-accent/30 flex items-center justify-center">
          <HugeiconsIcon icon={UserCircleIcon} size={32} className="text-primary" strokeWidth={1.5} />
        </div>
        <div className="text-center">
          <h1 className="font-semibold text-lg text-foreground">
            {session?.user.name || "Usuario"}
          </h1>
          <p className="text-xs text-muted-foreground">{session?.user.email}</p>
        </div>
      </div>

      {/* Info de sesión */}
      <div className="flex flex-col gap-2 rounded-2xl bg-white/60 p-4">
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">Sesión</p>

        <div className="flex items-center gap-3 py-2">
          <HugeiconsIcon icon={SmartPhone01Icon} size={18} className="text-muted-foreground" strokeWidth={1.5} />
          <div>
            <p className="text-sm text-foreground">Teléfono</p>
            <p className="text-xs text-muted-foreground">
              {session?.user.phoneNumber || "—"}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-auto">
        <Button variant="destructive" className="w-full" onClick={handleSignOut}>
          <HugeiconsIcon icon={Logout01Icon} size={16} strokeWidth={1.5} />
          Cerrar sesión
        </Button>
      </div>
    </div>
  );
}

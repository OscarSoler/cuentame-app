import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MobileFrameShell } from "@/components/mobile-frame-shell";
import { LoginPhoneForm } from "./components/login-phone-form";
import { LoginNarrative } from "./components/login-narrative";

export default function LoginPage() {
  return (
    <MobileFrameShell narrative={<LoginNarrative />}>
      <div className="flex flex-col h-full w-full">
        <div className="flex justify-end items-center pt-5 md:pt-10 px-6">
          <Link href="/onboarding">
            <Button variant="secondary" size="xs">
              Crear cuenta
            </Button>
          </Link>
        </div>
        <LoginPhoneForm />
      </div>
    </MobileFrameShell>
  );
}

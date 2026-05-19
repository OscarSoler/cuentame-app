import { MobileFrameShell } from "@/components/mobile-frame-shell";
import { LoginPhoneForm } from "./components/login-phone-form";
import { LoginNarrative } from "./components/login-narrative";

export default function LoginPage() {
  return (
    <MobileFrameShell narrative={<LoginNarrative />}>
      <div className="flex flex-col h-full w-full">
        <LoginPhoneForm />
      </div>
    </MobileFrameShell>
  );
}

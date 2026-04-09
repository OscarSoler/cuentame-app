import { ChatContent } from "@/app/(app)/chat/chat/chat-content";

export default function ChatPage() {
  return (
    <div className="flex flex-col h-full w-full">
      <header className="flex items-center px-5 py-3.5 border-b border-border/20">
        <h1 className="text-base font-heading text-foreground">
          Cuéntame, <span className="text-primary">Oscar</span>
        </h1>
      </header>
      <ChatContent variant="page" />
    </div>
  );
}

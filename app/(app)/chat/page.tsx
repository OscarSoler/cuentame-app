import { ChatContent } from "./components/chat-content";

export default function ChatPage() {
  return (
    <div className="flex flex-col h-full w-full">
      <ChatContent variant="page" />
    </div>
  );
}

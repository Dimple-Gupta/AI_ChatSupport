import type { Message } from "../types";

export default function MessageBubble({ message }: { message: Message }) {
  return (
    <div className={`message ${message.sender}`}>
      {message.text}
    </div>
  );
}

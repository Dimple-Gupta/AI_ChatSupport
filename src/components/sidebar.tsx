interface Props {
  conversations: Array<{ id: string }>;
  activeId: string;
  onSelect: (id: string) => void;
  onNewChat: () => void;
}

export default function Sidebar({
  conversations,
  activeId,
  onSelect,
  onNewChat,
}: Props) {
  return (
    <div className="sidebar">
      <button
  type="button"
  onClick={() => {
    onNewChat();
  }}
>
  + New Chat
</button>


      <div className="chat-list">
        <h2>Chats</h2>
        {conversations.map((c, index) => (
          <div
            key={c.id}
            className={`chat-item ${activeId === c.id ? "active" : ""}`}
            onClick={() => onSelect(c.id)}
          >
            Chat {index + 1}
          </div>
        ))}
      </div>
    </div>
  );
}

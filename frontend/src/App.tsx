import { useEffect, useState } from "react";
import Sidebar from "./components/sidebar";
import ChatWindow from "./components/chat";
import { api } from "./api";

export default function App() {
  const [conversations, setConversations] = useState<any[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);

  const loadConversations = async () => {
    const res = await api.get("/chat/conversations");
    setConversations(res.data);
  };

  useEffect(() => {
    loadConversations();
  }, []);

  const newChat = async () => {
  console.log("newChat function called");

  const res = await api.post("/chat/conversation");
  setActiveId(res.data.id);
  loadConversations();
};


  return (
    <div className="app">
      <Sidebar
        conversations={conversations}
        activeId={activeId || ""}
        onSelect={setActiveId}
        onNewChat={newChat}
      />
      <ChatWindow conversationId={activeId} />
    </div>
  );
}

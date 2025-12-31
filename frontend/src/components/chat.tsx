import { useEffect, useRef, useState } from "react";
import { api } from "../api";
import type { Message } from "../types";
import MessageBubble from "./messagebubble";

type Props = {
  conversationId: string | null;
};

export default function ChatWindow({ conversationId }: Props) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!conversationId) {
      setMessages([]);
      return;
    }

    api.get(`/chat/messages/${conversationId}`).then((res) => {
      setMessages(res.data);
    });
  }, [conversationId]);

  // useEffect(() => {
  //   if (!conversationId) return;

  //   api.get(`/chat/messages/${conversationId}`).then((res) => {
  //     setMessages(res.data);
  //   });
  // }, [conversationId]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const send = async () => {
    if (!input.trim() || !conversationId) return;
    setLoading(true);

    const res = await api.post("/chat/message", {
      message: input,
      sessionId: conversationId,
    });

    setMessages((m) => [
      ...m,
      { id: Date.now(), sender: "user", text: input },
      { id: Date.now() + 1, sender: "ai", text: res.data.reply },
    ]);

    setInput("");
    setLoading(false);
  };

  return (
    <div className="chat-window">
      <div className="messages">
        {!conversationId ? (
          <div style={{ textAlign: "center", color: "#888" }}>
            Click "New Chat" to start a conversation
          </div>
        ) : (
          <>
            {messages.map((m) => (
              <MessageBubble key={m.id} message={m} />
            ))}
            <div ref={bottomRef} />
          </>
        )}
      </div>

      <div className="input-box">
        {/* <input
  value={input}
  onChange={(e) => setInput(e.target.value)}
  onKeyDown={(e) => {
    if (e.key === "Enter" ) {
      e.preventDefault();
      send();
    }
  }}
  placeholder="Type a message..."
/> */}

        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send()}
          placeholder="Type a message..."
        />
       

        <button type="button" onClick={send} disabled={loading}>
  Send
</button>
      </div>
    </div>
  );
}

// import { useEffect, useRef, useState } from "react";
// import { api } from "../api";
// import type { Message } from "../types";
// import MessageBubble from "./messagebubble";

// type Props = {
//   conversationId: string | null;
// };

// export default function ChatWindow({ conversationId }: Props) {
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [input, setInput] = useState("");
//   const [loading, setLoading] = useState(false);
//   const bottomRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//   if (!conversationId) {
//     setMessages([]);
//     return (
//     <div className="chat-window">
//       <div className="messages" style={{ textAlign: "center", color: "#888" }}>
//         Click “New Chat” to start a conversation
//       </div>
//     </div>
//   );
//   }

//   api.get(`/chat/messages/${conversationId}`).then((res) => {
//     setMessages(res.data);
//   });
// }, [conversationId]);


//   // useEffect(() => {
//   //   if (!conversationId) return;

//   //   api.get(`/chat/messages/${conversationId}`).then((res) => {
//   //     setMessages(res.data);
//   //   });
//   // }, [conversationId]);

//   useEffect(() => {
//     bottomRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   const send = async () => {
//     if (!input.trim() || !conversationId) return;
//     setLoading(true);

//     const res = await api.post("/chat/message", {
//       message: input,
//       sessionId: conversationId,
//     });

//     setMessages((m) => [
//       ...m,
//       { id: Date.now(), sender: "user", text: input },
//       { id: Date.now() + 1, sender: "ai", text: res.data.reply },
//     ]);

//     setInput("");
//     setLoading(false);
//   };

//   return (
//     <div className="chat-window">
//       <div className="messages">
//         {!conversationId ? (
//           <div style={{ textAlign: "center", color: "#888" }}>
//             Click "New Chat" to start a conversation
//           </div>
//         ) : (
//           <>
//             {messages.map((m) => (
//               <MessageBubble key={m.id} message={m} />
//             ))}
//             <div ref={bottomRef} />
//           </>
//         )}
//       </div>

//       <div className="input-box">
//         {/* <input
//   value={input}
//   onChange={(e) => setInput(e.target.value)}
//   onKeyDown={(e) => {
//     if (e.key === "Enter" ) {
//       e.preventDefault();
//       send();
//     }
//   }}
//   placeholder="Type a message..."
// /> */}

//         <input
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           onKeyDown={(e) => e.key === "Enter" && send()}
//           placeholder="Type a message..."
//         />
//         <button
//   type="button"
//   onClick={() => {
//     alert("SEND CLICKED");
//     send();
//   }}
// >
//   Send
// </button>

//         {/* <button type="button" onClick={send} disabled={loading}>
//   Send
// </button> */}
//       </div>
//     </div>
//   );
// }

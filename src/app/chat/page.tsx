// "use client";

// import React, { useState, useEffect } from "react";
// import api from "../../lib/api";
// import { useChat } from "../../hooks/useChat";
// import { useAuth } from "../../context/AuthContext";
// import Loader from "../../components/Loader";
// import ErrorMessage from "../../components/ErrorMessage";
// import { ParamValue } from "next/dist/server/request/params";

// export default function ChatPage() {
//   const { user } = useAuth();
//   const [sessionId, setSessionId] = useState<ParamValue>();
//   const [message, setMessage] = useState("");
//   const { chatSessions, messages, sendMessage, error } = useChat(sessionId);

//   useEffect(() => {
//     const startChat = async () => {
//       try {
//         const response = await api.post("/chat/start", { userId: user?.userId });
//         setSessionId(response.data.sessionId);
//       } catch (err) {
//         console.error("Failed to start chat:", err);
//       }
//     };

//     if (user) startChat();
//   }, [user]);

//   const handleSend = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (message.trim()) {
//       await sendMessage(message);
//       setMessage("");
//     }
//   };

//   if (!sessionId) return <Loader />;
//   if (error) return <ErrorMessage message={error} />;

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-2xl font-bold text-green-800 mb-4">Chat</h1>
//       <div className="bg-green-50 border border-green-600 rounded-lg p-4 mb-4 h-64 overflow-y-auto">
//         {chatSessions.length === 0 ? (
//           <div>
//             <strong className="text-green-800">NO MESSAGE YET:</strong>
//           </div>
//         ) : (
//           <div>
//             {chatSessions.map((chat) => (
//               <div key={chat.id} className="mb-2">
//                 <strong className="text-green-800">From : {chat.user.firstName}:</strong>{" "}
//                 <span className="text-gray-800">To : {chat.therapist.firstName}</span>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//       <div className="bg-green-50 border border-green-600 rounded-lg p-4 mb-4 overflow-y-auto">
//         <strong className="text-green-800">New Chat</strong>
//       </div>
//       <form onSubmit={handleSend} className="flex gap-2">
//         <input
//           type="text"
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//           className="flex-1 p-2 border border-gray-300 rounded focus:border-green-600 focus:ring-1 focus:ring-green-600"
//           placeholder="Type a message..."
//         />
//         <button type="submit" className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded">
//           Envoyer
//         </button>
//       </form>
//     </div>
//   );
// }

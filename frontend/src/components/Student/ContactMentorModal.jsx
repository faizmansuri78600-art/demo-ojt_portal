import React, { useState, useRef, useEffect } from "react";
import { Send } from "lucide-react";
import Modal from "./SharedModal";

export default function ContactMentorModal({ open, onClose, mentorName = "Mr. Ramesh Kumar" }) {
  const [messages, setMessages] = useState([
    { id: 1, from: "mentor", text: "Hi, let me know if you need help with anything.", time: "10:02 AM" },
  ]);
  const [text, setText] = useState("");
  const bottomRef = useRef(null);

  useEffect(() => {
    if (open) bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  const send = () => {
    if (!text.trim()) return;

    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        from: "me",
        text: text.trim(),
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      },
    ]);
    setText("");

    // Confirmation alert, then close the modal
    alert("Thank you! The mentor will contact/reply to you soon.");
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} title={`Chat with ${mentorName}`} size="md">
      <div className="flex flex-col h-[420px] min-h-0">
        <div className="flex-1 min-h-0 overflow-y-auto px-4 py-3 space-y-3 bg-slate-50">
          {messages.map((m) => (
            <div key={m.id} className={`flex ${m.from === "me" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[75%] rounded-2xl px-3 py-2 text-xs ${
                  m.from === "me"
                    ? "bg-blue-600 text-white rounded-br-sm"
                    : "bg-white text-slate-700 border border-slate-200 rounded-bl-sm"
                }`}
              >
                <p>{m.text}</p>
                <p className={`mt-1 text-[10px] ${m.from === "me" ? "text-blue-100" : "text-slate-400"}`}>
                  {m.time}
                </p>
              </div>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        <div className="border-t border-slate-200 p-3 flex items-center gap-2 shrink-0">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send()}
            placeholder="Type a message..."
            className="flex-1 text-xs border border-slate-200 rounded-full px-3 py-2 outline-none focus:border-blue-300"
          />
          <button
            onClick={send}
            className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700 shrink-0"
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </Modal>
  );
}
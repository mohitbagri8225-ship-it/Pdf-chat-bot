import axios from "axios";
import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../context/useContext";

interface ChatHistory {
  question: string;
  answer: string;
  seq: number;
  chatId: string;
}

interface ChatInputProps {
  setChatHistory: React.Dispatch<React.SetStateAction<ChatHistory[]>>;
}

export function Loader() {
  return (
    <div className="flex items-center justify-center gap-1">
      <span className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce"></span>
      <span className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce [animation-delay:150ms]"></span>
      <span className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce [animation-delay:300ms]"></span>
    </div>
  );
}

function ChatInput({ setChatHistory }: ChatInputProps) {
  const [message, setMessage] = useState("");
  const { chatId } = useParams<{ chatId: string }>();
  const [loading, setLoading] = useState(false);
  const { fetchData } = useContext(UserContext);

  const handleOnSend = async () => {
    if (!message.trim()) return;

    try {
      const question = message;

      setMessage("");
      setLoading(true);

      const response = await axios.post(
        "http://localhost:5000/api/v1/chat/get-response",
        {
          chatId: chatId,
          question: question,
        },
        {
          withCredentials: true,
        }
      );

      console.log(response.data.data.response);


      const response2 = await axios.post(
        "http://localhost:5000/api/v1/chat/get-history",
        { chatId },
        {
          withCredentials: true,
        }
      );
      console.log(response2);


      const messages: ChatHistory[] = response2.data.data || [];

      messages.sort((a, b) => a.seq - b.seq);

      setChatHistory(messages);
      await fetchData();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        alert(error.response?.data?.message || "failed");
      } else {
        alert("failed");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 md:p-6">
      <div className="max-w-4xl mx-auto">

        <div className="bg-neutral-900 border border-neutral-700 rounded-2xl flex items-end p-2 focus-within:border-blue-600 transition">

          {/* Input */}
          <textarea
            onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleOnSend();
                }
              }}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Ask anything about your document..."
            rows={1}
            disabled={loading}
            className="flex-1 resize-none bg-transparent outline-none px-3 py-3 text-white placeholder-neutral-500"
          />

          {/* Send / Loader */}
          {loading ? (
            <div className="w-10 h-10 flex items-center justify-center">
              <Loader />
            </div>
          ) : (
            <button
              onClick={handleOnSend}
              disabled={!message.trim()}
              className="w-10 h-10 rounded-xl cursor-pointer bg-blue-600 hover:bg-blue-700 disabled:bg-neutral-700 disabled:text-neutral-500 flex items-center justify-center transition"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 12h14M13 6l6 6-6 6"
                />
              </svg>
            </button>
          )}

        </div>

        <p className="text-center text-xs text-neutral-600 mt-2">
          DocMind can make mistakes. Verify important information.
        </p>

      </div>
    </div>
  );
}

export default ChatInput;
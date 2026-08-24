import ChatInput from "../../components/ChatInput";
import WelcomeScreen from "../../components/WelCome";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import TopBar from "../../components/TopBar";

interface ChatHistory {
  question: string;
  answer: string;
  seq: number;
  chatId: string;
}

function ChatPage() {
  const [chatHistory, setChatHistory] = useState<ChatHistory[]>([]);
  const [loading, setLoading] = useState(false);

  const { chatId } = useParams<{ chatId: string }>();

  useEffect(() => {
    if (!chatId) return;

    const fetchHistory = async () => {
      try {
        setLoading(true);

        const response = await axios.post(
          "http://localhost:5000/api/v1/chat/get-history",
          { chatId },
          { withCredentials: true }
        );

        const messages: ChatHistory[] = response.data.data || [];

        messages.sort((a, b) => a.seq - b.seq);

        setChatHistory(messages);
      } catch (error) {
        console.log("Error fetching chat history:", error);
        setChatHistory([]);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [chatId]);

  return (
    <div className="h-screen bg-neutral-900 text-white flex flex-col overflow-hidden">
      
      {/* Top bar */}
      <TopBar  chatHistory={chatHistory} />

      {/* Main chat container */}
      <div className="flex-1 min-h-0 flex flex-col">

        {/* Messages */}
        <main className="flex-1 min-h-0 overflow-y-auto">
          <div className="max-w-4xl mx-auto w-full px-4 py-6">
            <WelcomeScreen
              loading={loading}
              chatHistory={chatHistory}
            />
          </div>
        </main>

        {/* Input */}
        <div className="shrink-0 w-full">
          <div className="max-w-4xl mx-auto w-full px-4 pb-4">
            <ChatInput
              setChatHistory={setChatHistory}
            />
          </div>
        </div>

      </div>
    </div>
  );
}

export default ChatPage;
 
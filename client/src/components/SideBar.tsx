import { useContext } from "react";
import { UserContext } from "../context/useContext";
import axios from "axios";
import { useNavigate, useLocation, redirect } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const { user, sideChats, fetchData } = useContext(UserContext);

  const HandleNewChat = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/v1/chat/create-chat",
        {
          withCredentials: true,
        }
      );

      const nchatId = response.data.data.chatId;

      // Refresh sidebar chats
      await fetchData();
      navigate(`/chat/${nchatId}`);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        alert(
          error.response?.data?.message ||
          "Error creating new chat"
        );
      } else {
        alert("Error creating new chat");
      }
    }
  };

  return (
    <aside className="w-64 bg-black border-r border-neutral-700 flex flex-col chat-scrollbar">

      {/* Logo */}
      <div className="p-5 border-b border-neutral-700">
        <h1 onClick={()=>redirect('/')}
         className="text-2xl font-bold bg-linear-to-b from-sky-800 via-neutral-200 to-blue-700 bg-clip-text text-transparent cursor-pointer">
          DocMind
        </h1>

        <p className="text-xs text-neutral-500 mt-1">
          AI PDF Assistant
        </p>
      </div>

      {/* New Chat */}
      <div className="p-4">
        <button
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg border border-neutral-700 hover:bg-neutral-800 transition cursor-pointer"
          onClick={HandleNewChat}
        >
          <span className="text-xl">+</span>
          <span>New Chat</span>
        </button>
      </div>

      {/* Recent Chats */}
      <div className="flex-1 px-3 overflow-y-auto">

        <p className="text-xs text-neutral-500 px-2 mb-3">
          RECENT CHATS
        </p>

        {sideChats.map((chat) => {
          const isSelected =
            location.pathname === `/chat/${chat.chatId}`;
          return (
            <button
              key={chat.chatId}
              onClick={() =>
                navigate(`/chat/${chat.chatId}`)
              }
              className={`w-full text-left px-3 py-3 rounded-lg transition text-md truncate mb-1 cursor-pointer ${isSelected
                  ? "bg-neutral-800 text-white text-md border-l-2 border-blue-500"
                  : "text-neutral-300 hover:bg-neutral-900"
                }`}
            >
              {chat.question}
            </button>
          );
        })}

      </div>

      {/* User */}
      <div className="p-4 border-t border-neutral-700">

        <button className="w-full flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-neutral-800 transition">

          <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center font-semibold">
            {user.fullName[0]}
          </div>

          <div className="text-left">
            <p className="text-sm font-medium">
              {user.fullName}
            </p>

            <p className="text-xs text-neutral-500">
              Free Plan
            </p>
          </div>

        </button>

      </div>

    </aside>
  );
}

export default Sidebar;
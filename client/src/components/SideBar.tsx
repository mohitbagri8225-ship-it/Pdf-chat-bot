import { useContext } from "react";
import { UserContext } from "../context/useContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Sidebar() {

  const navigate = useNavigate();
  const {user} = useContext(UserContext);   


  const HandleNewChat = async ()=>{
    try {
      const response = await axios.get(`http://localhost:5000/api/v1/chat/create-chat`,
        {
          withCredentials:true
        }
      )
      const nchatId = response.data.data.chatId;
      navigate(`chat/${nchatId}`);
    } catch (error) {
      if(axios.isAxiosError(error)){
        alert("error");
      }else{
        alert("error");
      }
    }
  }
  
  return (
    <aside className="w-64 bg-neutral-900 border-r border-neutral-700 flex flex-col">

      {/* Logo */}
      <div className="p-5 border-b border-neutral-700">
        <h1 className="text-2xl font-bold text-blue-600">
          DocMind
        </h1>

        <p className="text-xs text-neutral-500 mt-1">
          AI PDF Assistant
        </p>
      </div>

      {/* New Chat */}
      <div className="p-4">
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg border border-neutral-700 hover:bg-neutral-800 transition cursor-pointer"
           onClick={HandleNewChat}  >
          <span className="text-xl">+</span>
          <span>New Chat</span>
        </button>
      </div>

      {/* Recent Chats */}
      <div className="flex-1 px-3 overflow-y-auto">

        <p className="text-xs text-neutral-500 px-2 mb-3">
          RECENT CHATS
        </p>

        <button className="w-full text-left px-3 py-3 rounded-lg hover:bg-neutral-800 transition text-sm text-neutral-300 truncate">
          Computer Networks Notes
        </button>

        <button className="w-full text-left px-3 py-3 rounded-lg hover:bg-neutral-800 transition text-sm text-neutral-300 truncate">
          Operating System PDF
        </button>

        <button className="w-full text-left px-3 py-3 rounded-lg hover:bg-neutral-800 transition text-sm text-neutral-300 truncate">
          DBMS Interview Questions
        </button>

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
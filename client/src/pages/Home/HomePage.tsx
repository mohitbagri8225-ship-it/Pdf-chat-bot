import Sidebar from "../../components/SideBar";
// import TopBar from "../../components/TopBar"; 
import ChatPage from "../Chat/ChatPage";

function Home() {

  
  return (
    <div className="h-screen bg-black text-white flex overflow-hidden">
      {/* Sidebar */}
      <Sidebar />

      {/* Main */}
      <main className="flex-1 flex flex-col">

        {/* <TopBar /> */}

         <ChatPage/>

      </main>

    </div>
  );
}

export default Home;
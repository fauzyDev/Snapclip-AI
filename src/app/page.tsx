import Header from "@/components/Header/Header";
import SidebarWrapper from "@/components/Sidebar/SidebarWrapper";
import ChatClient from "@/components/Chat/ChatMessage";
import Footer from "@/components/Footer/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-neutral-900 flex">
      {/* Sidebar - fixed (Client Component) */}
      <SidebarWrapper />
      {/* Main Content Area */}
      <div className="flex flex-col flex-grow ml-0 md:ml-48 w-full">
        <Header />
        <main className="flex-grow flex items-center justify-center relative px-4 pt-4">
          <div className="fixed top-[40%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[28rem] h-[28rem] bg-purple-400 blur-3xl opacity-30 rounded-full z-0" />
          <ChatClient />
        </main>
        <Footer />
      </div>
    </div>
  );
}

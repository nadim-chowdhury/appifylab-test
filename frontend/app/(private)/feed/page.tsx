import Header from "@/components/feed/header";
import { MainFeed } from "@/components/feed/main-feed";
import { RightSidebar } from "@/components/feed/right-sidebar";
import { Sidebar } from "@/components/feed/sidebar";

export default function FeedPaage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-12 gap-6">
          <Sidebar />
          <MainFeed />
          <RightSidebar />
        </div>
      </div>
    </div>
  );
}

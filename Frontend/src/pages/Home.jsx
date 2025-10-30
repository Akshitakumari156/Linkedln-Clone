import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Feed from "../components/Feed";
import RightPanel from "../components/RightPanel";

export default function Home() {
  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <div className="max-w-6xl mx-auto pt-20 grid grid-cols-1 md:grid-cols-4 gap-6 px-4">
        <div className="col-span-1">
          <Sidebar />
        </div>
        <div className="col-span-2">
          <Feed />
        </div>
        <div className="col-span-1 hidden md:block">
          <RightPanel />
        </div>
      </div>
    </div>
  );
}

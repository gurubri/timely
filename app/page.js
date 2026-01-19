import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";

export default function Home() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 ml-64 transition-all duration-300">
        <Dashboard />
      </div>
    </div>
  );
}

import Sidebar from "./sidebar";

export default function Layout({ children }) {
  return (
    <div className="relative flex">
      <Sidebar />
      {children}
    </div>
  );
}

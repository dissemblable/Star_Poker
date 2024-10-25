import { Link, Outlet } from "react-router-dom";

function Main() {
  return (
    <div className="App">
      <nav className="">
        <div className="flex justify-center gap-3 bg-gray-800 p-4">
          <Link to="/" className="text-white hover:text-gray-300">
            Home
          </Link>
          <Link to="/poker" className="text-white hover:text-gray-300">
            poker
          </Link>
        </div>
        <Outlet />
      </nav>
    </div>
  );
}

export default Main;
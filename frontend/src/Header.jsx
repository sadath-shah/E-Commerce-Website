import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "./App";
function Header() {
  const { user, setUser } = useContext(AppContext);
  const navigate = useNavigate();
  const handleLogout = () => {
    setUser({});
    navigate("/login");
  };
  return (
    <header className="bg-orange-500 text-white shadow-lg">
      <div className="flex flex-wrap justify-between items-center px-4 sm:px-6 md:px-8 py-4">
        <div className="text-2xl sm:text-3xl font-bold">MU26A Store</div>
        <nav className="flex flex-wrap gap-2 sm:gap-4 items-center">
          <Link to="/" className="hover:bg-orange-600 px-3 py-2 rounded-lg transition-colors">
            Home
          </Link>
          <Link to="cart" className="hover:bg-orange-600 px-3 py-2 rounded-lg transition-colors">
            Cart
          </Link>
          <Link to="order" className="hover:bg-orange-600 px-3 py-2 rounded-lg transition-colors">
            Order
          </Link>
          {user?.role === "admin" && (
            <Link to="admin" className="hover:bg-orange-600 px-3 py-2 rounded-lg transition-colors">
              Admin
            </Link>
          )}
          {user?.id ? (
            <button
              onClick={handleLogout}
              className="hover:bg-orange-600 px-3 py-2 rounded-lg transition-colors cursor-pointer text-white"
            >
              Logout
            </button>
          ) : (
            <Link to="login" className="hover:bg-orange-600 px-3 py-2 rounded-lg transition-colors">
              Login
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
export default Header
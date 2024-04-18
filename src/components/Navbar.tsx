import { Link, useNavigate } from "react-router-dom";

function Navbar({ user, setUser }: any) {
  const navigate = useNavigate();

  function logout() {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/");
  }

  return (
    <>
      <nav className="bg-[#69c0f0] flex items-center justify-between flex-wrap p-6">
        <div className="flex items-center flex-shrink-0 text-white mr-6">
          <img
            src="../../assets/soccer-ball.png"
            className="fill-current"
            height="60"
            width="60"
          />
          <svg
            className="fill-current h-8 w-8 mr-2"
            width="54"
            height="54"
            viewBox="0 0 54 54"
          ></svg>
          <span className="font-semibold text-xl tracking-wide">
            Premier Picks
          </span>
        </div>
        <div className="block lg:hidden">
          <button className="flex items-center px-3 py-2 border rounded border-teal-400 hover:text-white hover:border-white">
            <svg
              className="fill-current h-3 w-3"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
            </svg>
          </button>
        </div>
        <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
          <div className="text-sm lg:flex-grow">
            <Link
              to="/"
              className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-white mr-4"
            >
              Home
            </Link>
            {user && (
              <Link
                to="/predictions"
                className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-white mr-4"
              >
                Predictions
              </Link>
            )}
            {user && (
              <Link
                to="/results"
                className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-white mr-4"
              >
                Results
              </Link>
            )}
            <Link
              to="/about"
              className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-white"
            >
              About
            </Link>
          </div>
          <div>
            {!user && (
              <Link
                to="/signin"
                className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0"
              >
                Members Area
              </Link>
            )}
            {user && (
              <Link
                to="/signin"
                onClick={logout}
                className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-amber-500 hover:bg-white mt-4 lg:mt-0 hover:border-amber-500"
              >
                Sign Out
              </Link>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;

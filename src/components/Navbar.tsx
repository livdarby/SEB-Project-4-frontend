import { Link, useNavigate } from "react-router-dom";
import React from "react";
import soccer_ball from "../../assets/soccer-ball.png";

function Navbar({ user, setUser }: any) {
  const [menuDisplayedMobile, setMenuDisplayedMobile] = React.useState(false);
  const navigate = useNavigate();

  function logout() {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/");
  }

  // if the app is on full screen, then the menu should always be shown
  // if the app is on mobile, the menu should be hidden to begin with
  // if the app is on mobile, and the hamburger icon is clicked, then the menu should be unhidden if it is hidden..
  // .. hidden if it is unhidden

  function hamburgerMenu() {
    if (!menuDisplayedMobile && window.innerWidth < 1024) {
      setMenuDisplayedMobile(true);
    } else if (menuDisplayedMobile && window.innerWidth < 1024) {
      setMenuDisplayedMobile(false);
    }
  }

  return (
    <>
      <nav className="bg-[#69c0f0] flex items-center justify-between flex-wrap p-6">
        <div className="flex items-center flex-shrink-0 text-white mr-6">
          <img
            src={soccer_ball}
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
          <span className="font-marker font-semibold text-2xl tracking-widest">
            <Link to="/">Premier Picks</Link>
          </span>
        </div>
        <div className="block lg:hidden">
          <button
            onClick={hamburgerMenu}
            className="flex items-center px-3 py-2 border rounded border-gray-700 bg-[#d3ecfb] hover:text-white hover:bg-[#69c0f0] hover:border-white"
          >
            <svg
              className="fill-current h-3 w-3 "
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
              className={
                "block mt-4 lg:inline-block lg:mt-0 text-white hover:text-white mr-4 " +
                (window.innerWidth < 1024 && !menuDisplayedMobile && "hidden")
              }
            >
              Home
            </Link>
            {user && user.id !== 1 && (
              <Link
                to="/predictions"
                className={
                  "block mt-4 lg:inline-block lg:mt-0 text-white hover:text-white mr-4 " +
                  (!menuDisplayedMobile && "hidden")
                }
              >
                Premier League
              </Link>
            )}
            {user && user.id !== 1 && (
              <Link
                to="/euros"
                className={
                  "block mt-4 lg:inline-block lg:mt-0 text-white hover:text-white mr-4 " +
                  (!menuDisplayedMobile && "hidden")
                }
              >
                Euros
              </Link>
            )}
            {user && user.id !== 1 && (
              <Link
                to="/results"
                className={
                  "block mt-4 lg:inline-block lg:mt-0 text-white hover:text-white mr-4 " +
                  (!menuDisplayedMobile && "hidden")
                }
              >
                Results
              </Link>
            )}
            {user && user.id !== 1 && (
              <Link
                to="/leaderboard"
                className={
                  "block mt-4 lg:inline-block lg:mt-0 text-white hover:text-white mr-4 " +
                  (!menuDisplayedMobile && "hidden")
                }
              >
                Leaderboard
              </Link>
            )}
            {user && user.id === 1 && (
              <Link
                to="/matches"
                className={
                  "block mt-4 lg:inline-block lg:mt-0 text-white hover:text-white mr-4 " +
                  (!menuDisplayedMobile && "hidden")
                }
              >
                Post A Match
              </Link>
            )}
            {user && user.id === 1 && (
              <Link
                to="/scoreupdate"
                className={
                  "block mt-4 lg:inline-block lg:mt-0 text-white hover:text-white mr-4 " +
                  (!menuDisplayedMobile && "hidden")
                }
              >
                Update A Score
              </Link>
            )}
          </div>
          <div>
            {!user && (
              <Link
                to="/signin"
                className={
                  "inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-orange-600 hover:bg-white mt-4 lg:mt-0 " +
                  (window.innerWidth < 1024 && !menuDisplayedMobile && "hidden")
                }
              >
                Members Area
              </Link>
            )}
            {user && (
              <Link
                to="/signin"
                onClick={logout}
                className={
                  "inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-amber-500 hover:bg-white mt-4 lg:mt-0 hover:border-amber-500 "
                  // (menuDisplayed && "hidden")
                }
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

import { Link, useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
import soccer_ball from "../../assets/soccer-ball.png";

function Navbar({ user, setUser }: any) {
  const [menuDisplayedMobile, setMenuDisplayedMobile] = React.useState(false);
  const [mouseIsHovered, setMouseIsHovered] = React.useState(false);
  const navigate = useNavigate();
  // console.log(mouseIsHovered);

  function logout() {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/");
  }

  // if the app is on full screen, then the menu should always be shown
  // if the app is on mobile, the menu should be hidden to begin with
  // if the app is on mobile, and the hamburger icon is clicked, then the menu should be unhidden if it is hidden..
  // .. hidden if it is unhidden

  function toggleHamburgerMenu() {
    setMenuDisplayedMobile((prevState) => !prevState);
  }

  function handleLinkClick() {
    if (menuDisplayedMobile && window.innerWidth < 1024) {
      setMenuDisplayedMobile(false);
    }
  }

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth >= 1024) {
        setMenuDisplayedMobile(false);
      }
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // function hamburgerMenu() {
  //   if (!menuDisplayedMobile && window.innerWidth < 1024) {
  //     setMenuDisplayedMobile(true);
  //   } else if (menuDisplayedMobile && window.innerWidth < 1024) {
  //     setMenuDisplayedMobile(false);
  //   }
  // }

  function handleHover() {
    mouseIsHovered ? setMouseIsHovered(false) : setMouseIsHovered(true);
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
            alt="Soccer Ball"
          />
          <span className="font-marker font-semibold text-2xl tracking-widest">
            <Link to="/">Premier Picks</Link>
          </span>
        </div>
        <div className="block lg:hidden">
          <button
            onClick={toggleHamburgerMenu}
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
        <div
          className={`w-full block flex-grow lg:flex lg:items-center lg:w-auto ${
            menuDisplayedMobile ? "block" : "hidden"
          } lg:block`}
        >
          <div className="text-sm lg:flex-grow">
            <Link
              onClick={handleLinkClick}
              to="/"
              className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-white mr-4 uppercase"
            >
              Home
            </Link>
            {user && user.id !== 1 && (
              <Link
                onClick={handleLinkClick}
                to="/predictions"
                className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-white mr-4 uppercase"
              >
                Premier League
              </Link>
            )}

            {user && user.id !== 1 && (
              <div
                className="relative inline-block text-left"
                onMouseEnter={() => setMouseIsHovered(true)}
                onMouseLeave={() => setMouseIsHovered(false)}
              >
                <Link
                  to="/euros"
                  className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-white mr-4 uppercase"
                >
                  Euros
                </Link>
                {mouseIsHovered && (
                  <div
                    className="absolute left-0 py-2 w-48 bg-white rounded shadow-lg"
                    onMouseEnter={() => setMouseIsHovered(true)}
                    onMouseLeave={() => setMouseIsHovered(false)}
                  >
                    <Link
                      onClick={handleLinkClick}
                      to="/euros"
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                    >
                      Enter Predictions
                    </Link>
                    <Link
                      onClick={handleLinkClick}
                      to="/eurosresults"
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                    >
                      View Results
                    </Link>

                    {/* Add more submenu items here if needed */}
                  </div>
                )}
              </div>
            )}

            {user && user.id !== 1 && (
              <Link
                onClick={handleLinkClick}
                to="/leaderboard"
                className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-white mr-4 uppercase"
              >
                Leaderboard
              </Link>
            )}
            {user && user.id === 1 && (
              <Link
                onClick={handleLinkClick}
                to="/matches"
                className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-white mr-4 uppercase"
              >
                Post A Match
              </Link>
            )}
            {user && user.id === 1 && (
              <Link
                onClick={handleLinkClick}
                to="/editprediction"
                className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-white mr-4 uppercase"
              >
                Edit A Prediction
              </Link>
            )}
            {user && user.id === 1 && (
              <Link
                onClick={handleLinkClick}
                to="/scoreupdate"
                className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-white mr-4 uppercase"
              >
                Update A Score
              </Link>
            )}
            {user && user.permissions === "admin" && (
              <Link
                onClick={handleLinkClick}
                to="/fplblackbox"
                className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-white mr-4 uppercase"
              >
                FPL Blackbox
              </Link>
            )}
          </div>
          <div>
            {!user && (
              <Link
                onClick={handleLinkClick}
                to="/signin"
                className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-orange-600 hover:bg-white mt-4 lg:mt-0"
              >
                Members Area
              </Link>
            )}
            {user && (
              <Link
                to="/signin"
                onClick={() => {
                  logout();
                  handleLinkClick();
                }}
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

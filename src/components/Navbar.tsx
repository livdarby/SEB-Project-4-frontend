import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navigation">
      <img
        className="nav-items"
        src="../../assets/soccer-ball.png"
        alt="Football logo"
      />
      <Link className="nav-items" to="/">
        Home
      </Link>
      <Link className="nav-items" to="/predictions">
        Predictions
      </Link>
      <div className="navbar-end">
        <Link className="nav-items" to="/signup">
          Sign Up
        </Link>
        <Link className="nav-items" to="/login">
          Log In
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;

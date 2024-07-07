import "./Navbar.css";
import { FaHome, FaMusic } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/logo-removebg-preview.png";
const Navbar = () => {
  const location = useLocation();
  return (
    <>
      <div>
        <div className="navbar-container">
          <ul className="nav-open">
            <img src={logo} />
            <div className="nav-list">
              <li className={!location.pathname.includes("/playlist") && !location.pathname.includes("/create") ? "active" : ""}>
                <Link to="/">
                  <FaHome className="home" />
                  Home
                </Link>
              </li>
              <li
                className={
                  location.pathname.includes("/playlist") ? "active" : ""
                }
              >
                <Link to="/playlist">
                  <FaMusic className="home" />
                  Songs
                </Link>
              </li>
              <li
                className={
                  location.pathname.includes("/create") ? "active" : ""
                }
              >
                <Link to="/create">My Playlist</Link>
              </li>
            </div>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Navbar;

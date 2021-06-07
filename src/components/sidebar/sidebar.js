import React from "react";
import "./_sidebar.scss";
import {
  MdExitToApp,
  MdHistory,
  MdHome,
  MdLibraryBooks,
  MdSentimentDissatisfied,
  MdSubscriptions,
  MdThumbUp,
} from "react-icons/md";
import { useDispatch } from "react-redux";
import { logout } from "../redux/actions/auth.action";
import { FaBars } from "react-icons/fa";
import { Link } from "react-router-dom";

function Sidebar({ sideBar, handleToggleSidebar }) {
  const dispatch = useDispatch();
  const signOut = () => {
    dispatch(logout());
  };
  return (
    <nav
      onClick={() => handleToggleSidebar(false)}
      className={sideBar ? "sidebar open" : "sidebar"}
    >
      <li className="pr-0 sidebar__header">
        <FaBars
          className="header__menu"
          size={22}
          onClick={() => handleToggleSidebar()}
        />
        <span>
          <img
            src="https://pngimg.com/uploads/youtube/youtube_PNG2.png"
            alt="Logo"
            className="header__logo ml-1"
          />
          <span className="ml-2 sidebar__header__title font-weight-bold">
            Youtube
          </span>
        </span>
      </li>
      <Link to="/">
        <li>
          <MdHome size={22} />
          <span> Home</span>
        </li>
      </Link>
      <Link to="/feed/subscription">
        <li>
          <MdSubscriptions size={22} />
          <span> Subscription</span>
        </li>
      </Link>
      <li>
        <MdThumbUp size={22} />
        <span> Favorite</span>
      </li>
      <li>
        <MdHistory size={22} />
        <span> History</span>
      </li>
      <li>
        <MdLibraryBooks size={22} />
        <span>Library</span>
      </li>
      <li>
        <MdSentimentDissatisfied size={22} />
        <span> I dont't know</span>
      </li>
      <hr />
      <li>
        <MdExitToApp size={22} />
        <span onClick={signOut}>Log out</span>
      </li>
      <hr />
    </nav>
  );
}

export default Sidebar;

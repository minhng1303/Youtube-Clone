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
      <li>
        <MdHome size={25} />
        <span> Home</span>
      </li>
      <li>
        <MdSubscriptions size={25} />
        <span> Subscription</span>
      </li>
      <li>
        <MdThumbUp size={25} />
        <span> Favorite</span>
      </li>
      <li>
        <MdHistory size={25} />
        <span> History</span>
      </li>
      <li>
        <MdLibraryBooks size={25} />
        <span>Library</span>
      </li>
      <li>
        <MdSentimentDissatisfied size={25} />
        <span> I dont't know</span>
      </li>
      <hr />
      <li>
        <MdExitToApp size={25} />
        <span onClick={signOut}>Log out</span>
      </li>
      <hr />
    </nav>
  );
}

export default Sidebar;

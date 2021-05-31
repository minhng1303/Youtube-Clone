import React from "react";
import "./_header.scss";
import { FaBars } from "react-icons/fa";
import { AiOutlineSearch } from "react-icons/ai";
import { MdNotifications, MdApps } from "react-icons/md";
import { Col, Row } from "react-bootstrap";

function Header({ handleToggleSidebar }) {
  return (
    <Row className="header">
      <Col sm={1} xs={1}>
        <FaBars
          className="header__menu ml-3"
          size={22}
          onClick={() => handleToggleSidebar()}
        />
        <img
          src="https://pngimg.com/uploads/youtube/youtube_PNG2.png"
          alt="Logo"
          className="header__logo ml-3"
        />
      </Col>
      <Col md={8} sm={10} xs={9}>
        <form className="col-md-10 py-1 pr-0 mx-auto">
          <input
            className="col-11 ml-auto px-0"
            type="text"
            placeholder="Search"
          />
          <button className="col-1 px-0" type="submit">
            <AiOutlineSearch className="header__search " size={22} />
          </button>
        </form>
      </Col>
      <Col md={2} xs={1} className="header__icons">
        <MdNotifications className="ml-3" size={28} />
        <MdApps className="ml-3" size={28} />
        <img
          src="https://i.pinimg.com/originals/51/f6/fb/51f6fb256629fc755b8870c801092942.png"
          alt="luffy"
          className="ml-3"
        />
      </Col>
    </Row>
  );
}

export default Header;

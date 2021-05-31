import React, { useState } from "react";
import { Badge } from "react-bootstrap";
import { useDispatch } from "react-redux";
import {
  getPopularVideo,
  getVideoByCategory,
} from "../../components/redux/actions/videos.action";

import "./_categoryBar.scss";
const keywords = [
  "All",
  "ReactJS",
  "AngularJS",
  "React Native",
  "Redux",
  "Guitar",
  "Algorith",
  "Spring Boot",
  "Football",
  "Chelsea",
  "Java",
  "NodeJS",
  "Flutter",
  "Scss",
  "Docker",
  "MongoDB",
];
function CategoryBar() {
  const [activeTag, setActiveTag] = useState("All");
  const dispatch = useDispatch();
  const handleClick = (value) => {
    setActiveTag(value);
    if (value === "All") {
      dispatch(getPopularVideo(value));
      return;
    }
    dispatch(getVideoByCategory(value));
  };
  return (
    <div className="categoryBar">
      {keywords.map((value, index) => {
        return (
          <Badge
            onClick={() => handleClick(value)}
            key={index}
            className={activeTag === value ? "active pill" : "pill"}
          >
            {value}
          </Badge>
        );
      })}
    </div>
  );
}

export default CategoryBar;

import axios from "axios";
const request = axios.create({
  baseURL: "https://youtube.googleapis.com/youtube/v3/",
  params: {
    key: "AIzaSyA0czoastYcmC8LpLsQAQ4Bi76MValQICg",
  },
});
export default request;

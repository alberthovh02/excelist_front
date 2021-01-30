import { combineReducers } from "redux";

import Lessons from "./lessons";
import Feedbacks from "./feedbacks";
import Videoblogs from "./videoblog";
import Blogs from "./blogs";
import Courses from "./courses";
import SingleData from "./singledata";
import SiteInfo from "./siteinfo";
import BestExcelist from "./bestexcelist";
import Comments from "./comments";
import Albums from "./albums";
import Subscribes from "./subscribes";
import Certificates from "./certificates";
import Sponsor from "./sponsor";

export default combineReducers({
  Lessons,
  Feedbacks,
  Videoblogs,
  Blogs,
  Courses,
  SingleData,
  SiteInfo,
  BestExcelist,
  Comments,
  Albums,
  Subscribes,
  Certificates,
  Sponsor,
});

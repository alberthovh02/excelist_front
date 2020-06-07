import { GET } from "./actionCreators";
import {
  GET_ALL_LESSONS,
  GET_ALL_FEEDBACKS,
  GET_ALL_COURSES,
  GET_ALL_SINGLE_DATA,
  GET_ALL_COMMENTS,
  GET_ALL_VIDEOBLOGS,
  GET_ALL_ALBUMS,
  ADD_BLOGS
} from "./actionTypes";
import {
  getLessons,
  getFeedbacks,
  getCourses,
  getSingledata,
  getComments,
  getVideoblogs,
  getAlbums,
  getBlogsPagination
} from "./api";

// get initial data
export const InitRequest = async dispatch => {
  // console.clear();
  try {
    await dispatch(GET(getLessons, GET_ALL_LESSONS));
    await dispatch(GET(getBlogsPagination(1), ADD_BLOGS));
    await dispatch(GET(getCourses, GET_ALL_COURSES));
    await dispatch(GET(getSingledata, GET_ALL_SINGLE_DATA));
    await dispatch(GET(getVideoblogs, GET_ALL_VIDEOBLOGS));
    await dispatch(GET(getAlbums, GET_ALL_ALBUMS));
    await dispatch(GET(getFeedbacks, GET_ALL_FEEDBACKS));
    await dispatch(GET(getComments, GET_ALL_COMMENTS));
  } catch (err) {
    console.error(err);
  }
};

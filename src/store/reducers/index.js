import { combineReducers } from 'redux';

import Lessons from './lessons';
import Feedbacks from './feedbacks';
import Videoblogs from './videoblog';
import Blogs from './blogs';
import Courses from './courses';
import SingleData from './singledata';
import Comments from './comments';


export default combineReducers({ Lessons, Feedbacks, Videoblogs, Blogs, Courses, SingleData, Comments })

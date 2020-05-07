//Public components
import Main from '../app/components/Main';
import About from '../app/components/About';
import Lessons from'../app/components/Lessons';
import Blog from'../app/components/Blog';
import Videoblog from'../app/components/Videoblog';
import Automatic from'../app/components/Automatic';
import Feedback from'../app/components/Feedback';
import Login from '../app/components/admin/Login';
import Register from '../app/components/Register';
import GetFiles from '../app/components/GetFiles';
import Videos from '../app/components/Videos';
import VideoPost from '../app/components/VideoPost';
// import Qualification from '../app/components/Qualification';
import BlogPost from '../app/components/BlogPost';
import FileRequest from '../app/components/FileRequest';
import SingleCourse from '../app/components/SingleCourse';
import OurTeam from '../app/components/OurTeam';
import Join from '../app/components/Join';
import Search from '../app/components/Search';
import Certificates from '../app/components/Certificates';
//Private routes
import Dashboard from "../app/components/admin/Dashboard";
import Lesson from "../app/components/admin/Lesson";
import Students from "../app/components/admin/Students";
import Feedbacks from "../app/components/admin/Feedbacks";
import SubscribedUsers from "../app/components/admin/SubscribedUsers";
import RegisteredUsers from '../app/components/admin/RegisteredUsers';
import VideoBlogAdmin from "../app/components/admin/VideoblogAdmin";
import BlogAdmin from '../app/components/admin/Blog';
import Course from '../app/components/admin/Course';
import Certificate from '../app/components/admin/Certificate';
import Images from '../app/components/admin/Images';

export const PublicRoutes = [
    { id: 1, path: `/`, component: Main },
    { id: 2, path: `/about`, component: About },
    { id: 3, path: `/lessons`, component: Lessons },
    { id: 4, path: `/blog`, component: Blog },
    { id: 5, path: `/videoblog`, component: Videoblog },
    { id: 6, path: `/automatic`, component: Automatic },
    { id: 7, path: `/feedback`, component: Feedback },
    { id: 8, path: `/login/admin`, component: Login },
    { id: 9, path: `/register`, component: Register },
    { id: 10, path: `/get-files`, component: GetFiles },
    { id: 11, path: `/videos`, component: Videos},
    { id: 12, path: `/videoblogpost/:url`, component: VideoPost},
    // { id: 13, path: `/qualification`, component: Qualification},
    { id: 14, path: `/blogpost/:url`, component: BlogPost},
    { id: 15, path: `/filerequest/:video`, component: FileRequest},
    { id: 17, path: `/course/:id`, component: SingleCourse},
    { id: 18, path: `/our-team/:id`, component: OurTeam},
    { id: 19, path: `/join`, component: Join},
    { id: 20, path: `/search/`, component: Search },
    { id: 21, path: '/certificates', component: Certificates}
]


export const PrivateRoutes = [
  { id: 1, path: '/dashboard', component: Dashboard },
  { id: 2, path: '/create-lesson', component: Lesson },
  { id: 3, path: '/students', component: Students },
  { id: 4, path: '/feedbacks', component: Feedbacks },
  { id: 5, path: "/subscribes", component: SubscribedUsers},
  { id: 6, path: '/registered_users', component: RegisteredUsers},
  { id: 7, path: '/video-blog', component: VideoBlogAdmin},
  { id: 8, path: '/blogs', component: BlogAdmin},
  { id: 9, path: '/course', component: Course},
  { id: 10, path: '/certificate', component: Certificate},
  { id: 11, path: '/images', component: Images}
];

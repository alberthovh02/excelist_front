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
//Private routes
import Dashboard from "../app/components/admin/Dashboard";
import Lesson from "../app/components/admin/Lesson";
import Students from "../app/components/admin/Students";
import Feedbacks from "../app/components/admin/Feedbacks";
import SubscribedUsers from "../app/components/admin/SubscribedUsers";
import RegisteredUsers from '../app/components/admin/RegisteredUsers';
import VideoBlogAdmin from "../app/components/admin/VideoblogAdmin";
import BlogAdmin from '../app/components/admin/Blog';

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
    { id: 11, path: `/videos`, component: Videos}
]


export const PrivateRoutes = [
  { id: 1, path: '/dashboard', component: Dashboard },
  { id: 2, path: '/create-lesson', component: Lesson },
  { id: 3, path: '/students', component: Students },
  { id: 4, path: '/feedbacks', component: Feedbacks },
  { id: 5, path: "/subscribes", component: SubscribedUsers},
  { id: 6, path: '/registered_users', component: RegisteredUsers},
  { id: 7, path: '/video-blog', component: VideoBlogAdmin},
  { id: 8, path: '/blogs', component: BlogAdmin}
];

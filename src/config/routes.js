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
//Private routes
import Dashboard from "../app/components/admin/Dashboard";
import Lesson from "../app/components/admin/Lesson";

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
    { id: 10, path: `/get-files`, component: GetFiles }
]


export const PrivateRoutes = [
  { id: 1, path: '/dashboard', component: Dashboard},
  { id: 2, path: '/create-lesson', component: Lesson}
];

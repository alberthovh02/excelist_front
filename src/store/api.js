//Students count
// export const AddUserCount = "students/count";
// export const GetUserCount = "students/";
export const getLessons = "lesson";
export const createLesson = "lesson/create";
export const deleteLesson = (id) => `lesson/${id}`;
export const updateLesson = (id) => `lesson/update/${id}`;

//Login
export const login = "login";

//feedbacks
export const getFeedbacks = "user-feedbacks/";
export const createFeedback = "user-feedbacks/create";
export const updateFeedback = (id) => `user-feedbacks/${id}`;
export const deleteFeedback = (id) => `user-feedbacks/${id}`;

//Videoblogs
export const getVideoblogs = "video-blog/blogs-desc";
export const createVideoblog = "video-blog/create";
export const editVideoblog = (id) => `video-blog/${id}`;
export const deleteVideoblog = (id) => `video-blog/${id}`;
export const getSinglepost = (url) => `videoblogpost/${url}`;

//blogs
export const getBlogs = "blogs";
export const createBlog = "blogs/create";
export const updateBlog = (id) => `blogs/${id}`;
export const deleteBlog = (id) => `blogs/${id}`;
export const getBlogsPagination = (page) => `blogs/${page}/`;

//best
export const getBests = "best-excelist";
export const createBest = "best-excelist/create";
export const updateBest = (id) => `best-excelist/${id}`;
export const deleteBest = (id) => `best-excelist/${id}`;
export const getBestsPagination = (page) => `best-excelist/${page}/`;

//sponsor
export const getSponsor = "sponsor";
export const createSponsor = "sponsor/create";
export const deleteSponsor = (id) => `sponsor/${id}`;

//courses
export const getCourses = "course/";
export const createCourse = "course/create/";
export const deleteCourse = (id) => `course/${id}`;
export const updateCourse = (id) => `course/${id}`;
export const updateCourseAndImage = (id) => `course/withimage/${id}`;
export const updateCourseOrder = (id) => `course/orders/${id}`;
export const getSingleCourse = (id) => `course/${id}`;

export const getSingledata = "students";
export const updateSingleData = "students/count";

export const getSiteInfo = "siteinfo";
export const updateSiteInfo = "siteinfo/create";

//comments
export const getComments = "comments";
export const delteComment = (id) => `comments/${id}`;
export const createComment = "comments/create";

//albums
export const getAlbums = "albums";
export const createAlbum = "albums/create";
export const updateAlbum = (id) => `albums/${id}`;
export const deleteAlbum = (id) => `albums/${id}`;

//album Images
export const createAlbumImage = (id) => `album-image/create/${id}`;
export const deleteAlbumImage = (albumId, imageId) =>
  `album-image/delete/${albumId}/${imageId}`;

//cv uplaod
export const uploadCV = `join/`;

//subscribers
export const getSubscribers = `subscribes/`;
export const sendSubscribersMail = `subscribes/sendMail/`;

//search
export const search = (keyword) => `search/${keyword}`;

//certificates
export const getAllCertificates = `certificates/`;
export const getCertificateByUserId = (userId) => `certificates/${userId}`;
export const createCertificate = `certificates/create`;
export const deleteCertificate = (userId) => `certificates/${userId}`;
export const updateCertificate = (userId) => `certificates/${userId}`;

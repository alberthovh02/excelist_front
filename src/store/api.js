//Students count
// export const AddUserCount = "students/count";
// export const GetUserCount = "students/";
export const getLessons = 'lesson';
export const createLesson = 'lesson/create';
export const deleteLesson = id => `lesson/${id}`;
export const updateLesson = id => `lesson/update/${id}`;

//Login
export const login = 'login'

//feedbacks
export const getFeedbacks = 'user-feedbacks/';
export const createFeedback = 'user-feedbacks/create';
export const updateFeedback = id => `user-feedbacks/${id}`;
export const deleteFeedback = id => `user-feedbacks/${id}`;

//Videoblogs
export const getVideoblogs = 'video-blog/blogs-desc';
export const createVideoblog = 'video-blog/create';
export const editVideoblog = id => `video-blog/${id}`;
export const deleteVideoblog = id => `video-blog/${id}`;
// export const getSinglepost =

//blogs
export const getBlogs = 'blogs';
export const createBlog = 'blogs/create';
// export const updateBlog = id => `user-feedbacks/${id}`;
export const deleteBlog = id => `blogs/${id}`;

//courses
export const getCourses = 'course/';
export const createCourse = 'course/create/';
export const deleteCourse = id => `course/${id}`

export const getSingledata = 'students';
export const updateSingleData = 'students/count';

//comments
export const getComments = 'comments';
export const delteComment = id =>  `comments/${id}`;
export const createComment = 'comments/create';

//albums
export const getAlbums = 'albums';
export const createAlbum = 'albums/create';
export const updateAlbum = id =>  `albums/${id}`;
export const deleteAlbum = id => `albums/${id}`;

//album Images
export const createAlbumImage = id => `album-image/create/${id}`;
export const deleteAlbumImage = (albumId, imageId) => `album-image/delete/${albumId}/${imageId}`;

//cv uplaod
export const uploadCV = `join/`

//subscribers
export const getSubscribers = `subscribes/`;
export const sendSubscribersMail = `subscribes/sendMail/`

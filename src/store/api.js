//Students count
// export const AddUserCount = "students/count";
// export const GetUserCount = "students/";
export const getLessons = 'lesson';

//feedbacks
export const getFeedbacks = 'user-feedbacks/';
export const createFeedback = 'user-feedbacks/create';
export const updateFeedback = id => `user-feedbacks/${id}`;
export const deleteFeedback = id => `user-feedbacks/${id}`;

//Videoblogs
export const getVideoblogs = 'video-blog/blogs-desc';
export const createVideoblog = 'video-blog/create';
// export const updateVideoblog = 'video-blog/create';
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

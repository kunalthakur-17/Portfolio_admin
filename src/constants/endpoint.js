const baseurl = "/api/v1";

// auth Endpoints
export const login = `${baseurl}/user/login`;
export const logout = `${baseurl}/user/logout`;
export const signup = `${baseurl}/auth/signup`;


// user admin api
//  dashbord

export const Dashboard = `${baseurl}/dashboard/analytics`;
export const DashboardEvent = `${baseurl}/company/dashboard/events`;

//  blog api

export const Blog = `${baseurl}/blog`;
export const GetBlogById = `${baseurl}/blog`;
export const CreateBlog = `${baseurl}/blog`;
export const UpdateBlog = `${baseurl}/blog`;
export const DeleteBlog = `${baseurl}/blog`;

//  work api

export const Work = `${baseurl}/work`;
export const GetWorkById = `${baseurl}/work`;
export const CreateWork = `${baseurl}/work`;
export const UpdateWork = `${baseurl}/work`;
export const DeleteWork = `${baseurl}/work`;


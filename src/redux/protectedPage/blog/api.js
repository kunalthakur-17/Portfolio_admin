import * as URL from "../../../constants/endpoint";
import { APICore } from "../../../helpers/api/apiCore";

const api = new APICore();

export function getBlogsApi(data) {
  const { search, page, limit = 10 } = data || {};
  let url = URL.Blog;
  const queryParams = [];

  if (limit) {
    queryParams.push(`limit=${limit}`);
  }

  if (search) {
    queryParams.push(`search=${encodeURIComponent(search)}`);
  }

  if (page) {
    queryParams.push(`page=${page}`);
  }

  if (queryParams.length > 0) {
    url += `?${queryParams.join("&")}`;
  }

  return api.get(url);
}

export function getBlogByIdApi(id) {
  return api.get(`${URL.GetBlogById}/${id}`);
}

export function createBlogApi(data) {
  return api.create(URL.CreateBlog, data);
}

export function updateBlogApi(data) {
  const { id, ...updateData } = data;
  return api.update(`${URL.UpdateBlog}/${id}`, updateData);
}

export function deleteBlogApi(data) {
  const { id } = data;
  return api.delete(`${URL.DeleteBlog}/${id}`);
}

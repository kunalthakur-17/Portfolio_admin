import * as URL from "../../../constants/endpoint";
import { APICore } from "../../../helpers/api/apiCore";

const api = new APICore();

export function getWorksApi(data) {
  const { search, page, limit = 10 } = data || {};
  let url = URL.Work;
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

export function getWorkByIdApi(id) {
  return api.get(`${URL.GetWorkById}/${id}`);
}

export function createWorkApi(data) {
  return api.create(URL.CreateWork, data);
}

export function updateWorkApi(data) {
  const { id, ...updateData } = data;
  return api.update(`${URL.UpdateWork}/${id}`, updateData);
}

export function deleteWorkApi(data) {
  const { id } = data;
  return api.delete(`${URL.DeleteWork}/${id}`);
}

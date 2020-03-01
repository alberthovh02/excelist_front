import Request from './request';

const Dispatcher = (type, payload) => {
  return { type, payload };
};

// simple action creator
export const ActionCreator = (type, payload) => {
  return dispatch => {
    dispatch(Dispatcher(type, payload));
  };
};

// delete action creator
const DeleteData = api => {
  return Request.delete(api);
};

export const DELETE = api => () => {
  try {
    return DeleteData(api)
      .then(resp => resp.json())
      .then(data => data, error => error);
  } catch (error) {
    console.error(error);
  }
};

// get action creator
const FetchData = api => {
  return Request.get(api);
};

export const GET = (api, type) => dispatch => {
  try {
    return FetchData(api)
      .then(resp => resp.json())
      .then(data => dispatch(Dispatcher(type, data)), error => error)
      .then(resp => resp.payload);
  } catch (error) {
    console.error(error);
  }
};

// post action creator
const PostData = (api, data, formdata) => {
  if (formdata) return Request.post(api, data);
  return Request.postJson(api, data);
};

export const POST = (api, data, formdata) => () => {
  try {
    return PostData(api, data, formdata)
      .then(resp => resp.json())
      .then(data => data, error => error);
  } catch (error) {
    console.error(error);
  }
};

// put action creator
const PutData = (api, data, formdata) => {
  if (formdata) return Request.putFormData(api, data);
  return Request.put(api, data);
};

export const PUT = (api, data, formdata) => dispatch => {
  try {
    return PutData(api, data, formdata)
      .then(resp => resp.json())
      .then(data => data, error => error);
  } catch (error) {
    console.error(error);
  }
};

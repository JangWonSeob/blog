import axios from "axios";
import { fork, put, takeEvery, call, all } from "redux-saga/effects";
import { push } from "connected-react-router";
import {
  POSTS_LOADING_FAILURE,
  POSTS_LOADING_REQUEST,
  POSTS_LOADING_SUCCESS,
  POST_UPLOADING_SUCCESS,
  POST_UPLOADING_REQUEST,
  POST_UPLOADING_FAILURE,
  POST_DETAIL_LOADING_SUCCESS,
  POST_DETAIL_LOADING_FAILURE,
  POST_DETAIL_LOADING_REQUEST,
} from "../types";

// All Posts load

const loadPostAPI = () => {
  return axios.get("/api/post");
};

function* loadPosts() {
  try {
    const result = yield call(loadPostAPI);
    console.log(result, "loadPosts");
    yield put({
      type: POSTS_LOADING_SUCCESS,
      payload: result.data,
    });
  } catch (e) {
    yield put({
      type: POSTS_LOADING_FAILURE,
      payload: e,
    });
    yield push("/");
  }
}

function* watchLoadPosts() {
  yield takeEvery(POSTS_LOADING_REQUEST, loadPosts);
}

// PostUpload

const uploadPostAPI = (payload) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const token = payload.token;
  if (token) {
    config.headers["x-auth-token"] = token;
  }
  return axios.post("/api/post", payload, config);
};

function* uploadPosts(action) {
  try {
    console.log(action, "uploadPost function");
    const result = yield call(uploadPostAPI, action.payload);
    yield put({
      type: POST_UPLOADING_SUCCESS,
      payload: result.data,
    });
    yield put(push(`/post/${result.data._id}`));
  } catch (e) {
    yield put({
      type: POST_UPLOADING_FAILURE,
      payload: e,
    });
    yield put(push("/"));
  }
}

function* watchuploadPosts() {
  yield takeEvery(POST_UPLOADING_REQUEST, uploadPosts);
}

// POst Detail

const loadPostDetailAPI = (payload) => {
  console.log(payload);
  return axios.get(`/api/post/${payload}`);
};

function* loadPostDetail(action) {
  try {
    const result = yield call(loadPostDetailAPI, action.payload);
    console.log(result, "post_detail_saga_data");
    yield put({
      type: POST_DETAIL_LOADING_SUCCESS,
      payload: result.data,
    });
  } catch (e) {
    yield put({
      type: POST_DETAIL_LOADING_FAILURE,
      payload: e,
    });
    yield put(push("/"));
  }
}

function* watchloadPostDetail() {
  yield takeEvery(POST_DETAIL_LOADING_REQUEST, loadPostDetail);
}

export default function* postSaga() {
  yield all([
    fork(watchLoadPosts),
    fork(watchuploadPosts),
    fork(watchloadPostDetail),
  ]);
}

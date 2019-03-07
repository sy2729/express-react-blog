const GET_POST = "GET_POST";
const GET_USER = "GET_USER"
// const LOGIN = "LOGIN";
const LOGOUT = "LOGOUT";
const GET_USER_POST = "GET_USER_POST";
const GET_ONE_POST = 'GET_ONE_POST';
const GET_DISPLAY_USER = 'GET_DISPLAY_USER';

const getPost = (content)=>{
  return {
    type: GET_POST,
    payload: content
  }
};

const getUser = (content)=>{
  return {
    type: GET_USER,
    payload: content
  }
};

// const login = (content)=> {
//   return {
//     type: LOGIN,
//     payload: content
//   }
// }
const logOut = (content)=> {
  return {
    type: LOGOUT,
    payload: content
  }
}

const getUserPost = (content)=> {
  return {
    type: GET_USER_POST,
    payload: content
  }
}

const getOnePost = (content)=> {
  return {
    type: GET_ONE_POST,
    payload: content
  }
}
const getDisplayUser = (content)=> {
  return {
    type: GET_DISPLAY_USER,
    payload: content
  }
}

export default {
  getPost,
  getUser,
  logOut,
  getUserPost,
  getOnePost,
  getDisplayUser
}
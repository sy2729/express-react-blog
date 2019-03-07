import config from './config';
import axios from 'axios';

import auth from './token';
import actions from '../action';
import store from '../store';


/* set up the defaul of axios*/
let baseUrl;
process.env.NODE_ENV === "development" ? baseUrl = config.development.baseUrl : config.production.baseUrl;

axios.defaults.baseURL = baseUrl;

let headers;
const setHeader = ()=> {
  headers = {};
  if(config.authorizationHeader) headers = Object.assign({}, headers, config.authorizationHeader())
  axios.defaults.headers.common = headers;  
}




// start the API

//-----get me for every request-------//
const getMe = ()=> {
  setHeader();
  if(!config.authorizationHeader) return
  axios.get('/api/user/me')
    .then((res)=> {
      store.dispatch(actions.getUser(res.data))
    })
}

const getDisplayUser = (id)=> {
  return axios.get(`/api/user/${id}`)
  .then((res)=> {
    store.dispatch(actions.getDisplayUser(res.data))
  })
}


const getPost = ()=> {
  return axios.get('/api/post')
    .then((res)=>{
      store.dispatch(actions.getPost(res.data))
    })
}

const signUp = (obj)=> {
  return axios.post('/api/user/', {
    ...obj
  })
}

const login = (obj)=> {
  return axios.post('/auth/signin', {
    username: obj.userName,
    password: obj.password
  })
    .then((res)=>{
      if(res.data) {
        auth.setToken(res.data)
        // use the token to get the user info
        getMe();
      }
    })
}

const logOut = ()=> {
  return new Promise((res, rej)=> {
    auth.deleteToken();
    // also Update the header
    setHeader();
    res();
  })
    .then(()=> {
      store.dispatch(actions.logOut(null))
    })
}

const postBlog = (data)=> {
  return axios.post('api/post', {...data})
}


const getUserPost = (userId)=> {
  return axios.get(`api/post?user=${userId}`)
    .then(res=> {
      store.dispatch(actions.getUserPost(res.data))
    })
}

const getOnePost = (postId)=> {
  return axios.get(`api/post/${postId}`)
    .then(res=> {
      store.dispatch(actions.getOnePost(res.data))
    })
}



export default {
  getPost,
  login,
  getMe,
  getDisplayUser,
  logOut,
  postBlog,
  getUserPost,
  getOnePost,
  signUp
}

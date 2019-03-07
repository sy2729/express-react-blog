import token from './token';

let authorizationHeader = ()=> {
  let userToken = token.getLocalToken();
  return userToken ? { Authorization: "Bearer " + userToken } : null
}



export default {
  development: {
    baseUrl: 'http://localhost:3000/'
  },
  production: {
    baseUrl: '/'
  },
  authorizationHeader
}
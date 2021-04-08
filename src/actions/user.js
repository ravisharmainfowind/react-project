import appConfig from '../config';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE';
export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILURE = 'REGISTER_FAILURE';

function requestLogin(creds) {
  return {
    type: LOGIN_REQUEST,
    isFetching: true,
    isAuthenticated: false,
    creds,
  };
}

function requestRegister(creds) {
  return {
    type: REGISTER_REQUEST,
    isFailed: true,
    creds,
  };
}

export function receiveLogin(user) {
  return {
    type: LOGIN_SUCCESS,
    isFetching: false,
    isAuthenticated: true,
    id_token: user.access_token,
  };
}

export function receiveRegister(user) {
  return {
    type: REGISTER_SUCCESS,
    isFailed: false,
  };
}

function loginError(message) {
  return {
    type: LOGIN_FAILURE,
    isFetching: false,
    isAuthenticated: false,
    message,
  };
}

function registerError(message) {
  return {
    type: REGISTER_FAILURE,
    isFailed: true,
    message,
  };
}

function requestLogout() {
  return {
    type: LOGOUT_REQUEST,
    isFetching: true,
    isAuthenticated: true,
  };
}

export function receiveLogout() {
  return {
    type: LOGOUT_SUCCESS,
    isFetching: false,
    isAuthenticated: false,
  };
}

// Logs the user out
export function logoutUser() {
  let token_r = localStorage.getItem('id_token');
  const config = {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${token_r}` },
    body: {},
  };
  return dispatch => {
    return fetch('http://localhost:8000/api/auth/logout', config)
      .then(response => response.json())
      .then(({ response }) => {
        //debugger
        dispatch(requestLogout());
        localStorage.removeItem('id_token');
        document.cookie = 'id_token=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        if (!response.ok) {
          // If there was a problem, we want to
          // dispatch the error condition
        }
        dispatch(receiveLogout());
      })
      .catch(err => console.error('Error: ', err));
  };
}

export function loginUser(creds) {
  const config = {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    //credentials: 'include',
    body: `email=${creds.email}&password=${creds.password}`,
  };
  
  return dispatch => {
    // We dispatch requestLogin to kickoff the call to the API
    dispatch(requestLogin(creds));
    if(process.env.NODE_ENV === "development") {
    return fetch('http://localhost:8000/api/auth/login', config)
      .then(response => response.json().then(user => ({ user, response })))
      .then(({ user, response }) => {
        //debugger
        if (!response.ok) {
          // If there was a problem, we want to
          // dispatch the error condition
          dispatch(loginError(user.message));
          return Promise.reject(user);
        }
        // in posts create new action and check http status, if malign logout
        // If login was successful, set the token in local storage
        localStorage.setItem('id_token', user.access_token);
        // Dispatch the success action
        dispatch(receiveLogin(user));
        return Promise.resolve(user);
      })
      .catch(err => console.error('Error: ', err));
    } else {
      localStorage.setItem('id_token', appConfig.id_token);
      dispatch(receiveLogin({id_token: appConfig.id_token}))
    }
  };
}

export function registerUser(creds) {
  const config = {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `name=${creds.name}&email=${creds.email}&password=${creds.password}&password_confirmation=${creds.password_confirmation}`,
  };
  
  return dispatch => {
    // We dispatch requestLogin to kickoff the call to the API
    dispatch(requestRegister(creds));
    //if(process.env.NODE_ENV === "development") {
    return fetch('http://localhost:8000/api/auth/register', config)
      .then(response => response.json().then(user => ({ user, response })))
      .then(({ user, response }) => {
        //debugger
        if (!response.ok) {
          // If there was a problem, we want to
          // dispatch the error condition
          dispatch(registerError(user.message));
          return Promise.reject(user);
        }
        // in posts create new action and check http status, if malign logout
        // If login was successful, set the token in local storage
       
        // Dispatch the success action
        dispatch(receiveRegister(user));
        return Promise.resolve(user);
      })
      .catch(err => console.error('Error: ', err));
    // } else {
    //   localStorage.setItem('id_token', appConfig.id_token);
    //   dispatch(receiveLogin({id_token: appConfig.id_token}))
    // }
  };
}
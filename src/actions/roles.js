export const CREATE_ROLE_INITIAL = 'CREATE_ROLE_INITIAL';
export const CREATE_ROLE_REQUEST = 'CREATE_ROLE_REQUEST';
export const CREATE_ROLE_SUCCESS = 'CREATE_ROLE_SUCCESS';
export const CREATE_ROLE_FAILURE = 'CREATE_ROLE_FAILURE';
export const FETCH_ROLES_REQUEST = 'FETCH_ROLES_REQUEST';
export const FETCH_ROLES_SUCCESS = 'FETCH_ROLES_SUCCESS';
export const FETCH_ROLES_FAILURE = 'FETCH_ROLES_FAILURE';
export const GET_ROLE_REQUEST    = 'GET_ROLE_REQUEST';
export const GET_ROLE_SUCCESS    = 'GET_ROLE_SUCCESS';
export const GET_ROLE_FAILURE    = 'GET_ROLE_FAILURE';
export const UPDATE_ROLE_REQUEST = 'UPDATE_ROLE_REQUEST';
export const UPDATE_ROLE_SUCCESS = 'UPDATE_ROLE_SUCCESS';
export const UPDATE_ROLE_FAILURE = 'UPDATE_ROLE_FAILURE';
export const DELETE_ROLES_REQUEST = 'DELETE_ROLES_REQUEST';
export const DELETE_ROLES_SUCCESS = 'DELETE_ROLES_SUCCESS';
export const DELETE_ROLES_FAILURE = 'DELETE_ROLES_FAILURE';
export const STATUS_ROLES_REQUEST = 'STATUS_ROLES_REQUEST';
export const STATUS_ROLES_SUCCESS = 'STATUS_ROLES_SUCCESS';
export const STATUS_ROLES_FAILURE = 'STATUS_ROLES_FAILURE';

function createRoleInitial() {
  return {
    type: CREATE_ROLE_INITIAL,
    isFetching: false,
  };
}

function requestCreateRole(role) {
  return {
    type: CREATE_ROLE_REQUEST,
    isFetching: true,
    role,
  };
}

function createRoleSuccess(role) {
  return {
    type: CREATE_ROLE_SUCCESS,
    isFetching: false,
    role,
  };
}

function createRoleError(message) {
  return {
    type: CREATE_ROLE_FAILURE,
    isFetching: false,
    message,
  };
}

function requestGetRole(role) {
  return {
    type: GET_ROLE_REQUEST,
    isFetching: true,
    role,
  };
}

function getRoleSuccess(roles) {
 //console.log(role);
  return {
    type: GET_ROLE_SUCCESS,
    isFetching: false,
    roles,
  };
}

function getRoleError(message) {
  return {
    type: GET_ROLE_FAILURE,
    isFetching: false,
    message,
  };
}

function requestFetchRole() {
  return {
    type: FETCH_ROLES_REQUEST,
    isFetching: true,
  };
}

function fetchRoleSuccess(role) {
  return {
    type: FETCH_ROLES_SUCCESS,
    isFetching: false,
    role,
  };
}

function fetchRoleError(message) {
  return {
    type: FETCH_ROLES_FAILURE,
    isFetching: false,
    message,
  };
}

function requestUpdateRole(role) {
  return {
    type: UPDATE_ROLE_REQUEST,
    isFetching: true,
    role,
  };
}

function updateRoleSuccess(role) {
  return {
    type: UPDATE_ROLE_SUCCESS,
    isFetching: false,
    role,
  };
}

function updateRoleError(message) {
  return {
    type: UPDATE_ROLE_FAILURE,
    isFetching: false,
    message,
  };
}

function requestDeleteRole() {
  return {
    type: DELETE_ROLES_REQUEST,
    isFetching: true,
  };
}

function deleteRoleSuccess(role) {
  return {
    type: DELETE_ROLES_SUCCESS,
    isFetching: false,
    deleteMessage:role.message,
    role,
  };
}

function deleteRoleError(message) {
  return {
    type: DELETE_ROLES_FAILURE,
    isFetching: false,
    message,
  };
}

function requestStatusRole() {
  return {
    type: STATUS_ROLES_REQUEST,
    isFetching: true,
  };
}

function statusRoleSuccess(role) {
  return {
    type: STATUS_ROLES_SUCCESS,
    isFetching: false,
    statusMessage:role.message,
    role,
  };
}

function statusRoleError(message) {
  return {
    type: STATUS_ROLES_FAILURE,
    isFetching: false,
    message,
  };
}

export function createRole(roleData) {
  const config = {
    method: 'post',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded',
      'Access-Control-Allow-Origin': '*',
    },
    body: `name=${roleData.name}`,
  };

  return dispatch => {
    // We dispatch requestCreatePost to kickoff the call to the API
    dispatch(requestCreateRole(roleData));
    
    return fetch('http://127.0.0.1:8000/api/v1/role/store', config)
      .then(response => response.json().then(role => ({ role, response })))
      .then(({ role, response }) => {
        if (!response.ok) {
          // If there was a problem, we want to
          // dispatch the error condition
          dispatch(createRoleError(role.message));
          return Promise.reject(role);
        }
        // Dispatch the success action
        dispatch(createRoleSuccess(role));
        setTimeout(() => {
          dispatch(createRoleInitial());
        }, 5000);
        return Promise.resolve(role);
      })
      .catch(err => console.error('Error: ', err));
    
  };
}

export function getRoles() {
  const config = {
    method: 'get',
    headers: {
      Accept: 'application/json',
      //'Content-Type': 'application/x-www-form-urlencoded',
      'Access-Control-Allow-Origin': '*',
    },
  };

  return dispatch => {
    // We dispatch requestCreatePost to kickoff the call to the API
    dispatch(requestGetRole());
    
    return fetch('http://127.0.0.1:8000/api/v1/role', config)
      .then(response => response.json().then(roles => ({ roles, response })))
      .then(({ roles, response }) => {
        if (!response.ok) {
          // If there was a problem, we want to
          // dispatch the error condition
          dispatch(getRoleError(roles.message));
          return Promise.reject(roles);
        }
        // Dispatch the success action
        dispatch(getRoleSuccess(roles));
       
        return Promise.resolve(roles);
      })
      .catch(err => console.error('Error: ', err));
    
  };
}

export function updateRole(roleData) {
  const config = {
    method: 'put',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded',
      'Access-Control-Allow-Origin': '*',
    },
    body: `name=${roleData.name}`,
  };

  return dispatch => {
    // We dispatch requestUpdatePost to kickoff the call to the API
    dispatch(requestUpdateRole(roleData));
    
    return fetch('http://127.0.0.1:8000/api/v1/role/'+roleData.id+'/update', config)
      .then(response => response.json().then(role => ({ role, response })))
      .then(({ role, response }) => {
        if (!response.ok) {
          // If there was a problem, we want to
          // dispatch the error condition
          dispatch(updateRoleError(role.message));
          return Promise.reject(role);
        }
        // Dispatch the success action
        dispatch(updateRoleSuccess(role));
       
        return Promise.resolve(role);
      })
      .catch(err => console.error('Error: ', err));
    
  };
}

export function fetchRole(roleId) {
  const config = {
    method: 'get',
    headers: {
      Accept: 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  };

  return dispatch => {
    // We dispatch requestFetchPost to kickoff the call to the API
    dispatch(requestFetchRole(roleId));
    
    return fetch('http://127.0.0.1:8000/api/v1/role/'+roleId.roleId+'/edit', config)
      .then(response => response.json().then(role => ({ role, response })))
      .then(({ role, response }) => {
        if (!response.ok) {
          // If there was a problem, we want to
          // dispatch the error condition
          dispatch(fetchRoleError(role.message));
          return Promise.reject(role);
        }
        // Dispatch the success action
        dispatch(fetchRoleSuccess(role.data.role_info));
    
        return Promise.resolve(role);
      })
      .catch(err => console.error('Error: ', err));
    
  };
}

export function deleteRole(roleId) {
  const config = {
    method: 'delete',
    headers: {
      Accept: 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  };

  return dispatch => {
    // We dispatch requestDeletePost to kickoff the call to the API
    dispatch(requestDeleteRole(roleId));
    
    return fetch('http://127.0.0.1:8000/api/v1/role/'+roleId.roleId+'/delete', config)
      .then(response => response.json().then(role => ({ role, response })))
      .then(({ role, response }) => {
        if (!response.ok) {
          // If there was a problem, we want to
          // dispatch the error condition
          dispatch(deleteRoleError(role.message));
          return Promise.reject(role);
        }
        // Dispatch the success action
        dispatch(deleteRoleSuccess(role));
    
        return Promise.resolve(role);
      })
      .catch(err => console.error('Error: ', err));
    
  };
}

export function statusRole(roleId) {
  const config = {
    method: 'put',
    headers: {
      Accept: 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  };

  return dispatch => {
    // We dispatch requestStatusPost to kickoff the call to the API
    dispatch(requestStatusRole(roleId));
    
    return fetch('http://127.0.0.1:8000/api/v1/role/'+roleId.roleId+'/status', config)
      .then(response => response.json().then(role => ({ role, response })))
      .then(({ role, response }) => {
        if (!response.ok) {
          // If there was a problem, we want to
          // dispatch the error condition
          dispatch(statusRoleError(role.message));
          return Promise.reject(role);
        }
        // Dispatch the success action
        dispatch(statusRoleSuccess(role));
    
        return Promise.resolve(role);
      })
      .catch(err => console.error('Error: ', err));
    
  };
}
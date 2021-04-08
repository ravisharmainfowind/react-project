export const CREATE_CATEGORY_INITIAL   = 'CREATE_CATEGORY_INITIAL';
export const CREATE_CATEGORY_REQUEST   = 'CREATE_CATEGORY_REQUEST';
export const CREATE_CATEGORY_SUCCESS   = 'CREATE_CATEGORY_SUCCESS';
export const CREATE_CATEGORY_FAILURE   = 'CREATE_CATEGORY_FAILURE';
export const FETCH_CATEGORY_REQUEST    = 'FETCH_CATEGORY_REQUEST';
export const FETCH_CATEGORY_SUCCESS    = 'FETCH_CATEGORY_SUCCESS';
export const FETCH_CATEGORY_FAILURE    = 'FETCH_CATEGORY_FAILURE';
export const GET_CATEGORY_REQUEST      = 'GET_CATEGORY_REQUEST';
export const GET_CATEGORY_SUCCESS      = 'GET_CATEGORY_SUCCESS';
export const GET_CATEGORY_FAILURE      = 'GET_CATEGORY_FAILURE';
export const GET_CATEGORY_NAME_REQUEST    = 'GET_CATEGORY_NAME_REQUEST';
export const GET_CATEGORY_NAME_SUCCESS    = 'GET_CATEGORY_NAME_SUCCESS';
export const GET_CATEGORY_NAME_FAILURE    = 'GET_CATEGORY_NAME_FAILURE';
export const UPDATE_CATEGORY_REQUEST   = 'UPDATE_CATEGORY_REQUEST';
export const UPDATE_CATEGORY_SUCCESS   = 'UPDATE_CATEGORY_SUCCESS';
export const UPDATE_CATEGORY_FAILURE   = 'UPDATE_CATEGORY_FAILURE';
export const DELETE_CATEGORY_REQUEST   = 'DELETE_CATEGORY_REQUEST';
export const DELETE_CATEGORY_SUCCESS   = 'DELETE_CATEGORY_SUCCESS';
export const DELETE_CATEGORY_FAILURE   = 'DELETE_CATEGORY_FAILURE';
export const STATUS_CATEGORY_REQUEST   = 'STATUS_CATEGORY_REQUEST';
export const STATUS_CATEGORY_SUCCESS   = 'STATUS_CATEGORY_SUCCESS';
export const STATUS_CATEGORY_FAILURE   = 'STATUS_CATEGORY_FAILURE';

function createCategoryInitial() {
  return {
    type: CREATE_CATEGORY_INITIAL,
    isFetching: false,
  };
}

function requestCreateCategory(category) {
  return {
    type: CREATE_CATEGORY_REQUEST,
    isFetching: true,
    category,
  };
}

function createCategorySuccess(category) {
  return {
    type: CREATE_CATEGORY_SUCCESS,
    isFetching: false,
    category,
  };
}

function createCategoryError(message) {
  return {
    type: CREATE_CATEGORY_FAILURE,
    isFetching: false,
    message,
  };
}

function requestGetCategory(category) {
  return {
    type: GET_CATEGORY_REQUEST,
    isFetching: true,
    category,
  };
}

function getCategorySuccess(category) {
 //console.log(category);
  return {
    type: GET_CATEGORY_SUCCESS,
    isFetching: false,
    category,
  };
}

function getCategoryError(message) {
  return {
    type: GET_CATEGORY_FAILURE,
    isFetching: false,
    message,
  };
}

function requestGetCategoryName(category) {
  return {
    type: GET_CATEGORY_NAME_REQUEST,
    isFetching: true,
    category,
  };
}

function getCategoryNameSuccess(category) {
 //console.log(category);
  return {
    type: GET_CATEGORY_NAME_SUCCESS,
    isFetching: false,
    category,
  };
}

function getCategoryNameError(message) {
  return {
    type: GET_CATEGORY_NAME_FAILURE,
    isFetching: false,
    message,
  };
}

function requestFetchCategory() {
  return {
    type: FETCH_CATEGORY_REQUEST,
    isFetching: true,
  };
}

function fetchCategorySuccess(category) {
  return {
    type: FETCH_CATEGORY_SUCCESS,
    isFetching: false,
    category,
  };
}

function fetchCategoryError(message) {
  return {
    type: FETCH_CATEGORY_FAILURE,
    isFetching: false,
    message,
  };
}

function requestUpdateCategory(category) {
  return {
    type: UPDATE_CATEGORY_REQUEST,
    isFetching: true,
    category,
  };
}

function updateCategorySuccess(category) {
  return {
    type: UPDATE_CATEGORY_SUCCESS,
    isFetching: false,
    category,
  };
}

function updateCategoryError(message) {
  return {
    type: UPDATE_CATEGORY_FAILURE,
    isFetching: false,
    message,
  };
}

function requestDeleteCategory() {
  return {
    type: DELETE_CATEGORY_REQUEST,
    isFetching: true,
  };
}

function deleteCategorySuccess(category) {
  return {
    type: DELETE_CATEGORY_SUCCESS,
    isFetching: false,
    deleteMessage:category.message,
    category,
  };
}

function deleteCategoryError(message) {
  return {
    type: DELETE_CATEGORY_FAILURE,
    isFetching: false,
    message,
  };
}

function requestStatusCategory() {
  return {
    type: STATUS_CATEGORY_REQUEST,
    isFetching: true,
  };
}

function statusCategorySuccess(category) {
  return {
    type: STATUS_CATEGORY_SUCCESS,
    isFetching: false,
    statusMessage:category.message,
    category,
  };
}

function statusCategoryError(message) {
  return {
    type: STATUS_CATEGORY_FAILURE,
    isFetching: false,
    message,
  };
}

export function createCategory(categoryData) {
  const formData = new FormData();
   //debugger   
  //Update the formData object
  
  formData.append("image", categoryData.image);
  formData.append("name", categoryData.name);
  formData.append("image_icon", categoryData.image_icon);
  formData.append("parent_id", categoryData.parent_id);
  const config = {
    method: 'post',
    headers: {
      Accept: 'application/json',
      //'Content-Type': 'application/x-www-form-urlencoded',
      //'Content-Type': 'multipart/form-data; boundary=<calculated when request is sent>',
      //'Access-Control-Allow-Origin': '*',
    },
    body: formData,
  };

  return dispatch => {
    // We dispatch requestCreatePost to kickoff the call to the API
    dispatch(requestCreateCategory(categoryData));
    
    return fetch('http://127.0.0.1:8000/api/v1/category/store', config)
      .then(response => response.json().then(category => ({ category, response })))
      .then(({ category, response }) => {
        if (!response.ok) {
          // If there was a problem, we want to
          // dispatch the error condition
          dispatch(createCategoryError(category.message));
          return Promise.reject(category);
        }
        // Dispatch the success action
        dispatch(createCategorySuccess(category));
        setTimeout(() => {
          dispatch(createCategoryInitial());
        }, 5000);
        return Promise.resolve(category);
      })
      .catch(err => console.error('Error: ', err));
    
  };
}

export function getCategory() {
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
    dispatch(requestGetCategory());
    
    return fetch('http://127.0.0.1:8000/api/v1/category', config)
      .then(response => response.json().then(category => ({ category, response })))
      .then(({ category, response }) => {
        if (!response.ok) {
          // If there was a problem, we want to
          // dispatch the error condition
          dispatch(getCategoryError(category.message));
          return Promise.reject(category);
        }
        // Dispatch the success action
        dispatch(getCategorySuccess(category));
       
        return Promise.resolve(category);
      })
      .catch(err => console.error('Error: ', err));
    
  };
}

export function updateCategory(categoryData) {
  const formData = new FormData(); 
  //Update the formData object
  formData.append("image", categoryData.image);
  formData.append("name", categoryData.name);
  formData.append("image_icon", categoryData.image_icon);
  formData.append("parent_id", categoryData.parent_id);
  const config = {
    method: 'post',
    headers: {
      Accept: 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
    body: formData,
  };

  return dispatch => {
    // We dispatch requestUpdatePost to kickoff the call to the API
    dispatch(requestUpdateCategory(categoryData));
    
    return fetch('http://127.0.0.1:8000/api/v1/category/'+categoryData.id+'/update', config)
      .then(response => response.json().then(category => ({ category, response })))
      .then(({ category, response }) => {
        if (!response.ok) {
          // If there was a problem, we want to
          // dispatch the error condition
          dispatch(updateCategoryError(category.message));
          return Promise.reject(category);
        }
        // Dispatch the success action
        dispatch(updateCategorySuccess(category));
       
        return Promise.resolve(category);
      })
      .catch(err => console.error('Error: ', err));
    
  };
}

export function fetchCategory(categoryId) {
  const config = {
    method: 'get',
    headers: {
      Accept: 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  };

  return dispatch => {
    // We dispatch requestFetchPost to kickoff the call to the API
    dispatch(requestFetchCategory(categoryId));
    
    return fetch('http://127.0.0.1:8000/api/v1/category/'+categoryId.categoryId+'/edit', config)
      .then(response => response.json().then(category => ({ category, response })))
      .then(({ category, response }) => {
        if (!response.ok) {
          // If there was a problem, we want to
          // dispatch the error condition
          dispatch(fetchCategoryError(category.message));
          return Promise.reject(category);
        }
        // Dispatch the success action
        dispatch(fetchCategorySuccess(category.data.category_info));
    
        return Promise.resolve(category);
      })
      .catch(err => console.error('Error: ', err));
    
  };
}

export function deleteCategory(categoryId) {
  const config = {
    method: 'delete',
    headers: {
      Accept: 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  };
  
  return dispatch => {
    // We dispatch requestDeletePost to kickoff the call to the API
    dispatch(requestDeleteCategory(categoryId));
    
    return fetch('http://127.0.0.1:8000/api/v1/category/'+categoryId.categoryId+'/delete', config)
      .then(response => response.json().then(category => ({ category, response })))
      .then(({ category, response }) => {
        if (!response.ok) {
          // If there was a problem, we want to
          // dispatch the error condition
          dispatch(deleteCategoryError(category.message));
          return Promise.reject(category);
        }
        // Dispatch the success action
        dispatch(deleteCategorySuccess(category));
    
        return Promise.resolve(category);
      })
      .catch(err => console.error('Error: ', err));
    
  };
}

export function statusCategory(categoryId) {
  const config = {
    method: 'put',
    headers: {
      Accept: 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  };

  return dispatch => {
    // We dispatch requestStatusPost to kickoff the call to the API
    dispatch(requestStatusCategory(categoryId));
    
    return fetch('http://127.0.0.1:8000/api/v1/category/'+categoryId.categoryId+'/status', config)
      .then(response => response.json().then(category => ({ category, response })))
      .then(({ category, response }) => {
        if (!response.ok) {
          // If there was a problem, we want to
          // dispatch the error condition
          dispatch(statusCategoryError(category.message));
          return Promise.reject(category);
        }
        // Dispatch the success action
        dispatch(statusCategorySuccess(category));
    
        return Promise.resolve(category);
      })
      .catch(err => console.error('Error: ', err));
    
  };
}

export function getCategoryName() {
  const config = {
    method: 'get',
    headers: {
      Accept: 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  };

  return dispatch => {
    // We dispatch requestCreatePost to kickoff the call to the API
    dispatch(requestGetCategoryName());
    
    return fetch('http://127.0.0.1:8000/api/v1/category/create', config)
      .then(response => response.json().then(category => ({ category, response })))
      .then(({ category, response }) => {
        if (!response.ok) {
          // If there was a problem, we want to
          // dispatch the error condition
          dispatch(getCategoryNameError(category.message));
          return Promise.reject(category);
        }
        // Dispatch the success action
        dispatch(getCategoryNameSuccess(category));
       
        return Promise.resolve(category);
      })
      .catch(err => console.error('Error: ', err));
    
  };
}
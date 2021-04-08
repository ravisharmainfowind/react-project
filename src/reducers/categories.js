import {
    CREATE_CATEGORY_INITIAL,
    CREATE_CATEGORY_REQUEST,
    CREATE_CATEGORY_SUCCESS,
    CREATE_CATEGORY_FAILURE,
    GET_CATEGORY_REQUEST,
    GET_CATEGORY_SUCCESS,
    GET_CATEGORY_FAILURE,
    GET_CATEGORY_NAME_REQUEST,
    GET_CATEGORY_NAME_SUCCESS,
    GET_CATEGORY_NAME_FAILURE,
    FETCH_CATEGORY_REQUEST,
    FETCH_CATEGORY_SUCCESS,
    FETCH_CATEGORY_FAILURE,
    UPDATE_CATEGORY_REQUEST,
    UPDATE_CATEGORY_SUCCESS,
    UPDATE_CATEGORY_FAILURE,
    DELETE_CATEGORY_REQUEST,
    DELETE_CATEGORY_SUCCESS,
    DELETE_CATEGORY_FAILURE,
    STATUS_CATEGORY_REQUEST,
    STATUS_CATEGORY_SUCCESS,
    STATUS_CATEGORY_FAILURE,
  } from '../actions/categories';
  
  export default function categories(
    state = {
      isFetching: false,
    },
    action,
  ) {
    switch (action.type) {
      case CREATE_CATEGORY_INITIAL:
        return Object.assign({}, state, {
          isFetching: false,
          message: null,
        });
      case CREATE_CATEGORY_REQUEST:
        return Object.assign({}, state, {
          isFetching: true,
        });
      case CREATE_CATEGORY_SUCCESS:
        return Object.assign({}, state, {
          isFetching: false,
          message: 'Category created successfully',
        });
      case CREATE_CATEGORY_FAILURE:
        return Object.assign({}, state, {
          isFetching: false,
          message:
            'Due to security reasons category creation is closed in demo version. Please setup locally to test',
        });
        case GET_CATEGORY_REQUEST:
        return Object.assign({}, state, {
          isFetching: true,
        });
      case GET_CATEGORY_SUCCESS:
        return Object.assign({}, state, {
          isFetching: false,
          //message: 'Category fetched successfully',
          category: action.category,
        });
      case GET_CATEGORY_FAILURE:
        return Object.assign({}, state, {
          isFetching: false,
          message:
            'Something went wrongh',
        });

        case GET_CATEGORY_NAME_REQUEST:
        return Object.assign({}, state, {
          isFetching: true,
        });
      case GET_CATEGORY_NAME_SUCCESS:
        return Object.assign({}, state, {
          isFetching: false,
          //message: 'Category fetched successfully',
          categoryName: action.category,
        });
      case GET_CATEGORY_NAME_FAILURE:
        return Object.assign({}, state, {
          isFetching: false,
          message:
            'Something went wrongh',
        });

      case FETCH_CATEGORY_REQUEST:
        return Object.assign({}, state, {
          isFetching: true,
        });
      case FETCH_CATEGORY_SUCCESS:
        return Object.assign({}, state, {
          isFetching: false,
          categoryEditData: action.category,
        });
      case FETCH_CATEGORY_FAILURE:
        return Object.assign({}, state, {
          isFetching: false,
          message: 'Something wrong happened. Please come back later',
        });
        case UPDATE_CATEGORY_REQUEST:
        return Object.assign({}, state, {
          isFetching: true,
        });
      case UPDATE_CATEGORY_SUCCESS:
        return Object.assign({}, state, {
          isFetching: false,
          message: 'Category Updated successfully',
        });
      case UPDATE_CATEGORY_FAILURE:
        return Object.assign({}, state, {
          isFetching: false,
          message:
            'Due to security reasons category creation is closed in demo version. Please setup locally to test',
        });
        case DELETE_CATEGORY_REQUEST:
        return Object.assign({}, state, {
          isFetching: true,
        });
      case DELETE_CATEGORY_SUCCESS:
        return Object.assign({}, state, {
          isFetching: false,
          category: action.category,
          deleteMessage:action.deleteMessage,
        });
      case DELETE_CATEGORY_FAILURE:
        return Object.assign({}, state, {
          isFetching: false,
          message: 'Something wrong happened. Please come back later',
        });
        case STATUS_CATEGORY_REQUEST:
        return Object.assign({}, state, {
          isFetching: true,
        });
      case STATUS_CATEGORY_SUCCESS:
        return Object.assign({}, state, {
          isFetching: false,
          category: action.category,
          statusMessage:action.statusMessage,
        });
      case STATUS_CATEGORY_FAILURE:
        return Object.assign({}, state, {
          isFetching: false,
          message: 'Something wrong happened. Please come back later',
        });
      default:
        return state;
    }
  }
  
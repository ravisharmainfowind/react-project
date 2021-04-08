import {
        POST_PRODUCTS_REQUEST,GET_PRODUCTS_SUCCESS,GET_PRODUCTS_FAILURE,
        POST_ADD_PRODUCT_REQUEST,GET_ADD_PRODUCT_SUCCESS,GET_ADD_PRODUCT_FAILURE,
        POST_DELETE_PRODUCT_REQUEST,GET_DELETE_PRODUCT_SUCCESS,GET_DELETE_PRODUCT_FAILURE,
        POST_CREATE_PRODUCT_REQUEST,GET_CREATE_PRODUCT_SUCCESS,GET_CREATE_PRODUCT_FAILURE,
        POST_STATUS_PRODUCT_REQUEST,GET_STATUS_PRODUCT_SUCCESS,GET_STATUS_PRODUCT_FAILURE
} from '../actions/type';
  export default function products(
    state = {
      isFetching: false,
    },
    action,
  ) {
    switch (action.type) {  
      case POST_PRODUCTS_REQUEST:
        return Object.assign({}, state, {
          isFetching: true,
        });
      case GET_PRODUCTS_SUCCESS:
        return Object.assign({}, state, {
            ...state,
          products: action.payload, 
          isFetching: false,
        });
      case GET_PRODUCTS_FAILURE:
        return Object.assign({}, state, {
          isFetching: false,
          message:
            'Due to security reasons PRODUCT creation is closed in demo version. Please setup locally to test',
        });
      case POST_DELETE_PRODUCT_REQUEST:
        return Object.assign({}, state, {
          isFetching: true,
        });
      case GET_DELETE_PRODUCT_SUCCESS:
        return Object.assign({}, state, {
          isFetching: false,
         
          deleteMessage:action.message,
        });
      case GET_DELETE_PRODUCT_FAILURE:
        return Object.assign({}, state, {
          isFetching: false,
          message: 'Something wrong happened. Please come back later',
        });
        case POST_STATUS_PRODUCT_REQUEST:
        return Object.assign({}, state, {
          isFetching: true,
        });
      case GET_STATUS_PRODUCT_SUCCESS:
        return Object.assign({}, state, {
          isFetching: false,
          statusMessage:action.message,
        });
      case GET_STATUS_PRODUCT_FAILURE:
        return Object.assign({}, state, {
          isFetching: false,
          message: 'Something wrong happened. Please come back later',
        });
        case POST_CREATE_PRODUCT_REQUEST:
        return Object.assign({}, state, {
          isFetching: true,
        });
      case GET_CREATE_PRODUCT_SUCCESS:
        return Object.assign({}, state, {
            ...state,
          categoryName: action.payload, 
          isFetching: false,
        });
      case GET_CREATE_PRODUCT_FAILURE:
        return Object.assign({}, state, {
          isFetching: false,
          message:
            'Due to security reasons PRODUCT creation is closed in demo version. Please setup locally to test',
        });
      default:
        return state;
    }
  }
  

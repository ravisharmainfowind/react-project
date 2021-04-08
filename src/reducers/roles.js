import {
    CREATE_ROLE_INITIAL,
    CREATE_ROLE_REQUEST,
    CREATE_ROLE_SUCCESS,
    CREATE_ROLE_FAILURE,
    GET_ROLE_REQUEST,
    GET_ROLE_SUCCESS,
    GET_ROLE_FAILURE,
    FETCH_ROLES_REQUEST,
    FETCH_ROLES_SUCCESS,
    FETCH_ROLES_FAILURE,
    UPDATE_ROLE_REQUEST,
    UPDATE_ROLE_SUCCESS,
    UPDATE_ROLE_FAILURE,
    DELETE_ROLES_REQUEST,
    DELETE_ROLES_SUCCESS,
    DELETE_ROLES_FAILURE,
    STATUS_ROLES_REQUEST,
    STATUS_ROLES_SUCCESS,
    STATUS_ROLES_FAILURE,
  } from '../actions/roles';
  
  export default function roles(
    state = {
      isFetching: false,
    },
    action,
  ) {
    switch (action.type) {
      case CREATE_ROLE_INITIAL:
        return Object.assign({}, state, {
          isFetching: false,
          message: null,
        });
      case CREATE_ROLE_REQUEST:
        return Object.assign({}, state, {
          isFetching: true,
        });
      case CREATE_ROLE_SUCCESS:
        return Object.assign({}, state, {
          isFetching: false,
          message: 'Role created successfully',
        });
      case CREATE_ROLE_FAILURE:
        return Object.assign({}, state, {
          isFetching: false,
          message:
            'Due to security reasons roles creation is closed in demo version. Please setup locally to test',
        });
        case GET_ROLE_REQUEST:
        return Object.assign({}, state, {
          isFetching: true,
        });
      case GET_ROLE_SUCCESS:
        return Object.assign({}, state, {
          isFetching: false,
          message: 'Role fetched successfully',
          roles: action.roles,
        });
      case GET_ROLE_FAILURE:
        return Object.assign({}, state, {
          isFetching: false,
          message:
            'Something went wrongh',
        });
      case FETCH_ROLES_REQUEST:
        return Object.assign({}, state, {
          isFetching: true,
        });
      case FETCH_ROLES_SUCCESS:
        return Object.assign({}, state, {
          isFetching: false,
          role: action.role,
        });
      case FETCH_ROLES_FAILURE:
        return Object.assign({}, state, {
          isFetching: false,
          message: 'Something wrong happened. Please come back later',
        });
        case UPDATE_ROLE_REQUEST:
        return Object.assign({}, state, {
          isFetching: true,
        });
      case UPDATE_ROLE_SUCCESS:
        return Object.assign({}, state, {
          isFetching: false,
          message: 'Role Updated successfully',
        });
      case UPDATE_ROLE_FAILURE:
        return Object.assign({}, state, {
          isFetching: false,
          message:
            'Due to security reasons roles creation is closed in demo version. Please setup locally to test',
        });
        case DELETE_ROLES_REQUEST:
        return Object.assign({}, state, {
          isFetching: true,
        });
      case DELETE_ROLES_SUCCESS:
        return Object.assign({}, state, {
          isFetching: false,
          role: action.role,
          deleteMessage:action.deleteMessage,
        });
      case DELETE_ROLES_FAILURE:
        return Object.assign({}, state, {
          isFetching: false,
          message: 'Something wrong happened. Please come back later',
        });
        case STATUS_ROLES_REQUEST:
        return Object.assign({}, state, {
          isFetching: true,
        });
      case STATUS_ROLES_SUCCESS:
        return Object.assign({}, state, {
          isFetching: false,
          role: action.role,
          statusMessage:action.statusMessage,
        });
      case STATUS_ROLES_FAILURE:
        return Object.assign({}, state, {
          isFetching: false,
          message: 'Something wrong happened. Please come back later',
        });
      default:
        return state;
    }
  }
  
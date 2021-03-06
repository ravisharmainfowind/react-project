import {
  LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT_SUCCESS,REGISTER_REQUEST,REGISTER_SUCCESS,REGISTER_FAILURE,
} from '../actions/user';

const token = localStorage.getItem('token');
export default function auth(state = {
  isFetching: false,
  isAuthenticated: !!token,
}, action) {
  switch (action.type) {
      case LOGIN_REQUEST:
          return Object.assign({}, state, {
              isFetching: true,
              isAuthenticated: false,
          });
      case LOGIN_SUCCESS:
          return Object.assign({}, state, {
              isFetching: false,
              isAuthenticated: true,
              errorMessage: '',
          });
      case LOGIN_FAILURE:
          return Object.assign({}, state, {
              isFetching: false,
              isAuthenticated: false,
              errorMessage: action.payload,
          });
          case REGISTER_REQUEST:
            return Object.assign({}, state, {
                isFailed: true,     
            });
        case REGISTER_SUCCESS:
            return Object.assign({}, state, {
                isFailed: false,
                errorMessage: '',
            });
        case REGISTER_FAILURE:
            return Object.assign({}, state, {
                isFetching: false,
                errorMessage: action.payload,
            });    
      case LOGOUT_SUCCESS:
          return Object.assign({}, state, {
              isAuthenticated: false,
          });
      default:
          return state;
  }
}

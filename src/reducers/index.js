import { combineReducers } from 'redux';
import auth from './auth';
import runtime from './runtime';
import navigation from './navigation';
import posts from './posts';
import roles from './roles';
import categories from './categories';
import products from './products';

export default combineReducers({
  auth,
  runtime,
  navigation,
  posts,
  roles,
  categories,
  products,
});

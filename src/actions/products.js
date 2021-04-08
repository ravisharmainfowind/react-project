import {POST_PRODUCTS_REQUEST,GET_PRODUCTS_SUCCESS,GET_PRODUCTS_FAILURE,
        POST_ADD_PRODUCT_REQUEST,GET_ADD_PRODUCT_SUCCESS,GET_ADD_PRODUCT_FAILURE,
        POST_DELETE_PRODUCT_REQUEST,GET_DELETE_PRODUCT_SUCCESS,GET_DELETE_PRODUCT_FAILURE,
        POST_CREATE_PRODUCT_REQUEST,GET_CREATE_PRODUCT_SUCCESS,GET_CREATE_PRODUCT_FAILURE,
        POST_STATUS_PRODUCT_REQUEST,GET_STATUS_PRODUCT_SUCCESS,GET_STATUS_PRODUCT_FAILURE
} from './type';
import { URL_ADD_PRODUCT,URL_PRODUCTS,URL_DELETE_PRODUCT,URL_STATUS_PRODUCT,URL_EDIT_PRODUCT,URL_UPDATE_PRODUCT,URL_CREATE_PRODUCT } from '../constants/index';
import { NotificationManager } from 'react-notifications';
import axios from 'axios';

// Get products actions.
export const getProducts = () => async dispatch => {
    try {
        dispatch({ type: POST_PRODUCTS_REQUEST, payload: true });
        const response = await axios.get(URL_PRODUCTS, {
            headers: { 'Content-Type': 'application/json' }
        });
        if (response.data.success === true) {
            dispatch({ type: GET_PRODUCTS_SUCCESS, payload: response.data.data });
        }
    } catch (error) {
        dispatch({ type: GET_PRODUCTS_FAILURE, payload: error });
    }
};

// Add product.
export const addProduct = (data) => async dispatch => {

    try {
        dispatch({ type: POST_ADD_PRODUCT_REQUEST, payload: true });
        const response = await axios.post(URL_ADD_PRODUCT, data, {
            headers: { 
                //'Content-Type': 'application/json',
                "Content-Type": "multipart/form-data",
                "Access-Control-Allow-Origin": "*",
                //'access-token': reactLocalStorage.get('access-token')
            }
        });
        if (response.data.success === true) {
            dispatch({ type: GET_ADD_PRODUCT_SUCCESS, payload: response.data.data });
            NotificationManager.success(response.data.message, 'Product Added.');
        } else {
            NotificationManager.error(response.data.message, 'Something was wrong.');
        }
    } catch (error) {
        dispatch({ type: GET_ADD_PRODUCT_FAILURE, payload: error });
    }
}


// delete product.
export const deleteProduct = (productId) => async dispatch => {
    try {
        dispatch({ type: POST_DELETE_PRODUCT_REQUEST, payload: true });
        const response = await axios.delete(URL_DELETE_PRODUCT+productId, {
            headers: { 
                'Content-Type': 'application/json',
            }
        });
        if (response.data.success === true) {
            dispatch({ type: GET_DELETE_PRODUCT_SUCCESS, payload: response.data.data });
            NotificationManager.success(response.data.message, 'Product Deleted.');
        } else {
            NotificationManager.error(response.data.message, 'Something was wrong.');
        }
    } catch (error) {
        dispatch({ type: GET_DELETE_PRODUCT_FAILURE, payload: error });
    }
}

// status product.
export const statusProduct = (productId) => async dispatch => {
    try {
        dispatch({ type: POST_STATUS_PRODUCT_REQUEST, payload: true });
        const response = await axios.put(URL_STATUS_PRODUCT+productId, {
            headers: { 
                'Content-Type': 'application/json',
            }
        });
        if (response.data.success === true) {
            dispatch({ type: GET_STATUS_PRODUCT_SUCCESS, payload: response.data.data });
            NotificationManager.success(response.data.message, 'Product Status Changed.');
        } else {
            NotificationManager.error(response.data.message, 'Something was wrong.');
        }
    } catch (error) {
        dispatch({ type: GET_STATUS_PRODUCT_FAILURE, payload: error });
    }
}


// Get category name actions.
export const getCategoryName = () => async dispatch => {
    try {
        dispatch({ type: POST_CREATE_PRODUCT_REQUEST, payload: true });
        const response = await axios.get(URL_CREATE_PRODUCT, {
            headers: { 'Content-Type': 'application/json' }
        });
        if (response.data.success === true) {
            dispatch({ type: GET_CREATE_PRODUCT_SUCCESS, payload: response.data.data.category_info });
        }
    } catch (error) {
        dispatch({ type: GET_CREATE_PRODUCT_FAILURE, payload: error });
    }
};
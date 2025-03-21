import axios from "axios";
import {
  PRODUCT_MACHINE_LIST_REQUEST,
  PRODUCT_MACHINE_LIST_SUCCESS,
  PRODUCT_MACHINE_LIST_FAIL,
  PRODUCT_MACHINE_DETAILS_REQUEST,
  PRODUCT_MACHINE_DETAILS_SUCCESS,
  PRODUCT_MACHINE_DETAILS_FAIL,
  MACHINE_DELETE_REQUEST,
  MACHINE_DELETE_SUCCESS,
  MACHINE_DELETE_FAIL,
  MACHINE_CREATE_REQUEST,
  MACHINE_CREATE_SUCCESS,
  MACHINE_CREATE_FAIL,
  MACHINE_UPDATE_REQUEST,
  MACHINE_UPDATE_SUCCESS,
  MACHINE_UPDATE_FAIL,
  MACHINE_UPDATE_RESET,
} from "./../constants/productConstants.js";

export const listLendMachineProducts = () => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_MACHINE_LIST_REQUEST });

    const { data } = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/lendMachines`
    );

    dispatch({
      type: PRODUCT_MACHINE_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_MACHINE_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listLendMachineProductsDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_MACHINE_DETAILS_REQUEST });

    const { data } = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/lendMachines/${id}`
    );

    dispatch({
      type: PRODUCT_MACHINE_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_MACHINE_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteLendMachineProduct = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: MACHINE_DELETE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(
      `${process.env.REACT_APP_API_URL}/api/lendMachines/${id}`,
      config
    );

    dispatch({
      type: MACHINE_DELETE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: MACHINE_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createLendMachine = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: MACHINE_CREATE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(
      `${process.env.REACT_APP_API_URL}/api/lendMachines`,
      {},
      config
    );

    dispatch({
      type: MACHINE_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: MACHINE_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateLendMachine = (machine) => async (dispatch, getState) => {
  try {
    dispatch({ type: MACHINE_UPDATE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(
      `${process.env.REACT_APP_API_URL}/api/lendMachines/${machine._id}`,
      machine,
      config
    );

    dispatch({
      type: MACHINE_UPDATE_SUCCESS,
      payload: data,
    });

    dispatch({ type: MACHINE_UPDATE_RESET });
  } catch (error) {
    dispatch({
      type: MACHINE_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

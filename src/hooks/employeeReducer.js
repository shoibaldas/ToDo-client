import { useEffect, useReducer } from "react";
import axios from "axios";

export const initialState = {
  employees: [],
  loading: true,
  error: null,
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_EMPLOYEES_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "FETCH_EMPLOYEES_SUCCESS":
      return {
        ...state,
        loading: false,
        employees: action.payload,
      };
    case "FETCH_EMPLOYEES_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

const fetchEmployees = async (dispatch) => {
  try {
    dispatch({ type: "FETCH_EMPLOYEES_REQUEST" });

    const response = await axios.get(
      "https://to-do-server-pi.vercel.app/employees"
    );
    dispatch({
      type: "FETCH_EMPLOYEES_SUCCESS",
      payload: response.data.data,
    });
  } catch (error) {
    dispatch({
      type: "FETCH_EMPLOYEES_FAILURE",
      payload: error.message,
    });
  }
};

const useEmployeeReducer = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    fetchEmployees(dispatch);
  }, []);

  return state;
};

export default useEmployeeReducer;

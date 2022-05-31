import { CLEAR_ERRORS, LOGIN_FAIL, LOGIN_REQUEST, LOGIN_SUCCESS, REGISTER_USER_FAIL, REGISTER_USER_REQUEST, REGISTER_USER_SUCCESS } from "../constans/UserConstant";





export const userReducer = (state = { user: {} }, action) => {
    switch (action.type) {
      case LOGIN_REQUEST: //user role check
      case REGISTER_USER_REQUEST:
        return {
          loading: true,
          isAuthenticated: false,
        };

      case LOGIN_SUCCESS:
      case REGISTER_USER_SUCCESS:
        return {
          ...state,
          loading: false,
          isAuthenticated: true,
          user: action.payload, //user data is coming here
        };
  
      case LOGIN_FAIL:
      case REGISTER_USER_FAIL:
        return {
          ...state,
          loading: false,
          isAuthenticated: false,
          user: null,
          error: action.payload,
        };
  
  
      case CLEAR_ERRORS:
        return {
          ...state,
          error: null,
        };
  
      default:
        return state;
    }
  };
  
  
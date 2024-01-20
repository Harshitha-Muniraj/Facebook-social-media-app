export const LoginStart = (userCredentials) => ({
    type: "LOGIN_START",
  });
  
  export const LoginSuccess = (user) => ({
    type: "LOGIN_SUCCESS",
    payload: user,
  });
  
  export const LoginFailure = () => ({
    type: "LOGIN_FAILURE",
  });
  
  export const Follow = (id) => ({
    type: "FOLLOW",
    payload: id,
  });
  
  export const Unfollow = (id) => ({
    type: "UNFOLLOW",
    payload: id,
  });
import axios from 'axios';
import Cookies from 'universal-cookie';

export const userLoginSuccess = payload => ({
  type: userLoginSuccess,
  payload
});

export const userLoginFailure = payload => ({
  type: userLoginFailure,
  payload
});

export const userRegisterSuccess = payload => ({
  type: userRegisterSuccess,
  payload
});

export const userRegisterFailure = payload => ({
  type: userRegisterFailure,
  payload
});

export const userAuthenticated = payload => ({
  type: userAuthenticated,
  payload
});



export const login = (data) => dispatch =>  {
    axios.post('http://localhost:4000/api/login',data)
    .then(res => {
      const { data } = res;
      if (res.status === 200) {
        return dispatch(userLoginSuccess(data));
       } 
     })
    .catch(err => {
      return dispatch(userLoginFailure(err));
    });
}

export const register = (data) => dispatch =>  {
    axios.post('http://localhost:4000/api/register',data)
    .then(res => {
      const { data } = res;
      if (res.status === 200) {
        return dispatch(userRegisterSuccess(data));
       } 
     })
    .catch(err => {
      return dispatch(userRegisterFailure(err));
    });
}


export const isAuthenticated = () => dispatch =>  {
     const cookies = new Cookies();
     if(cookies.get('listLoggin')){
       return true
     }
}

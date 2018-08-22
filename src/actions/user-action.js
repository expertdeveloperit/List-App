import axios from 'axios';

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
  console.log(data);
    axios.post('http://localhost:4000/api/register',data)
    .then(res => {
      const { data } = res;
      if (res.status === 200) {
        console.log('data', res)
        return dispatch(userRegisterSuccess(data));
       } 
     })
    .catch(err => {
      return dispatch(userRegisterFailure(err));
    });
}

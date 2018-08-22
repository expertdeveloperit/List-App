import axios from 'axios';
import Cookies from 'universal-cookie';

export const getListSuccess = payload => ({
  type: getListSuccess,
  payload
});

export const getListFailure = payload => ({
  type: getListFailure,
  payload
});
export const addListSuccess = payload => ({
  type: addListSuccess,
  payload
});

export const addListFailure = payload => ({
  type: addListFailure,
  payload
});
export const updateListSuccess = payload => ({
  type: updateListSuccess,
  payload
});

export const updateListFailure = payload => ({
  type: updateListFailure,
  payload
});
export const deleteListSuccess = payload => ({
  type: deleteListSuccess,
  payload
});

export const deleteListFailure = payload => ({
  type: deleteListFailure,
  payload
});

export const getSingleListSuccess = payload => ({
  type: getSingleListSuccess,
  payload
});

export const getSingleListFailure = payload => ({
  type: getSingleListFailure,
  payload
});


export const getLists = (token) => dispatch =>  {

    axios.get('http://localhost:4000/api/lists',{ headers: { Authorization: `Bearer ${token}` }})
    .then(res => {
      const { data } = res;
      if (res.status === 200) {
        return dispatch(getListSuccess(data.lists));
       } 
     })
    .catch(err => {
      return dispatch(getListFailure(err));
    });
}


export const getSingleList = (id) => dispatch =>  {

    const cookies = new Cookies();
    const token = cookies.get('listLoggin');
    if (token) {

    axios.get(`http://localhost:4000/api/lists/${id}`,{ headers: { Authorization: `Bearer ${token}` }})
    .then(res => {
      const { data } = res;
      if (res.status === 200) {
        return dispatch(getSingleListSuccess(data));
       } 
     })
    .catch(err => {
      return dispatch(getSingleListFailure(err));
    });
  }
}

export const addLists = (data, token) => dispatch =>  {
    axios.post('http://localhost:4000/api/lists',data,{ headers: { Authorization: `Bearer ${token}` }} )
    .then(res => {
      const { data } = res;
      if (res.status === 200) {
        return dispatch(addListSuccess(data));
       } 
     })
    .catch(err => {
      return dispatch(addListFailure(err));
    });
}


export const updateLists = (id,data) => dispatch =>  {
   const cookies = new Cookies();
    const token = cookies.get('listLoggin');
    if (token) {
    axios.put(`http://localhost:4000/api/lists/${id}`, data, { headers: { Authorization: `Bearer ${token}` }} )
    .then(res => {
      const { data } = res;
      if (res.status === 200) {
        return dispatch(updateListSuccess(data));
       } 
     })
    .catch(err => {
      return dispatch(updateListFailure(err));
    });
  }
}


export const deletetLists = (id, token) => dispatch =>  {
    axios.delete(`http://localhost:4000/api/lists/${id}`,{ headers: { Authorization: `Bearer ${token}` }})
    .then(res => {
      const { data } = res;
      if (res.status === 200) {
        return dispatch(deleteListSuccess(data.lists));
       } 
     })
    .catch(err => {
      return dispatch(deleteListFailure(err));
    });
}
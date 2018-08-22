import { 
	getListSuccess,
    getListFailure,
    addListSuccess,
	addListFailure,
	updateListSuccess,
	updateListFailure,
	deleteListSuccess,
	deleteListFailure,
	getSingleListSuccess,
	getSingleListFailure
  } from '../actions/list-action';

const initialState = {
	 lists:[],
	 fetched:false,
	 error:{},
	 list:{}
}
export default function ListReducer(state = initialState, {type,payload}) {
	switch(type){
	 case getListSuccess :
		return {
			...state,
			fetched:true,
			lists:payload
		}
	 case getListFailure :
		return {
			...state,
			fetched:false,
			error:payload
		}
     case addListSuccess :
		return {
			...state,
			fetched:true,
			list:payload
		}
	 case addListFailure :
		return {
			...state,
			fetched:false,
			error:payload
		}
	 case updateListSuccess :
		return {
			...state,
			fetched:true,
			list:payload
		}
	 case updateListFailure :
		return {
			...state,
			fetched:false,
			error:payload
		}
	 case deleteListSuccess :
		return {
			...state,
			fetched:true,
			lists:payload
		}
	 case deleteListFailure :
		return {
			...state,
			fetched:false,
			error:payload
		}
	 case getSingleListSuccess :
		return {
			...state,
			fetched:true,
			list:payload
		}
	 case getSingleListFailure :
		return {
			...state,
			fetched:false,
			error:payload
		}	
	 default :
	    return state;
    }
}
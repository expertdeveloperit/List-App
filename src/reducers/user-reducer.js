import { 
	userLoginSuccess,
	userLoginFailure,
	userRegisterSuccess,
	userRegisterFailure
} from '../actions/user-action';

const initialState = {
	 user:{},
	 fetched:false,
	 authenticated:false,
	 error:{}
}
export default function userReducer(state = initialState, {type,payload}) {
	switch(type){
	 case userLoginSuccess :
		return {
			...state,
			fetched:true,
			authenticated:true,
			user:payload
		}
	 case userLoginFailure :
		return {
			...state,
			fetched:false,
			error:payload
		}
     case userRegisterSuccess :
		return {
			...state,
			fetched:true,
			user:payload
		}
	 case userRegisterFailure :
		return {
			...state,
			fetched:false,
			error:payload
		}		
	 default :
	    return state;
    }
}
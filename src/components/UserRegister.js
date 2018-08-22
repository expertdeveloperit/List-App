import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
import {
  register
} from '../actions/user-action';

class UserRegister extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      error1: '',
      error2: '',
      message:"",
      err:""
    };

    this.handlePassChange = this.handlePassChange.bind(this);
    this.handleUserChange = this.handleUserChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(evt) {
    evt.preventDefault();

    console.log(this.props);

    if (!this.state.email) {
       return this.setState({ error1: 'Email is required' });
    }

    if (!this.state.password) {
      return  this.setState({ error2: 'Password is required' });
    } 

   const body = { 
      email:this.state.email,
      password:this.state.password,
      status:false
   };


   this.props.register(body)

  }

   componentWillReceiveProps(nextProps) {
     if (this.props !== nextProps) {          
         if(nextProps.user.fetched){
           this.setState({ message: nextProps.user.user.message })
           setTimeout(() => { this.props.history.push('/login') }, 1000 );

        } else {
           this.setState({ err: nextProps.user.error.response.data.message })
        }
    }
  }
  

  handleUserChange(evt) {
    this.setState({
      email: evt.target.value,
      error1:"",
      err:""
    });
  };

  handlePassChange(evt) {
    this.setState({
      password: evt.target.value,
      error2:"",
      err:''
    });
  }

  render() {
    return (
      <div className="container signup_wrapper wrapper">
       <h2 className="text-center">Register</h2>
        <form className='forms' onSubmit={this.handleSubmit}>
          { this.props.user.fetched ? <p className="res">{ this.state.message } </p> : <p className="err">{ this.state.err } </p> } 
          <div className="form-group">
          <label>Email</label>
          <input className="form-control" type="email" data-test="email" value={this.state.email} onChange={this.handleUserChange} />
          <p className="error">{ this.state.error1 }</p>
          </div>
          <div className="form-group">
            <label>Password</label>
          <input  className="form-control" type="password" data-test="password" value={this.state.password} onChange={this.handlePassChange} />
           <p className="error">{ this.state.error2 }</p>
          </div>
          <button type="submit" className="btn btn-success">Register</button>
        </form>
         <p> Already Have an Account <Link to="/login"> Login </Link></p>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    user:state.user
  }
};

const mapDispatchToProps = {
  register
}

export default connect(mapStateToProps,mapDispatchToProps)(UserRegister);

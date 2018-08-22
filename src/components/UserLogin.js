import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
import {
  login
} from '../actions/user-action';
import Cookies from 'universal-cookie';

class UserLogin extends Component {

   constructor() {
    super();
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

    if (!this.state.email) {
       return this.setState({ error1: 'Email is required' });
    }

    if (!this.state.password) {
       return this.setState({ error2: 'Password is required' });
    }

   const body = { 
      email:this.state.email,
      password:this.state.password
   };


   this.props.login(body)

  }

   componentWillReceiveProps(nextProps) {
     if (this.props !== nextProps) {          
        if(nextProps.user.fetched){
           const cookies = new Cookies();
           cookies.set('listLoggin', nextProps.user.user.token, { path: '/' });
           this.setState({ message: nextProps.user.user.message })
           setTimeout(() => { this.props.history.push('/') }, 1000 );
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
      <div className="container signup_wrapper ">
       <h2 className="text-center">Login</h2>
        <form className='forms'  onSubmit={this.handleSubmit}>
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
          <button type="submit" className="btn btn-success">Login</button>
        </form>
         <p> Don't Have an Account <Link to="/register"> Register </Link></p>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  user:state.user
});

const mapDispatchToProps = {
  login
}

export default connect(mapStateToProps,mapDispatchToProps)(UserLogin);

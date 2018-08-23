import React, { Component } from 'react';  
import { connect } from 'react-redux';  
import { isAuthenticated } from './actions/user-action';

export default function (ComposedComponent) {  
  class Authenticate extends Component {

  componentWillMount() {
    if(!this.props.isAuthenticated()){
      this.props.history.push('/login')
    }
  }

  render() {
      return (
        <ComposedComponent {...this.props} />
      );
    }
  }

  const mapStateToProps = (state) => {
    return {
        user:state.user
    };
  };
  
  const mapDispatchToProps = {
    isAuthenticated
  };
  
 
  return connect(mapStateToProps, mapDispatchToProps)(Authenticate);
}
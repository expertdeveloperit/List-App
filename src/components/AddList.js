import React, { Component } from 'react';
import {connect} from 'react-redux';
import {
  addLists
} from '../actions/list-action';
import Cookies from 'universal-cookie';
import { Redirect } from 'react-router-dom';

class AddList extends Component {

  constructor() {
    super();
    this.state = {
      title: '',
      description: '',
      error1: '',
      error2: '',
      token:'',
      status:false,
      message:"",
      err:""
    };

    this.handlePassChange = this.handlePassChange.bind(this);
    this.handleUserChange = this.handleUserChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const cookies = new Cookies();
        const token = cookies.get('listLoggin');
        if (token) {
          this.setState({
            token
          });
        }
  }


  handleClick(){
    this.props.history.push('/')
  }

  handleSubmit(evt) {
    evt.preventDefault();

    if (!this.state.title) {
      return this.setState({ error1: 'Title is required' });
    }

    if (!this.state.description) {
      return this.setState({ error2: 'Description is required' });
    }

    this.setState({ error1: '' , error2: '' });

   const body = { 
      title:this.state.title,
      description:this.state.description
   };

   this.props.addLists(body,this.state.token)
    if(this.props.lists.fetched){
      setTimeout(() => { this.props.history.push('/') }, 1000 );
    }

  }
  
   componentWillReceiveProps(nextProps) {
     if (this.props !== nextProps) {
             this.setState({
               status: nextProps.lists.list.status,
               message:nextProps.lists.list.message
          });
    }
  }

  handleUserChange(evt) {
    this.setState({
      title: evt.target.value,
      error1:"",
      err:''
    });
  };

  handlePassChange(evt) {
    this.setState({
      description: evt.target.value,
      error2:"",
      err:'',
    });
  }

  render() { 

     const cookies = new Cookies();
    if(!cookies.get('listLoggin')){
      return <Redirect to='/login'/>
    }
   

    return (
      <div className="container edit_wrapper">
       <h2 className="text-center"> Add List Item</h2>
        <form  onSubmit={this.handleSubmit}>
        { this.state.status ? <p className="res">{ this.state.message } </p> : <p className="err">{ this.state.err } </p> } 
          <div className="form-group">
          <label>Tilte</label>
          <input className="form-control" type="text" data-test="title" value={this.state.title} onChange={this.handleUserChange} />
          <p className="error">{ this.state.error1 }</p>
          </div>
          <div className="form-group">
            <label>Description</label>
          <input  className="form-control" type="text" data-test="description" value={this.state.description} onChange={this.handlePassChange} />
           <p className="error">{ this.state.error2 }</p>
          </div>
          <button type="submit" className="btn btn-primary">Add Item</button>
           <button  onClick={this.handleClick.bind(this) }className="btn btn-success">Back</button>
        </form>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return{
    lists:state.lists
  }
};

const mapDispatchToProps = {
  addLists
}

export default connect(mapStateToProps,mapDispatchToProps)(AddList);

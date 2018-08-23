import React, { Component } from 'react';
import {connect} from 'react-redux';
import {
  getSingleList,
  updateLists
} from '../actions/list-action';
import Cookies from 'universal-cookie';

  const isEmpty = (obj) => {
    for(var key in obj) {
       if(obj.hasOwnProperty(key))
           return false;
    }
     return true;
   }

class EditList extends Component {

  constructor() {
    super();
    this.state = {
      title: '',
      description: '',
      error1: '',
      error2: '',
      status:false,
      id:"",
      token:'',
      message:"",
      err:""
    };

    this.handlePassChange = this.handlePassChange.bind(this);
    this.handleUserChange = this.handleUserChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    let id = this.props.match.params.id
    const cookies = new Cookies();
        const token = cookies.get('listLoggin');
        if (token) {
          this.setState({
            token,
            id
          });
        }
    this.props.getSingleList(id,token)
  }


   componentWillReceiveProps(nextProps) {
     if (this.props !== nextProps) {
        if(!isEmpty(nextProps.lists.list)){
             this.setState({
              title:nextProps.lists.list.data.title,
              description:nextProps.lists.list.data.description,
              message:nextProps.lists.list.message
          });
        }
    }
  }

  handleSubmit(evt) {
    evt.preventDefault();

    if (!this.state.title) {
      return this.setState({ error1: 'Title is required' });
    }

    if (!this.state.description) {
      return this.setState({ error2: 'Description is required' });
    }

     const body = { 
      title:this.state.title,
      description:this.state.description
   };

   this.props.updateLists(this.state.id,body,this.state.token )
   setTimeout(() => { this.props.history.push('/') }, 1000 );

  }
  
  handleClick(){
    this.props.history.push('/')
  }

  handleUserChange(evt) {
    this.setState({
      title: evt.target.value,
      error1:"",
      err:""
    });
  };

  handlePassChange(evt) {
    this.setState({
      description: evt.target.value,
      error2:"",
      err:''
    });
  }

  render() {
    return (
      <div className="container edit_wrapper">
       <h2 className="text-center">Update List Item</h2>
        <form  onSubmit={this.handleSubmit}>
           { this.props.lists.list.status ? <p className="res">{ this.state.message } </p> : <p className="err">{ this.state.err } </p> } 
          <div className="form-group">
          <label>Title</label>
          <input className="form-control" type="text" data-test="title" value={this.state.title} onChange={this.handleUserChange} />
          <p className="error">{ this.state.error1 }</p>
          </div>
          <div className="form-group">
            <label>Description</label>
          <input  className="form-control" type="text" data-test="description" value={this.state.description} onChange={this.handlePassChange} />
           <p className="error">{ this.state.error2 }</p>
          </div>
          <button type="submit" className="btn btn-warning">Update</button>
          <button  onClick={this.handleClick.bind(this) }className="btn btn-primary">Cancel</button>
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
  getSingleList,
  updateLists
}

export default connect(mapStateToProps,mapDispatchToProps)(EditList);

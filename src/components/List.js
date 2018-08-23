import React, { Component } from 'react';
import {connect} from 'react-redux';
import {
  getLists,
  deletetLists
} from '../actions/list-action';
import Cookies from 'universal-cookie';
import { Link } from 'react-router-dom';

class List extends Component {

  constructor() {
    super();

    this.state = {
      lists:[],
      token:'',
      status:false
    }

    this.handleLogout = this.handleLogout.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
     
  }
 
  componentDidMount() {
     const cookies = new Cookies();
        const token = cookies.get('listLoggin');
        if (token) {
          this.setState({token});
          this.props.getLists(token);
        }
  }

  componentWillReceiveProps(nextProps) {
     if (this.props !== nextProps) {
          this.setState({
              status:nextProps.lists.lists.status,
              lists:nextProps.lists.lists
          });
    }
  }
  handleLogout(){
     const cookies = new Cookies();
     cookies.remove('listLoggin',{ path: '/' });
      this.props.history.push('/login')
  }

  handleAdd(){
     this.props.history.push('/lists')
  }

  handleDelete(id) {
 
    var r = window.confirm("Really want to delete!");
    if (r === true) {
         this.props.deletetLists(id, this.state.token)
       }
  }

  render() {
   
    if( this.state.lists.length ) {
      var lists = this.state.lists.map((list,i) => {
           return (
              <div key={i} className="col-sm-3 list" >
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">{ list.title }</h5>
                    <p className="card-text">{ list.description }</p>
                    <Link to={`/lists/${list._id}`}> <button className="btn btn-success"><i className="fa fa-pencil" aria-hidden="true"></i> Edit </button></Link>
                    <button onClick={this.handleDelete.bind(this,list._id)} className="btn btn-danger"><i className="fa fa-trash" aria-hidden="true"></i> Delete</button>
                  </div>
                </div>
              </div>
            );
      });
    }
    return (
      <div className="container">
       <h1 className="text-center head">List Items</h1>
       <div className="text-right">
       <button onClick={this.handleAdd} className="btn btn-primary">  <i className="fa fa-plus-circle" aria-hidden="true"></i> Add Item </button>
        <button onClick={this.handleLogout} className="btn btn-success"><i className="fa fa-sign-out" aria-hidden="true"></i>  Logout</button>
        </div>
          <div className="row">
            { this.state.lists.length   
               ? lists
               : 
              <div> 
                 <p className="text-center"> No data found</p>
                 
              </div>
            }
         </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  lists:state.lists
});

const mapDispatchToProps = {
  getLists,
  deletetLists
}

export default connect(mapStateToProps,mapDispatchToProps)(List);

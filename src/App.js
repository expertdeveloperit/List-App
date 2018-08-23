import React, { Component } from 'react';
import './App.css';
import List from './components/List';
import AddList from './components/AddList';
import EditList from './components/EditList';
import UserLogin  from './components/UserLogin';
import UserRegister from './components/UserRegister';
import NotFound from './components/NotFound';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import RequireAuth from './RequireAuth';
import store from './store';

class App extends Component {
 render() {
  return (
    <Provider store={store}>
    <BrowserRouter>
     <Switch>
      <Route path='/login' component={ UserLogin } exact={true} />
      <Route path='/' component={RequireAuth(List)} exact={true} />
      <Route path='/register' component={ UserRegister } />
      <Route path='/lists/:id' component={ RequireAuth(EditList)}/>
      <Route path='/lists' component={ RequireAuth(AddList) } />  
      <Route  component={ NotFound }/>
     </Switch>
    </BrowserRouter>
    </Provider>
   );
 }
}


export default App;



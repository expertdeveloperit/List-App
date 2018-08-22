import React, { Component } from 'react';
import './App.css';
import List from './components/List';
import AddList from './components/AddList';
import EditList from './components/EditList';
import Cookies from 'universal-cookie';
import UserLogin  from './components/UserLogin';
import UserRegister from './components/UserRegister';
import NotFound from './components/NotFound';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import store from './store';

class App extends Component {
 render() {
   const cookies = new Cookies();
   if(!cookies.get('listLoggin')){
     <Redirect to='/login' />
   }
  return (
    <Provider store={store}>
    <BrowserRouter>
    <div>
     <Switch>
      <Route path='/login' component={ UserLogin } exact={true} />
      <Route path='/' component={List} exact={true} />
      <Route path='/register' component={ UserRegister } />
      <Route path='/lists/:id' component={ EditList}/>
      <Route path='/lists' component={AddList } />  
      <Route  component={ NotFound }/>
     </Switch>
     </div>
    </BrowserRouter>
    </Provider>
   );
 }
}


export default App;



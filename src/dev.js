import React from 'react';
import ReactDOM from 'react-dom';
import { AppHeader } from './index';
import { Router, Route } from 'react-router'

//Redux
import {DevTools, store, history} from './redux-setup.js';
import { Provider } from 'react-redux';
import { auth } from 'react-redux-auth0/lib/constants'
import { createAction as act } from 'redux-actions'


class Test extends React.Component {
  render(){
    let routes = [
      {path: '/foo', text: 'Foo'},
      {path: '/bar', navItemComponent: <NavItemComponent icon='http://placekitten.com/50/50' /> }
    ]
    return <div>
      <AppHeader routes={routes}/>
      {this.props.children}
    </div>
  }
}

class NavItemComponent extends React.Component {
  render (){
    let { icon } = this.props;
    return <img src={icon} />
  }
}

class Foo extends React.Component {
  render(){
    return <div>Foo route</div>
  }
}

class Bar extends React.Component {
  render(){
    return <div>Bar route</div>
  }
}

ReactDOM.render(
  <Provider store={store}>
    <div>

      <Router history={history}>
        <Route path="/" component={Test} onEnter={()=>{ store.dispatch(act(auth.check)()) }}>
          <Route path="/foo" component={Foo} />
          <Route path="/bar" component={Bar} />
        </Route>
      </Router>
      <DevTools />
    </div>
  </Provider>
  , document.getElementById('root')
);

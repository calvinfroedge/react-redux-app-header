import React from 'react';
import ReactDOM from 'react-dom';
import { AppHeader } from './index';
import { Router, Route } from 'react-router'
import { Nav, Navbar, NavItem, MenuItem, NavDropdown } from 'react-bootstrap'
import FontAwesome from 'react-fontawesome'

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
      <AppHeader routes={routes} addtlComponent={<HeaderNav />} />
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

class HeaderNav extends React.Component {
  render(){
    return (
      <Nav pullRight>
        <NavItem href="#"><FontAwesome name="question-circle" size="2x" /></NavItem>
        <NavItem href="#"><FontAwesome name="cog" size="2x" /></NavItem>
      </Nav>
    )
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

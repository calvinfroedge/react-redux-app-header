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
    return <div>
      <AppHeader routes={[{path: '/foo', text: 'Foo'}]}/>
      {this.props.children}
    </div>
  }
}

class Foo extends React.Component {
  render(){
    return <div>Foo route</div>
  }
}

ReactDOM.render(
  <Provider store={store}>
    <div>

      <Router history={history}>
        <Route path="/" component={Test} onEnter={()=>{ store.dispatch(act(auth.check)()) }}>
          <Route path="/foo" component={Foo} />
        </Route>
      </Router>
      <DevTools />
    </div>
  </Provider>
  , document.getElementById('root')
);

import React from 'react'

//Redux DevTools
import { createDevTools } from 'redux-devtools'
import LogMonitor from 'redux-devtools-log-monitor'
import DockMonitor from 'redux-devtools-dock-monitor'

//React-Router
import { browserHistory } from 'react-router'
import { syncHistoryWithStore, routerReducer, routerMiddleware } from 'react-router-redux'

//Redux
import { applyMiddleware, compose, createStore, combineReducers } from 'redux'

//Reducers
import { AuthReducer, AuthMiddleware } from 'react-redux-auth0'

//Set up Redux Middleware
const reducer = combineReducers({
  auth: AuthReducer,
  routing: routerReducer
})

//Set up Dev Tools
const DevTools = createDevTools(
  <DockMonitor toggleVisibilityKey="ctrl-h"
               changePositionKey="ctrl-q">
    <LogMonitor theme="tomorrow" preserveScrollTop={false} />
  </DockMonitor>
)

//Create the store
let middlewareToApply = applyMiddleware(AuthMiddleware, routerMiddleware(browserHistory))
const finalCreateStore = compose(
  middlewareToApply,
  DevTools.instrument()
)(createStore)

const store = finalCreateStore(reducer)
const history = syncHistoryWithStore(browserHistory, store)

//Exports
export default store;
export {DevTools, store, history}


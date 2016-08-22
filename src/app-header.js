import React from 'react'
import { connect } from 'react-redux'
import { Link, browserHistory } from 'react-router'
import { push } from 'react-router-redux'
import { Navbar, NavDropdown, Nav as Navigation } from 'react-bootstrap'
import { AuthComponents } from 'react-redux-auth0'
const { Logout, LoginSignup } = AuthComponents;

class NavItem extends React.Component {
  render(){
    let {to, navItemComponent, key, text, routing, dispatch} = this.props;
    let path = routing.location ? routing.location.pathname : routing.locationBeforeTransitions.pathname;
    let pathMatch = function(match){
      return (path == `/${match}`) || (path.indexOf(match) == 1);
    }
    const active = 'active';

    return (
      <li className={pathMatch(to) ? active : ''} role="presentation" key={key}>
        <Link href="#" to={to}>{navItemComponent}{text}</Link>
      </li>
    );
  }
}

export default class AppHeader extends React.Component {
  constructor(props){
    super(props);
  }

  render() {
    let { props } = this;
    let { routing, auth, dispatch, routes, addtlComponent, signup } = props;

    const authenticated = auth.token;

    const notAuth = <div className="auth-login-signup">
      <LoginSignup login /> {props.signup && or <LoginSignup signup />}
    </div>

    return (
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to={props.brandLink}>
              { props.appTitle }
            </Link>
          </Navbar.Brand>

          {authenticated && <Navbar.Toggle />}

          {authenticated && <Logout />}

          {!authenticated && notAuth}

          {this.props.children}
        </Navbar.Header>
        { addtlComponent }
        {
          authenticated &&
          <Navbar.Collapse>
            <Navigation id="nav-primary">
              {Object.keys(routes).map((key)=>{
                let route = routes[key];
                let args = {routing, dispatch, to: route.path, text: route.text, key, navItemComponent: route.navItemComponent};
                return <NavItem {...args} />
              })}
            </Navigation>
          </Navbar.Collapse>
        }
      </Navbar>
    );
  }
}

AppHeader.defaultProps = {
  brandLink: '/',
  appTitle: 'app',
  routes: {},
  signup: true
}

export default connect((state)=>{
  const { auth, routing } = state;
  return { auth, routing };
})(AppHeader);

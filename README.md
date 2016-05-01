# Motivation

A generic boostrap header with brand link, nav links and auth logout built in. Intended for use with `react-redux-router` and `react-redux-auth0`.

Run with your Auth0 credentials to see the login / signup / logout stuff working. You will see app routes after login.

```
AUTH0_CLIENTID=client-id AUTH0_DOMAIN=client-domain npm run development
```

## Customizing

- You can pass `appTitle` to customize the app name that shows.
- `brandLink` updates the link for `appTitle`
- `routes` is a list of routes that will be used to build the nav, formatted such as `[{path: '/foo', text: 'Foo'}]`

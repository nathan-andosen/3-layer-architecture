import * as React from "react";
import { hot } from "react-hot-loader";
import {
  Route,
  Redirect
} from "react-router-dom";

import { UserService } from '@app-domain/services/user';
import { DI } from '@thenja/di';



// class AuthenticatedRoute extends React.Component<{
//   [key: string]: any
// }, undefined> {
class AuthenticatedRoute extends Route {
  @DI.Inject(UserService)
  userSrv: UserService;

  // props;

  private children;
  private rest;

  // constructor({ children, ...rest }) {
  // constructor({children, ...rest}) {
  constructor(params: any) {
    console.log('111111111111', params);
    
    super(params);
    this.children = {...params}.children;
    this.rest = {...params};// rest;
    delete this.rest.children;
    console.log('children', this.children);
    console.log('rest', this.rest);
    console.log('222222', this.userSrv.userIsSignedIn());
  }

  public render() {
    return (
      <Route
      {...this.rest}
      render={({ location }) =>
        this.userSrv.userIsSignedIn() ? (
          this.children
        ) : (
          <Redirect
            to={{
              pathname: "/signin",
              state: { from: location }
            }}
          />
        )
      }
    />
    );
  }
}

declare let module: object;

export default hot(module)(AuthenticatedRoute as any);
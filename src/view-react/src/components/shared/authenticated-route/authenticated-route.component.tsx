import * as React from "react";
import { hot } from "react-hot-loader";
import { Route, Redirect } from "react-router-dom";

import { UserService } from '@app-domain/services/user';
import { DI } from '@thenja/di';


/**
 * Route that only loads if the user is signed in
 *
 * @class AuthenticatedRoute
 * @extends {Route}
 */
class AuthenticatedRoute extends Route {
  @DI.Inject(UserService)
  userSrv: UserService;

  // children refers to the child components of the route
  private children;
  private otherAttributes;

  /**
   * Creates an instance of AuthenticatedRoute.
   * 
   * @param {*} params
   * @memberof AuthenticatedRoute
   */
  constructor(params: any) {
    super(params);
    const {children, ...otherAttrs} = params;
    this.children = children;
    this.otherAttributes = otherAttrs;
  }


  /**
   * Render the route or redirect to signin page
   *
   * @returns
   * @memberof AuthenticatedRoute
   */
  public render() {
    return (
      <Route
      {...this.otherAttributes}
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

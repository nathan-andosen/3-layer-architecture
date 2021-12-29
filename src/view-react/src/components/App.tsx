import * as React from "react";
import { hot } from "react-hot-loader";
import "./../assets/scss/App.scss";
import {
  HashRouter as Router,
  Switch,
  Route,
  Link,
  withRouter
} from "react-router-dom";

import { UserModel } from '@app-domain/models/user';
import { UserService } from '@app-domain/services/user';
import { DI } from '@thenja/di';

import HomeComponent from "./features/home/home.component";
import SignInComponent from  "./features/sign-in/sign-in.component";
import AuthenticatedRoute from './shared/authenticated-route/authenticated-route.component';


class App extends React.Component<{}, undefined> {
  user: UserModel;

  @DI.Inject(UserService)
  userSrv: UserService;

  constructor(props: any) {
    super(props);

    this.user = this.userSrv.createUser({
      id: '123',
      username: 'clark-kent'
    });
  }


  public render() {
    return (
      <Router>
        <AuthenticatedRoute exact path="/">
          <HomeComponent />
        </AuthenticatedRoute>
        <Route path="/signin">
          <SignInComponent />
        </Route>
      </Router>
    );
  }
}

declare let module: object;

export default hot(module)(App);

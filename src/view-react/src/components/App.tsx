import * as React from "react";
import { hot } from "react-hot-loader";
import "./../assets/scss/App.scss";
import {
  HashRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import { UserModel } from '@app-domain/models/user';
import { UserService } from '@app-domain/services/user';
import { DI } from '@thenja/di';

import HomeComponent from "./features/home/home.component";
import SignInComponent from  "./features/sign-in/sign-in.component";
import AuthenticatedRoute from './shared/private-route/private-route.component';


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
      <div className="app">
        <h1>Hello World!</h1>
        <p>Username: { this.user.state.username }</p>
        <div>
          <input type="text" 
            value={ this.user?.state?.username }
            onChange={ (event) => { 
              this.user?.updateUsername(event.target.value);
              this.forceUpdate();
            }} />
        </div>

        <Router>
          <AuthenticatedRoute exact path="/">
            <HomeComponent />
          </AuthenticatedRoute>
          <Route path="/signin">
            <SignInComponent />
          </Route>
        </Router>

      </div>
    );
  }
}

declare let module: object;

export default hot(module)(App);

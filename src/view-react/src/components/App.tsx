import * as React from "react";
import { hot } from "react-hot-loader";
import "./../assets/scss/App.scss";
import {
  HashRouter as Router,
  Route
} from "react-router-dom";

import { UserService } from '@app-domain/services/user';
import { DI } from '@thenja/di';

import { HomeComponent } from "./features/home/home.component";
import { SignInComponent } from './features/sign-in/sign-in.component';
import {
  AuthenticatedRoute
} from './shared/authenticated-route/authenticated-route.component';

// import our ui5 components
import "@ui5/webcomponents-icons/dist/add";
import "@ui5/webcomponents/dist/Button";
import "@ui5/webcomponents/dist/Input";
import "@ui5/webcomponents/dist/Label";
import "@ui5/webcomponents/dist/List";
import "@ui5/webcomponents/dist/StandardListItem";
import "@ui5/webcomponents/dist/MessageStrip";

class App extends React.Component<{}, undefined> {
  @DI.Inject(UserService)
  userSrv: UserService;

  private appHasInitialized = false;

  constructor(props: any) {
    super(props);

    this.initilizeApp();
  }


  async initilizeApp() {
    await this.userSrv.checkUserHasSession();
    this.appHasInitialized = true;
    this.forceUpdate();
  }


  public render() {
    if (this.appHasInitialized) {
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
    } else {
      return (<p>Loading app...</p>);
    }
  }
}

declare let module: object;

export default hot(module)(App);

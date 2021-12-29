import * as React from "react";
import { hot } from "react-hot-loader";
import { RouteComponentProps, withRouter } from 'react-router-dom';
import "./home.component.scss";

import { DI } from '@thenja/di';
import { UserService } from '@app-domain/services/user';


interface IProps extends RouteComponentProps {

}

class HomeComponent extends React.Component<IProps, undefined> {
  @DI.Inject(UserService)
  private userSrv: UserService;


  constructor(props: any) {
    super(props);

  }

  async signout() {
    await this.userSrv.signOut();
    this.props.history.push({
      pathname: '/signin'
    });
  }

  public render() {
    return (
      <div className="Home-component">
        <header>
          <h1>Christmas wish list</h1>
          <ui5-button onClick={(event) => this.signout()}>Sign out</ui5-button>
        </header>
        
      </div>
    );
  }
}

declare let module: object;
const HomeComponentHot = hot(module)(withRouter(HomeComponent));
export { HomeComponentHot as HomeComponent }

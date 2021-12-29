import * as React from "react";
import { hot } from "react-hot-loader";
import { RouteComponentProps, withRouter } from 'react-router-dom';
// import "./../assets/scss/App.scss";

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
        <p>Home component</p>
        <button onClick={(event) => this.signout()}>Signout</button>
      </div>
    );
  }
}

declare let module: object;
const HomeComponentWithRouter = withRouter(HomeComponent);
export default hot(module)(HomeComponentWithRouter);

import * as React from "react";
import { hot } from "react-hot-loader";
import { RouteComponentProps, withRouter } from 'react-router-dom';
// import "./../assets/scss/App.scss";

import { DI } from '@thenja/di';
import { UserService } from '@app-domain/services/user';
import { extractErrorMessage } from '@app-services/utils';

interface IState {
  username: string;
  password: string;
  signinErrorMsg: string;
};

interface IProps extends RouteComponentProps {

}

class SignInComponent extends React.Component<IProps, IState> {
  @DI.Inject(UserService)
  private userSrv: UserService;

  constructor(props: RouteComponentProps<{}>) {
    super(props);
    console.log('1111111', props);
    this.state = {
      username: 'admin',
      password: 'admin',
      signinErrorMsg: ''
    };

    if (this.userSrv.userIsSignedIn()) {
      this.redirectToHomePage();
    }
  }

  private redirectToHomePage() {
    this.props.history.push({
      pathname: '/'
    });
  }


  async handleSubmit(event) {
    console.log('Submit form...', this.state);
    this.setState({signinErrorMsg: ''});
    if (this.state.username && this.state.password) {
      try {
        await this.userSrv.signIn(this.state.username, this.state.password);
        // todo - navigate to home page
        console.log('222222', this.props);
        this.redirectToHomePage();
      } catch(err) {
        this.setState({
          signinErrorMsg: extractErrorMessage(err)
        });
      }
    } else {
      alert('Please enter a username and password');
    }
  }



  public render() {
    return (
      <div className="sign-in-component">
        <p>Sign in component</p>
        <form onSubmit={(event) => this.handleSubmit(event)}>
          <h3>Sign in</h3>
          <p style={{ fontStyle: 'italic', color: 'gray' }}>
            Enter admin / admin to sign in
          </p>
          <div>
            <label>
              Username:
              <input type="text" 
              value={this.state.username}
              onChange={(event) => {
                this.setState({username: event.target.value});
              }} />
            </label>
          </div>
          <div>
            <label>
              Password:
              <input type="password" 
              value={this.state.password}
              onChange={(event) => {
                this.setState({password: event.target.value});
              }} />
            </label>
          </div>
          <button type="submit">Signin</button>
        </form>
        { this.state.signinErrorMsg &&
          <p>{this.state.signinErrorMsg}</p>
        }
      </div>
    );
  }
}

declare let module: object;
const SignInComponentHot = hot(module)(withRouter(SignInComponent));
export { SignInComponentHot as SignInComponent }

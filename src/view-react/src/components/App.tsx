import * as React from "react";
import { hot } from "react-hot-loader";
import "./../assets/scss/App.scss";

import { UserModel } from '@domain/models/user';
import { UserService } from '@domain/services/user';
import { DI } from '@thenja/DI';

class App extends React.Component<{}, undefined> {
  user: UserModel;


  constructor(props: any) {
    super(props);

    const userSrv: UserService = DI.getService(UserService);
    this.user = userSrv.createUser({
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
      </div>
    );
  }
}

declare let module: object;

export default hot(module)(App);

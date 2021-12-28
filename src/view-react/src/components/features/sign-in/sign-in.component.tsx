import * as React from "react";
import { hot } from "react-hot-loader";
// import "./../assets/scss/App.scss";


class SignInComponent extends React.Component<{}, undefined> {

  constructor(props: any) {
    super(props);

  }


  public render() {
    return (
      <div className="sign-in-component">
        <p>Sign in component</p>
      </div>
    );
  }
}

declare let module: object;

export default hot(module)(SignInComponent);

import * as React from "react";
import { hot } from "react-hot-loader";
import { RouteComponentProps, withRouter } from 'react-router-dom';
import "./home.component.scss";

import { DI } from '@thenja/di';
import { UserService } from '@app-domain/services/user';

interface IState {
  wishListItem: string;
};

interface IProps extends RouteComponentProps {

}

class HomeComponent extends React.Component<IProps, IState> {
  @DI.Inject(UserService)
  private userSrv: UserService;

  private inputRef: React.RefObject<HTMLElement>;


  constructor(props: any) {
    super(props);
    this.state = {
      wishListItem: ''    
    };
    this.inputRef = React.createRef();
  }

  async signout() {
    await this.userSrv.signOut();
    this.props.history.push({
      pathname: '/signin'
    });
  }

  componentDidMount(): void {
    // react does not work with custom events and web components, so we have
    // to bind to events this way, using refs
    this.inputRef.current.addEventListener('input', (event) => {
      this.setState({wishListItem: event.target['value']});
    });
  }


  async addItem() {

    console.log('addItem()...', this.state);
  }


  public render() {
    return (
      <div className="Home-component">
        <header>
          <h1>Christmas wish list</h1>
          <ui5-button onClick={(event) => this.signout()}>Sign out</ui5-button>
        </header>
        
        <div className="add-to-wish-list-container">
          <ui5-label for="myInput">Add to wish list:</ui5-label>
          <form onKeyDown={(event) => {
            if (event.keyCode === 13) this.addItem();
          }} >
            <ui5-input value={this.state.wishListItem}
            ref={this.inputRef} required></ui5-input>
            <ui5-button icon="add" onClick={(event) => this.addItem()} 
            design="Emphasized">
              Add
            </ui5-button>
          </form>
        </div>
      </div>
    );
  }
}

declare let module: object;
const HomeComponentHot = hot(module)(withRouter(HomeComponent));
export { HomeComponentHot as HomeComponent }

import * as React from "react";
import { hot } from "react-hot-loader";
import { RouteComponentProps, withRouter } from 'react-router-dom';
import "./home.component.scss";

import { DI } from '@thenja/di';
import { UserService } from '@app-domain/services/user';
import { WishListModel, WishListFactory } from '@app-domain/models/wish-list';
import { extractErrorMessage } from '@app-services/utils';

interface IState {
  wishListItem: string;
};
interface IProps extends RouteComponentProps {}


/**
 * Home component
 *
 * @class HomeComponent
 * @extends {React.Component<IProps, IState>}
 */
class HomeComponent extends React.Component<IProps, IState> {
  @DI.Inject(UserService)
  private userSrv: UserService;
  @DI.Inject(WishListFactory)
  private wishListFactory!: WishListFactory;
  private inputRef: React.RefObject<HTMLElement>;
  private ui5ListRef: React.RefObject<HTMLElement>;
  private wishList: WishListModel;
  private inputAddError: string;


  /**
   * Creates an instance of HomeComponent.
   * 
   * @param {*} props
   * @memberof HomeComponent
   */
  constructor(props: any) {
    super(props);
    this.state = {
      wishListItem: ''    
    };
    this.inputRef = React.createRef();
    this.ui5ListRef = React.createRef();
  }


  /**
   * Sign out
   *
   * @memberof HomeComponent
   */
  async signout() {
    await this.userSrv.signOut();
    this.props.history.push({
      pathname: '/signin'
    });
  }


  /**
   * Lifecycle event fired when the component mounts in the dom
   *
   * @memberof HomeComponent
   */
  componentDidMount(): void {
    // react does not work with custom events and web components, so we have
    // to bind to events this way, using refs
    this.inputRef.current.addEventListener('input', (event) => {
      this.setState({wishListItem: event.target['value']});
    });
    this.ui5ListRef.current.addEventListener('item-delete', (event) => {
      this.deleteItem(event as CustomEvent);
    });
    this.initWishListModel();
  }


  /**
   * Create the wish list model and load the data from the server
   *
   * @memberof HomeComponent
   */
  async initWishListModel() {
    this.wishList = this.wishListFactory.create();
    await this.wishList.loadDataFromServer();
    this.forceUpdate();
  }


  /**
   * Add a wish list item
   *
   * @memberof HomeComponent
   */
  async addItem() {
    this.inputAddError = '';
    if (this.state.wishListItem) {
      try {
        await this.wishList.addItem(this.state.wishListItem);
      } catch(err) {
        this.inputAddError = extractErrorMessage(err);
      }
      this.setState({wishListItem: ''});
    }
  }


  /**
   * Delete a wish list item
   *
   * @param {CustomEvent} e
   * @memberof HomeComponent
   */
  deleteItem(e: CustomEvent) {
    this.wishList.deleteItem(e.detail.item.innerText);
    this.forceUpdate();
  }


  /**
   * Render the component
   *
   * @returns
   * @memberof HomeComponent
   */
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

        {this.inputAddError &&
          <ui5-message-strip design="Negative">
            {this.inputAddError}
          </ui5-message-strip>
        }

        <h2>My wish list:</h2>
        <div>
          <ui5-list mode="Delete" ref={this.ui5ListRef}>
            {this.wishList && this.wishList.state &&
            this.wishList.state.items.map((item) => {
              return (<ui5-li key={item.name}>{item.name}</ui5-li>);
            })}
          </ui5-list>
        </div>
      </div>
    );
  }
}

declare let module: object;
const HomeComponentHot = hot(module)(withRouter(HomeComponent));
export { HomeComponentHot as HomeComponent }

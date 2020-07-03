import { Vue, Component, Prop } from 'vue-property-decorator';
import {
  AjaxRequestService,
} from '@app-services/api/ajax-request.service';
import { UserModel } from '@domain/features/user';


@Component({
  name: 'sign-in-page',
})
export default class SignInPageComponent extends Vue {
  public user: UserModel;
  public title!: string;

  constructor() {
    super();

    this.title = 'Hello!';
    this.user = new UserModel();
    this.user.setData({
      firstname: 'Vue',
      lastname: 'Test',
    });

    setTimeout(() => {
      this.user.updateFirstname('Nathan');
    }, 2000);
  }
}





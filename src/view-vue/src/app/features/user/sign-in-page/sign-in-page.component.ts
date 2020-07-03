import { Vue, Component, Prop } from 'vue-property-decorator';
import { UserModel } from '@domain/models/user';
import { UserService } from '@domain/services/user';
import { DI } from '@thenja/DI';


@Component({
  name: 'sign-in-page',
})
export default class SignInPageComponent extends Vue {
  public user: UserModel;
  public title!: string;

  @DI.Inject(UserService)
  private userSrv: UserService;

  constructor() {
    super();
    this.title = 'Hello!';
    this.user = this.userSrv.createUser({ id: '123', username: 'clark-kent' });
    this.user = new UserModel({ id: '123', username: 'clark-kent' });
  }
}





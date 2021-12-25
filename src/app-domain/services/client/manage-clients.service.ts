import { Observable, BehaviorSubject } from 'rxjs';

import { ClientModel } from '../../models/client';

export class ManageClientsService {
  private _selectedClient: BehaviorSubject<ClientModel>;
  
  get selectedClient(): BehaviorSubject<ClientModel> {
    return this._selectedClient;
  }



  constructor() {
    this._selectedClient = new BehaviorSubject(null);
  }


  setSelectedClient(client: ClientModel) {
    this._selectedClient.next(client);
  }

}

import { IClient } from '@app-domain/models/client';

export class DummyLocalStorageService {



  createClient(data: IClient): IClient {
    const clients = this.getClients();
    const foundIndex = clients.findIndex((val) => {
      return (val.username === data.username) ? true : false;
    });
    if (foundIndex >= 0) throw new Error('Client username already exists');
    data.id = clients.length + '-client-id';
    clients.push(data);
    localStorage.setItem('clients', JSON.stringify(clients));
    return data;
  }


  getClients(): IClient[] {
    const clientsValue = localStorage.getItem('clients');
    const clients: IClient[] = (clientsValue) ? JSON.parse(clientsValue) : [];
    return clients;
  }

}

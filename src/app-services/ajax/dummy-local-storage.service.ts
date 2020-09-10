import { IClient } from '@domain/models/client';

export class DummyLocalStorageService {



  createClient(data: IClient): IClient {
    const clientsValue = localStorage.getItem('clients');
    const clients: IClient[] = (clientsValue) ? JSON.parse(clientsValue) : [];
    const foundIndex = clients.findIndex((val) => {
      return (val.username === data.username) ? true : false;
    });
    if (foundIndex) throw new Error('Client username already exists');
    data.id = clients.length + '-client-id';
    clients.push(data);
    localStorage.setItem('clients', JSON.stringify(clients));
    return data;
  }

}

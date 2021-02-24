import { Injectable } from '@angular/core'
import * as signalR from '@aspnet/signalr' // or from "@microsoft/signalr" if you are using a new library

@Injectable({
  providedIn: 'root',
})
export class SignalRService {
  public hubConnection: signalR.HubConnection = new signalR.HubConnectionBuilder()
    .withUrl('https://biz1pos.azurewebsites.net/chatHub')
    .build()
  public hubRoom: string = '4/3'
  public StoreId: number = 4
  public isconnected: boolean = false
  constructor() {}

  public startConnection = () => {
    this.hubConnection.onclose(reason => {
      this.isconnected = false
      console.log('disconnected!!!!!', this.hubConnection.state)
      console.log(reason)
      this.startConnection()
    })

    this.hubConnection.on('joinmessage', data => {
      console.log(data)
      this.hubConnection.invoke('GetStoreOrders', this.hubRoom, this.StoreId)
    })

    this.hubConnection
      .start()
      .then(() => {
        console.log('Connection started', this.hubConnection.state)
        this.isconnected = true
        this.hubConnection.invoke('JoinRoom', this.hubRoom, this.StoreId)
      })
      .catch(err => {
        console.log('Error while starting connection: ' + err)
        this.isconnected = false
      })
  }

  // public setconfig = () => {
  // }
  // public addTransferChartDataListener = () => {
  //   this.hubConnection.on('transferchartdata', (data) => {
  //     this.data = data;
  //     console.log(data);
  //   });
  // }
}

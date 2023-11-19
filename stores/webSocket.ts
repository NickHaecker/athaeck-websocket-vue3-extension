import { defineStore } from 'pinia'
import type { SendEvent } from '../helper/types'

export const useWebSocketStore = defineStore({
  id: 'websocket',
  state: () => ({
    socket: null as WebSocket | null
  }),
  actions: {
    Connect(): void {
      const url: string = 'ws://192.168.102.1:8080'
      console.log(url)
      this.socket = new WebSocket(url)

      this.socket.addEventListener('message', this._OnMessage)
      this.socket.addEventListener('open', this._OnOpen)
      this.socket.addEventListener('close', this._OnClose)
      this.socket.addEventListener('error', this._OnError)
    },
    _OnMessage(message: any): void {
      console.log(message)
      // const notificationStore = useStore("notification");

      // notificationStore.SpawnNotification({type:"info",message});
    },
    _OnClose(event: any): void {console.log(event)},
    _OnOpen(event: any): void {console.log(event)},
    _OnError(event: any): void {console.log(event)},
    SendEvent(event: SendEvent): void {
      if (this.socket && this.socket.readyState === WebSocket.OPEN) {
        this.socket.send(event.JSONString)
      } else {
        console.error('WebSocket not open')
      }
    },
    Disconnect() {
        if(this.socket === null){
            return;
        }

        this.socket.removeEventListener('message', this._OnMessage)
        this.socket.removeEventListener('open', this._OnOpen)
        this.socket.removeEventListener('close', this._OnClose)
        this.socket.removeEventListener('error', this._OnError)

        this.socket.close()
        this.socket = null
    }
  }
})

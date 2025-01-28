import { User } from "./UserManager.js"
import { WebSocket } from "ws"

interface Chat {
    message : string,
    sender : User,
    time : Date
}

interface RoomMapValue{
    chats : Chat[],
    users : Set<User>
}

export class RoomManager{

    private roomMap  : Map<string , RoomMapValue>

    constructor(){
        this.roomMap = new Map<string  , RoomMapValue>();
    }

    addRoom(user : User,roomId : string){
        if(!this.roomMap.has(roomId)){
            this.roomMap.set(roomId , {chats : [] , users : new Set<User>()});
        }
        this.roomMap.get(roomId)?.users.add(user)
    }

    leaveRoom(user : User , roomId : string){
        if(!this.roomMap.has(roomId)){
            return
        }
 
        this.roomMap.get(roomId)?.users.delete(user);
    }

    addChat(user : User , message : string , roomId : string){
        if(!this.roomMap.has(roomId)){
            return
        }

        this.roomMap.get(roomId)?.chats.push({message , sender : user , time : new Date() })
    }

    notifyUsers(ws : WebSocket, roomId : string , data : any , ){
        if(!this.roomMap.has(roomId)){
            return
        }
        
        this.roomMap.get(roomId)?.users.forEach((u)=>{
            if(u.socket!==ws) u.socket.send(JSON.stringify(data));
        })

    }

}
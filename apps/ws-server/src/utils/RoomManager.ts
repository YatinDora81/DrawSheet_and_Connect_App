import { sendErrorResponse } from "./sendResponse.js"
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
    subscribe : Set<User>
}

export class RoomManager{

    private roomMap  : Map<string , RoomMapValue>

    constructor(){
        this.roomMap = new Map<string  , RoomMapValue>();
    }

    addRoom(user : User,roomId : string){
        if(!this.roomMap.has(roomId)){
            this.roomMap.set(roomId , {chats : [] , users : new Set<User>() , subscribe : new Set<User>()});
        }
        this.roomMap.get(roomId)?.users.add(user)
    }

    leaveRoom(user : User , roomId : string){
        if(!this.roomMap.has(roomId)){
            return
        }
 
        this.roomMap.get(roomId)?.users.delete(user);
        this.roomMap.get(roomId)?.subscribe.delete(user)
    }

    addChat(user : User , message : string , roomId : string){
        if(!this.roomMap.has(roomId)){
            return
        }

        this.roomMap.get(roomId)?.chats.push({message , sender : user , time : new Date() })
    }



    notifyUsers(sendAll : boolean, ws : WebSocket, roomId : string , data : any , ){
        if(!this.roomMap.has(roomId)){
            return
        }
        
        this.roomMap.get(roomId)?.users.forEach((u)=>{
            if(u.socket!==ws && this.roomMap.get(roomId)?.subscribe.has(u)) u.socket.send(JSON.stringify(data));
            if(sendAll && u.socket!==ws && !this.roomMap.get(roomId)?.subscribe.has(u)) u.socket.send(JSON.stringify({ type: "notification", notificationType : "chat" ,success: true, data: { roomId : roomId } , message: "New Chat Available" })) // add new notification
        })
    }

    subscribeRoom( user : User , roomId : string  ){
        if(!this.roomMap.has(roomId)){
            return
        }
        if(!this.roomMap.get(roomId)?.users.has(user)){
            sendErrorResponse(user.socket , `User ${user.name} Not Present In Room And Trying To Access The Messages!!!` ,`User ${user.name} Not Present In Room And Trying To Access The Messages!!!`)
            return 
        }
        this.roomMap.get(roomId)?.subscribe.add(user)
    }

    unSubscribeRoom( user : User , roomId : string  ){
        if(!this.roomMap.has(roomId)){
            return
        }
        this.roomMap.get(roomId)?.subscribe.delete(user)
    }


    removeUserEntry(user : User ){
        this.roomMap.forEach((roomId)=>roomId.users.delete(user))
        this.roomMap.forEach((roomId)=>roomId.subscribe.delete(user))
    }

}
import { WebSocket } from "ws";

export  interface User{
    user_id : string,
    email : string,
    name : string,
    socket : WebSocket
}

interface UserMapValue {
    rooms : Set<string>, // string room id
    user : User
}

export class UserManager{
    private userMap : Map<WebSocket , UserMapValue>;

    constructor(){
        this.userMap = new Map<WebSocket , UserMapValue>();
    }

    addRoom(ws : WebSocket,roomId : string){
        if(!this.userMap.has(ws)){
            // send Error here
            // ws.send()
            // ws.close();
            return;
        }

        this.userMap.get( ws )?.rooms.add(roomId)
    }

    leaveRoom(ws : WebSocket , roomId : string){
        if(!this.userMap.has(ws)){
            // send Error here
            // ws.send()
            // ws.close();
            return;
        }
        this.userMap.get(ws)?.rooms.delete(roomId);
    }

    createUser(ws : WebSocket , user : User){
        if(this.userMap.has(ws)){
            // no need of addinginto map because it already exists
            return
        }

        this.userMap.set(ws , { rooms : new Set<string>() , user });
    }

    removeUserEntry(ws : WebSocket){
        if(!this.userMap.has(ws)){
            return;
        }
        this.userMap.delete(ws);
    }

    

}
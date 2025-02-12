import { NextRequest , NextResponse } from "next/server";

export function middleware(req : NextRequest){
    const token = req.cookies.get("authToken")

    if(!token){
        // console.log( new URL("/signin" , req.url).toString() );
        
        return NextResponse.redirect(new URL("/signin" , req.url))
    }

    return NextResponse.next()
}

export const config = {
    matcher : ["/dashboard"]
}
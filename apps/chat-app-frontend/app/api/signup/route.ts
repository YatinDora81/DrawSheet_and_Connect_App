import { SignUp_User_URL } from "@repo/config/URL";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const backendRes = await fetch(SignUp_User_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(body),
    });

    const data = await backendRes.json();

    const cookies = backendRes.headers.getSetCookie();

    const response = NextResponse.json(data, {
      status: data?.status || backendRes.status,
    });

    if (cookies) {
      for (const cookie of cookies) {
        response.headers.append("Set-Cookie", cookie);
      }
    }

    return response;
  } catch (error) {
    console.error("Sign in error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
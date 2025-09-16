import { z } from "zod";
import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "../../../utils/EmailService";

const API_KEY = process.env.SECRET_BD_API_KEY as string;

const allowedOrigins = process.env.ALLOWED_ORIGINS!;

function getCorsHeaders(origin: string | null) {
  const isAllowed = origin && allowedOrigins.includes(origin);
  return {
    "Access-Control-Allow-Origin": isAllowed ? origin : "null",
    "Access-Control-Allow-Methods": "POST,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization, X-API-Key",
  };
}

export async function OPTIONS(req: NextRequest) {
  const origin = req.headers.get("origin");
  return NextResponse.json({}, { headers: getCorsHeaders(origin) });
}

export async function POST(req: NextRequest) {
  try {
    const origin = req.headers.get("origin");

    const clientKey = req.headers.get("x-api-key");
    if (!clientKey || clientKey !== API_KEY) {
      return NextResponse.json(
        { success: false, message: "Unauthorized request" },
        { status: 401, headers: getCorsHeaders(origin) }
      );
    }

    const zodSchema = z.object({
      from: z.string().email(),
      to: z.string().email(),
      subject: z.string(),
      html: z.string(),
    });

    const parsedData = zodSchema.safeParse(await req.json());
    if (!parsedData.success) {
      return NextResponse.json(
        {
          success: false,
          data: parsedData.error.issues[0]?.message || "",
          message: "Invalid Format!!!",
        },
        { status: 400, headers: getCorsHeaders(origin) }
      );
    }

    const email = await sendEmail(
      parsedData.data.from,
      parsedData.data.to,
      parsedData.data.subject,
      parsedData.data.html
    );

    return NextResponse.json(
      {
        success: true,
        data: email,
        message: "Email Sent Successfully!!!",
      },
      { status: 200, headers: getCorsHeaders(origin) }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        data: String(error),
        message: "Error At Sending Email!!!",
      },
      { status: 500, headers: getCorsHeaders(req.headers.get("origin")) }
    );
  }
}

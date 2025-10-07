import { NextResponse } from "next/server";
import axios from "axios";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const username = searchParams.get("username");

  if (!username) {
    return NextResponse.json({ error: "Missing username" }, { status: 400 });
  }

  try {
    const { data } = await axios.get(
      `https://api.github.com/users/${username}`,
    );
    console.log("Getting user data...");
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

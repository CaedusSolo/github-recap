import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import axios, { AxiosError } from "axios";

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);
  const token = session?.accessToken;
  const headers = {};

  if (!token) {
    return NextResponse.json(
      { error: "User not authenticated" },
      { status: 401 },
    );
  }
  const headers: Record<string, string> = {
    Authorization: `Bearer ${token}`,
    "User-Agent": "github-recap",
    Accept: "application/vnd.github+json",
  };

  const url = new URL(req.url);
  const page = url.searchParams.get("page") ?? "1";
  const perPage = url.searchParams.get("per_page") ?? "50";
  const apiURL = `https://api.github.com/user/repos?visibility=all&affiliation=owner,collaborator,organization_member&sort=updated&direction=desc&per_page=${perPage}&page=${page}`;

  const { data } = await axios.get(apiURL, { headers });
  return NextResponse.json(data);
}

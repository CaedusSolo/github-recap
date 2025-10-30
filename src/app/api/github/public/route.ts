import { NextResponse } from "next/server";
import axios, { AxiosError } from "axios";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const username = searchParams.get("username");

  if (!username) {
    return NextResponse.json(
      { error: "Missing username parameter" },
      { status: 400 },
    );
  }

  try {
    const session = await getServerSession(authOptions);
    const token = session?.accessToken ?? process.env.GITHUB_APP_TOKEN;
    const headers: Record<string, string> = {};
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const { data } = await axios.get(
      `https://api.github.com/users/${username}`,
      { headers },
    );

    console.log("Successfully fetched user data for:", username);
    return NextResponse.json(data);
  } catch (error: any) {
    // Use AxiosError to extract specific status codes from GitHub
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;

      const status = axiosError.response?.status || 500;
      let errorMessage = "Internal Server Error during GitHub fetch.";

      if (status === 404) {
        errorMessage = `GitHub user '${username}' not found.`;
      } else if (status === 403) {
        errorMessage =
          "GitHub API rate limit exceeded or token is invalid/expired.";
      } else if (axiosError.message) {
        errorMessage = axiosError.message;
      }

      console.error(`GitHub API Error (${status}):`, errorMessage);
      return NextResponse.json({ error: errorMessage }, { status });
    } else {
      console.error("Unknown Server Error:", error.message);
      return NextResponse.json(
        { error: "An unexpected error occurred." },
        { status: 500 },
      );
    }
  }
}

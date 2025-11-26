import axios from "axios";

export async function getProfile(username: string) {
  const profile = await axios.get(`/api/github/public?username=${username}`);
  return profile.data;
}

export async function getPrivateRepos(page: number = 1, perPage: number = 50) {
  try {
    const res = await axios.get("/api/github/private", {
      params: {
        page,
        per_page: perPage,
      },
    });

    return res.data;
  } catch (error: string) {
    console.error("Error fetching private repositories:", error);
    throw new Error(error.response?.data?.error || "Failed to fetch repos.");
  }
}

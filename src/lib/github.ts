import axios from "axios";

export async function getProfile(username: string) {
  const profile = await axios.get(`/api/github/public?username=${username}`);
  return profile.data;
}

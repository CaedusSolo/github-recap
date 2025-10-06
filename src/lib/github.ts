import axios from "axios";

export async function getProfile() {
  console.log("Calling getProfile");
  const { data } = await axios.get("https://api.github.com/users/CaedusSolo");

  console.log(data.name);
  console.log(data.public_repos);
}

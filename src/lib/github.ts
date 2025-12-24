import config from "@/config";

const USERNAME = config.gh_username;
const GH_API_URL = "https://api.github.com";

export function fetchRepo(name: string, init: RequestInit) {
  return fetch(`${GH_API_URL}/repos/${USERNAME}/${name}`, init);
}

export function fetchProfile(name: string = USERNAME, init: RequestInit) {
  return fetch(`${GH_API_URL}/users/${name}`, init);
}

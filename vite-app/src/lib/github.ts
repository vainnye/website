const USERNAME = "vainnye";

export function fetchRepo(name: string, init: RequestInit) {
  return fetch(`https://api.github.com/repos/${USERNAME}/${name}`, init);
}

export function fetchProfile(name: string = USERNAME, init: RequestInit) {
  return fetch(`https://api.github.com/users/${name}`, init);
}

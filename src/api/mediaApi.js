const BASE_URL = import.meta.env.VITE_SUBTITLE_URL;

export async function fetchMedia(token) {
  const response = await fetch(`${BASE_URL}/api/media`, {
    headers: token
      ? { Authorization: `Bearer ${token}` }
      : {}
  });

  if (response.status === 401 || response.status === 403) {
    throw new Error("AUTH_REQUIRED");
  }

  if (!response.ok) {
    throw new Error("Failed to fetch media");
  }

  return response.json();
}

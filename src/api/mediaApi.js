const BASE_URL = import.meta.env.VITE_SUBTITLE_URL;

export async function fetchMedia() {
  const response = await fetch(`${BASE_URL}/api/media`);

  if (!response.ok) {
    throw new Error("Failed to fetch media");
  }

  return response.json();
}

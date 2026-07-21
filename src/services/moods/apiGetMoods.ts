import type { Mood } from "../../types/mood";

// TODO: Error handling?

export async function apiGetMoods(limit?: number) {
  const res = await fetch(`/api/moods${limit ? `?limit=${limit}` : ""}`);

  const data: { moods: Mood[] } = await res.json();

  return data;
}

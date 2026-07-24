import type { Mood } from "../../types/mood";

interface GetMoodSuccess {
  ok: true;
  mood: Mood;
}

interface GetMoodFailure {
  ok: false;
  error: string;
}

export async function apiGetMood(
  id: string | undefined,
): Promise<GetMoodSuccess | GetMoodFailure> {
  const res = await fetch(`/api/moods/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  if (!res.ok) {
    const data: { error: string } = await res.json();
    return { ok: false, error: data.error };
  } else {
    const data: { mood: Mood } = await res.json();
    return { ok: true, mood: data.mood };
  }
}

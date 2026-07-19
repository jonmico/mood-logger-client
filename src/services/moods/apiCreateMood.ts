interface CreateMoodSuccess {
  ok: true;
  message: string;
}

interface CreateMoodFailure {
  ok: false;
  error: string;
}

export async function apiCreateMood(
  mood: number,
  text: string | undefined,
): Promise<CreateMoodSuccess | CreateMoodFailure> {
  const res = await fetch("/api/moods/create", {
    method: "POST",
    body: JSON.stringify({ mood, text }),
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  });

  if (res.ok) {
    const data: { message: string } = await res.json();
    return { ok: true, message: data.message };
  } else {
    const data: { error: string } = await res.json();
    return { ok: false, error: data.error };
  }
}

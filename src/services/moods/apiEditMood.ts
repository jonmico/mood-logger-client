interface EditMoodSuccess {
  ok: true;
  message: string;
}

interface EditMoodFailure {
  ok: false;
  error: string;
}

export async function apiEditMood(
  id: string | undefined,
  mood: number,
  notes: string,
): Promise<EditMoodSuccess | EditMoodFailure> {
  const res = await fetch(`/api/moods/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ mood, notes }),
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

interface DeleteMoodSuccess {
  ok: true;
  message: string;
}

interface DeleteMoodFailure {
  ok: false;
  error: string;
}

export async function apiDeleteMood(
  id: string,
): Promise<DeleteMoodSuccess | DeleteMoodFailure> {
  const res = await fetch(`/api/moods/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
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

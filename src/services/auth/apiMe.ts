interface MeSuccess {
  ok: true;
  data: { userId: string; firstName: string; email: string };
}

interface MeFailure {
  ok: false;
  error: string;
}

export async function apiMe(): Promise<MeSuccess | MeFailure> {
  const res = await fetch("/api/auth/me", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  });

  if (res.ok === true) {
    const meData: { userId: string; firstName: string; email: string } =
      await res.json();
    return {
      ok: true,
      data: {
        userId: meData.userId,
        firstName: meData.firstName,
        email: meData.email,
      },
    };
  } else {
    const meData: { error: string } = await res.json();
    return { ok: false, error: meData.error };
  }
}

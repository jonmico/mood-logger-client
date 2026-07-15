interface LoginSuccess {
  ok: true;
  userId: string;
  firstName: string;
}

interface LoginFailure {
  ok: false;
  error: string;
}

export async function apiLogin(
  email: string,
  password: string,
): Promise<LoginSuccess | LoginFailure> {
  const res = await fetch("/api/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
    headers: { "Content-Type": "application/json" },
  });

  if (res.ok) {
    const data: { userId: string; firstName: string } = await res.json();
    return { ok: true, userId: data.userId, firstName: data.firstName };
  } else {
    const data: { error: string } = await res.json();
    return { ok: false, error: data.error };
  }
}

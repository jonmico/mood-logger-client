interface LoginSuccess {
  ok: true;
  userId: string;
}

interface LoginFailure {
  ok: false;
  message: string;
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

  // There are hardcoded values here and that freaks me out a little bit.
  if (res.ok) {
    const data: { userId: string } = await res.json();
    return { ok: true, userId: data.userId };
  } else {
    const data: { message: string } = await res.json();
    return { ok: false, message: data.message };
  }
}

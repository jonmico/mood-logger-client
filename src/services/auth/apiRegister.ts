interface RegisterSuccess {
  ok: true;
  userId: string;
}

interface RegisterFailure {
  ok: false;
  error: string;
}

export async function apiRegister(
  email: string,
  password: string,
): Promise<RegisterSuccess | RegisterFailure> {
  const res = await fetch(`/api/auth/register`, {
    method: "POST",
    body: JSON.stringify({ email, password }),
    headers: { "Content-Type": "application/json" },
  });

  if (res.ok) {
    const data: { userId: string } = await res.json();
    return { ok: true, userId: data.userId };
  } else {
    const data: { error: string } = await res.json();
    return { ok: false, error: data.error };
  }
}

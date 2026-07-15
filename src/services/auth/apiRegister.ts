interface RegisterSuccess {
  ok: true;
  userId: string;
  firstName: string;
}

interface RegisterFailure {
  ok: false;
  error: string;
}

export async function apiRegister(
  email: string,
  firstName: string,
  password: string,
): Promise<RegisterSuccess | RegisterFailure> {
  const res = await fetch(`/api/auth/register`, {
    method: "POST",
    body: JSON.stringify({ email, firstName, password }),
    headers: { "Content-Type": "application/json" },
  });

  if (res.ok) {
    const data: { userId: string; firstName: string } = await res.json();
    console.log(data);
    return { ok: true, userId: data.userId, firstName: data.firstName };
  } else {
    const data: { error: string } = await res.json();
    return { ok: false, error: data.error };
  }
}

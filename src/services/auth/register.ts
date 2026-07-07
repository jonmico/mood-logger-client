export async function register(email: string, password: string) {
  const res = await fetch(`/api/auth/register`, {
    method: "POST",
    body: JSON.stringify({ email, password }),
    headers: { "Content-Type": "application/json" },
  });

  const data = await res.json();

  console.log(data);
}

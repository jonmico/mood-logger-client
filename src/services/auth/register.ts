const URL = import.meta.env.VITE_BACKEND_URL;

export async function register(email: string, password: string) {
  const res = await fetch(`${URL}/api/auth/register`, {
    method: "POST",
    body: JSON.stringify({ email, password }),
    headers: { "Content-Type": "application/json" },
  });

  const data = await res.json();

  console.log(data);
}

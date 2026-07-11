export async function me() {
  const res = await fetch("/api/auth/me", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  });

  const data = await res.json();

  return { ok: res.ok, data };
}

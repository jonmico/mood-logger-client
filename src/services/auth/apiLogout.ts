// TODO: Add some type of error handling eventually.

export async function apiLogout() {
  const res = await fetch("/api/auth/logout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  const data: { message: string } = await res.json();

  return { message: data.message };
}

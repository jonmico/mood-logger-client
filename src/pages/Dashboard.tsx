import { useAuth } from "../hooks/useAuth";

// TODO: This is for a test commit. Also I need to figure out what to put on this page.

export default function Dashboard() {
  const { firstName } = useAuth();
  return <div>Hello, {firstName}! Welcome to Mood Logger!</div>;
}

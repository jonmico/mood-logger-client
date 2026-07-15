import { useAuth } from "../hooks/useAuth";

export default function Dashboard() {
  const { firstName } = useAuth();
  return <div>Hello, {firstName}! Welcome to Mood Logger!</div>;
}

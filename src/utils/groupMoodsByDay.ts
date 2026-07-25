import { format } from "date-fns";
import type { Mood } from "../types/mood";

export function groupMoodsByDay(moods: Mood[]): Map<string, Mood[]> {
  const dateMap = new Map<string, Mood[]>();

  for (const mood of moods) {
    const date = format(new Date(mood.created_at), "MMMM dd, yyyy");

    if (!dateMap.has(date)) {
      dateMap.set(date, [mood]);
    } else {
      dateMap.get(date)?.push(mood);
    }
  }

  return dateMap;
}

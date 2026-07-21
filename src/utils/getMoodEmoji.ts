const moods = {
  1: "😄",
  2: "🙂",
  3: "😐",
  4: "😞",
  5: "😭",
};

export function getMoodEmoji(mood: 1 | 2 | 3 | 4 | 5) {
  return moods[mood];
}

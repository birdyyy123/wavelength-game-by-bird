interface ScoreBoardProps {
  players: { name: string; score: number }[];
}

export default function ScoreBoard({ players }: ScoreBoardProps) {
  const sortedPlayers = [...players].sort((a, b) => b.score - a.score);
  return (
    <ul className="space-y-3">
      {sortedPlayers.map((p, i) => (
        <li
          key={i}
          className="flex justify-between items-center bg-gray-50 p-3 rounded-xl shadow-md"
        >
          <span className="font-medium text-gray-700">{p.name} :: {p.score} คะแนน</span>
        </li>
      ))}
    </ul>
  );
}

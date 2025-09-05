import React, { useState } from "react";

interface SetupGameProps {
  onStart: (config: { player: { name: string; score: number }[]; targetScore: number }) => void;
}

export default function SetupGame({ onStart }: SetupGameProps) {
  const [numPlayers, setNumPlayers] = useState(2);
  const [targetScore, setTargetScore] = useState(10);
  const [names, setNames] = useState<string[]>(Array(2).fill(""));

  const handlePlayerChange = (count: number) => {
    setNumPlayers(count);
    setNames(Array(count).fill(""));
  };

  const handleNameChange = (i: number, value: string) => {
    const updated = [...names];
    updated[i] = value;
    setNames(updated);
  };

  const startGame = () => {
    if (names.some((n) => !n.trim())) {
      alert("กรุณากรอกชื่อผู้เล่นให้ครบ");
      return;
    }
    const players = names.map((name) => ({ name, score: 0 }));
    onStart({ player: players, targetScore });
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
      <h2 className="text-3xl font-bold mb-6 text-center text-indigo-600">ตั้งค่าเกม</h2>

      <div className="mb-4">
        <label className="block font-medium mb-1">จำนวนผู้เล่น (2-10)</label>
        <input
          type="number"
          min={2}
          max={10}
          value={numPlayers}
          onChange={(e) => handlePlayerChange(Number(e.target.value))}
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
      </div>

      <div className="mb-4">
        <label className="block font-medium mb-1">คะแนนสูงสุด</label>
        <input
          type="number"
          min={1}
          value={targetScore}
          onChange={(e) => setTargetScore(Number(e.target.value))}
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
      </div>

      <div className="mb-4">
        <label className="block font-medium mb-2">ชื่อผู้เล่น</label>
        {names.map((n, i) => (
          <input
            key={i}
            type="text"
            placeholder={`ผู้เล่น ${i + 1}`}
            value={n}
            onChange={(e) => handleNameChange(i, e.target.value)}
            className="w-full p-3 mb-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        ))}
      </div>

      <button
        onClick={startGame}
        className="w-full bg-indigo-500 hover:bg-indigo-600 text-white py-3 rounded-xl font-bold transition-all shadow-lg"
      >
        ▶️ เริ่มเกม
      </button>
    </div>
  );
}

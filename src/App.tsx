import React, { useState } from "react";
import SetupGame from "./components/SetupGame";
import GameBoard from "./components/GameBoard";
import ScoreBoard from "./components/ScoreBoard";

interface GameConfig {
  player: { name: string; score: number }[];
  targetScore: number;
}

export default function App() {
  const [config, setConfig] = useState<GameConfig | null>(null);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col md:flex-row">
      {/* Sidebar คะแนน */}
      {config && (
        <aside className="w-full md:w-64 bg-white shadow-lg p-6 flex-shrink-0">
          <h2 className="text-2xl font-bold mb-6 text-center">📊 คะแนนผู้เล่น</h2>
          <ScoreBoard players={config.player} />
        </aside>
      )}

      {/* ส่วนเล่นเกม */}
      <main className="flex-1 p-6 md:p-8 flex justify-center items-start">
        {!config ? (
          <SetupGame onStart={setConfig} />
        ) : (
          <GameBoard config={config} setConfig={setConfig} />
        )}
      </main>
    </div>
  );
}

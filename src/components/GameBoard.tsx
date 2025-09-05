import React, { useState, useEffect } from "react";
import categories from "../data/categories";

interface GameBoardProps {
  config: { player: { name: string; score: number }[]; targetScore: number };
  setConfig: React.Dispatch<
    React.SetStateAction<{ player: { name: string; score: number }[]; targetScore: number } | null>
  >;
}

export default function GameBoard({ config, setConfig }: GameBoardProps) {
  const { player, targetScore } = config;
  const [round, setRound] = useState(0);
  const [category, setCategory] = useState<[string, string] | null>(null);
  const [answer, setAnswer] = useState<number | null>(null);
  const [guess, setGuess] = useState(5);
  const [revealed, setRevealed] = useState(false);
  const [showAnswerFirst, setShowAnswerFirst] = useState(false);
  const [winners, setWinners] = useState<string[] | null>(null);
  const [roundPoints, setRoundPoints] = useState<number[]>(Array(player.length).fill(0));

  const currentPlayer = round % player.length;

  const startRound = () => {
    const randomCat = categories[Math.floor(Math.random() * categories.length)];
    setCategory(randomCat as [string, string]);
    setAnswer(null);
    setGuess(5);
    setRevealed(false);
    setShowAnswerFirst(false);
    setRoundPoints(Array(player.length).fill(0)); // reset คะแนนรอบใหม่
  };

  const rollAnswer = () => {
    setAnswer(Math.floor(Math.random() * 10) + 1);
    setShowAnswerFirst(true);
  };

  const submitGuess = () => {
    if (!answer) return;
    const diff = Math.abs(guess - answer);

    const newPlayers = player.map((p) => ({ ...p }));
    const newRoundPoints = Array(player.length).fill(0);

    if (diff === 0) {
      newPlayers[currentPlayer].score += 3;
      newRoundPoints[currentPlayer] = 3;
      newPlayers.forEach((p, i) => {
        if (i !== currentPlayer) {
          p.score += 4;
          newRoundPoints[i] = 4;
        }
      });
    } else if (diff === 1) {
      newPlayers[currentPlayer].score += 2;
      newRoundPoints[currentPlayer] = 2;
      newPlayers.forEach((p, i) => {
        if (i !== currentPlayer) {
          p.score += 3;
          newRoundPoints[i] = 3;
        }
      });
    } else if (diff === 2) {
      newPlayers[currentPlayer].score += 1;
      newRoundPoints[currentPlayer] = 1;
      newPlayers.forEach((p, i) => {
        if (i !== currentPlayer) {
          p.score += 2;
          newRoundPoints[i] = 2;
        }
      });
    } else if (diff === 3) {
      newRoundPoints[currentPlayer] = 0;
      newPlayers.forEach((p, i) => {
        if (i !== currentPlayer) {
          p.score += 1;
          newRoundPoints[i] = 1;
        }
      });
    }

    setConfig({ ...config, player: newPlayers });
    setRoundPoints(newRoundPoints);
    setRevealed(true);

    const winnerPlayers = newPlayers
      .filter((p) => p.score >= targetScore)
      .map((p) => p.name);

    if (winnerPlayers.length > 0) setWinners(winnerPlayers);
  };

  const nextRound = () => {
    if (winners) return;
    setRound((r) => r + 1);
    startRound();
  };

  const restartGame = () => setConfig(null);

  useEffect(() => {
    startRound();
  }, []);

  return (
    <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-xl mx-auto relative">
      <h2 className="text-xl font-bold text-gray-700 mb-4">รอบที่ {round + 1}</h2>
      <h3 className="text-2xl font-semibold text-indigo-600 mb-4">
        ผู้เล่น: {player[currentPlayer].name}
      </h3>

      {category && (
        <div className="bg-indigo-50 p-4 rounded-xl mb-4 text-center">
          <p className="text-lg font-bold text-gray-600">{category[0]} → {category[1]}</p>
        </div>
      )}

      {!answer && !winners && (
        <button
          onClick={rollAnswer}
          className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-3 rounded-xl shadow-md transition w-full mb-4"
        >
          🎲 สุ่มเลข
        </button>
      )}

      {answer && showAnswerFirst && !winners && (
        <div className="flex flex-col items-center">
          <p className="text-4xl font-bold text-red-500 mb-6">{answer}</p>
          <button
            onClick={() => setShowAnswerFirst(false)}
            className="bg-yellow-400 hover:bg-yellow-500 text-white px-6 py-3 rounded-xl shadow-md transition"
          >
            ถัดไป (ซ่อนเลข)
          </button>
        </div>
      )}

      {answer && !showAnswerFirst && !revealed && !winners && (
        <div className="flex flex-col items-center">
          <input
            type="range"
            min={1}
            max={10}
            value={guess}
            onChange={(e) => setGuess(Number(e.target.value))}
            className="w-full accent-indigo-500 mb-4"
          />
          <p className="mb-4 text-lg font-medium">ค่าที่เลือก: {guess}</p>
          <button
            onClick={submitGuess}
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl shadow-md transition w-full"
          >
            ✅ ส่งคำตอบ
          </button>
        </div>
      )}

      {/* คะแนนรอบนี้ */}
      {revealed && !winners && (
        <div className="flex flex-col items-center mt-6">
          <p className="mb-4 text-lg font-semibold text-gray-700">
            ✅ คำตอบจริงคือ: <span className="text-red-500 font-bold">{answer}</span>
          </p>
          <div className="w-full">
            <h3 className="text-lg font-medium mb-2">คะแนนรอบนี้</h3>
            <ul className="space-y-2">
              {player.map((p, i) => (
                <li
                  key={i}
                  className="flex justify-between items-center p-3 bg-gray-50 rounded-xl shadow-sm"
                >
                  <span>{p.name}</span>
                  <span className="font-bold text-indigo-600">{roundPoints[i]} 🎯</span>
                </li>
              ))}
            </ul>
          </div>

          <button
            onClick={nextRound}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-xl shadow-md transition mt-6 w-full"
          >
            ▶️ เริ่มรอบต่อไป
          </button>
        </div>
      )}

      {/* Modal ผู้ชนะ */}
      {winners && winners.length > 0 && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-2xl shadow-2xl text-center max-w-sm w-full">
            <h2 className="text-3xl font-bold mb-6 text-green-600">
              🏆 ผู้ชนะ: {winners.join(", ")}
            </h2>
            <button
              onClick={restartGame}
              className="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-3 rounded-xl shadow-md transition w-full"
            >
              🔄 เริ่มเกมใหม่
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

import React, { useState } from "react";
import "./style.less";

import rockImg from "@/assets/rock.png";
import paperImg from "@/assets/paper.png";
import scissorsImg from "@/assets/scissors.png";

const options = ["rock", "paper", "scissors"];

const imageMap: Record<string, string> = {
  rock: rockImg,
  paper: paperImg,
  scissors: scissorsImg,
};

const BaiTap1: React.FC = () => {
  const [playerChoice, setPlayerChoice] = useState("rock");
  const [computerChoice, setComputerChoice] = useState("rock");
  const [winner, setWinner] = useState("Chọn để bắt đầu");
  const [pScore, setPScore] = useState(0);
  const [cScore, setCScore] = useState(0);
  const [isShaking, setIsShaking] = useState(false);

  const compareHands = (player: string, computer: string) => {
    if (player === computer) {
      setWinner("Hòa!");
      return;
    }

    if (
      (player === "rock" && computer === "scissors") ||
      (player === "paper" && computer === "rock") ||
      (player === "scissors" && computer === "paper")
    ) {
      setWinner("Player Wins");
      setPScore((prev) => prev + 1);
    } else {
      setWinner("Computer Wins");
      setCScore((prev) => prev + 1);
    }
  };

  const playGame = (player: string) => {
    const computer =
      options[Math.floor(Math.random() * options.length)];

    setIsShaking(true);

    setTimeout(() => {
      setPlayerChoice(player);
      setComputerChoice(computer);
      compareHands(player, computer);
      setIsShaking(false);
    }, 2000);
  };

  const resetGame = () => {
    setPlayerChoice("rock");
    setComputerChoice("rock");
    setWinner("Chọn để bắt đầu");
    setPScore(0);
    setCScore(0);
  };

  return (
    <section>
      <div className="score">
        <div>
          <h2>Player</h2>
          <p>{pScore}</p>
        </div>
        <div>
          <h2>Computer</h2>
          <p>{cScore}</p>
        </div>
      </div>

      <div className="match">
        <h2 className="winner">{winner}</h2>

        {winner !== "Chọn để bắt đầu" && (
          <div style={{ textAlign: "center", marginBottom: "15px" }}>
            <button onClick={resetGame} className="reset-btn">
              Reset Game
            </button>
          </div>
        )}

        <div className="hands">
          <img
            className={`player-hand ${isShaking ? "shakePlayer" : ""}`}
            src={imageMap[playerChoice]}
            alt="player"
          />
          <img
            className={isShaking ? "shakeComputer" : ""}
            src={imageMap[computerChoice]}
            alt="computer"
          />
        </div>

        <div className="options">
          {options.map((opt) => (
            <button key={opt} onClick={() => playGame(opt)}>
              {opt}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BaiTap1;
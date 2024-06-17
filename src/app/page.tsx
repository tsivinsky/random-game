"use client";

import { useEffect, useState } from "react";

type Game = {
  title: string;
  url: string;
  image: string;
};

const getRandomGame = async () => {
  const resp = await fetch("http://localhost:3000/api/game", {
    cache: "no-store",
  });
  return resp.json();
};

export default function Index() {
  const [games, setGames] = useState<Game[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [cursor, setCursor] = useState(0);

  const currentGame = games[cursor];

  useEffect(() => {
    (async () => {
      setGames([await getRandomGame()]);
    })();
  }, []);

  const previousGame = () => {
    setCursor((prev) => prev - 1);
  };

  const nextGame = async () => {
    if (cursor < games.length - 1) {
      setCursor(cursor + 1);
      return;
    }

    setIsLoading(true);
    const game = await getRandomGame();
    const newGames = [...games, game];
    setGames(newGames);
    setCursor(newGames.length - 1);
    setIsLoading(false);
  };

  return (
    <main>
      {currentGame && (
        <div>
          <img
            src={currentGame.image}
            alt={currentGame.title}
            width={400}
            height={150}
          />
          <a
            href={currentGame.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-2xl hover:underline"
          >
            <h1>{currentGame.title}</h1>
          </a>
        </div>
      )}
      <div className="flex items-center gap-4 mt-2">
        <button disabled={cursor <= 0} onClick={previousGame}>
          Previous Game
        </button>
        <button disabled={isLoading} onClick={nextGame}>
          Next Game
        </button>
      </div>
    </main>
  );
}

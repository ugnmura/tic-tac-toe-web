"use client";
import { Suspense, useCallback, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useSpacetimeConnection } from "@/lib/hooks/useSpacetimeConnection";

const JoinGame = () => {
  const searchParams = useSearchParams();
  const joinId = searchParams.get("id");

  const [gameId, setGameId] = useState("");
  const { conn } = useSpacetimeConnection();

  const joinGame = useCallback(
    (gameId: string) => {
      if (!conn) return;
      const id = gameId.toUpperCase().trim();
      try {
        conn.reducers.joinGame(id);
        window.location.href = `/online/game?id=${id}`;
      } catch (err) {
        alert("Could not join game: " + (err as Error).message);
      }
    },
    [conn],
  );

  useEffect(() => {
    if (!joinId) return;
    joinGame(joinId);
  }, [joinId, joinGame]);

  const handleJoin = useCallback(() => {
    joinGame(gameId);
  }, [joinGame, gameId]);

  return (
    <div className="min-h-screen grid place-content-center bg-base-200 px-4">
      <div className="text-center space-y-6 max-w-screen-sm">
        <h2 className="text-3xl sm:text-4xl font-bold text-secondary">
          Join a Match
        </h2>
        <input
          type="text"
          placeholder="Enter Match ID"
          value={gameId}
          onChange={(e) => setGameId(e.target.value)}
          className="input input-bordered w-full max-w-xs text-center"
        />

        <button
          disabled={!gameId}
          className="btn btn-outline btn-lg mt-4"
          onClick={handleJoin}
        >
          🔗 Join Match
        </button>

        <div>
          <a href="/online" className="btn btn-sm btn-outline">
            ⬅ Back
          </a>
        </div>
      </div>
    </div>
  );
};

const JoinGamePage = () => {
  return (
    <Suspense>
      <JoinGame />
    </Suspense>
  );
};

export default JoinGamePage;

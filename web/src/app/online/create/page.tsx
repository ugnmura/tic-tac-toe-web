"use client";
import { Suspense, useState } from "react";
import { useSpacetimeConnection } from "@/lib/hooks/useSpacetimeConnection";

const generateId = () => {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "";
  for (let i = 0; i < 5; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

const CreateGame = () => {
  const [customId, setCustomId] = useState("");
  const { conn } = useSpacetimeConnection();

  const handleCreate = async () => {
    if (!conn) return;
    const id = customId.trim() || generateId();
    try {
      conn.reducers.createGame(id);
      window.location.href = `/online/game?id=${id}`;
    } catch (err) {
      alert("Could not create game: " + (err as Error).message);
    }
  };

  return (
    <div className="min-h-screen grid place-content-center bg-base-200 px-4">
      <div className="text-center space-y-6 max-w-screen-sm">
        <h2 className="text-3xl sm:text-4xl font-bold text-primary">
          Create a Match
        </h2>

        <input
          type="text"
          placeholder="Enter match ID (optional)"
          value={customId}
          onChange={(e) => setCustomId(e.target.value)}
          className="input input-bordered w-full max-w-xs text-center"
        />

        <button className="btn btn-primary btn-lg mt-4" onClick={handleCreate}>
          ➕ Create Match
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

const CreateGamePage = () => {
  return (
    <Suspense>
      <CreateGame />
    </Suspense>
  );
};

export default CreateGamePage;

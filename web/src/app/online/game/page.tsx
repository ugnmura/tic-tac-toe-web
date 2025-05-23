"use client";
import OnlineGame from "@/components/OnlineGame";
import { useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";

const OnlineClient = () => {
  const searchParams = useSearchParams();
  const gameId = searchParams.get("id");
  const [copied, setCopied] = useState(false);

  const handleCopyLink = async () => {
    if (!gameId) return;
    const url = `${window.location.origin}/online/join?id=${gameId}`;
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="bg-base-200 space-y-8">
      <div className="min-h-screen grid place-content-center">
        {gameId ? (
          <>
            <div className="flex place-items-center justify-between py-4">
              <div className="flex place-items-center gap-x-2">
                <div className="text-sm text-base-content">Game ID</div>
                <div className="badge badge-lg badge-outline font-mono text-sm">
                  {gameId}
                </div>
              </div>
              <button
                onClick={handleCopyLink}
                className="btn btn-sm btn-primary mt-2"
              >
                {copied ? "✅ Link Copied" : "🔗 Share Link"}
              </button>
            </div>

            <OnlineGame id={gameId} />
          </>
        ) : (
          <div className="text-center">
            <a href="/online" className="btn btn-outline btn-lg mt-4">
              🏠 Back to Online
            </a>
          </div>
        )}
      </div>

      <div className="text-center p-8">
        <a href="/" className="btn btn-outline btn-sm sm:btn-md mt-2">
          ⬅ Leave Game
        </a>
      </div>
    </div>
  );
};

const OnlineGamePage = () => {
  return (
    <Suspense>
      <OnlineClient />
    </Suspense>
  );
};

export default OnlineGamePage;

import BotGame from "@/components/BotGame";
import Link from "next/link";

const BotGamePage = () => {
  return (
    <div className="bg-base-200 space-y-8">
      <div className="min-h-screen grid place-content-center">
        <BotGame />
      </div>

      <div className="text-center p-8">
        <Link href="/" className="btn btn-outline btn-sm sm:btn-md mt-2">
          ⬅ Leave Game
        </Link>
      </div>
    </div>
  );
};

export default BotGamePage;

import Link from "next/link";

const OnlineMenu = () => {
  return (
    <div className="min-h-screen grid place-content-center bg-base-200 text-base-content px-4">
      <div className="text-center space-y-6 max-w-screen-md">
        <h2 className="text-4xl sm:text-5xl font-bold text-secondary">
          Online Multiplayer
        </h2>
        <p className="text-base-content sm:text-lg lg:text-xl mt-2">
          Select how you want to play online
        </p>

        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:flex-wrap justify-center">
          <Link
            href="/online/create"
            className="btn btn-primary btn-lg text-lg sm:text-xl shadow"
          >
            ➕ Create Match
          </Link>
          <Link
            href="/online/join"
            className="btn btn-outline btn-lg text-lg sm:text-xl shadow"
          >
            🔗 Join Match
          </Link>
          {/* <Link
            href="/online/random"
            className="btn btn-accent btn-lg text-lg sm:text-xl shadow"
          >
            🎲 Random Match
          </Link> */}
        </div>

        <Link href="/" className="btn mt-6">
          ⬅ Back to Menu
        </Link>
      </div>
    </div>
  );
};

export default OnlineMenu;

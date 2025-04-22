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
          <a
            href="/online/create"
            className="btn btn-primary btn-lg text-lg sm:text-xl shadow"
          >
            ➕ Create Match
          </a>
          <a
            href="/online/join"
            className="btn btn-outline btn-lg text-lg sm:text-xl shadow"
          >
            🔗 Join Match
          </a>
          {/* <a
            href="/online/random"
            className="btn btn-accent btn-lg text-lg sm:text-xl shadow"
          >
            🎲 Random Match
          </a> */}
        </div>

        <a href="/" className="btn btn-outline btn-sm sm:btn-md mt-2">
          ⬅ Back to Menu
        </a>
      </div>
    </div>
  );
};

export default OnlineMenu;

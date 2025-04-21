const Menu = () => {
  return (
    <div className="min-h-screen grid place-content-center bg-base-200 text-base-content px-4">
      <div className="text-center space-y-6 max-w-screen-md">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-wide text-primary">
          Welcome to
        </h1>
        <h2 className="text-5xl sm:text-6xl lg:text-7xl font-black text-secondary drop-shadow-md">
          Tic Tac Toe!
        </h2>
        <p className="text-base-content sm:text-lg lg:text-xl mt-2">
          Choose a game mode to get started
        </p>

        <div className="mt-10 flex flex-col gap-4 sm:gap-6 sm:flex-row sm:flex-wrap justify-center">
          <a
            href="/bot"
            className="btn btn-accent btn-lg text-lg sm:text-xl shadow-md w-full sm:w-auto"
          >
            🧠 Single Player vs Bot
          </a>
          <a
            href="/local"
            className="btn btn-primary btn-lg text-lg sm:text-xl shadow-md w-full sm:w-auto"
          >
            👥 Local Multiplayer
          </a>
          <a
            href="/online"
            className="btn btn-secondary btn-lg text-lg sm:text-xl shadow-md w-full sm:w-auto"
          >
            🌐 Online Multiplayer
          </a>
        </div>
      </div>
    </div>
  );
};

export default Menu;

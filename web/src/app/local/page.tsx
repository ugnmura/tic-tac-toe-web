import LocalGame from "@/components/LocalGame";

const LocalGamePage = () => {
  return (
    <div className="bg-base-200 space-y-8">
      <div className="min-h-screen grid place-content-center">
        <LocalGame />
      </div>

      <div className="text-center p-8">
        <a href="/" className="btn btn-outline btn-sm sm:btn-md mt-2">
          ⬅ Leave Game
        </a>
      </div>
    </div>
  );
};

export default LocalGamePage;

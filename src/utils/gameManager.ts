import GUN from "gun";
import { PlayerState } from "./player";

const gun = GUN("https://mvp-gun.herokuapp.com/gun");

export interface GameData {
  field: number[];
  turn: PlayerState;
}

export const getGame = (gameID: string) => {
  const gameNode = gun.get(gameID);
  return gameNode;
};

export const createGame = async (gameID: string) => {
  const gameNode = getGame(gameID);

  return new Promise((resolve) => {
    gameNode.put(
      {
        field: { ...Array.from({ length: 9 }, () => PlayerState.None) },
        turn: PlayerState.Circle,
      },
      () => {
        resolve(gameNode);
      }
    );
  });
};

export const updateGameState = (gameID: string, gameState: GameData) => {
  const gameNode = getGame(gameID);

  gameNode.put({
    field: { ...gameState.field },
    turn: gameState.turn,
  });

  return gameNode;
};

export const gameExists = async (gameID: string) => {
  const gameNode = getGame(gameID);

  return new Promise((resolve) => {
    gameNode.once((data) => {
      resolve(data !== undefined);
    });
  });
};

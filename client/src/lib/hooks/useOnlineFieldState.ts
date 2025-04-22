import { FieldState as ClientFieldState } from "@/components/FieldButton";
import { GameResult as ClientGameResult } from "@/lib/hooks/useFieldState";
import {
  EventContext,
  Game,
  FieldState as ServerFieldState,
} from "@/lib/module_bindings";
import { useCallback, useEffect, useState } from "react";
import { useSpacetimeConnection } from "./useSpacetimeConnection";

export const useOnlineFieldState = (gameId: string) => {
  const { conn } = useSpacetimeConnection();
  const [field, setField] = useState<ClientFieldState[]>(Array(9).fill("none"));
  const [currentPlayer, setCurrentPlayer] = useState<ClientFieldState>("cross");
  const [result, setResult] = useState<ClientGameResult>("none");
  const [score, setScore] = useState({
    circle: 0,
    cross: 0,
    draw: 0,
  });

  const setCell = useCallback(
    (index: number) => {
      if (!conn || !gameId) return;
      conn.reducers.makeMove(gameId, index);
    },
    [conn, gameId],
  );

  useEffect(() => {
    if (!conn || !conn.isActive || !gameId) return;

    const handleUpdate = (game: Game) => {
      const mappedField = game.field.map((cell) =>
        cell?.tag === "Cross"
          ? "cross"
          : cell?.tag === "Circle"
            ? "circle"
            : "none",
      );

      setField(mappedField);
      setCurrentPlayer(
        game.currentTurn === ServerFieldState.Cross ? "cross" : "circle",
      );

      if (!game.result) {
        setResult("none");
      } else if (game.result.tag === "Draw") {
        setResult("draw");

        setTimeout(() => {
          conn.reducers.resetGame(game.id);
        }, 1000);
      } else if (game.result.tag === "Winner") {
        const winner = game.result.value.tag;
        setResult(winner === "Cross" ? "cross" : "circle");

        setTimeout(() => {
          conn.reducers.resetGame(game.id);
        }, 1000);
      }

      setScore({
        cross: game.xScore,
        circle: game.oScore,
        draw: game.tieScore,
      });
    };

    const onUpdate = (_ctx: EventContext, _oldGame: Game, game: Game) => {
      if (game.id !== gameId) return;
      handleUpdate(game);
    };

    const sub = conn
      .subscriptionBuilder()
      .onApplied(() => {
        const game = conn.db.game.id.find(gameId);
        if (!game) return;
        handleUpdate(game);
      })
      .subscribe(`SELECT * FROM game WHERE id = '${gameId}'`);

    conn.db.game.onUpdate(onUpdate);

    return () => {
      sub.unsubscribe();
      conn.db.game.removeOnUpdate(onUpdate);
    };
  }, [conn, conn?.isActive, gameId]);

  return {
    field,
    currentPlayer,
    result,
    score,
    setCell,
  };
};

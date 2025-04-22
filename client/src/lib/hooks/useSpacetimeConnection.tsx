import React, {
  createContext,
  PropsWithChildren,
  use,
  useEffect,
  useState,
} from "react";
import { DbConnection } from "@/lib/module_bindings";
import { Identity } from "@clockworklabs/spacetimedb-sdk";

interface SpacetimeContextProps {
  conn: DbConnection | null;
  identity: Identity | null;
  connected: boolean;
}

const SpacetimeContext = createContext<SpacetimeContextProps>({
  conn: null,
  identity: null,
  connected: false,
});

export const SpacetimeProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [conn, setConn] = useState<DbConnection | null>(null);
  const [identity, setIdentity] = useState<Identity | null>(null);
  const [connected, setConnected] = useState<boolean>(false);

  useEffect(() => {
    const token = localStorage.getItem("auth_token") || "";

    const connection = DbConnection.builder()
      .withUri("ws://localhost:3000")
      .withModuleName("tictactoe")
      .withToken(token)
      .onConnect((conn, identity, token) => {
        setIdentity(identity);
        setConnected(true);
        localStorage.setItem("auth_token", token);
        console.log(
          "Connected to SpacetimeDB with identity:",
          identity.toHexString(),
        );
      })
      .onDisconnect(() => {
        console.log("Disconnected from SpacetimeDB");
        setConn(null);
        setIdentity(null);
        setConnected(false);
      })
      .onConnectError((_ctx, err) => {
        console.log("Error connecting to SpacetimeDB:", err);
        setConn(null);
        setIdentity(null);
        setConnected(false);
      })
      .build();

    setConn(connection);

    return () => {
      connection.disconnect();
    };
  }, []);

  return (
    <SpacetimeContext
      value={{ conn: conn?.isActive ? conn : null, identity, connected }}
    >
      {children}
    </SpacetimeContext>
  );
};

export const useSpacetimeConnection = () => use(SpacetimeContext);

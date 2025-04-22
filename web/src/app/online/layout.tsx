"use client";
import { SpacetimeProvider } from "@/lib/hooks/useSpacetimeConnection";

const OnlineGameLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return <SpacetimeProvider>{children}</SpacetimeProvider>;
};

export default OnlineGameLayout;

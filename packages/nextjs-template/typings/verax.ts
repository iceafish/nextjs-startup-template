import { base, manta, mantle, optimism, zksync, scroll } from "viem/chains";

export const StandAttestationRouteTypes = [
  "m",
  "h",
  "ogm",
  "scs",
  "scm",
  "acm",
] as const;

export type StandAttestationRouteType =
  (typeof StandAttestationRouteTypes)[number];

export type SupportAttestationRouteType =
  | StandAttestationRouteType
  | "bas"
  | "ton";
export type SupportSolanaAttestationRouteType = "solpoh" | "solmedia";

export const L2ChainIds: string[] = [
  zksync.id,
  base.id,
  scroll.id,
  manta.id,
  mantle.id,
  optimism.id,
].map(String);

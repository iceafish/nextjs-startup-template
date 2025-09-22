export const HOST_PREFIX =
  process.env.REST_HOST ??
  process.env.NEXT_PUBLIC_REST_HOST ??
  "localhost:3000";

export const GRAY_HEADER =
  process.env.GRAY_HEADER ?? process.env.NEXT_PUBLIC_GRAY_HEADER ?? undefined;

export const MAX_MESSAGE_QUEUE_SIZE = 3;

/**
 * 失效时间两周，毫秒
 */
export const SessionExpires = 14 * 24 * 3600 * 1000;

/**
 * Trace Tick Interval 30min
 */
export const TraceTickInterval = 30 * 60 * 1000;

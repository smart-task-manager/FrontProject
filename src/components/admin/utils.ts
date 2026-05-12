export function getErrorMessage(err: any, fallback: string) {
  if (!err) return fallback;
  if (typeof err === "string") return err;
  if (err?.message) return err.message;
  return fallback;
}


export const getErrorMessage = (err: unknown) => {
  if (
    typeof err === "object" &&
    err !== null &&
    "data" in err &&
    typeof err.data === "object" &&
    err.data !== null
  ) {
    const data = err.data as { message?: string; error?: string };
    if (data.message) return data.message;
    if (data.error) return data.error;
  }

  if (err instanceof Error) {
    return err.message;
  }
  return "Une erreur est survenue, veuillez réessayer.";
};

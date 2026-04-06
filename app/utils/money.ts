export const centsToEuro = (amountCents: number): string => {
  return (amountCents / 100).toLocaleString("fr-FR", {
    style: "currency",
    currency: "EUR",
  });
};

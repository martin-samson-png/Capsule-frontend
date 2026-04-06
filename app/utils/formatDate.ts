export const formatDateToDayMonthYear = (dateStr: string): string => {
  const parts = dateStr.split("-");
  if (parts.length !== 3) {
    throw new Error("Format de date invalide. Format attendu : YYYY/MM/DD");
  }

  const [year, month, day] = parts;

  const monthNames = [
    "janvier",
    "février",
    "mars",
    "avril",
    "mai",
    "juin",
    "juillet",
    "août",
    "septembre",
    "octobre",
    "novembre",
    "décembre",
  ];

  const monthIndex = Number(month) - 1;
  if (monthIndex < 0 || monthIndex > 11) {
    throw new Error("Mois invalide dans la date fournie.");
  }

  const monthName = monthNames[monthIndex];

  return `${day} ${monthName} ${year}`;
};

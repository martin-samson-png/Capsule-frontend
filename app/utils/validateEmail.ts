const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const validateEmail = (email: string): string | null => {
  if (!email) return "L'adresse e-mail est obligatoire";
  if (!emailRegex.test(email)) return "Adresse e-mail invalide";
  return null;
};

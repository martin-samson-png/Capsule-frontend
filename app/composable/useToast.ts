export const useToast = () => {
  const message = useState<string | null>("toast-message", () => null);
  const type = useState<"success" | "error">("toast-type", () => "success");

  const showToast = (msg: string, status: "success" | "error" = "success") => {
    message.value = msg;
    type.value = status;

    setTimeout(() => {
      message.value = null;
    }, 4000);
  };

  return { message, type, showToast };
};

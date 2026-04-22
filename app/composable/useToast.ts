export const useToast = () => {
  const message = useState<string | null>("toast-message", () => null);
  const type = useState<"success" | "error" | "warning">(
    "toast-type",
    () => "success",
  );

  const showToast = (
    msg: string,
    status: "success" | "error" | "warning" = "success",
  ) => {
    message.value = msg;
    type.value = status;

    setTimeout(() => {
      message.value = null;
    }, 4000);
  };

  return { message, type, showToast };
};

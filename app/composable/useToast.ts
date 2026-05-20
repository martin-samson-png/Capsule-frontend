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

  const watchError = (errorRef: Ref<string | null>) => {
    watch(errorRef, (newError) => {
      if (newError) {
        showToast(newError, "error");
        setTimeout(() => {
          errorRef.value = null;
        }, 2000);
      }
    });
  };

  return { message, type, showToast, watchError };
};

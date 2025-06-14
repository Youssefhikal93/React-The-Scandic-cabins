import { useMutation } from "@tanstack/react-query";
import { signup } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useSignup() {
  const { mutate, isLoading } = useMutation({
    mutationFn: signup,
    onSuccess: () => {
      toast.success("Please verfiy the new account from the user's email");
    },
    onError: (err) => {
      toast.error(err);
    },
  });

  return { mutate, isLoading };
}

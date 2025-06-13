// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { login } from "../../services/apiAuth";
// import toast from "react-hot-toast";
// import { useNavigate } from "react-router-dom";

// export function useLogin() {
//   const queryClient = useQueryClient();
//   const navigate = useNavigate();
//   const { mutate, isLoading } = useMutation({
//     mutationFn: ({ email, password }) => login({ email, password }),
//     onSuccess: (data) => {
//       toast.success(`User ${data.user.email} logged in `);
//       queryClient.setQueryData(["user"], data.user);
//       navigate("/");
//     },
//     onError: (err) => {
//       console.log(err);
//       toast.error(err);
//     },
//   });

//   return { mutate, isLoading };
// }
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login } from "../../services/apiAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate, isLoading } = useMutation({
    mutationFn: ({ email, password }) => login({ email, password }),
    onSuccess: (data) => {
      toast.success(`User ${data.user.email} logged in successfully`);
      queryClient.setQueryData(["user"], data.user);
      navigate("/");
    },
    onError: (error) => {
      console.error("Login error:", error);
      // Extract the message from the error object
      const errorMessage = error?.message || "Login failed. Please try again.";
      toast.error(errorMessage);
    },
  });

  return { mutate, isLoading };
}

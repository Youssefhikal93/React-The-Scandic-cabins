import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUser } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useUpdateUser() {
  const queryClient = useQueryClient();
  const { mutate: userUpdate, isLoading: isUpdating } = useMutation({
    mutationFn: updateUser,
    onSuccess: ({ updatedUser }) => {
      //   console.log(updateUser);
      toast.success(`user  updated successfully 😁`);
      queryClient.setQueryData(["user"], updatedUser);
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
    onError: (error) => {
      console.log(error);
      toast.error("user cannot be edited.");
    },
  });

  return { userUpdate, isUpdating };
}

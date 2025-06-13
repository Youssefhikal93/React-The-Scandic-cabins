import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCabin } from "../../services/apicabins";
import toast from "react-hot-toast";

export function useDeleteCabin(name) {
  const queryClient = useQueryClient();

  const { isloading, mutate } = useMutation({
    mutationFn: (id) => deleteCabin(id),
    onSuccess: () => {
      toast.success(`Cabin ${name} deleted succesfully!`);
      queryClient.invalidateQueries({
        queryKey: ["cabin"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isloading, mutate };
}

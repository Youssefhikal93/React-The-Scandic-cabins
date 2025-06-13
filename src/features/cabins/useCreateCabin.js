import toast from "react-hot-toast";
import { createEditCabin } from "../../services/apicabins";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCreateCabin() {
  const queryClient = useQueryClient();
  const { mutate: createCabin, isLoading: isCreating } = useMutation({
    mutationFn: createEditCabin,
    onSuccess: (newCabin) => {
      toast.success(`Cabin ${newCabin[0].name} created successfully 😁`);
      queryClient.invalidateQueries({ queryKey: ["cabin"] });
    },
    onError: () => toast.error("Cabin cannot be created."),
  });

  return { createCabin, isCreating };
}

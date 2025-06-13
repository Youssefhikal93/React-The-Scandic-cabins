import toast from "react-hot-toast";
import { createEditCabin } from "../../services/apicabins";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useUpdateCabin() {
  const queryClient = useQueryClient();
  const { mutate: editCabin, isLoading: isEditing } = useMutation({
    mutationFn: ({ newCabinData, id }) => createEditCabin(newCabinData, id),
    onSuccess: (newCabin) => {
      toast.success(`Cabin ${newCabin[0].name} updated successfully 😁`);
      queryClient.invalidateQueries({ queryKey: ["cabin"] });
    },
    onError: (error) => {
      console.log(error);
      toast.error("Cabin cannot be edited.");
    },
  });

  return { editCabin, isEditing };
}

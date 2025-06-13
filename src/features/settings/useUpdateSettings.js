import toast from "react-hot-toast";
import { createEditCabin } from "../../services/apicabins";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSetting } from "../../services/apiSettings";

export function useUpdateSettings() {
  const queryClient = useQueryClient();
  const { mutate: editSetting, isLoading: isEditing } = useMutation({
    mutationFn: updateSetting,
    // onSuccess: (field) => {
    //   toast.success(`setting ${field} updated successfully 😁`);
    //   queryClient.invalidateQueries({ queryKey: ["setting"] });
    // },
    onSuccess: (_, variables) => {
      // Get the setting name that was updated
      const settingName = Object.keys(variables)[0];
      toast.success(`${settingName} updated successfully 😁`);
      queryClient.invalidateQueries({ queryKey: ["setting"] });
    },
    onError: (error) => {
      toast.error("Setting cannot be edited."), console.log(error);
    },
  });

  return { editSetting, isEditing };
}

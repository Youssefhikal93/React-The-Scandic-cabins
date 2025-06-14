import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";

export function useDeleteBooking() {
  const queryClient = useQueryClient();
  const { mutate: bookingDelete, isLoading: isDeletingBooking } = useMutation({
    mutationFn: (bookingId) => deleteBooking(bookingId),
    onSuccess: (_, bookingId) => {
      toast.success(`Booking # ${bookingId} deleted`);
      // navigate("/");
      queryClient.invalidateQueries({
        queryKey: ["booking"],
      });
    },
    onError: (err) => {
      console.log(err);
      toast.error(err.message);
    },
  });

  return { isDeletingBooking, bookingDelete };
}

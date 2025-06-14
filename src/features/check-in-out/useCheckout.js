import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";

export function useCheckout() {
  const queryClient = useQueryClient();

  const { mutate: checkout, isLoading: isCheckingOut } = useMutation({
    mutationFn: (bookingId) =>
      updateBooking(bookingId, {
        status: "checked-out",
      }),
    onSuccess: (data) => {
      toast.success(`Booking# ${data.id} has been checked-out successfully`);
      queryClient.invalidateQueries({ active: true });
      // navigate("/");
    },
    onError: (err) => {
      console.error(err);
      toast.error(`Error while checking out.`);
    },
  });

  return { checkout, isCheckingOut };
}

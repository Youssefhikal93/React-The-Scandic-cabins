import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../../services/apiAuth";

export function useAuthunticatedUser() {
  const { data: user, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: () => getCurrentUser(),
  });

  return { user, isLoading, isAuthenticated: user?.role === "authenticated" };
}

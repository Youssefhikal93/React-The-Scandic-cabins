import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { getCabins } from "../../services/apicabins";

export function useCabins() {
  const {
    isLoading,
    data: cabins,
    error,
  } = useQuery({
    queryKey: ["cabin"],
    queryFn: getCabins,
  });

  return {
    isLoading,
    data: cabins,
    error,
  };
}

// export function useCabinsInfinite() {
//   const {
//     data,
//     error,
//     fetchNextPage,
//     hasNextPage,
//     isFetching,
//     isFetchingNextPage,
//     status,
//     isLoading,
//   } = useInfiniteQuery({
//     queryKey: ["cabins-infinite"],
//     queryFn: getCabins,
//     initialPageParam: 0,
//     getNextPageParam: (lastPage) => lastPage.nextPage,
//   });

//   // Flatten all pages into a single array
//   const cabins = data?.pages?.flatMap((page) => page.cabins) || [];
//   const totalCount = data?.pages?.[0]?.count || 0;

//   return {
//     cabins,
//     totalCount,
//     error,
//     fetchNextPage,
//     hasNextPage,
//     isFetching,
//     isFetchingNextPage,
//     isLoading,
//     status,
//   };
// }

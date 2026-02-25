import { useQuery } from "@tanstack/react-query";
import { getBillingSummary, getUsageHistory } from "./actions";

export const useBillingSummary = () => {
  return useQuery({
    queryKey: ["billing-summary"],
    queryFn: getBillingSummary,
  });
};

export const useUsageHistory = () => {
  return useQuery({
    queryKey: ["usage-history"],
    queryFn: getUsageHistory,
  });
};

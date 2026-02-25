import { DASHBOARD_DATA } from "@/lib/constants";
import { mockApiCall } from "@/lib/utils";

// Mock API calls
export const getBillingSummary = () => {
  return mockApiCall(DASHBOARD_DATA.summary, "", 600);
};

export const getUsageHistory = () => {
  return mockApiCall(DASHBOARD_DATA.usageHistory, "", 600);
};

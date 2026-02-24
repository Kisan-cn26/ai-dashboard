// mockData.ts

export const DASHBOARD_DATA = {
  // "Current Bill" Section 
  summary: {
    currentBill: 14.50,      // Total cost in USD
    totalTokens: 125430,     // Total tokens used
    totalRequests: 84,       // Total AI interactions
    billingPeriod: "Oct 1 - Oct 31, 2023"
  },
  
  // Data for the "Usage Graph" 
  usageHistory: [
    {
      date: "2023-10-01",
      tokens: 4500,
      cost: 0.09,
      requests: 5
    },
    {
      date: "2023-10-02",
      tokens: 12000,
      cost: 0.24,
      requests: 12
    },
    {
      date: "2023-10-03",
      tokens: 8500,
      cost: 0.17,
      requests: 8
    },
    {
      date: "2023-10-04",
      tokens: 15300,
      cost: 0.31,
      requests: 14
    },
    {
      date: "2023-10-05",
      tokens: 3000,
      cost: 0.06,
      requests: 3
    },
    {
      date: "2023-10-06",
      tokens: 18000,
      cost: 0.36,
      requests: 18
    },
    {
      date: "2023-10-07",
      tokens: 9200,
      cost: 0.18,
      requests: 7
    }
  ]
};
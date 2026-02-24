import { StatCards } from "@/components/stats-cards";
import { Suspense } from "react";
import { Greet } from "@/components/greet";
import { UsageChart } from "@/components/usage-chat";

export default async function DashboardPage() {
  return (
    <div className="flex-1 w-full flex flex-col gap-8">
      <div className="flex flex-col">
        <span className="font-bold text-3xl">Dashboard</span>
        <Suspense>
          <Greet />
        </Suspense>
      </div>
      <StatCards />
      <UsageChart />
    </div>
  );
}

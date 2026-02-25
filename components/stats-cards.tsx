"use client";

import { Card, CardContent } from "@/components/ui/card";
import { useBillingSummary } from "@/services/hooks";
import { Zap, Coins, Hash } from "lucide-react";
import { Skeleton } from "./ui/skeleton";

export function StatCards() {
  const { data: summary, isLoading } = useBillingSummary();

  const stats = [
    {
      label: "Current Bill",
      value: `$${summary?.data.currentBill.toFixed(2)}`,
      subtitle: summary?.data.billingPeriod,
      icon: Coins,
    },
    {
      label: "Total Tokens",
      value: summary?.data.totalTokens.toLocaleString(),
      subtitle: "Tokens consumed this period",
      icon: Zap,
    },
    {
      label: "Total Requests",
      value: summary?.data.totalRequests.toString(),
      subtitle: "AI interactions this period",
      icon: Hash,
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      {isLoading &&
        Array.from(Array(3)).map((_, index) => (
          <Skeleton key={index} className="h-[122px] rounded-xl" />
        ))}
      {!isLoading &&
        stats.map((stat) => (
          <Card key={stat.label} className="border-border bg-card">
            <CardContent className="pt-0">
              <div className="flex items-start justify-between">
                <div className="flex flex-col gap-1">
                  <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    {stat.label}
                  </p>
                  <p className="text-2xl font-bold tracking-tight text-foreground">
                    {stat.value}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {stat.subtitle}
                  </p>
                </div>
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <stat.icon className="h-4 w-4 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
    </div>
  );
}

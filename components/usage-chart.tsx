"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardAction,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
} from "recharts";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { useBillingSummary, useUsageHistory } from "@/services/hooks";
import { Skeleton } from "./ui/skeleton";

const tokenChartConfig = {
  tokens: {
    label: "Tokens",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

const costChartConfig = {
  cost: {
    label: "Cost ($)",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

const requestsChartConfig = {
  requests: {
    label: "Requests",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

export function UsageChart() {
  const [view, setView] = useState<"tokens" | "cost" | "requests">("tokens");
  const { data: usageHistory, isLoading } = useUsageHistory();
  const { data: summary } = useBillingSummary();

  const chartData = usageHistory?.data.map((d) => ({
    date: new Date(d.date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    }),
    tokens: d.tokens,
    cost: d.cost,
    requests: d.requests,
  }));

  return isLoading ? (
    <Skeleton className="h-[378px]" />
  ) : (
    <Card className="border-border bg-card">
      <CardHeader>
        <div className="flex flex-col gap-1">
          <CardTitle className="text-foreground">Usage Over Time</CardTitle>
          <p className="text-xs text-muted-foreground">
            {summary?.data.billingPeriod}
          </p>
        </div>
        <CardAction>
          <Tabs value={view} onValueChange={(v) => setView(v as typeof view)}>
            <TabsList className="h-8 bg-secondary">
              <TabsTrigger
                value="tokens"
                className="text-xs px-3 h-6 data-[state=active]:bg-background data-[state=active]:text-foreground"
              >
                Tokens
              </TabsTrigger>
              <TabsTrigger
                value="cost"
                className="text-xs px-3 h-6 data-[state=active]:bg-background data-[state=active]:text-foreground"
              >
                Cost
              </TabsTrigger>
              <TabsTrigger
                value="requests"
                className="text-xs px-3 h-6 data-[state=active]:bg-background data-[state=active]:text-foreground"
              >
                Requests
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </CardAction>
      </CardHeader>
      <CardContent>
        {view === "tokens" && (
          <ChartContainer
            config={tokenChartConfig}
            className="h-[260px] w-full"
          >
            <AreaChart
              data={chartData}
              margin={{ top: 8, right: 8, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="fillTokens" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="0%"
                    stopColor="var(--color-tokens)"
                    stopOpacity={0.3}
                  />
                  <stop
                    offset="100%"
                    stopColor="var(--color-tokens)"
                    stopOpacity={0.02}
                  />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="var(--border)"
              />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={10}
                fontSize={11}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                fontSize={11}
                tickFormatter={(v) =>
                  v >= 1000 ? `${(v / 1000).toFixed(0)}K` : v
                }
              />
              <ChartTooltip
                content={<ChartTooltipContent />}
                cursor={{ stroke: "var(--border)", strokeDasharray: "4 4" }}
              />
              <Area
                dataKey="tokens"
                type="monotone"
                fill="url(#fillTokens)"
                stroke="var(--color-tokens)"
                strokeWidth={2}
                dot={false}
              />
            </AreaChart>
          </ChartContainer>
        )}

        {view === "cost" && (
          <ChartContainer config={costChartConfig} className="h-[260px] w-full">
            <AreaChart
              data={chartData}
              margin={{ top: 8, right: 8, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="fillCost" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="0%"
                    stopColor="var(--color-cost)"
                    stopOpacity={0.3}
                  />
                  <stop
                    offset="100%"
                    stopColor="var(--color-cost)"
                    stopOpacity={0.02}
                  />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="var(--border)"
              />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={10}
                fontSize={11}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                fontSize={11}
                tickFormatter={(v) => `$${v.toFixed(2)}`}
              />
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    formatter={(value) => `$${Number(value).toFixed(2)}`}
                  />
                }
                cursor={{ stroke: "var(--border)", strokeDasharray: "4 4" }}
              />
              <Area
                dataKey="cost"
                type="monotone"
                fill="url(#fillCost)"
                stroke="var(--color-cost)"
                strokeWidth={2}
                dot={false}
              />
            </AreaChart>
          </ChartContainer>
        )}

        {view === "requests" && (
          <ChartContainer
            config={requestsChartConfig}
            className="h-[260px] w-full"
          >
            <BarChart
              data={chartData}
              margin={{ top: 8, right: 8, left: 0, bottom: 0 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="var(--border)"
              />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={10}
                fontSize={11}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                fontSize={11}
              />
              <ChartTooltip
                content={<ChartTooltipContent />}
                cursor={{ fill: "var(--border)", opacity: 0.3 }}
              />
              <Bar
                dataKey="requests"
                fill="var(--color-requests)"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
}

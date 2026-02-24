"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CreditCard, ExternalLink } from "lucide-react";

const lineItems = [
  { model: "GPT-4o", tokens: "512K", cost: "$15.36" },
  { model: "GPT-4o Mini", tokens: "218K", cost: "$3.27" },
  { model: "Embeddings", tokens: "117K", cost: "$0.58" },
];

export function CurrentBill() {
  return (
    <Card className="flex flex-col border-border bg-card">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-foreground">Current Bill</CardTitle>
            <CardDescription className="mt-1">
              Billing period: Feb 1 - Feb 28
            </CardDescription>
          </div>
          <Badge
            variant="outline"
            className="text-primary border-primary/30 bg-primary/10"
          >
            Pro Plan
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col gap-5">
        <div>
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-bold tracking-tight text-foreground">
              $19.21
            </span>
            <span className="text-sm text-muted-foreground">/ $50.00</span>
          </div>
          <Progress value={38} className="mt-3 h-2" />
          <p className="mt-2 text-xs text-muted-foreground">
            38% of monthly budget used
          </p>
        </div>

        <Separator className="bg-border" />

        <div className="flex flex-col gap-3">
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Usage Breakdown
          </p>
          {lineItems.map((item) => (
            <div key={item.model} className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-sm font-medium text-foreground">
                  {item.model}
                </span>
                <span className="text-xs text-muted-foreground">
                  {item.tokens} tokens
                </span>
              </div>
              <span className="text-sm font-semibold tabular-nums text-foreground">
                {item.cost}
              </span>
            </div>
          ))}
        </div>

        <Separator className="bg-border" />

        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-muted-foreground">
            Estimated month-end
          </span>
          <span className="text-sm font-bold text-foreground">$34.82</span>
        </div>
      </CardContent>
      <CardFooter className="flex gap-2 border-t border-border pt-5">
        <Button
          variant="secondary"
          className="flex-1 bg-secondary text-secondary-foreground"
        >
          <CreditCard className="mr-2 h-4 w-4" />
          Payment Method
        </Button>
        <Button variant="ghost" size="icon" className="text-muted-foreground">
          <ExternalLink className="h-4 w-4" />
          <span className="sr-only">View full billing</span>
        </Button>
      </CardFooter>
    </Card>
  );
}

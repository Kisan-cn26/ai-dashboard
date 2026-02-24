import React, { Suspense } from "react";
import { AuthButton } from "./auth-button";

export const DashboardNav = () => {
  return (
    <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
      <div className="w-full max-w-5xl flex justify-between items-center p-3 px-5 text-sm">
        <span className="text-xl font-bold">AI App</span>
        <Suspense>
          <AuthButton />
        </Suspense>
      </div>
    </nav>
  );
};

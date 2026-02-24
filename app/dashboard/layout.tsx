import { DashboardNav } from "@/components/dashboard-nav";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen flex flex-col items-center">
      <div className="flex-1 w-full flex flex-col gap-4 items-center">
        <DashboardNav />
        <div className="flex-1 flex flex-col gap-20 max-w-5xl p-5 w-full">
          {children}
        </div>
      </div>
    </main>
  );
}

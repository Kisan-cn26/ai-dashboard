import { Nav } from "@/components/nav";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center">
      <Nav />
      <div className="flex-1 w-full flex flex-col gap-20 items-center justify-center">
        <div className="text-xl">Login to see Dashboard</div>
      </div>
    </main>
  );
}

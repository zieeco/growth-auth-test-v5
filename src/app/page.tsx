import Image from "next/image";

export default function Home() {
  const currentYear = new Date().getFullYear();
  return (
    <main className="flex flex-col items-center gap-6 px-3 py-10">
      <h1 className="text-center text-4xl font-bold">{`Growth-${currentYear} Auth Dem`}</h1>
      <h2 className="text-center text-2xl font-semibold">Users</h2>
      {/* TODO: Display users here */}
    </main>
  );
}

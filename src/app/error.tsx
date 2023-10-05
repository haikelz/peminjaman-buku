"use client";

export default function ErrorPage() {
  return (
    <main className="flex justify-center items-center min-h-screen w-full">
      <section className="text-center">
        <h1 className="font-bold text-2xl">500 Server Error!</h1>
        <p className="mt-1 text-lg font-medium">Maaf, sepertinya ada kesalahan di sisi server!</p>
      </section>
    </main>
  );
}

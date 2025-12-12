"use client";

export default function About() {
  return (
    <div className="bg-[#020914] min-h-screen text-white p-6 flex flex-col items-center">
      <div className="w-full max-w-4xl space-y-10 mt-10">

        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-bold text-center">
          About WanderWiz
        </h1>

        <p className="text-lg text-center leading-relaxed max-w-2xl mx-auto">
          WanderWiz is an AI-powered travel discovery tool designed to help you
          find fun, smart, and personalized activities based on where you're
          traveling.
        </p>

        {/* What is WanderWiz */}
        <section className="bg-[#111827] border-white rounded-2xl p-6 md:p-8 space-y-4 shadow-lg">
          <h2 className="text-2xl font-semibold">What is WanderWiz?</h2>
          <p className="text-base leading-relaxed">
            WanderWiz lets you type any destination using intelligent Google Maps
            autocomplete. Then choose categories like nightlife, sightseeing,
            restaurants, nature, or shopping. Using live Google Maps data plus
            AI-generated analysis, WanderWiz gives you fast, personalized
            recommendations crafted for your trip.
          </p>
        </section>

        {/* Features */}
        <section className="bg-[#111827] border-white rounded-2xl p-6 md:p-8 space-y-4 shadow-lg">
          <h2 className="text-2xl font-semibold">Features</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Google Maps powered destination autocomplete</li>
            <li>Interest-based travel recommendation categories</li>
            <li>AI-generated summaries for each place</li>
            <li>Photos, ratings, hours, and quick Google Maps links</li>
            <li>Fast and modern UI built with Next.js + Tailwind CSS</li>
          </ul>
        </section>

        {/* Team */}
        <section className="bg-[#111827] border-white rounded-2xl p-6 md:p-8 space-y-4 shadow-lg">
          <h2 className="text-2xl font-semibold">Meet the Team</h2>
          <p className="text-base">
            WanderWiz was created by:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Mitali Vaid</li>
            <li>Anderson Neves</li>
            <li>Aashish Arun</li>
            <li>Jasprit Grewal</li>
          </ul>
        </section>

        {/* Tech Stack */}
        <section className="bg-[#111827] border-white rounded-2xl p-6 md:p-8 space-y-4 shadow-lg">
          <h2 className="text-2xl font-semibold">Technology Stack</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Next.js with React</li>
            <li>Tailwind CSS</li>
            <li>Vercel / Firebase</li>
            <li>Google Maps Places API</li>
            <li>OpenAI API</li>
            <li>GitHub for version control</li>
          </ul>
        </section>

      </div>
    </div>
  );
}

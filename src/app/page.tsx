import LandingHero from "@/components/landing/LandingHero";
import LandingSections from "@/components/landing/LandingSections";

export default function LandingPage() {
  return (
    <div className="space-y-10">
      <LandingHero />
      <LandingSections />
    </div>
  );
}

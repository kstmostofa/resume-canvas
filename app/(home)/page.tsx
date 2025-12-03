import { BuyMeCoffee } from "@/components/home/buy-me-coffee";
import { CTA } from "@/components/home/cta";
import { Features } from "@/components/home/features";
import { Hero } from "@/components/home/hero";
import { Testimonials } from "@/components/home/testimonials";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <>
      <main className="flex min-h-screen flex-col">
        <Hero />
        <Features />
        <Testimonials />
        <CTA />
        <BuyMeCoffee />
      </main>
      <Footer />
    </>
  );
}

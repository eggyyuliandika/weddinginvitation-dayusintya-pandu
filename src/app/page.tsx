import { Suspense } from "react";
import Hero from "@/components/Hero";
import Countdown from "@/components/Countdown";
import Couple from "@/components/Couple";
import Event from "@/components/Event";
import Gallery from "@/components/Gallery";
import Gift from "@/components/Gift";
import GuestBook from "@/components/GuestBook";
import MusicPlayer from "@/components/MusicPlayer";
import FloatingNav from "@/components/FloatingNav";
import QuoteSection from "@/components/QuoteSection";
import Maps from "@/components/Maps";

interface Props {
  params: Promise<{ nama: string }>;
}

export default async function UndanganPage({ params }: Props) {
  const { nama } = await params;
  const guestName = decodeURIComponent(nama).replace(/-/g, " ");

  return (
    <main>
      <Suspense fallback={null}>
        <Hero guestName={guestName} />
      </Suspense>
      <QuoteSection />
      <Couple />
      <Countdown />
      <Event />
      <Maps />
      <Gallery />
      <Gift />
      <GuestBook guestName={guestName} />
      <FloatingNav />
      <MusicPlayer />
    </main>
  );
}

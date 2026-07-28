"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function FloatingNav() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleOpened = () => setVisible(true);
    window.addEventListener("invitation:opened", handleOpened);
    return () => {
      window.removeEventListener("invitation:opened", handleOpened);
    };
  }, []);

  return (
    <div
      className={`fixed bottom-5 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ${
        visible
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 translate-y-10 pointer-events-none"
      }`}
    >
      <div className="bg-white shadow-xl rounded-full px-6 py-3 flex gap-6">
        <Link href="#home">Home</Link>

        <Link href="#event">Acara</Link>

        <Link href="#gallery">Galeri</Link>

        <Link href="#guestbook">RSVP</Link>
      </div>
    </div>
  );
}

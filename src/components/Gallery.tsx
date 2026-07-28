"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const photos = [
  "/images/image1.jpg",
  "/images/image2.jpg",
  "/images/image3.jpg",
  "/images/image4.jpg",
  "/images/image5.jpg",
  "/images/image6.jpg",
  "/images/image7.jpg",
  "/images/image8.jpg",
  "/images/image9.jpg",
  "/images/image10.jpg",
  "/images/image11.jpg",
  "/images/image12.jpeg",
  "/images/image13.jpg",
  "/images/image14.jpg",
  "/images/image15.jpg",
  "/images/image16.jpg",
  "/images/image17.jpg",
  "/images/image18.jpg",
  "/images/image19.jpg",
  "/images/image20.jpg",
  "/images/image21.jpg",
  "/images/image22.jpg",
  "/images/image23.jpg",
];

// Tinggi bervariasi biar terlihat dinamis, seperti masonry Pinterest
const heights = [
  "h-64", // besar
  "h-48",
  "h-56",
  "h-44",
  "h-60",
  "h-48",
  "h-52",
  "h-64",
];

export default function Gallery() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  const getRandomPhotos = () => {
    return [...photos].sort(() => Math.random() - 0.5).slice(0, 8);
  };

  const [displayPhotos, setDisplayPhotos] = useState(getRandomPhotos());
  const [visible, setVisible] = useState(true);
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0.2 },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isInView) return;

    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setDisplayPhotos(getRandomPhotos());
        setVisible(true);
      }, 500);
    }, 4000);

    return () => clearInterval(interval);
  }, [isInView]);

  return (
    <section ref={sectionRef} className="py-20 bg-neutral-50" id="gallery">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-[#8a7666] text-xs sm:text-sm tracking-[0.2em] uppercase mb-2">
            Our Moments
          </p>
          <h2 className="text-4xl sm:text-5xl font-serif italic text-[#6b5647]">
            Gallery
          </h2>
          <div className="w-10 h-[1px] bg-[#c9a87c] mx-auto mt-4" />
        </div>

        {/* True masonry pakai CSS columns — tidak akan ada celah kosong */}
        <div
          className={`
            columns-2 sm:columns-3 gap-2 sm:gap-4
            transition-all duration-500
            ${visible ? "opacity-100 scale-100" : "opacity-0 scale-95"}
          `}
        >
          {displayPhotos.map((photo, index) => (
            <button
              key={`${photo}-${index}`}
              onClick={() => setSelectedPhoto(photo)}
              className={`group relative block w-full overflow-hidden rounded-xl sm:rounded-2xl mb-2 sm:mb-4 break-inside-avoid ${heights[index]}`}
            >
              <Image
                src={photo}
                alt="gallery"
                fill
                className="object-cover object-center group-hover:scale-110 transition duration-700"
                sizes="(max-width: 640px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
            </button>
          ))}
        </div>
      </div>

      {selectedPhoto && (
        <div
          onClick={() => setSelectedPhoto(null)}
          className="fixed inset-0 z-[60] bg-black/80 flex items-center justify-center px-4 cursor-zoom-out"
        >
          <div className="relative w-full max-w-lg aspect-[3/4]">
            <Image
              src={selectedPhoto}
              alt="gallery preview"
              fill
              className="object-contain"
            />
          </div>
        </div>
      )}
    </section>
  );
}

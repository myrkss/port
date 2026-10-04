import Image from "next/image";
import poster from "@/public/assets/visual-poster.webp";
import plakat2 from "@/public/assets/visual-plakat2.webp";

const works = [
  {
    src: poster,
    alt: "mm44 poster: a masked figure in a black +52 t-shirt above a distorted mm44 logo on white",
  },
  {
    src: plakat2,
    alt: "mm44 poster: a blurred figure in a black balaclava and black t-shirt, seen in profile, above a distorted mm44 logo on white",
  },
];

export function Archive() {
  return (
    <section id="archive" className="tone-dark snap overflow-x-clip pb-24 lg:pb-40">
      <div className="shell grid-12 gap-y-6 pt-24 lg:pt-28">
        <p className="label text-fg lg:col-span-2 lg:pt-3">04 / archive</p>
        <div className="md:col-span-6 lg:col-span-10">
          <h2 data-reveal="fade" className="display text-[clamp(2.75rem,9.4vw,10.5rem)]">
            <span className="block">visual</span>
            <span className="block lg:pl-[1.2em]">experiments</span>
          </h2>
          <p className="label mt-6 lg:pl-[calc((100%-216px)/10*2+48px)]">graphic / poster / identity</p>
        </div>
      </div>

      {/* one row of identical frames; contain keeps each poster's full composition */}
      <div className="shell grid-12 mt-16 lg:mt-24">
        <div className="grid grid-cols-1 gap-5 md:col-span-6 md:grid-cols-2 lg:col-span-10 lg:col-start-3 lg:gap-6">
          {works.map((work) => (
            <figure key={work.alt}>
              <div data-reveal="clip" data-cursor className="media aspect-[7/10] border border-line">
                <Image
                  src={work.src}
                  alt={work.alt}
                  fill
                  sizes="(min-width: 1440px) 550px, (min-width: 1024px) 39vw, (min-width: 768px) 46vw, 100vw"
                  className="media-img object-contain"
                />
              </div>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

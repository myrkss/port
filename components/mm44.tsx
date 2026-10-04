import Image from "next/image";
import logo from "@/public/assets/mm44-logo.png";
import look from "@/public/assets/mm44-look.webp";
import hoodie from "@/public/assets/mm44-hoodie.webp";
import motion from "@/public/assets/mm44-motion.webp";
import weAreCloth from "@/public/assets/mm44-we-are-cloth.png";

const involvement = [
  "brand development",
  "clothing design",
  "visual identity",
  "graphic design",
  "content",
  "social media promotion",
  "video / photography",
  "digital promotion",
];

export function Mm44() {
  return (
    <section id="mm44" className="tone-dark overflow-x-clip">
      {/* opening: oversized logo */}
      <div className="snap shell flex min-h-svh flex-col justify-between gap-16 pb-10 pt-24 lg:pb-14 lg:pt-28">
        <div className="label grid-12 gap-y-1 border-b border-line pb-3">
          <p className="text-fg lg:col-span-1">03</p>
          <p className="md:col-span-2 lg:col-span-4">independent clothing / visual identity</p>
        </div>

        <h2 data-reveal="clip">
          <Image src={logo} alt="mm44" sizes="(min-width: 1440px) 1352px, 100vw" className="h-auto w-full" />
        </h2>

        <div className="grid-12 items-end gap-y-8">
          <p className="display text-[clamp(1.75rem,3.6vw,3.5rem)] md:col-span-4 lg:col-span-6">
            independent clothing project
          </p>
          <Image
            src={weAreCloth}
            alt="we are cloth"
            unoptimized
            className="pixelated h-auto w-64 md:col-span-2 md:justify-self-end lg:col-span-4 lg:col-start-9 lg:w-96"
          />
        </div>
      </div>

      {/* full-width look */}
      <figure className="relative">
        <div data-reveal="clip" data-cursor className="media aspect-[4/5] md:aspect-auto md:h-[115svh]">
          <div data-parallax className="parallax">
            <Image
              src={look}
              alt="mm44 look: a person seen from behind in a black t-shirt with a mexican flag print, standing in a sand quarry"
              fill
              sizes="(min-width: 768px) 115vw, 200vw"
              placeholder="blur"
              className="object-cover object-[22%_center]"
            />
          </div>
        </div>
        <figcaption className="label shell flex justify-between pt-3">
          <span>look / +52</span>
          <span>photography</span>
        </figcaption>
      </figure>

      {/* product + motion, on paper */}
      <div className="tone-light mt-24 lg:mt-40">
        <div className="shell grid-12 gap-y-14 py-20 lg:py-32">
          <figure className="md:col-span-6 lg:col-span-8">
            <div data-reveal="fade" data-cursor className="media -mx-(--gutter) md:mx-0">
              <Image
                src={hoodie}
                alt="mm44 hoodie, front and back: washed black with a red script logo on the chest and a grid of red symbols on the back"
                sizes="(min-width: 1440px) 900px, (min-width: 1024px) 66vw, 100vw"
                className="media-img h-auto w-full mix-blend-multiply"
              />
            </div>
            <figcaption className="label mt-3 flex justify-between">
              <span>hoodie</span>
              <span>front / back</span>
            </figcaption>
          </figure>

          <figure className="w-3/4 justify-self-end md:col-span-3 md:col-start-4 md:w-full lg:col-span-4 lg:col-start-9 lg:mt-[55%]">
            <div data-reveal="fade">
              <Image
                src={motion}
                alt="rotating three-dimensional mm44 logo"
                unoptimized
                className="h-auto w-full"
              />
            </div>
            <figcaption className="label mt-3 flex justify-between border-t border-line pt-3">
              <span>logo</span>
              <span>3d / motion</span>
            </figcaption>
          </figure>
        </div>
      </div>

      {/* oversized type crossing the page */}
      <div className="py-20 lg:py-32">
        <p
          data-drift="160"
          aria-hidden="true"
          className="display -ml-[6vw] select-none whitespace-nowrap text-[clamp(8rem,34vw,34rem)] leading-[0.8]"
        >
          mm44 mm44
        </p>

        <div className="shell grid-12 mt-16 gap-y-6 lg:mt-24">
          <p className="label lg:col-span-2">involvement</p>
          <ul className="grid grid-cols-1 border-t border-line font-mono text-xs sm:grid-cols-2 sm:gap-x-5 md:col-span-6 lg:col-span-10 lg:gap-x-6 lg:text-sm">
            {involvement.map((item, index) => (
              <li key={item} className="flex gap-6 border-b border-line py-3">
                <span className="text-muted">{String(index + 1).padStart(2, "0")}</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

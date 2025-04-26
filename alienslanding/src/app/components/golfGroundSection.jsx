import Image from "next/image";

const GolfSection = () => {
  return (
    <div className="relative w-full h-screen bg-[#0b1e0b] overflow-hidden text-white font-light">
      {/* Background image with grunge mask (use the uploaded image as a full image) */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/golf-ground.png" // Make sure this matches your actual file path
          alt="Golf Ground"
          layout="fill"
          objectFit="cover"
          quality={100}
          className="mix-blend-normal"
        />
        <div className="absolute inset-0 bg-black/30" />
      </div>

      <div className="relative z-10 h-full flex flex-col justify-between py-16 px-6 md:px-16">
        {/* Top Heading */}
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-5xl font-light leading-snug">
            Embrace a lifestyle where <br />
            <span className="text-[#c9a164]">the harmony of nature</span> and <br />
            the comforts of modern <br />
            living intertwine
          </h1>
        </div>

        {/* Description & Button */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl mx-auto mt-10 text-sm md:text-base leading-relaxed">
          <p className="px-2 md:px-0">
            The blooming forest beckons with its captivating allure, promising an idyllic haven where nature’s grandeur and <span className="text-[#c9a164]">luxury living</span> converge seamlessly amidst the natural oasis, one can truly “get high on Oxygen”.
          </p>
          <div className="flex flex-col justify-between">
            <p className="px-2 md:px-0">
              Breathing in the pure, invigorating air that permeates the lush greenery, offering a sanctuary of rejuvenation.
            </p>
            <div className="mt-6 md:mt-12">
              <button className="border border-[#c9a164] text-[#c9a164] px-6 py-2 rounded-md hover:bg-[#c9a164] hover:text-black transition duration-300">
                BOOK A SITE VISIT
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GolfSection;

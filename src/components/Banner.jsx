// Banner.jsx
import profilePhoto from "../assets/Headshot.jpg";

export default function Banner() {
  return (
    <section>
      <div className="container m-auto px-4 pt-12 pb-12 sm:pt-20 flex flex-col sm:flex-row gap-6 text-center sm:text-left">
        <div>
          <h2 className="font-bold text-4xl">Hello, I'm Luke,</h2>
          <div>
            <h2 className="font-bold text-4xl mt-1 gradiant-text">
              Web Developer
            </h2>
          </div>
          <div>
            <p className="mt-4 text-gray-400">
              Greetings! My name is Luke. I am a web developer seeking out my
              next opportunity to learn, grow and build. When I'm not coding,
              you can find my in the gym, enjoying a Jackie Chan flick, or
              playing with my beloved dog, Peach.
            </p>

            <a
              href="https://github.com/lukejohnsen/professional-portfolio/blob/main/src/assets/Luke_Johnsen_CV_.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 shadow-gray-500 shadow-md py-5 mt-5 bg-gradient-to-t from-blue-500 rounded-full to-cyan-500 hover:from-blue-700 hover:to-cyan-700"
            >
              Download resume
            </a>
          </div>
        </div>
        <div className="relative">
          <div>
            <img
              src={profilePhoto}
              className="relative z-10 w-[280px] m-auto sm:w-[600px] rounded-full border border-blue-500"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

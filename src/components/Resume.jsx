export default function Resume() {
    return (
      <section className="py-8" id="aboutme">
        <div className="container m-auto px-4">
          <h2 className="text-2xl font-semibold">About me</h2>
          <div className="mt-12 relative before:absolute before:top-0 before:left-16 before:rounded-full before:bottom-10 sm:before:bottom-2 before:w-1 before:bg-white">
            <div className="pl-24 relative before:w-4 before:h-4 before:bg-gradient-to-t before:from-blue-500 before:to-cyan-500 before:absolute before:rounded-full before:left-[58px]">
              <h3 className="left-0 text-lg font-semibold">November 2021</h3>
              <p>
                Graduated from the University of Arizona's Full Stack Web Development Bootcamp.
              </p>
            </div>
            <div className="pl-24 mt-24 relative before:w-4 before:h-4 before:bg-gradient-to-t before:from-blue-500 before:to-cyan-500 before:absolute before:rounded-full before:left-[58px]">
              <h3 className="left-0 text-lg font-semibold">2022 - 2023</h3>
              <p>
                Freelance Web Developer: worked on various independant projects, including the Tucson Terror in the Corn website build.
              </p>
            </div>
            <div className="pl-24 mt-24 relative before:w-4 before:h-4 before:bg-gradient-to-t before:from-blue-500 before:to-cyan-500 before:absolute before:rounded-full before:left-[58px]">
              <h3 className="left-0 text-lg font-semibold">May 2023</h3>
              <p>
                Hired as La Frontera Inc.'s full-time Web Developer while continuing to freelance on other web development projects.
              </p>
            </div>
          </div>
        </div>
      </section>
    );
}
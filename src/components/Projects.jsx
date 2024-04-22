import Project1 from "../assets/project1.png";
import Project2 from "../assets/project2.png";
import Project3 from "../assets/project3.png";
import Project4 from "../assets/project4.png";

export default function Projects() {
  return (
    <section id="projects">
      <div className="container m-auto px-4 sm:py-12">
        <h2 className="text-2xl font-semibold">Projects</h2>
        <div className="flex flex-col sm:flex-row gap-10 mt-11">
          <div className="border border-gray-500 rounded-md p-5 flex-1 flex flex-col">
            <div className="flex-grow">
              <img src={Project1} className="w-full h-auto" />
              <h3 className="text-2xl font-semibold mt-8">
                Tucson International Mariachi Conference (TIMC) Registration
                Form & Database
              </h3>
              <p className="text-gray-400 text-sm mt-2">
                Responsive HTML/CSS layout for online registration for TIMC 2024
                with Stripe API integration for payments. MySQL database with a
                PHP server. HTML5, CSS3, JavaScript (jQuery), PHP and MySQL.
              </p>
            </div>
            <div className="mt-3">
              <a
                className="flex justify-center text-sm py-3 bg-gradient-to-t from-blue-500 rounded-full to-cyan-500 hover:from-blue-700 hover:to-cyan-700"
                href="https://www.tucsonmariachi.org/register-group/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Live preview
              </a>
            </div>
          </div>
          <div className="border border-gray-500 rounded-md p-5 flex-1 flex flex-col">
            <img src={Project2} className="w-full h-auto" />
            <h3 className="text-2xl font-semibold mt-8">
              Tucson Terror in the Corn WordPress Theme
            </h3>
            <p className="text-gray-400 text-sm mt-2">
              Responsive HTML/CSS layout for WordPress theme for Halloween
              haunted house attraction. (Note: This site has been updated since
              my original work on it.). HTML, CSS, JavaScript, Bootstrap.
            </p>
            <div className="flex gap-2 mt-12">
              <a
                className="flex justify-center text-sm py-3 bg-gradient-to-t from-blue-500 rounded-full to-cyan-500 hover:from-blue-700 hover:to-cyan-700 w-full"
                href="https://tucsonterrorinthecorn.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Live preview
              </a>
            </div>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row  gap-10 mt-11">
          <div className="border border-gray-500 rounded-md p-5 flex-1 flex flex-col">
            <div className="flex-grow">
              <img src={Project3} className="w-full h-auto" />
              <h3 className="text-2xl font-semibold mt-8">
                Portfolio Single Page Application (SPA)
              </h3>
              <p className="text-gray-400 text-sm mt-2">
                Responsive single page application with built in ReactJS with
                HTML, CSS and JavaScript.
              </p>
            </div>
            <div className="flex gap-2 mt-12">
              <a
                className="flex-1 text-sm text-center py-3 border rounded-full hover:border-blue-500 hover:text-blue-500"
                href="https://github.com/lukejohnsen/professional-portfolio"
                target="_blank"
                rel="noopener noreferrer"
              >
                Checkout github
              </a>
            </div>
          </div>
          <div className="border border-gray-500 rounded-md p-5 flex-1">
            <img src={Project4} className="w-full h-auto" />
            <h3 className="text-2xl font-semibold mt-8">
              RenDATEvous date-night randomizer.
            </h3>
            <p className="text-gray-400 text-sm mt-2">
              Date randomizer for couples looking for ways to have fun in their
              city. Application built with ReactJS, Node.js, Express (GraphQL),
              and MongoDB. (Note: application is currently not live.)
            </p>
            <div className="flex gap-2 mt-12">
              <a
                className="flex-1 text-sm text-center py-3 border rounded-full hover:border-blue-500 hover:text-blue-500"
                href="https://github.com/Blitman12/ren-date-vous"
                target="_blank"
                rel="noopener noreferrer"
              >
                Checkout github
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

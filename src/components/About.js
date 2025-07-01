import React from "react";

const About = () => {
  return (
    <section id="about" className="section-padding bg-gray-50">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="order-2 lg:order-1">
            <div className="relative">
              <div className="w-full h-96 bg-gradient-to-br from-primary-600 to-purple-600 rounded-2xl shadow-2xl overflow-hidden">
                {/* Placeholder for profile image */}
                <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                  <svg
                    className="w-32 h-32 text-gray-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary-500 rounded-full opacity-20"></div>
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-purple-500 rounded-full opacity-20"></div>
            </div>
          </div>

          {/* Content */}
          <div className="order-1 lg:order-2">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              About <span className="text-gradient">Me</span>
            </h2>

            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              I’m a self-taught full-stack developer who’s been learning since I
              was 15, with four years of college studying Computing. I don’t
              have much formal work experience yet, but I’ve built web apps,
              Discord bots, utility programs, APIs, IDE extensions, and done
              Java development.
            </p>

            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              I like solving complicated problems and turning them into simple,
              clean, easy-to-use solutions. I’m not interested in making
              tutorials or teaching publicly, but I’m a big believer in open
              source and contributing code where I can.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-600 mb-1">
                  N/A
                </div>
                <div className="text-sm text-gray-600">Projects Completed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-600 mb-1">
                  8+
                </div>
                <div className="text-sm text-gray-600">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-600 mb-1">
                  N/A
                </div>
                <div className="text-sm text-gray-600">Happy Clients</div>
              </div>
            </div>

            {/* Download CV Button */}
            <button className="btn-primary hover:scale-105 transform transition-all duration-200">
              Download CV
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

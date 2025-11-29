import React from "react";

const About = () => {
  return (
    <section id="about" className="section-padding bg-gray-50">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
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
                  8+
                </div>
                <div className="text-sm text-gray-600">Years Experience</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

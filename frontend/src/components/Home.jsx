import React, { useEffect, useState } from "react";
import hero1 from "../assets/images/hero-slider-1.jpg";
import hero2 from "../assets/images/hero-slider-2.jpg";
import hero3 from "../assets/images/hero-slider-3.jpg";
import hero0 from "../assets/images/hero-icon.png";
import { FaArrowAltCircleRight } from "react-icons/fa";
import "./template.css";
import NavigationBar from "./NavigationBar";
const Home = () => {
  const [currentSlidePos, setCurrentSlidePos] = useState(0);
  const heroSliderItems = [hero1, hero2, hero3];

  const slideNext = () => {
    setCurrentSlidePos((prevPos) =>
      prevPos >= heroSliderItems.length - 1 ? 0 : prevPos + 1
    );
  };

  const slidePrev = () => {
    setCurrentSlidePos((prevPos) =>
      prevPos <= 0 ? heroSliderItems.length - 1 : prevPos - 1
    );
  };

  useEffect(() => {
    const autoSlideInterval = setInterval(() => {
      slideNext();
    }, 7000);

    return () => {
      clearInterval(autoSlideInterval);
    };
  }, []);

  return (
    <section>
      <NavigationBar />
      <main>
        <article>
          <section className="hero text-center" aria-label="home" id="home">
            <ul className="hero-slider" data-hero-slider>
              {heroSliderItems.map((hero, index) => (
                <li
                  key={index}
                  className={`slider-item ${
                    index === currentSlidePos ? "active" : ""
                  }`}
                  data-hero-slider-item
                >
                  <div className="slider-bg">
                    <img
                      src={hero}
                      width="1880"
                      height="950"
                      alt=""
                      className="img-cover"
                    />
                  </div>

                  <div className="slider-content">
                    <p className="label-2 section-subtitle slider-reveal">
                      WELCOME to
                    </p>
                    <h1 className="display-1 hero-title slider-reveal">
                      FeastFinder
                    </h1>
                    <p className="body-2 hero-text slider-reveal">
                      one place for all the restaurants in lebanon
                    </p>
                    <a href="#" className="btn btn-primary slider-reveal">
                      <span className="text text-1"> start browising</span>
                      <span className="text text-2" aria-hidden="true">
                        start browising
                      </span>
                    </a>
                  </div>
                </li>
              ))}
            </ul>

            <a href="#" className="hero-btn has-after">
              <img src={hero0} width="48" height="48" alt="booking icon" />

              <span className="label-2 text-center span">Start browising</span>
            </a>
          </section>
        </article>
      </main>
    </section>
  );
};
export default Home;

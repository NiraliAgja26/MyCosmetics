import React from 'react';
import { Carousel } from 'react-bootstrap';

function HeroCarousel() {
  return (
    <Carousel className="hero-carousel" fade>
      <Carousel.Item>
        <img className="d-block w-100" src="/images/banner1.jpg" alt="Banner 1" />
        <Carousel.Caption>
          <h3>Welcome to Cosmetics</h3>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100" src="/images/banner2.jpg" alt="Banner 2" />
        <Carousel.Caption>
          <h3>Discover New Shades</h3>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100" src="/images/banner3.jpg" alt="Banner 3" />
        <Carousel.Caption>
          <h3>Best Sellers</h3>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default HeroCarousel;
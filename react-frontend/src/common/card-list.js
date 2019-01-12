import React from 'react';
import Slider from 'react-slick';
import styled from 'styled-components';
import CarbnbCard from './card';

const Wrapper = styled.div`
  margin: 1rem;
  .slick-prev {
    left: 3% !important;
    z-index: 1;
  }
  .slick-next {
    right: 3% !important;
    z-index: 1;
  }
`;
const Title = styled.div`
  display: flex;
`;
const Container = styled.div`
  display: flex;
`;
const Province = styled.div`
  display: flex;
  width: 50%;
  justify-content: flex-start;
  align-items: center;
  margin-left: 2%;
`;
const Link = styled.div`
  display: flex;
  width: 50%;
  justify-content: flex-end;
  align-items: center;
`;

export default (props) => {
  const { province, link, cards } = props;
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    arrows: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <Wrapper>
      <Title>
        <Province>
          <h1>
            {province}
          </h1>
        </Province>
        <Link href={link}>
          <a href={link}>
            See more
          </a>
        </Link>
      </Title>
      <Slider {...settings}>
        {cards.map((card, idx) => (
          // eslint-disable-next-line
          <Container key={idx}>
            <CarbnbCard
              infoName={card.infoName}
              infoDate={card.indfoDate}
              name={card.name}
              price={card.price}
              location={card.location}
              view={card.view}
              isShowHeader
            />
          </Container>
        ))}
      </Slider>
    </Wrapper>
  );
};

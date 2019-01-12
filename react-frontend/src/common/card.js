import React from 'react';
import styled from 'styled-components';

const Card = {
  Container: styled.div`
    width: 16rem;
    display: flex;
    flex-direction: column;
    margin-left: 1rem;
    margin-right: 1rem;
  `,
  Header: styled.div`
    display: flex;
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
    .profile {
      width: 3rem;
      height: 3rem;

      .profile-image {
        max-width: 100%;
        max-height: 100%;
        border-radius: 50%;
      }
    }
    .info-container {
      display: flex;
      flex-direction: column;
      margin-left: 0.5rem;
      margin-top: 0.25rem;
      margin-bottom: 0.25rem;

      .info-name {
        font-size: 1rem;
        font-weight: bold;
        color: ${props => props.theme.green};
      }

      .info-date {
        font-size: 0.875rem;
        font-weight: 300;
        color: ${props => props.theme.gray};
      }
    }
  `,
  Body: styled.div`
    height: 10rem;
    border-radius: 0.5rem;
    .banner {
      max-width: 100%;
    }
  `,
  Title: styled.div`
    display: flex;
    margin-top: 0.5rem;
    font-size: 1rem;
    justify-content: space-between;
    .name {
      font-weight: bold;
      /* font-color: ${props => props.theme.green}; */
    }
    .price {
      font-weight: 500;
      /* font-color: ${props => props.theme.black}; */
      text-align: right;
    }
  `,
  Content: styled.div`
    display: flex;
    margin-top: 0.25rem;
    font-size: 1rem;
    font-weight: 300;
    justify-content: space-between;
    color: ${props => props.theme.black};
    /* .views {
      .text-align: right;
      .views-icon {
        margin-right: 0.375rem;
      }
    } */
  `,
};
const CarbnbCard = ({
  isShowHeader,
  infoName,
  infoDate,
  name,
  price,
  view,
  location,
}) => (
  <Card.Container>
    {isShowHeader && (
      <Card.Header>
        <div className="profile">
          <img
            className="profile-image"
            src="https://placekitten.com/48/48"
            alt="Cattt"
          />
        </div>
        <div className="info-container">
          <div className="info-name">{infoName}</div>
          <div className="info-date">
            Last updated on
            {infoDate}
          </div>
        </div>
      </Card.Header>
    )}
    <Card.Body>
      <img
        className="banner"
        src="https://placekitten.com/343/200"
        alt="Cattt"
      />
    </Card.Body>
    <Card.Title>
      <div className="name">{name}</div>
      <div className="price">{price}</div>
    </Card.Title>
    <Card.Content>
      <div>{location}</div>
      <div className="views">
        <img
          className="views-icon"
          src={`${process.env.PUBLIC_URL}/asset/image/image-1.png`}
          srcSet={`${process.env.PUBLIC_URL}/asset/image/image-1@2x.png 2x,
            ${process.env.PUBLIC_URL}asset/image/image-1@3x.png 3x`}
          alt="views"
        />
        {view}
      </div>
    </Card.Content>
  </Card.Container>
);

export default CarbnbCard;

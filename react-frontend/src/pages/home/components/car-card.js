import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const CardContainer = styled.div`
  width: 100%;
`;

const ImageContainer = styled.div`
  width: 100%;
  height: 200px;
  border-radius: 8px;
  overflow: hidden;
  position: relative;
  background-color: ${props => props.theme.lightGray};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Image = styled.img`
  height: 100%;
  width: 100%;
  object-fit: cover;
`;

const InfoRow = styled.div`
  width: 100%;
  margin-top: 4px;
  display: flex;
  justify-content: space-between;
  :first-child {
    margin-top: 8px;
  }
`;

const InfoContainer = styled.div`
  font-weight: 300;
  width: 100%;
`;

const GreenText = styled.span`
  color: ${props => props.theme.green};
`;

const BoldText = styled.span`
  font-weight: 500;
`;

const Icon = styled.img`
  width: 14px;
  height: 14px;
  margin-right: 6px;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
`;

const DesktopContainer = styled.span`
  @media screen and (max-width: 600px) {
    display: none;
  }
`;

const CarCard = ({
  id,
  image,
  name,
  price,
  location,
  usedAmount,
}) => (
  <CardContainer>
    <Link to={`/car/${id}`}>
      <ImageContainer>
        <Image src={image} />
      </ImageContainer>
    </Link>
    <InfoContainer>
      <InfoRow>
        <Link to={`/car/${id}`}><BoldText><GreenText>{name}</GreenText></BoldText></Link>
        <div>
          <BoldText>
            <span>฿</span>
            {price}
            <DesktopContainer> ‎per day</DesktopContainer>
          </BoldText>
        </div>
      </InfoRow>
      <InfoRow>
        <div>
          <span>{location}</span>
        </div>
        <Row>
          <Icon src="/asset/image/image-1@2x.png" />
          <span>{usedAmount}</span>
        </Row>
      </InfoRow>
    </InfoContainer>
  </CardContainer>
);

export default CarCard;

import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const CardContainer = styled.div`
  width: 100%;
`;

const ImageContainer = styled.div`
  width: 100%;
  height: 200px;
  border-radius: 8px;
  overflow: hidden;
  background-color: ${props => props.theme.lightGray};
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const Image = styled.img`
  height: 100%;
  width: 100%;
  object-fit: cover;
  /* position: absolute; */
`;

const GearContainer = styled.div`
  position: absolute;
  right: 0px;
  top: 2px;
`;

const Gear = styled.img`
  width: 42px;
  height: 42px;
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
`;

const GreenText = styled.span`
  color: ${props => props.theme.green};
`;

const RedText = styled.span`
  color: ${props => props.theme.red};
`;

const BoldText = styled.span`
  font-weight: 500;
`;

const Clickable = styled.span`
  cursor: pointer;
`;

const CarCard = ({
  id,
  image,
  name,
  price,
  status,
  type,
  onEdit,
}) => (
  <CardContainer>
    <ImageContainer>
      <Image src={image} />
      {onEdit && <GearContainer><Clickable onClick={onEdit}><Gear src="/asset/image/gear@2x.png" /></Clickable></GearContainer>}
    </ImageContainer>
    <InfoContainer>
      <InfoRow>
        <div>
          <Link to={`/car/${id}`}><BoldText><GreenText>{name}</GreenText></BoldText></Link>
        </div>
        <div>
          <BoldText>
            <span>฿</span>
            {price}
            <span> ‎per day</span>
          </BoldText>
        </div>
      </InfoRow>
      <InfoRow>
        <div>
          <span>Type: </span>
          <BoldText>{type}</BoldText>
        </div>
        <div>
          <span>Status: </span>
          <BoldText>
            {status && status === 'available' && <GreenText>Available</GreenText>}
            {status && status === 'rented' && <RedText>Rented</RedText>}
            {/* {status && status === 'unavailable' && <GrayText>Unavailable</GrayText>} */}
          </BoldText>
        </div>
      </InfoRow>
    </InfoContainer>
  </CardContainer>
);

export default CarCard;

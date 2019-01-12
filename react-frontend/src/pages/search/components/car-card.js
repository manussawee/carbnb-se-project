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

const UserRow = styled.div`
  display: flex;
  justify-items: center;
  margin-bottom: 8px;
`;

const AvatarContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 8px;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  overflow: hidden;
  background-color: ${props => props.theme.lightGray};
  object-fit: cover;
`;

const Avatar = styled.img`
  height: 100%;
  width: 100%;
  object-fit: cover;
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Ellipsis = styled.div`
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  width: 180px;
`;

const CarCard = ({
  id,
  image,
  name,
  price,
  location,
  usedAmount,
  userImage,
  userName,
  userId,
}) => (
  <>
    <UserRow>
      <Link to={`/user/${userId}`}>
        <AvatarContainer>
          <Avatar src={userImage} />
        </AvatarContainer>
      </Link>
      <UserInfo>
        <Link to={`/user/${userId}`}>
          <GreenText>
            <BoldText>
              <Ellipsis>
                {userName}
              </Ellipsis>
            </BoldText>
          </GreenText>
        </Link>
      </UserInfo>
    </UserRow>
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
              <span> ‎per day</span>
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
  </>
);

export default CarCard;

import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Button from '../../../common/forms/button';

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
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const GearContainer = styled.div`
  position: absolute;
  right: 8px;
  top: 8px;
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

// const GrayText = styled.span`
//   color: ${props => props.theme.gray};
// `;

// const Clickable = styled.span`
//   cursor: pointer;
// `;

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
`;

const Avatar = styled.img`
  height: 100%;
  width: 100%;
  object-fit: cover;
`;

const PhoneText = styled.div`
  font-size: 14px;
  font-weight: 300;
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const CarCard = ({
  id,
  image,
  name,
  total,
  deposit,
  location,
  duration,
  userId,
  userImage,
  userName,
  userPhone,
  status,
  oldMode,
  changeStatus,
}) => (
  <>
    <UserRow>
      <Link to={`/user/${userId}`}>
        <AvatarContainer>
          <Avatar src={userImage} />
        </AvatarContainer>
      </Link>
      <UserInfo>
        <Link to={`/user/${userId}`}><BoldText><GreenText>{userName}</GreenText></BoldText></Link>
        <PhoneText>
          <span>Call: </span>
          <span>{userPhone}</span>
        </PhoneText>
      </UserInfo>
    </UserRow>
    <CardContainer>
      <ImageContainer>
        <Image src={image} />
        {!oldMode && status && (
          <GearContainer>
            <Button
              gree={status === 'waiting_retrieving'}
              red={status === 'retrieved'}
              gray={status === 'retrieving' || status === 'returning'}
              disabled={status === 'retrieving' || status === 'returning'}
              onClick={changeStatus}
            >
              {status === 'waiting_retrieving' && 'Get Car'}
              {status === 'retrieved' && 'Return Car'}
              {(status === 'retrieving' || status === 'returning') && 'WAITING'}
            </Button>
          </GearContainer>
        )}
      </ImageContainer>
      <InfoContainer>
        <InfoRow>
          <div>
            <Link to={`/car/${id}`}><BoldText><GreenText>{name}</GreenText></BoldText></Link>
          </div>
          <div>
            <BoldText>
              <span>฿</span>
              <span>{total}</span>
            </BoldText>
            {!oldMode && (
              <GreenText>
                <span> + ฿</span>
                <span>{deposit}</span>
              </GreenText>
            )}
          </div>
        </InfoRow>
        <InfoRow>
          <div>{location}</div>
          <div>
            <span>Duration: </span>
            <BoldText>{duration}</BoldText>
          </div>
        </InfoRow>
      </InfoContainer>
    </CardContainer>
  </>
);

export default CarCard;

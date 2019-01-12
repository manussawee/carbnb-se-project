import React from 'react';
import styled from 'styled-components';
import moment from 'moment';
import { Link } from 'react-router-dom';
import config from '../../../config';
import Button from '../../../common/forms/button';

const Container = styled.div`
  width: 100%;
  font-weight: 300;
  margin-top: 8px;
`;

const BetweenRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: ${props => props.marginTop || '4'}px;
  :first-child {
    margin-top: 0;
  }
`;

const GreenText = styled.span`
  color: ${props => props.theme.green};
`;

const BoldText = styled.span`
  font-weight: 500;
`;

const DetailCard = styled.div`
  margin-top: 16px;
  padding: 16px;
  border: 1px solid ${props => props.theme.lightGray};
  border-radius: 8px;
  position: relative;
`;

const Title = styled.span`
  font-weight: bold;
`;

const FormRow = styled.div`
  color: ${props => props.theme.black};
  display: flex;
  width: 100%;
  margin-top: 16px;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 16px;
  overflow: hidden;
  :last-child {
    margin-right: 0;
  }
`;

const Label = styled.div`
  font-size: 15px;
  font-weight: 500;
  margin-bottom: 6px;
`;

const TextInput = styled.input`
  box-sizing: border-box;
  height: 36px;
  border-radius: 4px;
  border: 1px solid ${props => props.theme.lightGray};
  padding: 0 12px;
  color: ${props => props.theme.black};
  font-size: 14px;
  width: 100%;
`;

const Icon = styled.img`
  width: 14px;
  height: 14px;
  margin-right: 6px;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
`;

const RowButton = styled.div`
  width: 100%;
  margin-top: 8px;
`;

const Hr = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${props => props.theme.lightGray};
  margin: 16px 0;
`;

const CircleImage = styled.div`
  width: 48px;
  height: 48px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  margin-right: 8px;
`;

const RedText = styled.div`
  color: ${props => props.theme.red};
`;

const Text500 = styled.div`
  font-weight: 500;
`;

const Image = styled.img`
  height: 100%;
`;

const PhoneText = styled.div`
  font-size: 14px;
`;

const calurateDate = (startDate, returnDate) => {
  const diff = moment(returnDate).diff(moment(startDate), 'days') + 1;
  if (diff >= 0) {
    return diff;
  }
  return 0;
};

const Info = ({
  lesseeId,
  id,
  startDate,
  returnDate,
  setStartDate,
  setReturnDate,
  setTotal,
  name,
  price,
  usedAmount,
  location,
  deposit = 150,
  userId,
  userAvatar,
  userName,
  userPhone,
  total,
  isValidReserve,
}) => {
  const diffDays = calurateDate(startDate, returnDate);
  // console.log(isValidRental)
  return (
    <Container>
      <BetweenRow>
        <div>
          <BoldText>
            <GreenText>{name}</GreenText>
          </BoldText>
        </div>
        <div>
          <BoldText>
            <span>฿</span>
            {price}
            <span> ‎per day</span>
          </BoldText>
        </div>
      </BetweenRow>
      <BetweenRow>
        <div>
          <span>{location}</span>
        </div>
        <div>
          <Row>
            <Icon src="/asset/image/image-1@2x.png" />
            <span>{usedAmount}</span>
          </Row>
        </div>
      </BetweenRow>
      <DetailCard>
        <Title>Reserve The Car</Title>
        <FormRow>
          <InputGroup>
            <Label>Start date</Label>
            <TextInput
              type="date"
              value={startDate}
              onChange={(e) => {
                setStartDate(e.target.value);
                const diff = calurateDate(e.target.value, returnDate);
                setTotal(Math.round((diff * price * (100 + deposit)) / 100) || 0);
              }}
            />
          </InputGroup>
          <InputGroup>
            <Label>Return date</Label>
            <TextInput
              type="date"
              value={returnDate}
              onChange={async (e) => {
                setReturnDate(e.target.value);
                const diff = calurateDate(startDate, e.target.value);
                setTotal(Math.round((diff * price * (100 + deposit)) / 100) || 0);
                // updateValidReservation();
                // console.log("XXX"+isValidReserve);
              }}
            />
          </InputGroup>
        </FormRow>
        <BetweenRow marginTop="8">
          <div>
            <span>‎฿</span>
            <span>{price}</span>
            <span>‎ x </span>
            <span>‎{diffDays || 0}</span> {/* eslint-disable-line  */}
            <span> days</span>
          </div>
          <div>
            <span>‎฿</span>
            <span>{diffDays * price || 0}</span>
          </div>
        </BetweenRow>
        <BetweenRow marginTop="8">
          <div>
            <span>‎Deposit </span>
            <span>{deposit}</span>
            <span>‎%</span>
          </div>
          <div>
            <span>‎฿</span>
            <span>{Math.round(diffDays * price * (deposit / 100)) || 0}</span>
          </div>
        </BetweenRow>
        <BetweenRow marginTop="8">
          <div>
            <Text500>Total</Text500>
          </div>
          <RedText>
            <Text500>
              <span>‎฿</span>
              <span>{total}</span>
            </Text500>
          </RedText>
        </BetweenRow>
        <RowButton>
          <form
            action={`${config.backendAPI}/rental?data=${JSON.stringify({
              lessor_id: userId,
              lessee_id: lesseeId,
              car_id: id,
              started_at: startDate,
              ended_at: returnDate,
              price: diffDays * price,
              deposit: Math.round(diffDays * price * (deposit / 100)) || 0,
            })}&successUrl=${config.frontendURL}/my-rentals`}
            method="post"
            id="checkout-form"
            // onsubmit = "return validateRental()"
          >
            {/* {console.log(isValidReserve)} */}
            {(isValidReserve && lesseeId) ? (
              <Button id="checkout-button" red fullWidth>
                RESERVE
              </Button>
            ) : (
              <Button id="checkout-button" gray fullWidth disabled>
                {!lesseeId ? 'PLEASE LOGIN' : 'CAR IS NOT AVAILABLE'}
              </Button>
            )}
          </form>
        </RowButton>
        <Hr />
        <Row>
          <Link to={`/user/${userId}`}>
            <CircleImage>
              <Image src={userAvatar} />
            </CircleImage>
          </Link>
          <div>
            <Link to={`/user/${userId}`}>
              <BoldText>
                <GreenText>{userName}</GreenText>
              </BoldText>
            </Link>
            <PhoneText>
              <span>Call: </span>
              <span>{userPhone || '-'}</span>
            </PhoneText>
          </div>
        </Row>
      </DetailCard>
    </Container>
  );
};

export default Info;

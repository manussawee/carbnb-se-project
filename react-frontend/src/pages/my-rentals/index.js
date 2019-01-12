import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import moment from 'moment';
import Layout from '../../common/layout';
import CarCard from './components/car-card';
import {
  getLesseeRental,
  getLesseeRentalHistory,
  retrieveLesseeRental,
  returnLesseeRental,
} from '../../utils/carbnb';

const HeaderText = styled.h1`
  font-size: 24px;
  font-weight: bold;
`;

const HeaderContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;

  @media screen and (max-width: 600px) {
    box-sizing: border-box;
    padding: 0 16px;
  }
`;

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 16px -8px;
  @media screen and (max-width: 600px) {
    flex-direction: column;
    box-sizing: border-box;
    margin: 16px 0;
    padding: 0 16px;
  }
`;

const Col = styled.div`
  flex-basis: 33.33%;
  box-sizing: border-box;
  padding: 0 8px;
  margin-bottom: 24px;
  @media screen and (max-width: 600px) {
    padding: 0;
  }
`;

const NotFoundText = styled.div`
  text-align: center;
  color: ${props => props.theme.lightGray};
  font-size: 24px;
  width: 100%;
`;

class MyRentals extends Component {
  state = {
    currentRentals: [],
    oldRentals: [],
    isLoading: false,
  };

  componentDidMount() {
    this.getRentals();
  }

  getRentals = async () => {
    this.setState({
      isLoading: true,
    });
    const { token } = this.props;
    const { rentalList: currentRentals } = await getLesseeRental({ headers: { Authorization: `Bearer ${token}` } });
    const { rentalList: oldRentals } = await getLesseeRentalHistory({ headers: { Authorization: `Bearer ${token}` } });
    this.setState({
      currentRentals,
      oldRentals,
      isLoading: false,
    });
  }

  handleChangeStatus = async (rental) => {
    const { token } = this.props;
    if (rental.status === 'waiting_retrieving') {
      await retrieveLesseeRental(rental._id, { headers: { Authorization: `Bearer ${token}` } }); // eslint-disable-line
    } else if (rental.status === 'retrieved') {
      await returnLesseeRental(rental._id, { headers: { Authorization: `Bearer ${token}` } }); // eslint-disable-line
    }
    this.getRentals();
  }

  render() {
    const {
      currentRentals,
      oldRentals,
      isLoading,
    } = this.state;
    const { token } = this.props;
    if (!token) {
      window.location = '/';
      return null;
    }
    return (
      <Layout hideSearchBar>
        <HeaderContainer>
          <HeaderText>Current Rentals</HeaderText>
        </HeaderContainer>
        <Container>
          {isLoading && (
            <NotFoundText>Loading...</NotFoundText>
          )}
          {!isLoading && currentRentals.length === 0 && (
            <NotFoundText>No rental exists</NotFoundText>
          )}
          {currentRentals.map(rental => (
            // eslint-disable-next-line
            <Col key={rental._id}>
              <CarCard
                // eslint-disable-next-line
                id={rental.car_id && rental.car_id._id}
                // eslint-disable-next-line
                changeStatus={() => this.handleChangeStatus(rental)}
                status={moment().isAfter(moment(rental.started_at).add(-7, 'hours')) && rental.status}
                image={
                  rental.car_id
                  && rental.car_id.car_image_ids.length
                  && rental.car_id.car_image_ids[0].image_url
                }
                name={rental.car_id && rental.car_id.title}
                total={rental.price}
                deposit={rental.deposit}
                type={rental.car_id && rental.car_id.type}
                location={rental.car_id && rental.car_id.location}
                duration={`${moment(rental.started_at).format('D')} - ${moment(rental.ended_at).format('D MMMM')}`}
                userImage={rental.lessor_id && rental.lessor_id.avatar}
                userName={rental.lessor_id && rental.lessor_id.fullname}
                userPhone={rental.lessor_id && rental.lessor_id.phone}
                // eslint-disable-next-line
                userId={rental.lessor_id && rental.lessor_id._id}
              />
            </Col>
          ))}
        </Container>
        {oldRentals.length > 0 && (
          <HeaderContainer>
            <HeaderText>Rental History</HeaderText>
          </HeaderContainer>
        )}
        <Container>
          {oldRentals.map(rental => (
            // eslint-disable-next-line
            <Col key={rental._id}>
              <CarCard
                oldMode
                // eslint-disable-next-line
                id={rental.car_id && rental.car_id._id}
                status={rental.status}
                image={
                  rental.car_id
                  && rental.car_id.car_image_ids.length
                  && rental.car_id.car_image_ids[0].image_url
                }
                name={rental.car_id && rental.car_id.title}
                total={rental.price}
                deposit={rental.deposit}
                type={rental.car_id && rental.car_id.type}
                location={rental.car_id && rental.car_id.location}
                duration={`${moment(rental.started_at).format('D')} - ${moment(rental.ended_at).format('D MMMM')}`}
                userImage={rental.lessor_id && rental.lessor_id.avatar}
                userName={rental.lessor_id && rental.lessor_id.fullname}
                userPhone={rental.lessor_id && rental.lessor_id.phone}
                // eslint-disable-next-line
                userId={rental.lessor_id && rental.lessor_id._id}
              />
            </Col>
          ))}
        </Container>
      </Layout>
    );
  }
}

export default connect(
  state => ({
    token: state.auth.token,
  }),
)(MyRentals);

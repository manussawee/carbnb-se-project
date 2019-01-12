import React, { Component } from 'react';
import styled from 'styled-components';
import moment from 'moment';
import Layout from '../../common/layout';
import CarCard from './components/car-card';
import { searchCar, getAllRental } from '../../utils/carbnb';
import data from './data';

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 16px -8px;

  @media screen and (max-width: 600px) {
    flex-direction: column;
    margin: 16px 0;
  }
`;

const Col = styled.div`
  flex-basis: 25%;
  box-sizing: border-box;
  padding: 0 8px;
  margin-bottom: 24px;

  @media screen and (max-width: 600px) {
    padding: 0 16px;
  }
`;

class Home extends Component {
  state = {
    cars: data.cars,
  };

  componentDidMount = async () => {
    const {
      match: {
        params: { query },
      },
    } = this.props;

    const cars = await this.getValidCar(query);

    // const cars = await searchCar(query);
    this.setState({
      cars,
    });
  };

  getDateInterval = (param) => {
    if (param) {
      const startDateIndex = param.indexOf('startDate=');
      const endDateIndex = param.indexOf('endDate=');
      // eslint-disable-next-line max-len
      const startDate = startDateIndex === -1 ? null : param.slice(startDateIndex + 10, startDateIndex + 10 + 10);
      // eslint-disable-next-line max-len
      const endDate = endDateIndex === -1 ? null : param.slice(endDateIndex + 8, endDateIndex + 8 + 10);
      // console.log(moment(startDate));
      return { startDate, endDate };
    }
    return { startDate: null, endDate: null };
  };

  getValidCar = async (query) => {
    const rentals = await getAllRental();
    const cars = await searchCar(query);
    // console.log(cars);

    // console.log(cars);
    const queryDate = this.getDateInterval(query);
    if (queryDate.endDate === null && queryDate.startDate === null) return cars;
    if (moment(queryDate.endDate) < moment(queryDate.startDate)) return [];
    const newCars = cars.filter((car) => {
      // eslint-disable-next-line no-restricted-syntax
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < rentals.length; i++) {
        const rental = rentals[i];
        // eslint-disable-next-line no-underscore-dangle
        if (car._id === rental.car_id) {
          if (queryDate.endDate != null && queryDate.startDate != null) {
            if (
              !(
                moment(rental.ended_at) < moment(queryDate.startDate).add(1, 'days')
                || moment(queryDate.endDate).add(-1, 'days') < moment(rental.started_at)
              )
            ) {
              // console.log('!');
              return false;
            }
          } else if (queryDate.endDate != null) {
            // console.log('!');
            if (moment(queryDate.endDate).add(-1, 'days') >= moment(rental.started_at)) return false;
            if (moment(queryDate.endDate).add(-1, 'days') >= moment(rental.ended_at)) return false;
          } else {
            // console.log('!');

            if (moment(queryDate.startDate).add(1, 'days') <= moment(rental.started_at)) return false;
            if (moment(queryDate.startDate).add(1, 'days') <= moment(rental.ended_at)) return false;
          }
        }
      }
      return true;
    });

    return newCars;
  };

  componentWillReceiveProps = async (nextProps) => {
    const {
      match: {
        params: { query },
      },
    } = nextProps;
    // const cars = await searchCar(query);

    const cars = await this.getValidCar(query);
    this.setState({
      cars,
    });
  };

  render() {
    const { cars } = this.state;
    // console.log(cars);
    return (
      <Layout>
        <Container>
          {cars
            && cars.map(car => (
              // eslint-disable-next-line
              <Col key={car._id}>
                <CarCard
                  // eslint-disable-next-line
                  id={car._id}
                  image={
                    car.car_image_ids && car.car_image_ids.length && car.car_image_ids[0].image_url
                  }
                  name={car.title}
                  price={car.price}
                  location={car.location}
                  duration="123"
                  usedAmount="240"
                  userName={car.user_id.fullname}
                  userImage={car.user_id.avatar}
                  userUpdateAt="now"
                  // eslint-disable-next-line
                  userId={car.user_id._id}
                />
              </Col>
            ))}
        </Container>
      </Layout>
    );
  }
}

export default Home;

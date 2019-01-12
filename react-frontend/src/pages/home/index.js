/* eslint-disable */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Layout from '../../common/layout';
import CarCard from './components/car-card';
import { searchCar } from '../../utils/carbnb';

import data from './data';

const Col = styled.div`
  width: 25%;
  box-sizing: border-box;
  padding-right: 16px;
  margin-bottom: 24px;

  :last-child {
    padding-right: 0;
  }

  @media screen and (max-width: 600px) {
    width: 264px;
    padding-right: 0;
    margin-left: 16px;
    display: inline-block;
    :last-child {
      padding-right: 16px;
    }
  }

`;

const ColumnRow = styled.div`
  display: flex;
  flex-wrap: wrap;

  @media screen and (max-width: 600px) {
    display: block;
    overflow: auto;
    white-space: nowrap;
    width: 100%;
  }
`;

const BetweenRow = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 8px;
  @media screen and (max-width: 600px) {
    padding: 0 16px;
    box-sizing: border-box;
  }
`;

const LocationText = styled.h1`
  font-size: 24px;
  font-weight: bold;
`;

const SeeMore = styled(Link)`
  font-size: 14px;
  font-weight: 500;
  color: ${props => props.theme.green};
`;

const Row = styled.div`
  @media screen and (max-width: 600px) {
    :first-child {
      margin-top: 8px;
    }
  }
`;

class Home extends Component {
  state = {
    locations: data.locations,
  };

  componentDidMount = async () => {
    const response = await searchCar({ });
    const locations = response.reduce((groups, item) => {
      const val = item.location;
      const newGroup = { ...groups };
      if (!(val in groups)) {
        newGroup[val] = [];
      }
      newGroup[val].push({
        id: item._id,
        images: item.car_image_ids.map(image => image.image_url),
        name: item.title,
        price: item.price,
        location: item.location,
      });
      return newGroup;
    }, {});
    this.setState({ locations });
  }

  render() {
    const { locations, history } = this.state;
    return (
      <Layout>
        {locations && Object.keys(locations).map(locationKey => (
          <Row key={locationKey}>
            <BetweenRow>
              <LocationText>{locationKey}</LocationText>
              <SeeMore to={`search/location=${locationKey}`}>see more</SeeMore>
            </BetweenRow>
            <ColumnRow>
              {locations[locationKey].slice(0, Math.min(locations[locationKey].length, 4)).map(car => (
                <Col key={car.id}>
                  <CarCard
                    id={car.id}
                    image={car.images && car.images[0]}
                    name={car.name}
                    price={car.price}
                    location={car.location}
                    duration={0.5}
                    usedAmount={234}
                  />
                </Col>
              ))}
            </ColumnRow>
          </Row>
        ))}
      </Layout>
    );
  }
}

export default Home;

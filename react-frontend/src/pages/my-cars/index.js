/* eslint-disable */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Layout from '../../common/layout';
import Button from '../../common/forms/button';
import CarCard from './components/car-card';
import CarModal from './components/car-modal';
import { actions as authActions } from '../../redux/auth';
import { addCar, getMyCar, removeCar, editCar } from '../../utils/carbnb';
import data from './data.json';

const HeaderText = styled.h1`
  font-size: 24px;
  font-weight: bold;
`;

const HeaderContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  @media screen and (max-width: 600px) {
    padding: 0 16px;
  }
`;

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 16px -8px;
  @media screen and (max-width: 600px) {
    margin: 16px 0px;
    display: block;
  }
`;

const Col = styled.div`
  flex-basis: 33.33%;
  box-sizing: border-box;
  padding: 0 8px;
  margin-bottom: 24px;
  @media screen and (max-width: 600px) {
    flex-basis: 100%;
    padding: 0 16px;
  }
`;

const NotFoundText = styled.div`
  text-align: center;
  color: ${props => props.theme.lightGray};
  font-size: 24px;
  width: 100%;
`;

class MyCars extends Component {
  state = {
    isAddCarModalActive: false,
    isEditCarModalActive: false,
    selectedCar: {},
    cars: data.cars,
  };

  getCars = async () => {
    const { token } = this.props;
    try {
      const cars = await getMyCar({ headers: { Authorization: `Bearer ${token}` } });
      this.setState({
        cars: cars.map(car => ({
          ...car,
          id: car._id,
          image: car.car_image_ids.length && car.car_image_ids[0].image_url,
          startDate: car.manual_available_id ? car.manual_available_id.started_at : '',
          endDate: car.manual_available_id ? car.manual_available_id.ended_at : '',
          availableType: car.available_type,
          days: car.repeat_available_id ? car.repeat_available_id.days : [0, 0, 0, 0, 0, 0, 0],
          images: car.car_image_ids.map(image => image.image_url),
        })),
        selectedCar: {},
      });
    } catch (e) {
      alert('Error get car');
    }
  };

  removeCar = async id => {
    const { token } = this.props;
    try {
      if (confirm('Do you to remove this car ?')) {
        await removeCar(id, { headers: { Authorization: `Bearer ${token}` } });
        this.getCars();
        this.toggleEditCarModal();
        alert('Successfully removed the car');
      }
    } catch (e) {
      console.log('Error removed car');
    }
  };
  componentDidMount = async () => {
    await this.getCars();
  };

  toggleAddCarModal = () => {
    const { isAddCarModalActive } = this.state;
    this.setState(
      {
        isAddCarModalActive: !isAddCarModalActive,
      },
      this.getCars,
    );
  };

  toggleEditCarModal = () => {
    const { isEditCarModalActive } = this.state;
    this.setState(
      {
        isEditCarModalActive: !isEditCarModalActive,
      },
      this.getCars,
    );
  };

  handleAddCar = async carBody => {
    const { token } = this.props;
    if (
      carBody.title == '' ||
      carBody.location == '' ||
      carBody.description == '' ||
      carBody.type == '' ||
      carBody.price == '' ||
      (carBody.availableType == 'period' && (carBody.startDate == '' || carBody.endDate == ''))
    ) {
      alert('Please complete the form')
      return false
    } else if (carBody.images.length <= 0) {
      alert('Please upload your car images');
      return false;
    } else if (carBody.title.length > 20) {
      alert('Car title must be less than 20 characters');
      return false;
    } else if (carBody.description.length > 100) {
      alert('Car description must be less than 100 characters');
      return false;
    } else if (isNaN(carBody.price) || carBody.price <= 0) {
      alert('Price must be number and greater than 0');
      return false;
    } else {
      try {
        await addCar(carBody, { headers: { Authorization: `Bearer ${token}` } });
        this.toggleAddCarModal();
        alert('Successfully added car');
        return true;
      } catch (e) {
        alert('Error added car');
        return false;
      }
    }
  };
  handleEditCar = async (id, carBody) => {
    const { token } = this.props;
    if (
      carBody.title == '' ||
      carBody.location == '' ||
      carBody.description == '' ||
      carBody.type == '' ||
      carBody.price == '' ||
      (carBody.availableType == 'period' && (carBody.startDate == '' || carBody.endDate == ''))
    ) {
      alert('Please complete the form')
      return false
    } else if (carBody.images.length <= 0) {
      alert('Please upload your car images');
      return false;
    } else if (carBody.title.length > 20) {
      alert('Car title must be less than 20 characters');
      return false;
    } else if (carBody.description.length > 100) {
      alert('Car description must be less than 100 characters');
      return false;
    } else if (isNaN(carBody.price) || carBody.price <= 0) {
      alert('Price must be number and greater than 0');
      return false;
    } else {
      try {
        await editCar(id, carBody, { headers: { Authorization: `Bearer ${token}` } });
        this.toggleEditCarModal();
        alert('Successfully edited car');
        return true;
      } catch (e) {
        alert('Error edited car');
        return false;
      }
    }
  };

  onEdit = car => {
    this.setState({
      isEditCarModalActive: true,
      selectedCar: car,
    });
  };

  render() {
    const { isAddCarModalActive, isEditCarModalActive, selectedCar, cars } = this.state;
    const { token } = this.props;
    if (!token) {
      window.location = '/';
      return null;
    }
    return (
      <Layout hideSearchBar>
        <HeaderContainer>
          <HeaderText>My Cars</HeaderText>
          <Button onClick={this.toggleAddCarModal}>Add More Car</Button>
        </HeaderContainer>
        <Container>
          {cars.length === 0 && <NotFoundText>No car exists</NotFoundText>}
          {cars.map(car => (
            <Col key={car._id}>
              <CarCard
                id={car._id}
                onEdit={() => this.onEdit(car)}
                image={car.image}
                name={car.title}
                price={car.price}
                status={car.status}
                type={car.type}
              />
            </Col>
          ))}
        </Container>
        <CarModal
          active={isAddCarModalActive}
          addCar={this.handleAddCar}
          onClose={this.toggleAddCarModal}
        />
        <CarModal
          editMode
          id={selectedCar.id}
          title={selectedCar.title}
          location={selectedCar.location}
          description={selectedCar.description}
          type={selectedCar.type}
          price={selectedCar.price}
          startDate={selectedCar.startDate}
          endDate={selectedCar.endDate}
          availableType={selectedCar.availableType}
          days={selectedCar.days}
          images={
            selectedCar.car_image_ids && selectedCar.car_image_ids.map(image => image.image_url)
          }
          active={isEditCarModalActive}
          onClose={this.toggleEditCarModal}
          removeCar={this.removeCar}
          editCar={this.handleEditCar}
        />
      </Layout>
    );
  }
}

export default connect(
  state => ({
    amount: state.home.amount,
    token: state.auth.token,
  }),
  {
    ...authActions,
  },
)(MyCars);

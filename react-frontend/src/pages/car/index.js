/* eslint-disable no-param-reassign */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import moment from 'moment';
import Layout from '../../common/layout';
import Gallery from './components/gallery';
import Info from './components/info';
import data from './data';
import { getCarInfo, getAllRental } from '../../utils/carbnb';
import config from '../../config';

const Container = styled.div`
  display: flex;
  width: 100%;

  @media screen and (max-width: 600px) {
    flex-direction: column;
  }
`;

const GalleryContainer = styled.div`
  flex: 1;
  overflow: hidden;

  @media screen and (max-width: 600px) {
    width: 100%;
    overflow: auto;
  }
`;

const InfoContainer = styled.div`
  width: 400px;
  display: flex;
  margin-left: 24px;
  box-sizing: border-box;
  @media screen and (max-width: 600px) {
    width: 100%;
    padding: 8px 16px;
    margin: 0;
  }
`;

class Car extends Component {
  state = {
    id: '',
    startDate: '',
    returnDate: '',
    price: '',
    title: '',
    location: '',
    user: {},
    total: 0,
    images: [],
    isValidReserve: false,
    availableType: '',
    manual_available_id: null,
    repeat_available_id: null,
  };

  validReservation = async (startDate, returnDate) => {
    // return true;
    const rentals = await getAllRental();
    const ableToReserve = moment(startDate).isAfter(moment().add(-1, 'days'));
    if (
      startDate === undefined
      || returnDate === undefined
      || startDate === ''
      || returnDate === ''
      || !ableToReserve
    ) {
      return false;
    }
    if (moment(startDate) > moment(returnDate)) {
      return false;
    }

    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < rentals.length; i++) {
      const rental = rentals[i];

      // eslint-disable-next-line no-underscore-dangle
      if (this.state.id === rental.car_id) {
        if (
          !(
            moment(rental.ended_at).isBefore(moment(startDate).add(1, 'days'))
            || moment(returnDate).isBefore(moment(rental.started_at))
          )
        ) {
          return false;
        }
      }
    }

    // eslint-disable-next-line react/destructuring-assignment
    if (this.state.availableType === 'period') {
      // eslint-disable-next-line react/destructuring-assignment
      // eslint-disable-next-line camelcase
      const available_id = this.state.manual_available_id;
      // started_at.ended_at
      // available_id
      // console.log(
      //   `A${moment(available_id.started_at).isBefore(moment(startDate).add(1, 'seconds'))}`,
      // );

      if (
        moment(available_id.started_at).isBefore(moment(startDate).add(1, 'days'))
        && moment(returnDate).isBefore(moment(available_id.ended_at))
      ) {
        // console.log(moment(startDate).weekday())
        return true;
      }
      return false;
    }
    // eslint-disable-next-line camelcase
    const available_id = this.state.repeat_available_id;
    // .add(1, 'day')
    let i = moment(startDate);
    while (i <= moment(returnDate)) {
      // eslint-disable-next-line max-len
      if (available_id.days[i.weekday()] === false || available_id.days[i.weekday()] === 0) return false;
      i = i.add(1, 'day');
    }

    return true;
  };

  updateValidReservation = async (startDate, returnDate) => {
    const isValidReserve = await this.validReservation(startDate, returnDate);
    // console.log(`ANS${isValidReserve}`);
    await this.setState({ isValidReserve });
    this.setUpOmise();
    // console.log(this.state);
  };

  componentDidMount = async () => {
    const {
      match: { params },
    } = this.props;
    this.setUpOmise();
    try {
      const car = await getCarInfo(params.id);
      this.setState({
        // eslint-disable-next-line
        id: car[0]._id,
        price: car[0].price,
        title: car[0].title,
        location: car[0].location,
        user: car[0].user_id,
        images: car[0].car_image_ids.map(image => image.image_url),
        availableType: car[0].available_type,
        manual_available_id: car[0].available_type === 'period' ? car[0].manual_available_id : null,
        repeat_available_id: car[0].available_type === 'repeat' ? car[0].repeat_available_id : null,
      });
    } catch (e) {
      // eslint-disable-next-line no-alert
      alert('Error get car info..');
    }
    await this.updateValidReservation();
  };

  setUpOmise = () => {
    const { total } = this.state;
    const { OmiseCard } = window;
    OmiseCard.configure({
      publicKey: config.omisePublicKey,
      currency: 'thb',
      amount: Math.ceil(total * 100),
      // image: `${config.frontendRoot}img/popo-avatar.png`,
      frameLabel: 'Carbnb',
      frameDescription: '',
      defaultPaymentMethod: 'credit_card',
      submitFormTarget: '#checkout-form',
    });
    OmiseCard.configureButton('#checkout-button');
    OmiseCard.attach();
  };

  render() {
    const {
      id,
      startDate,
      returnDate,
      price,
      title,
      location,
      images,
      user,
      total,
      isValidReserve,
    } = this.state;

    const { user: lessee } = this.props;

    return (
      <Layout>
        <Container>
          <GalleryContainer>
            <Gallery images={images} />
          </GalleryContainer>
          <InfoContainer>
            <Info
              id={id}
              startDate={startDate}
              returnDate={returnDate}
              setStartDate={(v) => {
                this.setState({ startDate: v });
                this.updateValidReservation(v, returnDate);
              }}
              setReturnDate={(v) => {
                this.setState({ returnDate: v });
                this.updateValidReservation(startDate, v);
              }}
              setTotal={v => this.setState({ total: v }, this.setUpOmise)}
              name={title}
              price={price}
              // totalPrice={totalPrice}
              usedAmount={data.usedAmount}
              location={location}
              distance={data.distance}
              deposit={data.deposit}
              userAvatar={user.avatar}
              userName={user.fullname}
              userPhone={user.phone}
              // eslint-disable-next-line
              userId={user._id}
              total={total}
              // eslint-disable-next-line
              lesseeId={lessee.id}
              // validReservation={event => this.handleReserve(event)}
              isValidReserve={isValidReserve}
            />
          </InfoContainer>
        </Container>
      </Layout>
    );
  }
}

export default connect(state => ({ user: state.auth.user }))(Car);

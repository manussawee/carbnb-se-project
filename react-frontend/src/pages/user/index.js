import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { getUser, updateUser } from '../../utils/carbnb';
import CarCard from '../my-cars/components/car-card';
import Button from '../../common/forms/button';
import Layout from '../../common/layout';
import ProfileModal from './components/profile-modal';

const HeaderText = styled.h1`
  font-size: 24px;
  font-weight: bold;
`;

const HeaderContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 24px;

  @media screen and (max-width: 600px) {
    padding: 0 16px;
    box-sizing: border-box;
  }
`;

const Row = styled.div`
  width: 100%;
  display: flex;
  font-weight: 300;
  margin-bottom: 24px;

  @media screen and (max-width: 600px) {
    display: block;
    padding: 0 16px;
    box-sizing: border-box;
  }
`;

const AvatarCol = styled.div`
  margin-right: 16px;

  @media screen and (max-width: 600px) {
    margin: 0;
  }
`;

const AvatarContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 240px;
  height: 240px;
  background-color: ${props => props.theme.lightGray};
  overflow: hidden;
  position: relative;
  border-radius: 8px;

  @media screen and (max-width: 600px) {
    width: 100%;
  }
`;

const Avatar = styled.img`
  object-fit: cover;
  width: 100%;
  height: 100%;
`;

const BoldText = styled.span`
  font-weight: bold;
`;

const InfoRow = styled.div`
  margin: 8px 0;
`;

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 16px -8px;

  @media screen and (max-width: 600px) {
    margin: 16px 0;
  }
`;

const Col = styled.div`
  flex-basis: 33.33%;
  box-sizing: border-box;
  padding: 0 8px;
  margin-bottom: 24px;

  @media screen and (max-width: 600px) {
    display: block;
    flex-basis: initial;
    padding: 0 16px;
    box-sizing: border-box;
  }
`;

const Uploader = styled.input`
  width: 100%;
  height: 100%;
  position: absolute;
  opacity: 0;
  cursor: pointer;
`;

const Description = styled.div`
  margin-top: 8px;
  font-size: 13px;
  text-align: center;
  color: ${props => props.theme.gray};
`;

const NotFoundText = styled.div`
  text-align: center;
  color: ${props => props.theme.lightGray};
  font-size: 24px;
  width: 100%;
`;

class User extends Component {
  state = {
    user: {},
    rentals: [],
    cars: [],
    profileModalActive: false,
    message: '',
  };

  componentDidMount() {
    this.getUser();
  }

  componentWillReceiveProps(newProps) {
    const {
      match: {
        params: { userId },
      },
    } = newProps;
    const {
      match: {
        params: { userId: oldId },
      },
    } = this.props;
    if (oldId !== userId) {
      this.getUser(userId);
    }
  }

  getUser = async (id = null) => {
    let {
      match: {
        params: { userId },
      },
    } = this.props;
    const { token } = this.props;
    if (id) {
      userId = id;
    }
    const { user, rentals, cars } = await getUser(userId, {
      headers: { Authorization: `Bearer ${token}` },
    });
    this.setState(state => ({
      ...state,
      user,
      rentals,
      cars,
    }));
  };

  updateProfile = async (fullname, phone, oldPassword, newPassword, reNewPassword) => {
    if (phone.length > 0) {
      let isValid = true;
      if (phone.length !== 10) {
        isValid = false;
      }
      for (let i = 0; i < phone.length; i += 1) {
        if (!(phone[i] >= '0' && phone[i] <= '9')) {
          isValid = false;
          break;
        }
      }
      if (!isValid) {
        this.setState({ message: 'Phone number must exactly contain 10 digits' });
        return;
      }
    }
    const { token } = this.props;
    const result = await updateUser(
      {
        fullname,
        phone,
        oldPassword,
        newPassword,
        reNewPassword,
      },
      { headers: { Authorization: `Bearer ${token}` } },
    );
    if (result.msg === 'password_not_match') {
      this.setState({ message: 'New password does not match' });
    } else if (result.msg === 'success') {
      await this.getUser();
      this.setState({ profileModalActive: false });
    } else if (result.msg === 'Password or username is incorrect') {
      this.setState({ message: 'Current password is incorrect' });
    } else {
      this.setState({ message: result.msg });
    }
  };

  uploadAvatar = (e) => {
    const reader = new FileReader();
    const file = e.target.files[0];

    reader.onloadend = async () => {
      const { token } = this.props;
      if (reader && reader.result && reader.result.indexOf('data:image/') !== -1) {
        await updateUser(
          { avatar: reader.result },
          { headers: { Authorization: `Bearer ${token}` } },
        );
        this.getUser();
      } else if (reader.result.indexOf('data:image/') === -1) {
        alert('File must be an image file');
      }
    };

    reader.readAsDataURL(file);
  };

  render() {
    const {
      user, rentals, cars, profileModalActive, message,
    } = this.state;
    const { user: myUser } = this.props;
    return (
      <Layout hideSearchBar>
        <ProfileModal
          active={profileModalActive}
          onClose={() => this.setState({ profileModalActive: false })}
          onSubmit={this.updateProfile}
          message={message}
          fullname={user.fullname}
          phone={user.phone}
        />
        <HeaderContainer>
          <HeaderText>User Profile</HeaderText>
          {/* eslint-disable-next-line */}
          {myUser.id === user._id && (
            <Button onClick={() => this.setState({ profileModalActive: true })}>
              Edit Profile
            </Button>
          )}
        </HeaderContainer>
        <Row>
          <AvatarCol>
            <AvatarContainer>
              <Avatar src={user.avatar} />
              {/* eslint-disable-next-line */}
              {myUser.id === user._id && <Uploader type="file" onChange={this.uploadAvatar} />}
            </AvatarContainer>
            {/* eslint-disable-next-line */}
            {myUser.id === user._id && (
              <Description>Click image above to upload new one</Description>
            )}
          </AvatarCol>
          <div>
            <InfoRow>
              <BoldText>Full Name: </BoldText>
              <span>{user.fullname}</span>
            </InfoRow>
            <InfoRow>
              <BoldText>Phone Number: </BoldText>
              <span>{user.phone}</span>
            </InfoRow>
            <InfoRow>
              <BoldText>Rental Amount: </BoldText>
              <span>{`${rentals.length} times`}</span>
            </InfoRow>
            <InfoRow>
              <BoldText>Car Amount: </BoldText>
              <span>{`${cars.length} cars`}</span>
            </InfoRow>
          </div>
        </Row>
        <HeaderContainer>
          <HeaderText>User Cars</HeaderText>
        </HeaderContainer>
        {cars.length === 0 && <NotFoundText>No car exists</NotFoundText>}
        <Container>
          {cars.map(car => (
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
                status={car.status}
                type={car.type}
              />
            </Col>
          ))}
        </Container>
      </Layout>
    );
  }
}

export default connect(state => ({
  user: state.auth.user,
  token: state.auth.token,
}))(User);

import React, { Component } from 'react';
import styled from 'styled-components';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import io from 'socket.io-client';
import { actions as homeActions } from '../../pages/home/duck';
import { actions as authActions } from '../../redux/auth';
import { getLessorRental, retrieveLessorRental, returnLessorRental } from '../../utils/carbnb';

import Container from '../container';

import Footer from '../footer';
import Navbar from '../navbar';
import NavItem from '../nav-item';
import NotificationTab from '../notification-tab';

import LoginModal from './components/login-modal';
import RegisterModal from './components/register-modal';
import SearchCard from './components/search-card';
import MobileSearchCard from './components/mobile-search-card';
import config from '../../config';

const Content = styled(Container)`
  padding: 24px;
  line-height: 1.31;
  color: ${props => props.theme.black};
  flex: 1;
  width: 1160px;
  box-sizing: border-box;
  @media screen and (max-width: 1160px) {
    width: 100vw;
    padding: 24px 0;
  }
  @media screen and (max-width: 600px) {
    margin-top: ${props => (!props.hideSearchBar ? '32px' : '0')};
  }
`;

const MobileNavItem = styled.div`
  width: 100%;
  height: 40px;
  color: ${props => props.theme.black};
  padding-right: 16px;
  box-sizing: border-box;
  border: 1px solid ${props => props.theme.lightGray};
  border-width: 0 0 1px 0;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  cursor: pointer;
`;

const WebContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
  overflow-x: hidden;
`;

const SearchContianer = styled.div`
  @media screen and (max-width: 600px) {
    display: none;
  }
`;

const MobileContainer = styled.div`
  display: none;
  position: relative;
  @media screen and (max-width: 600px) {
    display: initial;
  }
`;

const NotificationContainer = styled.div`
  box-sizing: border-box;
  @media screen and (max-width: 600px) {
    padding: 0 16px;
  }
`;

class Layout extends Component {
  socket = io(config.socket);

  constructor(props) {
    super(props);
    this.state = {
      isLoginModalActive: false,
      isRegisterModalActive: false,
      notifications: [],
      // isOpenSocket: false,
      showMenu: false,
      showSearch: false,
    };
    this.toggleModal = this.toggleModal.bind(this);
    this.toggleRegisterModal = this.toggleRegisterModal.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
  }

  componentDidMount = () => {
    this.getRentals();
  }

  componentWillReceiveProps() {
    const { id } = this.props;
    if (id !== null) {
      this.socket.on(id, () => {
        this.getRentals();
      });
    }
  }

  getRentals = async () => {
    const { token } = this.props;
    const { rentalList: rentals } = await getLessorRental({ headers: { Authorization: `Bearer ${token}` } });
    const notifications = rentals
      .filter(rental => (rental.status === 'retrieving' || rental.status === 'returning'))
      .map(rental => ({
        rental,
        icon: 'caution',
        date: moment(rental.updated_at).add(-7, 'hours').format('D MMMM YYYY'),
        status: rental.status === 'retrieving' ? 'Get Car Request' : 'Return Car Request',
        message: `${rental.lessee_id.fullname} wants to ${rental.status === 'retrieving' ? 'get' : 'return'} your ${rental.car_id.title}.`,
      }));
    this.setState({ notifications });
  }

  handleChangeRetalStatus = async (rental) => {
    const { token } = this.props;
    if (rental.status === 'retrieving') {
      await retrieveLessorRental(rental._id, { headers: { Authorization: `Bearer ${token}` } }); // eslint-disable-line
    } else if (rental.status === 'returning') {
      await returnLessorRental(rental._id, { headers: { Authorization: `Bearer ${token}` } }); // eslint-disable-line
    }
    this.getRentals();
  }

  toggleModal() {
    this.setState(state => ({
      isLoginModalActive: !state.isLoginModalActive,
    }));
  }

  toggleRegisterModal() {
    this.setState(state => ({
      isRegisterModalActive: !state.isRegisterModalActive,
    }));
  }

  handleLogin({ email, password }) {
    const { isAuthResolving, login } = this.props;
    if (isAuthResolving !== true) {
      // eslint-disable-next-line no-alert
      return login({ email, password }).then(this.toggleModal).catch(err => alert(`Failed: ${err.response.data.msg || 'Email or Passward is incorrect'}`));
    }
    return Promise.resolve();
  }

  handleRegister({
    email,
    password,
    rePassword,
    fullname,
  }) {
    const { register } = this.props;
    if (password === rePassword) {
      // eslint-disable-next-line no-alert
      return register({ email, password, fullname }).then(this.toggleRegisterModal).catch(() => alert('Failed'));
    }
    // eslint-disable-next-line no-alert
    return alert('Password does not match');
  }

  render() {
    const {
      role,
      user,
      logout,
      history,
      children,
      hideSearchBar,
    } = this.props;
    const {
      isLoginModalActive,
      isRegisterModalActive,
      notifications,
      showMenu,
      showSearch,
    } = this.state;
    return (
      <WebContainer>
        <Navbar
          toggleMenu={() => this.setState({ showMenu: !showMenu })}
          items={role ? (
            <>
              <Link to={`/user/${user.id}`}><NavItem>{user.fullname}</NavItem></Link>
              <Link to="/my-rentals"><NavItem>My Rentals</NavItem></Link>
              <Link to="/my-cars"><NavItem>My Cars</NavItem></Link>
              {
                role === 'Admin'
                && <Link to="/admin"><NavItem>Admin</NavItem></Link>
              }
              <NavItem onClick={() => {
                logout();
                window.location = '/';
              }}
              >
                Logout
              </NavItem>
            </>
          ) : (
            <>
              <NavItem onClick={this.toggleRegisterModal}>Register</NavItem>
              <NavItem onClick={this.toggleModal}>Login</NavItem>
            </>
          )}
        >
          {!hideSearchBar && <SearchContianer><SearchCard history={history} /></SearchContianer>}
        </Navbar>
        {showMenu && (
          <MobileContainer>
            {role ? (
              <>
                <Link to={`/user/${user.id}`}><MobileNavItem>{user.fullname}</MobileNavItem></Link>
                <Link to="/my-rentals"><MobileNavItem>My Rentals</MobileNavItem></Link>
                <Link to="/my-cars"><MobileNavItem>My Cars</MobileNavItem></Link>
                {
                  role === 'Admin'
                  && <Link to="/admin"><MobileNavItem>Admin</MobileNavItem></Link>
                }
                <MobileNavItem onClick={() => {
                  logout();
                  window.location = '/';
                }}
                >
                  Logout
                </MobileNavItem>
              </>
            ) : (
              <>
                <MobileNavItem onClick={this.toggleRegisterModal}>Register</MobileNavItem>
                <MobileNavItem onClick={this.toggleModal}>Login</MobileNavItem>
              </>
            )}
          </MobileContainer>
        )}
        <MobileContainer>
          {!hideSearchBar && (
            <MobileSearchCard
              toggleSearch={() => this.setState({ showSearch: !showSearch })}
              history={history}
              showSearch={showSearch}
            />
          )}
        </MobileContainer>
        <Content hideSearchBar={hideSearchBar}>
          <NotificationContainer>
            {notifications.map(noti => (
              // eslint-disable-next-line
              <NotificationTab key={noti.rental._id} {...noti} onAccept={() => this.handleChangeRetalStatus(noti.rental)} />
            ))}
          </NotificationContainer>
          {children}
        </Content>
        <Footer />
        <LoginModal
          active={isLoginModalActive}
          onClose={this.toggleModal}
          onSubmit={this.handleLogin}
        />
        <RegisterModal
          active={isRegisterModalActive}
          onClose={this.toggleRegisterModal}
          onSubmit={this.handleRegister}
        />
      </WebContainer>
    );
  }
}

export default connect(
  state => ({
    amount: state.home.amount,
    token: state.auth.token,
    role: state.auth.user.role,
    user: state.auth.user,
    id: state.auth.user.id,
    isAuthResolving: state.auth.isResolving,
  }),
  {
    ...homeActions,
    ...authActions,
  },
)(Layout);

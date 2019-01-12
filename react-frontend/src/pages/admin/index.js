import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Tab, Tabs, TabList, TabPanel,
} from 'react-tabs';
import { actions as authActions } from '../../redux/auth';
import Layout from '../../common/layout';
import {
  getAllUsers,
  getAllCars,
  getAllRentals,
  banUser,
  unBanUser,
  removeCar,
  terminateRental,
} from '../../utils/carbnb';
import RentalTable from './components/rental-table';
import CarTable from './components/car-table';
import UserTable from './components/user-table';
import 'react-tabs/style/react-tabs.css';

const mockRentalList = [
  {
    id: '1',
    lessee_id: '001',
    lessor_id: '100',
    car_id: '010',
    started_at: '4 Oct',
    ended_at: '5 Oct',
    status: 'OK',
    payment_ref: 'OK',
  },
  {
    id: '2',
    lessee_id: '002',
    lessor_id: '200',
    car_id: '020',
    started_at: '4 Oct',
    ended_at: '5 Oct',
    status: 'OK',
    payment_ref: 'OK',
  },
  {
    id: '3',
    lessee_id: '002',
    lessor_id: '200',
    car_id: '020',
    started_at: '4 Oct',
    ended_at: '5 Oct',
    status: 'OK',
    payment_ref: 'OK',
  },
];

class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rentalList: mockRentalList,
      userList: [],
      carList: [],
    };
    this.handleLogout = this.handleLogout.bind(this);
  }

  async componentDidMount() {
    const { role, history } = this.props;
    if (role !== 'Admin') {
      history.replace('/');
    }
    await this.getCar();
    await this.getUser();
    await this.getRental();
  }

  getUser = async () => {
    const { token } = this.props;
    const headers = { Authorization: `Bearer ${token}` };
    const userList = await getAllUsers({ headers });
    this.setState({ userList });
  }

  getCar = async () => {
    const { token } = this.props;
    const headers = { Authorization: `Bearer ${token}` };
    const carList = await getAllCars({ headers });
    this.setState({ carList });
  }

  getRental = async () => {
    const { token } = this.props;
    const headers = { Authorization: `Bearer ${token}` };
    const rentalList = await getAllRentals({ headers });
    this.setState({ rentalList });
  }

  banUser = async (userId) => {
    const { token } = this.props;
    const headers = { Authorization: `Bearer ${token}` };
    await banUser(userId, { headers });
    await this.getUser();
  }

  unBanUser = async (userId) => {
    const { token } = this.props;
    const headers = { Authorization: `Bearer ${token}` };
    await unBanUser(userId, { headers });
    await this.getUser();
  }

  removeCar = async (userId) => {
    const { token } = this.props;
    const headers = { Authorization: `Bearer ${token}` };
    try {
      await removeCar(userId, { headers });
      await this.getCar();
    } catch (e) {
      alert(e.response.data.msg);
    }
  }

  terminateRental = async (userId) => {
    const { token } = this.props;
    const headers = { Authorization: `Bearer ${token}` };
    await terminateRental(userId, { headers });
    await this.getRental();
  }

  handleLogout() {
    const { history, logout } = this.props;
    logout();
    history.push('/');
  }

  render() {
    const { rentalList, userList, carList } = this.state;
    return (
      <Layout hideSearchBar>
        <Tabs>
          <TabList>
            <Tab>Users</Tab>
            <Tab>Cars</Tab>
            <Tab>Rentals</Tab>
          </TabList>
          <TabPanel>
            <UserTable data={userList} banUser={this.banUser} unBanUser={this.unBanUser} />
          </TabPanel>
          <TabPanel>
            <CarTable data={carList} removeCar={this.removeCar} />
          </TabPanel>
          <TabPanel>
            <RentalTable data={rentalList} terminateRental={this.terminateRental} />
          </TabPanel>
        </Tabs>
      </Layout>
    );
  }
}

export default connect(
  state => ({
    token: state.auth.token,
    role: state.auth.user.role,
  }),
  {
    ...authActions,
  },
)(Admin);

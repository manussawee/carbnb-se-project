
import React from 'react';
import moment from 'moment';
import styled from 'styled-components';
import Button from '../../../common/forms/button';

const Table = {
  Container: styled.div`
    width: 100%;
  `,
  Row: styled.div`
    display: flex;
    flex-direction: row;
    :nth-child(even) {
      background: ${props => props.theme.lightGray};
    }
    &:hover {
    //   background: ${props => props.theme.gray};
    }
  `,
  tCol: styled.div`
    align-items: center;
    display: flex;
    padding: 0.5rem;
    padding-top: 1rem;
    padding-bottom: 1rem;
    height: 1.25rem;
    background: ${props => props.theme.green};
    color : white;
    flex: ${props => (props.smaller ? '0.6' : '1')};
  `,
  Col: styled.div`
    justify-content: ${props => (props.center ? 'center' : 'flex-start')};
    align-items: center;
    display: flex;
    padding-top: 0.2rem;
    padding-bottom: 0.2rem;
    padding: 0.5rem;
    margin-top: 0.4rem;
    margin-bottom: 0.4rem;
    height: 1.2rem;
    flex: ${props => (props.smaller ? '0.6' : '1')};
    overflow: hidden;
  `,
};

const RentalTable = ({ data, terminateRental }) => (
  <Table.Container>
    <Table.Row>
      <Table.tCol smaller>Lessor</Table.tCol>
      <Table.tCol>Lessee</Table.tCol>
      <Table.tCol>Car</Table.tCol>
      <Table.tCol smaller>Start Date</Table.tCol>
      <Table.tCol smaller>End Date</Table.tCol>
      <Table.tCol smaller>Price</Table.tCol>
      <Table.tCol>Status</Table.tCol>
      <Table.tCol> </Table.tCol>
    </Table.Row>
    {data.map(row => (
      // eslint-disable-next-line
      <Table.Row key={row._id}>
        <Table.Col smaller>{row.lessor_id.fullname}</Table.Col>
        <Table.Col>{row.lessee_id.fullname}</Table.Col>
        <Table.Col>{row.car_id && row.car_id.title}</Table.Col>
        <Table.Col smaller>{moment(row.started_at).format('DD MMM')}</Table.Col>
        <Table.Col smaller>{moment(row.ended_at).format('DD MMM')}</Table.Col>
        <Table.Col smaller>{row.price}</Table.Col>
        <Table.Col>{row.status}</Table.Col>
        <Table.Col center>
          <Button
            dangerRed={row.status === 'available'}
            gray={row.status !== 'available'}
            // eslint-disable-next-line
            onClick={() => row.status === 'available' && terminateRental(row._id)}
          >
            Terminate
          </Button>
        </Table.Col>
      </Table.Row>
    ))}
  </Table.Container>
);

export default RentalTable;

import React from 'react';
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
    flex: 1;
  `,
  Col: styled.div`
    justify-content: ${props => (props.center ? 'center' : 'flex-start')};
    align-items: center;
    display: flex;
    padding-top: 0.2rem;
    padding-bottom: 0.2rem;
    padding: 0.5rem;
    margin: 0.4rem;
    height: 1.2rem;
    flex: 1;
  `,
};

const RentalTable = ({ data, removeCar }) => (
  <Table.Container>
    <Table.Row>
      <Table.tCol>Car</Table.tCol>
      <Table.tCol>Owner</Table.tCol>
      <Table.tCol>Type</Table.tCol>
      <Table.tCol>Price</Table.tCol>
      <Table.tCol>Status</Table.tCol>
      <Table.tCol>Location</Table.tCol>
      <Table.tCol>Available Type</Table.tCol>
      <Table.tCol> </Table.tCol>
    </Table.Row>
    {data.map(row => (
      // eslint-disable-next-line
      <Table.Row key={row._id}>
        <Table.Col>{row.title}</Table.Col>
        <Table.Col>{row.user_id.fullname}</Table.Col>
        <Table.Col>{row.type}</Table.Col>
        <Table.Col>{row.price}</Table.Col>
        <Table.Col>{row.is_banned ? 'BANNED' : row.status}</Table.Col>
        <Table.Col>{row.location}</Table.Col>
        <Table.Col>{row.available_type}</Table.Col>
        <Table.Col center>
          {/* eslint-disable-next-line */}
          <Button dangerRed onClick={() => removeCar(row._id)}>
            Remove
          </Button>
        </Table.Col>
      </Table.Row>
    ))}
  </Table.Container>
);

export default RentalTable;

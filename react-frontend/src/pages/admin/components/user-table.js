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
    flex: ${props => (props.small ? '0.5' : '1')};
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
    flex: ${props => (props.small ? '0.5' : '1')};
  `,
};

const UserTable = ({ data, unBanUser, banUser }) => (
  <Table.Container>
    <Table.Row>
      <Table.tCol>Full Name</Table.tCol>
      <Table.tCol>Email</Table.tCol>
      <Table.tCol small>Role</Table.tCol>
      <Table.tCol small>isBanned</Table.tCol>
      <Table.tCol> </Table.tCol>
    </Table.Row>
    {data.map(row => (
      // eslint-disable-next-line
      <Table.Row key={row._id}>
        <Table.Col>{row.fullname}</Table.Col>
        <Table.Col>{row.username}</Table.Col>
        <Table.Col small>{row.role}</Table.Col>
        <Table.Col small>{row.is_banned ? 'True' : 'False'}</Table.Col>
        {/* eslint-disable-next-line */}
        <Table.Col center>
          <Button
            {...(row.is_banned ? { gray: true } : { dangerRed: true })}
            // eslint-disable-next-line
            onClick={() => (row.is_banned ? unBanUser(row._id) : banUser(row._id))}
          >
            {row.is_banned ? 'Unban' : 'Ban'}
          </Button>
        </Table.Col>
      </Table.Row>
    ))}
  </Table.Container>
);

export default UserTable;

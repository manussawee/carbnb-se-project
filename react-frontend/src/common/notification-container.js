/* eslint-disable */
import React, { Component } from 'react';
import styled from 'styled-components';
import Container from './container';
import NotificationTab from './notification-tab';

const NotiContainer = styled(Container)`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-items: center;
    padding: 1rem;
`;

export const NotificationContext = React.createContext(() => {});

class NotificationContainer extends Component {
  state = {
    msg: [],
  }

  recieveMsg = (msg) => {
    const newMsg = [...this.state.msg, msg];
    // console.log(newMsg);
    this.setState({ msg: newMsg });
  }

  deleteMsg = key => {
    let newMsg = [...this.state.msg]
    const targetIndex = newMsg.map(msg => msg.id).indexOf(key)
    newMsg.splice(targetIndex, 1)
    this.setState({ msg: newMsg })
  }

  render() {
    return (
      <NotificationContext.Provider value={this.recieveMsg}>
        { this.state.msg.map(noti => (
          <NotificationTab {...noti} onDelete={this.deleteMsg} />
        ))}

        <div>
          <h1>
            {' '}
          msg:
            {' '}
            {this.state.msg.name}
          </h1>
          {this.props.children}
        </div>
      </NotificationContext.Provider>
    );
  }
}

export default NotificationContainer;

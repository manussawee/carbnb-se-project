import React, { Component } from 'react';
import { NotificationContext } from './notification-container';

class NotificationList extends Component {
  static contextType = NotificationContext;

  state = {}

  data = [
    {
      id: 1, icon: 'caution', date: 'October 29 at 1:50 PM', status: 'Rental Request', name: 'Ekkalak Leelasornchai ', car: 'MCLAREN SENNA',
    },
    {
      id: 2, icon: 'caution', date: 'October 29 at 1:50 PM', status: 'Car Return', name: 'Ekkalak Leelasornchai ', car: 'MCLAREN SENNA',
    },
    {
      id: 3, icon: 'success', date: 'October 29 at 1:50 PM', status: 'Rental Success', rentalId: 'Rental #001234',
    },
  ]

  render() {
    // console.log(this.context);
    const sendNotification = this.context;
    return (
      <ul>
        {
          this.data.map(data => (
            <li key={data.id} style={{ listStyle: 'none' }}>
              <button type="button" onClick={() => sendNotification(data)}>
                {data.status}
              </button>
            </li>
          ))
        }
      </ul>
    );
  }
}
export default NotificationList;

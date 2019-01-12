import React from 'react';
import styled from 'styled-components';
import success from '../assets/success/success.png';
import success2x from '../assets/success/success@2x.png';
import success3x from '../assets/success/success@3x.png';
import caution from '../assets/caution/caution.png';
import caution2x from '../assets/caution/caution@2x.png';
import caution3x from '../assets/caution/caution@3x.png';
import close from '../assets/close/close.png';
import close2x from '../assets/close/close@2x.png';
import close3x from '../assets/close/close@3x.png';
import Button from './forms/button';

const NotiTab = {
  Container: styled.div`
      display: flex;
      height: 3rem;
      background-color: ${props => props.theme.black};
      margin-top: 1rem;
      margin-bottom: 1rem;
      justify-content: space-between;
      border-radius: 4px;
      box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
      padding-right: 8px;

      @media screen and (max-width: 600px) {
        display: block;
        height: auto;
        padding: 16px;
      }
    `,
  Column: styled.div`
    display: flex;
    align-items: center;

    @media screen and (max-width: 600px) {
      justify-content: ${props => (props.mobile ? 'flex-end' : 'initial')};
      @media screen and (max-width: 600px) {
        margin-top: 16px;
        :first-child {
          margin-top: 0;
        }
      }
    }
  `,
  Icon: styled.div`
    display: flex;
    padding-left: 1rem;
    padding-right: 1rem;

    @media screen and (max-width: 600px) {
      padding-left: 0;
    }
  `,
  Status: styled.div`
      display: flex;
      justify-content: flex-start;
      width: 10rem;
      font-size: 1rem;
      color: ${props => props.theme.white};
  `,
  Content: styled.p`
    font-size: 0.9rem;
    font-weight: lighter;
    color: ${props => props.theme.green};
  `,
  FixContent: styled.p`
    font-size: 0.9rem;
    font-weight: lighter;
    margin: 0.5rem;
    color: ${props => props.theme.white};
    `,
  Date: styled.div`
    display: flex;
    justify-items: flex-end;
    font-size: 1rem;
    color: ${props => props.theme.white};
    margin-right: 16px;
  `,
  Message: styled.div`
    color: ${props => props.theme.white};
    font-weight: 300;
  `,
};

const iconType = {
  success: {
    source: success,
    sourceSet: `${success2x} 2x, ${success3x} 3x`,
    alt: 'success',
  },
  caution: {
    source: caution,
    sourceSet: `${caution2x} 2x, ${caution3x} 3x`,
    alt: 'caution',
  },
  close: {
    source: close,
    sourceSet: `${close2x} 2x, ${close3x} 3x`,
    alt: 'close',
  },
};

const renderIcon = (icon, onDelete = () => {}) => (
  // eslint-disable-next-line
  <img
    src={iconType[icon].source}
    srcSet={iconType[icon].sourceSet}
    alt={iconType[icon].alt}
    onClick={onDelete}
  />
);

const NotificationTab = ({
  icon,
  date,
  status,
  message,
  onAccept,
}) => (
  <NotiTab.Container>
    <NotiTab.Column>
      <NotiTab.Icon>
        {
          renderIcon(icon)
        }
      </NotiTab.Icon>
      <NotiTab.Status>
        {status}
      </NotiTab.Status>
    </NotiTab.Column>
    <NotiTab.Column>
      <NotiTab.Message>{message}</NotiTab.Message>
    </NotiTab.Column>
    <NotiTab.Column mobile>
      <NotiTab.Date>
        {date}
      </NotiTab.Date>
      <Button onClick={onAccept}>Accept</Button>
    </NotiTab.Column>
  </NotiTab.Container>
);
export default NotificationTab;

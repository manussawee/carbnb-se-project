import React from 'react';
import styled from 'styled-components';

const Overlay = styled.div`
  display: ${props => (props.active ? 'inline' : 'none')};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: ${props => props.theme.translucentBlack};
  z-index: 9000;
`;

const CloseButton = styled.button`
  padding: 0.5rem;
  margin: -1rem -0.5rem -0.5rem -0.5rem;
  border: 0;
  font-size: 1.5rem;
  color: ${props => props.theme.gray};
  background-color: ${props => props.theme.white};
  text-decoration: none;
  cursor: pointer;
`;

const Dialog = {
  Container: styled.div`
    display: ${props => (props.active ? 'inline' : 'none')};
    position: fixed;
    top: 88px;
    left: 50%;
    transform: translate(-50%, 0);
    z-index: 9001;
    height: 100vh;
    overflow: auto;

    @media screen and (max-width: 600px) {
      top: 0;
      left: 0;
      transform: translate(0, 0);
      width: 100%;
      padding: 0 8px;
      box-sizing: border-box;
    }
  `,
  Box: styled.div`
    display: flex;
    flex-direction: column;
    padding-top: 1rem;
    padding-left: 1rem;
    padding-right: 1rem;
    width: 26.5rem;
    background: ${props => props.theme.white};
    border-radius: 0.5rem;

    @media screen and (max-width: 600px) {
      margin: 8px 0;
      width: 100%;
      box-sizing: border-box;
    }
  `,
  Header: styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 1rem;
    font-size: 1rem;
    font-weight: bold;
    color: ${props => props.theme.black};
  `,
};

const Modal = ({
  active,
  onClose,
  header,
  children,
}) => (
  <>
    <Dialog.Container active={active}>
      <Dialog.Box>
        <Dialog.Header>
          <div>{ header || '\xa0' }</div>
          <CloseButton onClick={onClose}>&times;</CloseButton>
        </Dialog.Header>
        { children }
      </Dialog.Box>
    </Dialog.Container>
    <Overlay active={active} onClick={onClose} />
  </>
);

export default Modal;

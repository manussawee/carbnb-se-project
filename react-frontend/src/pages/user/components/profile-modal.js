import React, { Component } from 'react';
import styled from 'styled-components';
import Modal from '../../../common/modal';
import Button from '../../../common/forms/button';

const Form = styled.form`
  width: 100%;
  padding-bottom: 1rem;
`;

const FormRow = styled.div`
  width: 100%;
  display: flex;
  margin-bottom: ${props => (props.last ? '0' : '16px')};
  color: ${props => props.theme.black};
`;

const InputGroup = styled.div`
  margin-right: 16px;
  flex: 1;
  display: flex;
  flex-direction: column;
  /* overflow: hidden; */
  :last-child {
    margin-right: 0;
  }
`;

const Label = styled.div`
  font-size: 15px;
  font-weight: 500;
  margin-bottom: 6px;
`;

const TextInput = styled.input`
  height: 36px;
  border-radius: 4px;
  border: 1px solid ${props => props.theme.lightGray};
  padding: 0 12px;
  font-size: 13px;
  color: ${props => props.theme.black};
  font-size: 14px;
  box-sizing: border-box;
  width: 100%;
`;

const Hr = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${props => props.theme.gray};
  margin-bottom: 16px;
`;

const CenterRow = styled.div`
  width: 100%;
  margin-bottom: 16px;
  display: flex;
  justify-content: center;
  color: ${props => props.theme.red};
  font-weight: 300;
`;

class ProfileModal extends Component {
  state = {
    oldPassword: '',
    newPassword: '',
    reNewPassword: '',
    fullname: '',
    phone: '',
  };

  componentWillReceiveProps(nextProps) {
    const { fullname, phone } = this.state;
    if (nextProps.fullname !== fullname || nextProps.phone !== phone) {
      this.setState({
        fullname: nextProps.fullname,
        phone: nextProps.phone,
      });
    }
  }

  render() {
    const {
      active,
      onClose,
      onSubmit,
      message,
    } = this.props;
    const {
      fullname,
      oldPassword,
      newPassword,
      reNewPassword,
      phone,
    } = this.state;
    return (
      <Modal active={active} onClose={onClose}>
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            this.setState({
              oldPassword: '',
              newPassword: '',
              reNewPassword: '',
            });
            onSubmit(fullname, phone, oldPassword, newPassword, reNewPassword);
          }}
        >
          <FormRow>
            <InputGroup>
              <Label>Full Name</Label>
              <TextInput
                value={fullname}
                onChange={e => this.setState({ fullname: e.target.value })}
              />
            </InputGroup>
            <InputGroup>
              <Label>Phone Number</Label>
              <TextInput
                value={phone}
                onChange={e => this.setState({ phone: e.target.value })}
              />
            </InputGroup>
          </FormRow>
          <Hr />
          <FormRow>
            <InputGroup>
              <Label>Current Password</Label>
              <TextInput
                value={oldPassword}
                onChange={e => this.setState({ oldPassword: e.target.value })}
                type="password"
              />
            </InputGroup>
          </FormRow>
          <FormRow>
            <InputGroup>
              <Label>New Password</Label>
              <TextInput
                value={newPassword}
                onChange={e => this.setState({ newPassword: e.target.value })}
                type="password"
              />
            </InputGroup>
          </FormRow>
          <FormRow>
            <InputGroup>
              <Label>Confirm Password</Label>
              <TextInput
                value={reNewPassword}
                onChange={e => this.setState({ reNewPassword: e.target.value })}
                type="password"
              />
            </InputGroup>
          </FormRow>
          {message && message.length > 0 && <CenterRow>{message}</CenterRow>}
          <Button fullWidth>Update Profile</Button>
        </Form>
      </Modal>
    );
  }
}

export default ProfileModal;

import React, { Component } from 'react';
import styled from 'styled-components';
import Modal from '../../modal';
import FormGroup from '../../forms/form-group';
import Label from '../../forms/label';

const Form = styled.form`
  width: 100%;
  padding-bottom: 1rem;
`;

const Row = styled.div`
  display: flex;
  justify-content: center;
`;

const Col = styled.div`
  margin-right: 16px;
  flex: 1;
  :last-child {
    margin-right: 0;
  }
`;

const TextInput = styled.input`
  height: 36px;
  border-radius: 4px;
  border: 1px solid ${props => props.theme.lightGray};
  padding: 0 12px;
  color: ${props => props.theme.black};
  font-size: 14px;
  width: 100%;
  box-sizing: border-box;
`;

const GreenButton = styled.button`
  margin-bottom: 8px;
  font-size: 15px;
  font-weight: 500;
  border-radius: 4px;
  background-color: ${props => props.theme.green};
  color: white;
  width: 100%;
  height: 36px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const DescriptionContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 8px;
`;

const Description = styled.div`
  font-size: 12px;
  font-weight: 300;
  width: 270px;
  text-align: center;
  line-height: 1.33;
`;

const Clickable = styled.span`
  color: ${props => props.theme.green};
  cursor: pointer;
`;

class LoginModal extends Component {
  state = {
    name: '',
    email: '',
    password: '',
    rePassword: '',
  };

  render() {
    const {
      name,
      email,
      password,
      rePassword,
    } = this.state;
    const { onSubmit } = this.props;
    return (
      <Modal header="Register" {...this.props}>
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit({
              fullname: name,
              email,
              password,
              rePassword,
            });
          }}
        >
          <Row>
            <Col>
              <FormGroup>
                <Label>Your name</Label>
                <TextInput value={name} onChange={e => this.setState({ name: e.target.value })} />
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Label>Email</Label>
                <TextInput type="email" value={email} onChange={e => this.setState({ email: e.target.value })} />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col>
              <FormGroup>
                <Label>Password</Label>
                <TextInput value={password} onChange={e => this.setState({ password: e.target.value })} type="password" />
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Label>Re-enter password</Label>
                <TextInput value={rePassword} onChange={e => this.setState({ rePassword: e.target.value })} type="password" />
              </FormGroup>
            </Col>
          </Row>
          <GreenButton>Create your account</GreenButton>
          <DescriptionContainer>
            <Description>
              <span>By creating an account, you agree to Carbnb’s </span>
              <Clickable>Conditions of Use</Clickable>
              <span> and </span>
              <Clickable>Privacy Notice.</Clickable>
            </Description>
          </DescriptionContainer>
        </Form>
      </Modal>
    );
  }
}

export default LoginModal;

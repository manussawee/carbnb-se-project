import React, { Component } from 'react';
import styled from 'styled-components';
import Modal from '../../modal';
import FormGroup from '../../forms/form-group';
import Label from '../../forms/label';
import Input from '../../forms/input';
import Button from '../../forms/button';

const AnchorButton = styled.button`
  margin-bottom: 1rem;
  font-size: 1rem;
  font-weight: 300;
  color: ${props => props.theme.green};
`;

const Form = {
  Row: styled.div`
    display: flex;
    justify-content: center;
  `,
  Col: styled.div`
    margin-right: 16px;
    flex: 1;
    :last-child {
      margin-right: 0;
    }
  `,
  ButtonContainer: styled.div`
    margin-bottom: 1rem;
  `,
  Footer: styled.div`
    display: flex;
    justify-content: space-between;
  `,
};

class LoginModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      isPasswordVisible: false,
    };

    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.togglePasswordVisible = this.togglePasswordVisible.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleEmailChange(event) {
    this.setState({ email: event.target.value });
  }

  handlePasswordChange(event) {
    this.setState({ password: event.target.value });
  }

  togglePasswordVisible() {
    this.setState(state => ({
      ...state,
      isPasswordVisible: !state.isPasswordVisible,
    }));
  }

  handleSubmit(event) {
    const { onSubmit } = this.props;
    const { email, password } = this.state;
    event.preventDefault();
    onSubmit({ email, password });
  }

  render() {
    const { email, password, isPasswordVisible } = this.state;
    return (
      <Modal header="Login" {...this.props}>
        <form onSubmit={this.handleSubmit}>
          <Form.Row>
            <Form.Col>
              <FormGroup>
                <Label>Email</Label>
                <Input type="email" onChange={this.handleEmailChange} value={email} />
              </FormGroup>
            </Form.Col>
            <Form.Col>
              <FormGroup>
                <Label>Password</Label>
                <Input
                  onChange={this.handlePasswordChange}
                  type={isPasswordVisible ? 'text' : 'password'}
                  value={password}
                />
              </FormGroup>
            </Form.Col>
          </Form.Row>
          <Form.Footer>
            <div />
            <AnchorButton type="button" onClick={this.togglePasswordVisible}>
              {
                isPasswordVisible ? 'Hide Password' : 'Show Password'
              }
            </AnchorButton>
          </Form.Footer>
          <Form.ButtonContainer>
            <Button fullWidth type="submit">Login</Button>
          </Form.ButtonContainer>
        </form>
        {/* <Form.Footer>
          <AnchorButton>Don&apos;t have an account?</AnchorButton>
          <AnchorButton>Forgot password?</AnchorButton>
        </Form.Footer> */}
      </Modal>
    );
  }
}

export default LoginModal;

import styled from 'styled-components';

const Button = styled.button`
  ${props => (props.fullWidth ? 'width: 100%;' : 'padding-left: 24px; padding-right: 24px;')}
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  border: none;
  border-radius: 0.25rem;
  background-color: ${props => props.theme.green};
  ${props => props.red && `background-color: ${props.theme.red}`};
  ${props => props.dangerRed && `background-color: ${props.theme.dangerRed}`};
  ${props => props.gray && `background-color: ${props.theme.gray}`};
  color: ${props => props.theme.white};
  font-size: 1rem;
  font-weight: 500;
  cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};
`;

export default Button;

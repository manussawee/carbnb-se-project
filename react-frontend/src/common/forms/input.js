import styled from 'styled-components';

const Input = styled.input`
  width: 100%;
  box-sizing: border-box;
  padding: 0.375rem 0.75rem;
  border: 1px solid ${props => props.theme.lightGray};
  border-radius: 0.25rem;
  color: ${props => props.theme.black};
  font-size: 1rem;
  line-height: 1.5;
  height: 36px;

  :active, :focus {
    border: 1px solid ${props => props.theme.green}
  }
`;

export default Input;

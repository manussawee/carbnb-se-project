import styled from 'styled-components';

const NavItem = styled.li`
  margin-left: 1.5rem;
  color: ${props => props.theme.white};
  font-size: 20px;
  font-weight: bold;
  cursor: pointer;
`;

export default NavItem;

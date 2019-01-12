import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import FormGroup from '../../forms/form-group';
import Label from '../../forms/label';
import Input from '../../forms/input';
import Button from '../../forms/button';
import locations from '../../locations';

const Select = styled.select`
  width: 100%;
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

const Card = {
  Container: styled.div`
    padding: 0 16px;
    width: 100%;
    box-sizing: border-box;
    background: ${props => props.theme.white};
    backdrop-filter: blur(2rem);
    -webkit-backdrop-filter: blur(2rem);
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
    position: absolute;
    z-index: 999;
  `,
  Title: styled.div`
    font-size: 1rem;
  `,
  Body: styled.div`
    font-size: 1rem;
    width: 100%;
    display: ${props => (props.showSearch ? 'block' : 'none')};
    padding-bottom: 16px;
  `,
  Bottom: styled.div`
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
  `,
  Row: styled.div`
    display: flex;
    width: 100%;
    background: ${props => props.theme.white};
  `,
  Col: styled.div`
    width: 100%;
    padding-right: 1rem;
    overflow: hidden;
    :last-child {
      padding-right: 0;
    }
  `,
};

const BetweenRow = styled.div`
  width: 100%;
  height: 56px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ToggleButton = styled.img`
  width: 24px;
  height: 24px;
  transform: rotate(${props => (props.showSearch ? '180deg' : '0deg')});
  cursor: pointer;
`;

class SearchCard extends React.Component {
  state = {
    location: '',
    type: '',
    startDate: '',
    endDate: '',
  };

  searchCar = () => {
    const {
      location,
      type,
      startDate,
      endDate,
    } = this.state;
    return (`${location ? `location=${location}&` : ''}${type ? `type=${type}&` : ''}${startDate ? `startDate=${startDate}&` : ''}${endDate ? `endDate=${endDate}&` : ''}`);
  }

  render() {
    const {
      location,
      type,
      startDate,
      endDate,
    } = this.state;
    const {
      showSearch,
      toggleSearch,
    } = this.props;
    return (
      <Card.Container>
        <BetweenRow>
          <Card.Title>Find your desired car here!</Card.Title>
          <ToggleButton showSearch={showSearch} onClick={toggleSearch} src="/asset/image/toggle-button@2x.png" />
        </BetweenRow>
        <Card.Body showSearch={showSearch}>
          <Card.Row>
            <Card.Col>
              <FormGroup>
                <Label>Location</Label>
                <Select
                  value={location}
                  onChange={e => this.setState({ location: e.target.value })}
                >
                  <option>All</option>
                  {locations.map(loc => (
                    <option value={loc} key={loc}>{loc}</option>
                  ))}
                </Select>
              </FormGroup>
            </Card.Col>
            <Card.Col>
              <FormGroup>
                <Label>Vehicle Type</Label>
                <Select value={type} onChange={e => this.setState({ type: e.target.value })}>
                  <option>All</option>
                  {['Car', 'Motorcycle', 'Van'].map(t => (
                    <option value={t} key={t}>{t}</option>
                  ))}
                </Select>
              </FormGroup>
            </Card.Col>
          </Card.Row>
          <Card.Row>
            <Card.Col>
              <FormGroup>
                <Label>Start Date</Label>
                <Input
                  type="date"
                  value={startDate}
                  onChange={e => this.setState({ startDate: e.target.value })}
                />
              </FormGroup>
            </Card.Col>
            <Card.Col>
              <FormGroup>
                <Label>Return Date</Label>
                <Input
                  type="date"
                  value={endDate}
                  onChange={e => this.setState({ endDate: e.target.value })}
                />
              </FormGroup>
            </Card.Col>
          </Card.Row>
          <Link to={`/search/${this.searchCar()}`}>
            <Button fullWidth>Search your car</Button>
          </Link>
        </Card.Body>
      </Card.Container>
    );
  }
}

export default SearchCard;

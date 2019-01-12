import React, { Component } from 'react';
import moment from 'moment';
import styled from 'styled-components';
import Modal from '../../../common/modal';
import Button from '../../../common/forms/button';
import ImagePicker from './image-picker';
import locations from '../../../common/locations';


const Form = styled.form`
  width: 100%;
  padding-bottom: 16px;
`;

const FormRow = styled.div`
  width: 100%;
  display: flex;
  margin-bottom: ${props => (props.last ? '0' : '16px')};
  color: ${props => props.theme.black};
  justify-content: center;
`;

const InputGroup = styled.div`
  margin-right: 16px;
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
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

  @media screen and (max-width: 480px) {
  }
`;

const Select = styled.select`
  height: 36px;
  border-radius: 4px;
  border: 1px solid ${props => props.theme.lightGray};
  padding: 0 12px;
  font-size: 13px;
  color: ${props => props.theme.black};
  font-size: 14px;
  box-sizing: border-box;
  width: 100%;

  @media screen and (max-width: 480px) {
  }
`;

const TabContainer = styled.div`
  width: 100%;
  display: flex;
  z-index: 2;
`;

const Tab = styled.div`
  border: 1px solid ${props => (props.active ? props.theme.black : props.theme.lightGray)};
  color: ${props => (props.active ? 'white' : props.theme.black)};
  background-color: ${props => (props.active ? props.theme.black : 'white')};
  margin-right: 2px;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  height: 36px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 16px;
  cursor: pointer;
`;

const TabLine = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${props => props.theme.lightGray};
  margin-top: -1px;
  margin-bottom: 8px;
`;

const DayRow = styled.div`
  width: 100%;
  margin-bottom: 8px;
  display: flex;
  justify-content: center;
`;

const DayButton = styled.div`
  border: 1px solid ${props => (props.active ? props.theme.black : props.theme.lightGray)};
  color: ${props => (props.active ? 'white' : props.theme.black)};
  background-color: ${props => (props.active ? props.theme.black : 'white')};
  margin-right: 8px;
  border-radius: 4px;
  width: 80px;
  height: 36px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  :last-child {
    margin-right: 0%;
  }
`;

class AddCarModal extends Component {
  state = {
    id: 0,
    title: '',
    location: '',
    description: '',
    type: '',
    price: '',
    startDate: '',
    endDate: '',
    images: [],
    availableType: 'period',
    days: [0, 0, 0, 0, 0, 0, 0],
  };

  componentWillReceiveProps(props) {
    const { id } = this.state;
    if (props.editMode && id !== props.id) {
      this.setState({
        ...props,
      });
    }
  }

  toggleDay = (day) => {
    const { days } = this.state;
    days[day] = !days[day];
    this.setState({ days });
  }

  render() {
    const {
      title,
      location,
      description,
      type,
      price,
      availableType,
      days,
      startDate,
      endDate,
      editMode,
      images,
      id,
    } = this.state;
    const { removeCar, editCar, addCar } = this.props;
    return (
      <Modal header={editMode ? 'Edit Car' : 'Add Car'} {...this.props}>
        <Form
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <FormRow>
            <InputGroup>
              <Label>Title</Label>
              <TextInput value={title} onChange={e => this.setState({ title: e.target.value })} />
            </InputGroup>
            <InputGroup>
              <Label>Location</Label>
              <Select value={location} onChange={e => this.setState({ location: e.target.value })}>
                <option />
                {locations.map(loc => (
                  <option value={loc} key={loc}>{loc}</option>
                ))}
              </Select>
            </InputGroup>
          </FormRow>
          <FormRow>
            <InputGroup>
              <Label>Description</Label>
              <TextInput
                value={description}
                onChange={e => this.setState({ description: e.target.value })}
              />
            </InputGroup>
          </FormRow>
          <FormRow>
            <InputGroup>
              <Label>Vehicle Type</Label>
              <Select value={type} onChange={e => this.setState({ type: e.target.value })}>
                <option />
                {['Car', 'Motorcycle', 'Van'].map(t => (
                  <option value={t} key={t}>{t}</option>
                ))}
              </Select>
            </InputGroup>
            <InputGroup>
              <Label>Price Per Day (Baht)</Label>
              <TextInput value={price} onChange={e => this.setState({ price: e.target.value })} />
            </InputGroup>
          </FormRow>
          <div>
            <InputGroup>
              <Label>Available Type</Label>
              <TabContainer>
                <Tab active={availableType === 'period'} onClick={() => this.setState({ availableType: 'period' })}>Period</Tab>
                <Tab active={availableType === 'repeat'} onClick={() => this.setState({ availableType: 'repeat' })}>Repeat</Tab>
              </TabContainer>
              <TabLine />
              {availableType === 'period' && (
                <FormRow>
                  <InputGroup>
                    <Label>Start date</Label>
                    <TextInput
                      type="date"
                      value={moment(startDate).format('YYYY-MM-DD')}
                      onChange={e => this.setState({ startDate: e.target.value })}
                    />
                  </InputGroup>
                  <InputGroup>
                    <Label>End date</Label>
                    <TextInput
                      type="date"
                      value={moment(endDate).format('YYYY-MM-DD')}
                      onChange={e => this.setState({ endDate: e.target.value })}
                    />
                  </InputGroup>
                </FormRow>
              )}
              {availableType === 'repeat' && (
                <div>
                  <DayRow>
                    <DayButton onClick={() => this.toggleDay(0)} active={days[0]}>Sun</DayButton>
                    <DayButton onClick={() => this.toggleDay(1)} active={days[1]}>Mon</DayButton>
                    <DayButton onClick={() => this.toggleDay(2)} active={days[2]}>Tue</DayButton>
                    <DayButton onClick={() => this.toggleDay(3)} active={days[3]}>Wed</DayButton>
                  </DayRow>
                  <DayRow>
                    <DayButton onClick={() => this.toggleDay(4)} active={days[4]}>Thu</DayButton>
                    <DayButton onClick={() => this.toggleDay(5)} active={days[5]}>Fri</DayButton>
                    <DayButton onClick={() => this.toggleDay(6)} active={days[6]}>Sat</DayButton>
                  </DayRow>
                </div>
              )}
            </InputGroup>
          </div>
          <ImagePicker
            images={images}
            setImages={imgs => this.setState({ images: imgs })}
          />
          {!editMode && (
            <Button
              onClick={async () => {
                const shouldReset = await addCar({ ...this.state });
                if (shouldReset) {
                  this.setState({
                    id: 0,
                    title: '',
                    location: '',
                    description: '',
                    type: '',
                    price: '',
                    startDate: '',
                    endDate: '',
                    images: [],
                    availableType: 'period',
                    days: [0, 0, 0, 0, 0, 0, 0],
                  });
                }
              }}
              fullWidth
            >
              Add Car
            </Button>
          )}
          {editMode && (
            <FormRow last>
              <InputGroup>
                <Button
                  onClick={() => editCar(id, { ...this.state })}
                  fullWith
                >
                  Edit Car
                </Button>
              </InputGroup>
              <InputGroup>
                <Button
                  dangerRed
                  fullWith
                  onClick={() => removeCar(id)}
                >
                  Remove Car
                </Button>
              </InputGroup>
            </FormRow>
          )}
        </Form>
      </Modal>
    );
  }
}

export default AddCarModal;

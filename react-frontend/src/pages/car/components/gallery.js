import React, { Component } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
`;

const ImageContainer = styled.div`
  width: 100%;
  height: 496px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.theme.lightGray};
  overflow: hidden;

  @media screen and (max-width: 600px) {
    height: 240px;
  }
`;

const Image = styled.img`
  height: 100%;
  width: 100%;
  object-fit: cover;
`;

const ImagesRow = styled.div`
  width: 100%;
  overflow: auto;
  display: flex;
  justify-content: center;
  margin-top: 8px;
  align-items: center;
`;

const SubImage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.theme.lightGray};
  overflow: hidden;
  width: 64px;
  height: 56px;
  margin-right: 8px;
  cursor: pointer;
  border: ${props => (props.active ? '2px' : '0')} solid ${props => props.theme.green};
  box-sizing: border-box;
  :last-child {
    margin-right: 0pc;
  }
`;

class Gallery extends Component {
  state = {
    selectedIndex: 0,
  };

  setIndex = (index) => {
    this.setState({
      selectedIndex: index,
    });
  }

  render() {
    const { images } = this.props;
    const { selectedIndex } = this.state;
    return (
      <Container>
        <ImageContainer>
          <Image src={images[selectedIndex]} />
        </ImageContainer>
        <ImagesRow>
          {images.map((image, index) => (
            <SubImage
              key={image}
              active={index === selectedIndex}
              onClick={() => this.setIndex(index)}
            >
              <Image src={image} />
            </SubImage>
          ))}
        </ImagesRow>
      </Container>
    );
  }
}

export default Gallery;

import React, { Component } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  margin-bottom: 16px;
`;

const Row = styled.div`
  width: 100%;
  display: flex;
`;

const ImageRow = styled.div`
  flex: 1;
  overflow: auto;
  white-space: nowrap;
`;

const Description = styled.div`
  font-size: 12px;
  font-weight: 300;
  margin-top: 4px;
  color: ${props => props.theme.gray};
`;

const BoxContainer = styled.div`
  width: 64px;
  height: 64px;
  display: inline-block;
  margin-right: 8px;
  cursor: pointer;
`;

const Box = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  background-color: ${props => props.theme.lightGray};
  font-size: 56px;
  font-weight: 300;
  color: ${props => props.theme.green};
`;

const PlusImage = styled.img`
  width: 24px;
  height: 24px;
`;

const Image = styled.img`
  height: 100%;
`;

const UploadContainer = styled.div`
  width: 64px;
  height: 64px;
  margin-right: 8px;
  overflow: hidden;
  position: relative;
  input {
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    opacity: 0;
    cursor: pointer;
  }
`;

class ImagePicker extends Component {
  state = {
    images: [],
  };

  componentWillReceiveProps(props) {
    this.setState({
      images: props.images,
    });
  }

  handleUpload = (e) => {
    const reader = new FileReader();
    const file = e.target.files[0];

    reader.onloadend = () => {
      const { images } = this.state;
      const { setImages } = this.props;
      if (reader && reader.result && reader.result.indexOf('data:image/') !== -1) {
        this.setState({
          images: [...images, reader.result],
        });
        setImages([...images, reader.result]);
      } else if (reader.result.indexOf('data:image/') === -1) {
        alert('File must be an image file');
      }
    };

    reader.readAsDataURL(file);
  }

  removeImage = (index) => {
    const { images } = this.state;
    images.splice(index, 1);
    this.setState({ images });
  }

  render() {
    const { images } = this.state;
    return (
      <Container>
        <Row>
          <UploadContainer>
            <BoxContainer><Box><PlusImage src="/asset/image/plus.png" /></Box></BoxContainer>
            <input
              type="file"
              name="image"
              onChange={this.handleUpload}
            />
          </UploadContainer>
          <ImageRow>
            {images && images.map((image, index) => (
              <BoxContainer
                onClick={() => this.removeImage(index)}
                key={image.slice(image.length - 5 > 0 ? image.length - 5 : 0, image.length)}
              >
                <Box><Image src={image} /></Box>
              </BoxContainer>
            ))}
          </ImageRow>
        </Row>
        <Description>Click an image to remove</Description>
      </Container>
    );
  }
}

export default ImagePicker;

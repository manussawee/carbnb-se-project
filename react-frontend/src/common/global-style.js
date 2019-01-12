import { createGlobalStyle } from 'styled-components';
import airbnbCerealAppBlack from '../assets/fonts/airbnb-cereal-app/AirbnbCerealApp-Black.woff';
import airbnbCerealAppBlack2 from '../assets/fonts/airbnb-cereal-app/AirbnbCerealApp-Black.woff2';
import airbnbCerealAppBold from '../assets/fonts/airbnb-cereal-app/AirbnbCerealApp-Bold.woff';
import airbnbCerealAppBold2 from '../assets/fonts/airbnb-cereal-app/AirbnbCerealApp-Bold.woff2';
import airbnbCerealAppBook from '../assets/fonts/airbnb-cereal-app/AirbnbCerealApp-Book.woff';
import airbnbCerealAppBook2 from '../assets/fonts/airbnb-cereal-app/AirbnbCerealApp-Book.woff2';
import airbnbCerealAppExtraBold from '../assets/fonts/airbnb-cereal-app/AirbnbCerealApp-ExtraBold.woff';
import airbnbCerealAppExtraBold2 from '../assets/fonts/airbnb-cereal-app/AirbnbCerealApp-ExtraBold.woff2';
import airbnbCerealAppLight from '../assets/fonts/airbnb-cereal-app/AirbnbCerealApp-Light.woff';
import airbnbCerealAppLight2 from '../assets/fonts/airbnb-cereal-app/AirbnbCerealApp-Light.woff2';
import airbnbCerealAppMedium from '../assets/fonts/airbnb-cereal-app/AirbnbCerealApp-Medium.woff';
import airbnbCerealAppMedium2 from '../assets/fonts/airbnb-cereal-app/AirbnbCerealApp-Medium.woff2';

const GlobalStyle = createGlobalStyle`
  /* CSS resets */
  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed,
  figure, figcaption, footer, header, hgroup,
  menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  }
  /* HTML5 display-role reset for older browsers */
  article, aside, details, figcaption, figure,
  footer, header, hgroup, menu, nav, section {
    display: block;
  }
  body {
    line-height: 1;
  }
  ol, ul {
    list-style: none;
  }
  blockquote, q {
    quotes: none;
  }
  blockquote:before, blockquote:after,
  q:before, q:after {
    content: '';
    content: none;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }

  /* fonts */
  @font-face {
    font-family: 'Airbnb Cereal App';
    src: url(${airbnbCerealAppBlack2}) format('woff2'),
      url(${airbnbCerealAppBlack}) format('woff');
    font-weight: 900;
    font-style: normal;
  }

  @font-face {
    font-family: 'Airbnb Cereal App';
    src: url(${airbnbCerealAppMedium2}) format('woff2'),
      url(${airbnbCerealAppMedium}) format('woff');
    font-weight: 500;
    font-style: normal;
  }

  @font-face {
    font-family: 'Airbnb Cereal App Extra';
    src: url(${airbnbCerealAppExtraBold2}) format('woff2'),
      url(${airbnbCerealAppExtraBold}) format('woff');
    font-weight: 800;
    font-style: normal;
  }

  @font-face {
    font-family: 'Airbnb Cereal App';
    src: url(${airbnbCerealAppBold2}) format('woff2'),
      url(${airbnbCerealAppBold}) format('woff');
    font-weight: bold;
    font-style: normal;
  }

  @font-face {
    font-family: 'Airbnb Cereal App';
    src: url(${airbnbCerealAppLight2}) format('woff2'),
      url(${airbnbCerealAppLight}) format('woff');
    font-weight: 300;
    font-style: normal;
  }

  @font-face {
    font-family: 'Airbnb Cereal App Book';
    src: url(${airbnbCerealAppBook2}) format('woff2'),
      url(${airbnbCerealAppBook}) format('woff');
    font-weight: normal;
    font-style: normal;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  button {
    padding: 0;
    border: none;
    background: none;
    text-decoration: none;
    cursor: pointer;
  }

  body {
    position: relative;
    min-height: 100vh;
    font-family: ${props => props.theme.fontFamily};
  }
`;

export default GlobalStyle;

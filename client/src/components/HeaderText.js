import styled from 'styled-components';




const fontSize = (size) => {
  switch (size) {
    case 'large':
      return '6rem';
    case 'small':
      return '1rem';
    default:
      return '2rem';
  }
}

export default styled.h1`
  color: white !important;
  text-align: center;
  font-size: ${props => fontSize(props.fSize)} !important;
`;
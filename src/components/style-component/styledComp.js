import styled from 'styled-components';



export const createMargin = (vertical, horizontal)=> {
  return styled.div`
    margin: ${`${vertical || 20}px ${horizontal || 'auto'}`};
  `
}

export const BlogBody = styled.div`
  padding: 20px;
  background: #f3f3f3;
  box-shadow: 0 2px 1px #ddd;
`
export const CardBody = styled.div`
  box-shadow: 0px 10px 1px #ddd, 0 10px 20px #ccc;
`

export const bgContainer = styled.div`
  background: transparent center no-repeat;
  background-size: cover;
`
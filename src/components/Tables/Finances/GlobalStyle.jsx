import { createGlobalStyle } from "styled-components"
import styled from "styled-components";

export const Container = styled.div`
    padding-left: 15px;
    padding-right: 15px;
    margin-left: auto;
    margin-right: auto;

    @media screen and (max-width: 320px) {
        width: 320px;
         margin-top: 17px;
        margin-bottom: 17px;
    }

    @media screen and (min-width: 768px) {
        width: 768px;
         margin-top: 25px;
    margin-bottom: 25px;
    }

    @media screen and (min-width: 1200px) {
        width: 1200px;
         margin-top: 40px;
    margin-bottom: 40px;
    }
`

export const GlobalStyle = createGlobalStyle`
body {
    margin: 0;
    font-family: 'Roboto', 'Montserrat';
      font-weights: 400;
      font-style: normal;
      line-height: normal;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    padding: 20px;
  }
  
  code {
    font-family: 'Roboto', 'Montserrat';
  }
  
  img {
    display: block;
    max-width: 100%;
    height: auto;
  }
  
  ul {
    list-style: none;
  }
  
  a {
    text-decoration: none;
  }
  
  h1,
  h2,
  h3,
  p,
  ul {
    margin: 0;
    padding: 0;
  }`
import Header from "./Header";
import styled,{createGlobalStyle} from 'styled-components';

const GlobalStyles = createGlobalStyle`

/*  @font-face {
    font-weight: bold;
    font-style: bold;
  } */
  
  html{
    --red: #ff0000;
    --black: #393939;
    --grey: #33A3A3A;
    --gray: var(--grey);
    --lightGrey: #e1e1e1;
    --lighGray: var(lightGray);
    -offWhite: #ededed;
    --maxWidth: 600px;
    --bs: 0 12px 24px 0 rgba(0,0,0,0.9);
    box-sizing: border-box;
    font-size: 10px;
  }

  *,*:before, *:after{
    box-sizing: inherit;
  }

body {
  padding: 0;
  margin: 0;
  font-size: 1.5rem;
  line-height: 2;
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
    Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
  font-weight: bold;  
  font-style: bold;
}
a{
  text-decoration: none;
  color: var(--black);
}
a:hover{
  text-decoration: underline;
}

button{
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
    Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
}
`;

const InnerStyles= styled.div`
  max-width: var(--maxWidth); // determines width of form in Product/Sell tab
  padding: 2rem;
  margin: 0 auto;
`;

export default function Page({children,action}){
    return (
      <div>
        <GlobalStyles />
        <Header />
        <InnerStyles> {children}</InnerStyles>
      </div>
    );  
}

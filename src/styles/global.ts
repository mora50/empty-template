import { darken } from "polished";
import { createGlobalStyle } from "styled-components";
import { device } from "./components";

export default createGlobalStyle`


*{
  margin: 0;
  padding: 0;
  box-sizing: 0;
  outline: 0;
}


button, a{
  outline: none !important;
  text-decoration: none;
  transition: 0.3s;
}

.slick-slider .slick-prev:before, .slick-next:before{
  color: var(--gray);
  font-size: 36px;
}

.slick-prev {
    left: -12px;
    z-index: 1;
}

.slick-next {
    right: 0px;
    z-index: 1;
}


.slick-prev, .slick-next {
  top: 45%;
}


body, html, #__next{
  height: 100%;
  width: 100%;

  overflow-x: hidden;
  font: 400 16px Roboto, sans-serif;
}

body{
  padding-top: 115px;

  @media ${device.tablet}{
    padding-top: 75px;
  }
}


:root{
  --gray: #484D55;
  --primary: #FA4224;
  --secondary: #475F94;
  --green: #08dd5e;
  --red: #ED2929;
  --f-blue: #3b5999;
  --link-hover-color: ${() => darken(0.15, "#FA4224")};


  /*order status*/
  --completed: #2D9B01;
  --cancelled: #ED2929;
  --pending_payment: #F5D500;
  --pending: #F5D500;
  --processing: #007bff;


}

.bg-primary{
  background: var(--primary);
}

a, button{
  transition: 0.3s;
}

.hover-primary:hover{
  background: var(--link-hover-color);
}

.color-blue{
  color: var( --primary);
}

.h-fit{
  height: fit-content;
}

.w-fit{
  white-space: nowrap;
}

.absolute-center{
margin-left: auto;
margin-right: auto;
left: 0;
right: 0;
text-align: center;
}


`;

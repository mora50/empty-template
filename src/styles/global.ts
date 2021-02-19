import { darken } from "polished";
import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`


*{
  margin: 0;
  padding: 0;
  box-sizing: 0;
  outline: 0;
}


input {
    border-radius: 0;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;

}

button {
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}




:root{
  --gray: #484D55;
  --primary: #2474FA;
  --secondary: #475F94;
  --green: #08dd5e;
  --light-green: #40cd28;
  --black: #3e3e3e;
  --red: #ED2929;
  --f-blue: #3b5999;
  --link-hover-color: ${() => darken(0.15, "#2474FA")};


  /*order status*/
  --completed: #2D9B01;
  --cancelled: #ED2929;
  --pending_payment: #F5D500;
  --pending: #F5D500;
  --processing: #007bff;


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
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  position: relative;
}



.fill{
  
  max-height: -webkit-fill-available;

}

.h-fit{
  height: fit-content;
}


.bg-backdrop {
  backdrop-filter: blur(2px) opacity(1);
  background: rgba(0,0,0,.5);

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


  .carousel .control-prev.control-arrow {

    &:before{
      border-right: 8px solid #000;
    }

  }


  .carousel .control-next.control-arrow {

&:before{
  border-left: 8px solid #000;
}

}

  .thumb{
    width: 55px !important;
    border: 1px solid #ccc !important;
    
  }


  li.thumb.selected{
    border: 1px solid #000 !important;
  }



  .carousel .slide{
    background: none;
  }


  .animated {
  -webkit-animation-duration: .5s;
  animation-duration: .5s;
  -webkit-animation-duration: .5s;
  animation-duration: .5s;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
}


.fadeIn {
  -webkit-animation-name: fadeIn;
  animation-name: fadeIn;
}

@-webkit-keyframes fadeIn {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

.fadeInDown {
  -webkit-animation-name: fadeInDown;
  animation-name: fadeInDown;
  
}


.border-img{
  border-image: linear-gradient(transparent, rgb(214, 214, 214) 90%) 1 100% / 1 / 0 stretch;
}

::-webkit-scrollbar-track
{
	border-radius: 10px;
	background-color: #F5F5F5;
}

::-webkit-scrollbar
{
  border-radius: 10px;
	width: 5px;
  height: 5px;
	background-color: #F5F5F5;
}



.t-height{
transition: height, opacity 1s ease-in-out;
}





/* Handle */
::-webkit-scrollbar-thumb {
  box-shadow: inset 0 0 6px rgba(0,0,0,.3);
  background: #888; 
  border-radius: 10px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555; 
}



@keyframes fadeInDown {
    0% {
       opacity: 1;
       
      transform: translateY(0);
   }
   100% {
   
      opacity: 0;
      height: 0;
      transform: translateY(-20px);
    }
} 

`;

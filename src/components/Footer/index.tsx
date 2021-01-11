import React, { useState, useEffect } from "react";

// images
import CazcoLogo from "../../assets/images/cazco-logo.svg";
import { Container } from "../../styles/components";

// css
import * as S from "./styles";

function Footer() {
  const [menu, setMenu] = useState("");

  return (
    <S.footerWrapper>
      <div className="container mx-auto px-4 pt-3">
        <div className="flex flex-wrap justify-center items-center">
          <div>
            <ul className="flex justify-start divide-x  items-center divide-white">
              <li>Política de privacidade</li>
              <li className="px-2 ml-2">Política de Troca e Devolução</li>
              <li className="px-2">Cookies</li>
            </ul>
          </div>

          <div className="flex items-center w-full md:w-max-content mt-2 md:mt-0 justify-center">
            <p className="text-center mr-2">CNPJ 19.832.118/0001-04</p>

            <a
              href="https://cazco.digital/"
              rel="noopener noreferrer"
              target="_blank"
              className="flex items-center"
            >
              operado por
              <CazcoLogo />
              .digital
            </a>
          </div>
        </div>
      </div>
    </S.footerWrapper>
  );
}

export default Footer;

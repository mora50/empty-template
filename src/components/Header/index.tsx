import Location from "../Location";
import UserDropDown from "../UserDropDown";
import { Search } from "@styled-icons/evaicons-solid/Search";
import { Map } from "@styled-icons/boxicons-solid/Map";
import Link from "next/link";
// css
import * as S from "./style";

import { Cart } from "@styled-icons/boxicons-regular/Cart";
import { UserCircle } from "@styled-icons/boxicons-solid/UserCircle";
import { Container } from "../../styles/components";
import { useUI } from "../../contexts/modalsContext";
import { FC } from "react";
import SideBar from "../SideBar";
import CartBox from "@components/CartBox";
import { useAuth } from "src/contexts/authContext";
import { useCart } from "src/contexts/cartContext";

const Header: FC = () => {
  const {
    displayLocationBar,
    closeLocationBar,
    openLocationBar,
    displaySideBar,
    closeSideBar,
    openSideBar,
    displayAccessDropdown,
    closeAccessDropdown,
    openAccessDropdown,
    displayCartBar,
    openCartBar,
    closeCartBar,
  } = useUI();

  const { isAuthenticated } = useAuth();

  const { cart } = useCart();

  function handleSearch(e) {
    e.preventDefault();

    /*   let params = busca;

    params = params.replace(" ", "+"); */

    /*  history.push(`/search?term=${params}`); */
  }

  return (
    <div>
      {/* <S.OverlayHeader /> */}
      <S.MenuWrapper>
        <Container>
          <div className="grid  grid-cols-12 gap-x-1 justify-between items-center">
            <div className="col-span-6 md:col-span-2">
              <div className="flex  items-center">
                <Link href="/">
                  <a>
                    <span className=" font-bold  text-white text-transparent">
                      logo
                    </span>
                  </a>
                </Link>

                <button onClick={openSideBar}>
                  <S.IconMenu />
                </button>
              </div>
            </div>

            <S.IconsWrapper className="col-span-6 text-right items-center flex justify-around md:col-span-3 md:order-last">
              <S.MapIcon active={false} onClick={openLocationBar}>
                <Map />
              </S.MapIcon>

              <button
                className="relative flex justify-center"
                onClick={openCartBar}
              >
                {isAuthenticated && (
                  <span className="absolute font-bold -top-2  text-white">
                    {" "}
                    {cart?.items_count}{" "}
                  </span>
                )}

                <Cart />
              </button>

              <button className=" text-white" onClick={openAccessDropdown}>
                <span className="flex items-center">
                  <div className="pr-1">
                    <UserCircle />
                  </div>

                  {!isAuthenticated && "Entrar"}
                </span>
              </button>
            </S.IconsWrapper>

            <div className="md:col-span-7 col-span-12 text-center">
              <S.SearchWrapper>
                <input placeholder="O que esta buscando?" />

                <button onClick={(e) => handleSearch(e)}>
                  <Search />
                </button>
              </S.SearchWrapper>
            </div>
          </div>
        </Container>
      </S.MenuWrapper>
      <SideBar open={displaySideBar} onClose={closeSideBar} />

      <CartBox open={displayCartBar} onClose={closeCartBar} />

      <UserDropDown
        open={displayAccessDropdown}
        onClose={closeAccessDropdown}
      />

      <Location open={displayLocationBar} onClose={closeLocationBar} />
    </div>
  );
};

export default Header;

import Location from "../Location";
import UserDropDown from "../UserDropDown";
import Logo from "../../assets/images/logo.svg";
import { Search } from "@styled-icons/evaicons-solid/Search";
import { MapMarkerAlt } from "@styled-icons/fa-solid/MapMarkerAlt";
import Link from "next/link";
// css
import * as S from "./style";
import { Container } from "../../styles/components";
import { useUI } from "../../contexts/modalsContext";
import { FC } from "react";
import SideBar from "../SideBar";

const Header: FC = () => {
  const {
    displayLocationBar,
    closeLocationBar,
    toggleLocationBar,
    displaySideBar,
    closeSideBar,
    openSideBar,
    displayAccessDropdown,
    closeAccessDropdown,
    openAccessDropdown,
  } = useUI();
  function handleSearch(e) {
    e.preventDefault();

    /*   let params = busca;

    params = params.replace(" ", "+"); */

    /*  history.push(`/search?term=${params}`); */
  }

  return (
    <div>
      {/* <S.OverlayHeader /> */}
      <S.menuWrapper>
        <Container>
          <div className="grid  grid-cols-12 gap-x-1 justify-between items-center">
            <div className="col-span-6 md:col-span-2">
              <div className="flex  items-center">
                <Link href="/">
                  <a className="logo">
                    <Logo />
                  </a>
                </Link>

                <button onClick={() => openSideBar()}>
                  <S.iconMenu />
                </button>
              </div>
            </div>

            <S.IconsWrapper className="col-span-6 text-right md:col-span-2 md:order-last">
              <S.MapIcon active={false} onClick={() => toggleLocationBar()}>
                <MapMarkerAlt />
              </S.MapIcon>

              <button>
                <S.iconCart /* onClick={handleCartMenu} */ />
              </button>

              <button onClick={openAccessDropdown}>
                <S.iconUser />
              </button>
            </S.IconsWrapper>

            <div className="md:col-span-8 col-span-12 text-center">
              <S.searchWrapper>
                <input placeholder="O que esta buscando?" />

                <button onClick={(e) => handleSearch(e)}>
                  <Search />
                </button>
              </S.searchWrapper>
            </div>
          </div>
        </Container>
      </S.menuWrapper>
      <SideBar open={displaySideBar} onClose={closeSideBar} />

      <UserDropDown
        open={displayAccessDropdown}
        onClose={closeAccessDropdown}
      />

      <Location open={displayLocationBar} onClose={closeLocationBar} />
    </div>
  );
};

export default Header;

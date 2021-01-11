// import { Container } from './styles';

import { PackageIcon } from "@styled-icons/boxicons-regular/PackageIcon";
import { Map } from "@styled-icons/boxicons-regular/Map";
import { CheckShield } from "@styled-icons/boxicons-regular/CheckShield";
import { CreditCard } from "@styled-icons/boxicons-regular/CreditCard";
import { LogOutCircle } from "@styled-icons/boxicons-regular/LogOutCircle";

import { FC, useState } from "react";
import { ButtonMenu, ListItems } from "./styles";
import { useAuth } from "../../contexts/authContext";
import ActiveLink from "@components/ActiveLink";
import { Container } from "@styles/components";

const SideBarProfile: FC<{ children?: JSX.Element }> = ({ children }) => {
  const { logout } = useAuth();
  const [show, setShow] = useState<boolean>(false);

  return (
    <>
      <div
        className={`${
          show ? "block" : "hidden"
        } fixed bg-black bg-opacity-50 w-full h-screen top-0`}
        onClick={() => setShow(false)}
      ></div>
      <Container>
        <div className="grid grid-cols-12">
          <ListItems
            className={`col-span-3 lg:col-span-2 md:block ${
              show ? "block" : "hidden"
            }`}
          >
            <div className="md:text-2xl text-xl mb-3 color-blue">
              Minha conta
            </div>
            <ul onClick={() => setShow(false)}>
              <li>
                <ActiveLink activeClassName="active" href="/profile/myorders">
                  <a>
                    <div className="box-img">
                      <PackageIcon />
                    </div>
                    Pedidos
                  </a>
                </ActiveLink>
              </li>

              <li>
                <ActiveLink activeClassName="active" href="/profile/addresses">
                  <a href="">
                    <div className="box-img">
                      <Map />{" "}
                    </div>{" "}
                    Endereços
                  </a>
                </ActiveLink>
              </li>

              <li>
                <ActiveLink activeClassName="active" href="/profile/customer">
                  <a>
                    <div className="box-img">
                      <CheckShield />
                    </div>{" "}
                    Privacidade
                  </a>
                </ActiveLink>
              </li>

              <li>
                <ActiveLink activeClassName="active" href="/profile/cards">
                  <a>
                    <div className="box-img">
                      <CreditCard />
                    </div>{" "}
                    Cartões
                  </a>
                </ActiveLink>
              </li>

              <li>
                <button onClick={() => logout()}>
                  <div className="box-img">
                    <LogOutCircle />
                  </div>
                  Sair
                </button>
              </li>
            </ul>
          </ListItems>

          <ButtonMenu onClick={() => (show ? setShow(false) : setShow(true))}>
            <div />
            <div />
            <div />
          </ButtonMenu>

          <div className="col-span-full  lg:col-span-10 md:col-span-9">
            {children}
          </div>
        </div>
      </Container>
    </>
  );
};

export default SideBarProfile;

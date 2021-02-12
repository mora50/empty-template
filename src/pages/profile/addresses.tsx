import { useEffect, useState } from "react";
import Layout from "@components/Layout";
import SideBarProfile from "@components/SideBarProfile";
import api from "@services/api";
import * as S from "@styles/pages/address";
import { TrashAlt } from "@styled-icons/boxicons-regular/TrashAlt";
import { EditAlt } from "@styled-icons/boxicons-solid/EditAlt";
import { Star } from "@styled-icons/boxicons-regular/Star";
import notification from "@utils/notification";
import LoadingAllScreen from "@components/LoadingAllScreen";
import Link from "next/link";

export interface IAddresses {
  id: number;
  address: string;
  name: string;
  number: number;
  neighborhood: string;
  city: string;
  state: string;
  postcode: string;
  default_address: boolean;
  default: boolean;
}

function Addresses(): JSX.Element {
  const [loading, setLoading] = useState<boolean>();
  const [error, setError] = useState<boolean>();
  const [addresses, setAddresses] = useState<IAddresses[]>([]);
  const [updateList, setUpdateList] = useState<number>();

  useEffect(() => {
    (async function () {
      setLoading(true);

      try {
        const { data: response } = await api.get<{ data: IAddresses[] }>(
          "/customer/addresses"
        );

        const addresses = response.data.map((address) => {
          const postcode = address.postcode;

          const formattedPostCode =
            postcode.slice(0, 5) + "-" + postcode.slice(5, 8);

          return {
            ...address,
            postcode: postcode.length === 8 ? formattedPostCode : postcode,
          };
        });

        setAddresses(addresses);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    })();
  }, [updateList]);

  async function removeAddress(adressId: number) {
    setLoading(true);
    try {
      await api.delete(`/customer/addresses/${adressId}`);
      setAddresses(addresses.filter(({ id }) => id !== adressId));
    } finally {
      setLoading(false);
    }
  }

  async function setDefaulAddress(address: IAddresses) {
    setLoading(true);

    address.default_address = true;

    delete address.default;

    try {
      await api.put(`/customer/addresses/${address.id}`, address);

      setUpdateList(address.id);

      notification("Endereço padrão alterado :)", "success");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className="py-3">
        {loading && <LoadingAllScreen />}

        {!addresses.length && (
          <div className="text-center w-100 mt-3">
            <strong>Sem endereços cadastrados</strong>
          </div>
        )}

        {error && (
          <div className="text-center">Erro ao carregar os endereços</div>
        )}

        <div className="grid md:gap-10 gap-y-10 grid-cols-12">
          {addresses?.map((address) => (
            <S.AddressBox
              className="md:col-span-6 col-span-full shadow-md"
              key={address.id}
            >
              <div className="grid grid-cols-12 justify-between">
                <div className="col-span-6">
                  <strong>{address.name}</strong>
                </div>

                <div className="col-span-6 text-right">
                  <S.DefaultAddress
                    onClick={() =>
                      !address.default && setDefaulAddress(address)
                    }
                    default={address.default && true}
                  >
                    {address.default ? "endereço padrão" : "tornar padrão"}{" "}
                    <Star />
                  </S.DefaultAddress>
                </div>
              </div>

              <div className="my-3">
                {address.address}, {address.number}
                <br /> {address.neighborhood} <br />
                {address.city} - {address.state} <br />
                {address.postcode}
              </div>

              <div>
                <div className="flex mt-5 justify-between edit-btns">
                  <Link href={`/profile/addresses/${address.id}`}>
                    <a>
                      <EditAlt className="mr-2" />
                      editar
                    </a>
                  </Link>

                  <button onClick={() => removeAddress(address.id)}>
                    <TrashAlt className="mr-2" />
                    deletar
                  </button>
                </div>
              </div>
            </S.AddressBox>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link href="/profile/addresses/create">
            <a className="bg-primary text-white rounded-lg p-2 hover-primary">
              {" "}
              Criar endereço
            </a>
          </Link>
        </div>
      </div>
    </>
  );
}

export default Addresses;

Addresses.Layout = Layout;

Addresses.SideBarProfile = SideBarProfile;

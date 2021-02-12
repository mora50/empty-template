import Layout from "@components/Layout";
import CreditCard from "@components/CreditCard";
import SideBarProfile from "@components/SideBarProfile";
import { TrashAlt } from "@styled-icons/boxicons-regular/TrashAlt";
import api from "@services/api";
import { useEffect, useState } from "react";
import { LinkStyled } from "@styles/components";
import Link from "next/link";
import LoadingAllScreen from "@components/LoadingAllScreen";

interface ICards {
  id: number;
  first_digits: string;
  expiration_date: string;
}

export default function Cards() {
  const [loading, setLoading] = useState<boolean>(false);
  const [cards, setCards] = useState<ICards[]>([]);

  const loadCards = async () => {
    setLoading(true);

    setTimeout(async () => {
      try {
        const { data: response } = await api.get("/customer/cards");
        setCards(response.data);
      } finally {
        setLoading(false);
      }
    }, 3000);
  };

  useEffect(() => {
    loadCards();
  }, []);

  const removeCard = async (cardId: number) => {
    setLoading(true);

    try {
      await api.delete(`/customer/cards/${cardId}`);
      setCards(cards.filter(({ id }) => id !== cardId));
      loadCards();
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <LoadingAllScreen />}

      <div className="grid grid-cols-12 justify-center gap-5">
        {!cards.length && !loading && (
          <div className="text-center font-bold text-lg col-span-full">
            Nenhum cartão cadastrado
          </div>
        )}

        {cards?.map((card) => (
          <div
            className="lg:col-span-4 col-span-12 text-center my-4"
            key={card.id}
          >
            <CreditCard
              number={`${card.first_digits} **** **** ****`}
              expiry={card.expiration_date}
            />

            <button
              className="bg-red-600 text-center p-1 px-2 m-auto text-white font-bold flex items-center justify-items-center rounded-md mt-5"
              onClick={() => removeCard(card.id)}
            >
              Excluir cartão
              <TrashAlt className=" ml-1 w-5 h-5" />
            </button>
          </div>
        ))}
      </div>
      <div className="text-center mt-5">
        <Link passHref href="/profile/cards/create">
          <LinkStyled bgColor="primary">Adicionar cartão</LinkStyled>
        </Link>
      </div>
    </>
  );
}
Cards.Layout = Layout;

Cards.SideBarProfile = SideBarProfile;

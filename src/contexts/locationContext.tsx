import { createContext, useState, useContext, useEffect, FC } from "react";
import api from "@services/api";
import notification from "@utils/notification";
import axios from "axios";

interface ILocation {
  street: string;
  city: string;
  neighborhood: string;
  state: string;
  zipCode: number;
}

interface State {
  getLocationByGeo: () => ILocation;
  getLocationByCode: (code: string) => ILocation;
  removeLocationHandler: () => void;
  loading: boolean;
  location: ILocation;
}

type Falsy = false | 0 | "" | null | undefined;

const LocationContext = createContext<State | any>({});

export const LocationProvider: FC = ({ children }) => {
  const [location, setLocation] = useState<ILocation | Falsy>();
  const [loading, setLoading] = useState<boolean>();

  useEffect(() => {
    setLocation(JSON.parse(localStorage.getItem("location")));
  }, []);

  async function getLocationByCode(value: string) {
    /*   if (postcode.length < 9) {
      return;
    } */

    /*  const data = {
      zipcode: postcode.replace("-", ""),
    }; */

    setLoading(true);

    try {
      const { data: response } = await api.post("/search-cep", {
        zipcode: value,
      });

      if (response.message) {
        return notification("Cep não encontrado", "error");
      }

      localStorage.setItem("location", JSON.stringify(response.data));

      setLocation(response.data);
    } finally {
      setLoading(false);
    }
  }

  const getLocationByGeo = async () => {
    const url = process.env.NEXT_PUBLIC_PLATAZ_URL;

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;

          setLoading(true);

          try {
            const { data: response } = await axios.post(`${url}/get-location`, {
              latitude: latitude,
              longitude: longitude,
            });

            localStorage.setItem("location", JSON.stringify(response.data));

            setLocation(JSON.parse(localStorage.getItem("location")));
          } catch (err) {
            notification("Ocorreu um erro", "error");
          } finally {
            setLoading(false);
          }
        },
        () => {}
      );
    } else {
    }

    return;
  };

  function removeLocationHandler() {
    setLocation(null);

    localStorage.removeItem("location");
  }

  const value = {
    getLocationByGeo,
    getLocationByCode,
    removeLocationHandler,
    location,
    loading,
  };
  return (
    <LocationContext.Provider value={value}>
      {children}
    </LocationContext.Provider>
  );
};

export const useLocation = () => {
  const context = useContext<State>(LocationContext);

  if (context === undefined) {
    throw new Error("useLocation must be used within a LocationProvider");
  }

  return context;
};

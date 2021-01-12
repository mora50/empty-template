import api from "../services/api";

interface ServerResponse {
  data: ServerData;
}

interface ServerData {
  data: {
    address: string;
    city: string;
    complement: string;
    country: string;
    country_name: string;
    default: boolean;
    id: number;
    name: string;
    neighborhood: string;
    number: number;
    phone: string;
    postcode: string;
    country_code: string;
    state: string;
  };
}

export default async function getAddress(id: string) {
  try {
    const { data }: ServerResponse = await api.get<ServerData>(
      `/customer/addresses/${id}`
    );

    const response = data.data;

    if (response) {
      response.country_code = response.phone.substring(0, 3);
      response.phone = response.phone.substring(3);
      
    }

    return response;
  } finally {
  }
}

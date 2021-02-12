import api from "@services/api";

export const getLocationByCode = async (value: { zipCode: string }) => {
  try {
    const { data: response } = await api.post("/search-cep", value);

    return response;
  } catch (err) {}
};

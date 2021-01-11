import axios from "axios";

export const getGeolocation = async (
  setValue: ({}) => void,
  setLoading: (Boolean) => void
) => {
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

          setValue(JSON.parse(localStorage.getItem("location")));
        } catch (err) {
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

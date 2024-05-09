import { useLocation } from "react-router-dom";

const useCurrentLocation = () => {
  const { pathname } = useLocation();

  const currentEndpoint = pathname.split("/").at(-1);

  return currentEndpoint;
};

export default useCurrentLocation;

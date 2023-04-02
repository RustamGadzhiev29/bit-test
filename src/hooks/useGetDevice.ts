import { useMediaQuery } from "react-responsive";

export const useGetDevice = (): { isMobile: boolean } => {
  const isMobile = useMediaQuery({ minWidth: 0, maxWidth: 768 });

  return { isMobile };
};

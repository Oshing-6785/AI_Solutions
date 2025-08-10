import { useLocation, Navigate } from "react-router-dom";

const PathNormalizer = ({ children }: { children: JSX.Element }) => {
  const location = useLocation();
  const lowercasePath = location.pathname.toLowerCase();

  
  if (location.pathname !== lowercasePath) {
    return <Navigate to={lowercasePath} replace />;
  }

  return children;
};

export default PathNormalizer;

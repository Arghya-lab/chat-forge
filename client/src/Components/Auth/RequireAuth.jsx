import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function RequireAuth({ children }) {
  const { token } = useSelector((state) => state.auth);

  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

RequireAuth.propTypes = {
  children: PropTypes.node.isRequired,
};

export default RequireAuth;

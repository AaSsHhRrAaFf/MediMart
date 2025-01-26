// import React, { useContext } from "react";
// import { Navigate, useLocation } from "react-router-dom";
// import { AuthContext } from "../Context/AuthContext";
// import LoadSpinner from "../Components/Shared/LoadSpinner";

// const PrivateRoute = ({ children, role }) => {
//   const { user, userRoleLoading, loading } = useContext(AuthContext);
//   const location = useLocation();

//   if (!user) {
//     return <Navigate to="/login" state={{ from: location }} />;
//   }
//   if (userRoleLoading) {
//     return (
//       <div className="flex justify-center items-center min-h-screen">
//         <LoadSpinner />
//       </div>
//     );
//   }
//   if (role && user.role !== role) {
//     return <Navigate to="/" />;
//   }

//   return children;
// };

// export default PrivateRoute;

// src/Routes/PrivateRoute.jsx
import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import LoadSpinner from "../Components/Shared/LoadSpinner";

const PrivateRoute = ({ children, role }) => {
  const { user, userRoleLoading, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading || userRoleLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <LoadSpinner />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  if (role && user.role !== role) {
    return <Navigate to="/" />;
  }

  return children;
};

export default PrivateRoute;

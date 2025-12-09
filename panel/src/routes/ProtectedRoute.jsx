import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import Forbidden403 from "./Forbidden403";

const ProtectedRoute = ({ children, roles }) => {
  const { user } = useContext(AuthContext);

  // لو ما فيه يوزر -> حوله لصفحة تسجيل الدخول
  if (!user) {
    window.location.href = "/auth/login";
    return null;
  }

  // لو فيه roles مطلوبة وهذا اليوزر مو من ضمنها -> 403
  if (roles && !roles.includes(user.roleCode)) {
    return <Forbidden403 />;
  }

  // مسموح له يدخل
  return children;
};

export default ProtectedRoute;

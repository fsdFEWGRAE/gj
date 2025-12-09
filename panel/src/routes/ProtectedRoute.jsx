import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import Forbidden403 from "./Forbidden403";
export default function ProtectedRoute({ children, roles }) {
  const { user } = useContext(AuthContext);
  if (!user) return window.location.replace("/auth/login");

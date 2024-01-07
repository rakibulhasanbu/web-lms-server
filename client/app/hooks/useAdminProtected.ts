/* eslint-disable react-hooks/rules-of-hooks */
import { redirect } from "next/navigation";
import { ReactNode } from "react";
import { useSelector } from "react-redux";

interface TAdminProtectedProps {
  children: ReactNode;
}

export default function adminProtected({ children }: TAdminProtectedProps) {
  const { user } = useSelector((state: any) => state.auth);
  const isAdmin = user?.role === "admin";

  return isAdmin ? children : redirect("/");
}

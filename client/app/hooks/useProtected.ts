import { redirect } from "next/navigation";
import userAuth from "./userAuth";
import { ReactNode } from "react";

interface TProtectedProps {
    children: ReactNode;
}

export default function Protected({ children }: TProtectedProps) {
    const isAuthenticated = userAuth();

    return isAuthenticated ? children : redirect("/")
}
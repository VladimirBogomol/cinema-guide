import { ReactElement, ReactFragment, ReactPortal } from "react";
import { useAppSelector } from "../redux/store";
import { Navigate } from "react-router-dom";

type ReactText = string | number;
type ReactChild = ReactElement | ReactText;

type Props = {
  children:
    | ReactChild
    | ReactFragment
    | ReactPortal
    | boolean
    | null
    | undefined;
};

export default function ProtectedRoute({children }: Props) {
  const { authorized } = useAppSelector((state) => state.user);
  if (authorized) { return children }
  else { return <Navigate to={"/"}/>}
}

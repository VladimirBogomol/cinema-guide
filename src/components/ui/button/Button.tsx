import React, { ReactElement, ReactFragment, ReactPortal } from "react";
import st from "./Button.module.scss";
import classNames from "classnames";

type ReactText = string | number;
type ReactChild = ReactElement | ReactText;

type Props = {
  variant: "primary" | "secondary";
  onClick: () => void;
  children:
    | ReactChild
    | ReactFragment
    | ReactPortal
    | boolean
    | null
    | undefined;
  sx?: React.CSSProperties;
  disabled?: boolean;
  type?: "button" | "submit" | "reset" | undefined,
};

export default function Button({
  variant,
  onClick,
  children,
  sx,
  disabled = false,
  type = "button",
}: Props) {
  return (
    <button type={type}
      className={classNames(
        st.root,
        variant === "primary" ? st.primary : st.secondary
      )}
      style={sx}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

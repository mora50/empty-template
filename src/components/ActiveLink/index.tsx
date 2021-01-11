import { useRouter } from "next/router";

import Link, { LinkProps } from "next/link";
import { cloneElement, ReactElement } from "react";

interface IActiveLink extends LinkProps {
  activeClassName: string;
  children: ReactElement;
  href: string;
  as?: string;
}

const ActiveLink = ({ children, activeClassName, ...props }: IActiveLink) => {
  const { asPath } = useRouter();
  const childClassName = children.props.className || "";

  const className =
    asPath.includes(props.href) || asPath.includes(props.as)
      ? `${childClassName} ${activeClassName}`.trim()
      : childClassName;

  return (
    <Link {...props}>
      {cloneElement(children, {
        className: className || null,
      })}
    </Link>
  );
};

export default ActiveLink;

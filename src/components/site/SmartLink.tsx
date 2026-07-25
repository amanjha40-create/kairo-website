import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { isExternalUrl } from "@/lib/domain-config";

type SmartLinkProps = {
  to: string;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
};

export function SmartLink({ to, children, className, onClick }: SmartLinkProps) {
  if (isExternalUrl(to)) {
    return (
      <a href={to} className={className} onClick={onClick}>
        {children}
      </a>
    );
  }

  return (
    <Link to={to} className={className} onClick={onClick}>
      {children}
    </Link>
  );
}

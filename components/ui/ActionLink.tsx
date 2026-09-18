import type { ReactNode } from "react";

interface ActionLinkProps {
  href: string;
  children: ReactNode;
  external?: boolean;
}

export function ActionLink({ href, children, external = false }: ActionLinkProps) {
  return (
    <a
      className="action-button"
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
    >
      <span className="action-button__label">{children}</span>
      <span className="action-button__icon" aria-hidden="true">↗</span>
    </a>
  );
}

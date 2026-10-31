import type { AnchorHTMLAttributes, MouseEvent } from 'react';
import type { DimId } from '@/lib/dimensions';
import { pageFor } from '@/lib/seo';

interface Props extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
  to: DimId;
  go: (d: DimId) => void;
}

/**
 * A real link to a dimension page (so search engines can follow it and it opens in a new tab with Ctrl/Cmd-click),
 * which plays the portal transition on a normal click.
 */
export default function DimLink({ to, go, onClick, children, ...rest }: Props) {
  const handle = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    e.preventDefault();
    go(to);
  };
  return (
    <a href={pageFor(to).path} onClick={handle} {...rest}>
      {children}
    </a>
  );
}

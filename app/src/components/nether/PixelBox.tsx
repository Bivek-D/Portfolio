import type { CSSProperties, ElementType, ReactNode, ComponentPropsWithoutRef } from 'react';

type Props<T extends ElementType> = {
  as?: T;
  /** corner step size in px (two steps per corner) */
  step?: number;
  /** border colour or CSS background (e.g. a gradient) */
  border?: string;
  borderWidth?: number;
  /** fill colour or CSS background */
  fill?: string;
  /** CSS drop-shadow() chain drawn around the stepped outline (glows, soft shadows) */
  glow?: string;
  /** a hard pixel shadow under the box: [dx, dy, colour] */
  hardShadow?: [number, number, string];
  /** backdrop blur behind the fill, in px */
  blur?: number;
  className?: string;
  innerClassName?: string;
  style?: CSSProperties;
  children?: ReactNode;
} & Omit<ComponentPropsWithoutRef<T>, 'as' | 'children' | 'className' | 'style'>;

/**
 * A panel with pixel-stepped corners, like the vectors in the FigCraft design: optional hard shadow,
 * glowing border, blurred translucent fill, then the content on top.
 */
export default function PixelBox<T extends ElementType = 'div'>({
  as,
  step = 2,
  border,
  borderWidth = 2,
  fill = 'transparent',
  glow,
  hardShadow,
  blur,
  className = '',
  innerClassName = '',
  style,
  children,
  ...rest
}: Props<T>) {
  const Tag = (as ?? 'div') as ElementType;
  const n = { '--n': `${step}px` } as CSSProperties;
  const inset = border ? borderWidth : 0;
  return (
    <Tag className={`relative isolate ${className}`} style={style} {...rest}>
      {hardShadow && (
        <span
          aria-hidden="true"
          className="px-clip absolute inset-0 -z-10"
          style={{ ...n, background: hardShadow[2], transform: `translate(${hardShadow[0]}px, ${hardShadow[1]}px)` }}
        />
      )}
      <span aria-hidden="true" className="absolute inset-0 -z-10" style={{ filter: glow }}>
        <span className="px-clip absolute inset-0" style={{ ...n, background: border ?? fill }} />
      </span>
      {border && (
        <span
          aria-hidden="true"
          className="px-clip absolute -z-10"
          style={{
            ...n,
            '--n': `${Math.max(step - 1, 1)}px`,
            inset,
            background: fill,
            backdropFilter: blur ? `blur(${blur}px)` : undefined,
            WebkitBackdropFilter: blur ? `blur(${blur}px)` : undefined,
          } as CSSProperties}
        />
      )}
      <span className={`relative flex items-center justify-center w-full h-full ${innerClassName}`}>{children}</span>
    </Tag>
  );
}

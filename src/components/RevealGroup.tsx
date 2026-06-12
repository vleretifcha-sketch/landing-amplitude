import {
  Children,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";

type RevealGroupProps = {
  children: ReactNode;
  className?: string;
  stagger?: number;
  itemClassName?: (index: number) => string | undefined;
};

function RevealGroupItem({
  children,
  index,
  stagger,
  className = "",
}: {
  children: ReactNode;
  index: number;
  stagger: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -4% 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const style: CSSProperties | undefined =
    visible && stagger > 0
      ? { animationDelay: `${index * stagger}ms` }
      : undefined;

  return (
    <div
      ref={ref}
      className={`${
        visible ? "animate-reveal-fade" : "opacity-0"
      } ${className}`}
      style={style}
    >
      {children}
    </div>
  );
}

export function RevealGroup({
  children,
  className = "",
  stagger = 280,
  itemClassName,
}: RevealGroupProps) {
  return (
    <div className={className}>
      {Children.map(children, (child, index) => (
        <RevealGroupItem
          key={index}
          index={index}
          stagger={stagger}
          className={itemClassName?.(index)}
        >
          {child}
        </RevealGroupItem>
      ))}
    </div>
  );
}

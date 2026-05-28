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

export function RevealGroup({
  children,
  className = "",
  stagger = 280,
  itemClassName,
}: RevealGroupProps) {
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
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={className}>
      {Children.map(children, (child, index) => {
        const style: CSSProperties = visible
          ? { animationDelay: `${index * stagger}ms` }
          : {};

        const itemClasses = itemClassName?.(index);

        return (
          <div
            key={index}
            className={`${
              visible
                ? "animate-reveal-up-blur"
                : "translate-y-7 opacity-0 blur-[10px]"
            } ${itemClasses ?? ""}`}
            style={style}
          >
            {child}
          </div>
        );
      })}
    </div>
  );
}

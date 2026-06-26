export type LegalBlock =
  | { type: "divider" }
  | { type: "heading"; text: string }
  | { type: "subheading"; text: string }
  | { type: "paragraph"; text: string }
  | { type: "list"; items: string[] };

export function LegalBlocks({ blocks }: { blocks: LegalBlock[] }) {
  return (
    <div className="space-y-5">
      {blocks.map((block, index) => {
        switch (block.type) {
          case "divider":
            return (
              <hr
                key={index}
                className="border-0 border-t border-border/80"
                aria-hidden
              />
            );
          case "heading":
            return (
              <h2
                key={index}
                className="pt-2 text-lg font-semibold tracking-tight text-text sm:text-xl"
              >
                {block.text}
              </h2>
            );
          case "subheading":
            return (
              <h3
                key={index}
                className="pt-1 text-base font-semibold text-text"
              >
                {block.text}
              </h3>
            );
          case "paragraph":
            return (
              <p
                key={index}
                className="text-sm leading-[1.8] text-muted-light sm:text-[0.95rem]"
              >
                {block.text}
              </p>
            );
          case "list":
            return (
              <ul
                key={index}
                className="list-disc space-y-2 pl-5 text-sm leading-[1.75] text-muted-light sm:text-[0.95rem]"
              >
                {block.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}

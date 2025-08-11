import React, { useId, useMemo, useState } from "react";

interface Props {
  description: string;
  maxLength?: number; 
  initiallyExpanded?: boolean;
}

const FoldableDescription: React.FC<Props> = ({
  description,
  maxLength = 150,
  initiallyExpanded = false,
}) => {
  const [expanded, setExpanded] = useState(initiallyExpanded);
  const contentId = useId();

  const truncated = useMemo(() => {
    if (!description || description.length <= maxLength) return description;

    const seg = (Intl as any).Segmenter
      ? new (Intl as any).Segmenter(undefined, { granularity: "grapheme" })
      : null;

    if (!seg) {
      const cut = description.slice(0, maxLength + 1);
      const lastSpace = cut.lastIndexOf(" ");
      return (lastSpace > 0 ? cut.slice(0, lastSpace) : cut).trim() + "…";
    }

    let count = 0;
    let out = "";
    for (const { segment } of seg.segment(description)) {
      if (count + segment.length > maxLength) break;
      out += segment;
      count += segment.length;
    }
    const clean = out.replace(/\s+\S*$/, "").trim();
    return (clean || out).trim() + "…";
  }, [description, maxLength]);

  const isFolded = description.length > maxLength && !expanded;

  return (
    <div>
      <p
        id={contentId}
        className="text-muted-foreground mb-2 leading-relaxed break-words whitespace-pre-wrap"
      >
        {isFolded ? truncated : description}
      </p>

      {description.length > maxLength && (
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          aria-expanded={expanded}
          aria-controls={contentId}
          className="text-primary font-semibold mt-1 whitespace-nowrap hover:underline focus:outline-none focus:ring-2 focus:ring-primary/40 rounded"
        >
          {expanded ? "Show Less" : "Learn More →"}
        </button>
      )}
    </div>
  );
};

export default FoldableDescription;

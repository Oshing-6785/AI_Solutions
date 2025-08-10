import React, { useState } from "react";

interface Props {
  description: string;
  maxLength?: number;
}

const FoldableDescription: React.FC<Props> = ({ description, maxLength = 150 }) => {
  const [expanded, setExpanded] = useState(false);

  if (description.length <= maxLength) {
    return (
      <p className="text-muted-foreground mb-6 leading-relaxed break-words whitespace-normal">
        {description}
      </p>
    );
  }

  const truncated = description.slice(0, maxLength) + "...";

  return (
    <div>
      <p className="text-muted-foreground mb-6 leading-relaxed break-words whitespace-normal">
        {expanded ? description : truncated}
      </p>
      <button
        onClick={() => setExpanded(!expanded)}
        className="text-primary font-semibold mt-1 whitespace-nowrap hover:underline"
      >
        {expanded ? "Show Less" : "Learn More →"}
      </button>
    </div>
  );
};

export default FoldableDescription;

import React, { useState } from "react";

interface Props {
  features: string[];
  initialVisibleCount?: number; 
}

const FoldableFeatures: React.FC<Props> = ({ features, initialVisibleCount = 5 }) => {
  const [showAll, setShowAll] = useState(false);

  const visibleFeatures = showAll ? features : features.slice(0, initialVisibleCount);
  const remainingCount = features.length - initialVisibleCount;

  if (!features.length) return null;

  return (
    <div>
      <ul className="space-y-1 max-h-52 overflow-y-auto">
        {visibleFeatures.map((feature, i) => (
          <li key={i} className="text-sm text-muted-foreground flex items-center">
            <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2" />
            {feature}
          </li>
        ))}
      </ul>
      {features.length > initialVisibleCount && (
        <button
          type="button"
          className="mt-2 text-sm font-semibold text-blue-600 hover:underline"
          onClick={() => setShowAll(!showAll)}
        >
          {showAll ? "Show Less" : `Show ${remainingCount} More`}
        </button>
      )}
    </div>
  );
};

export default FoldableFeatures;

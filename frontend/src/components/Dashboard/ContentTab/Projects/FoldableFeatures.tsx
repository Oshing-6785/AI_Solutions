import React, { useId, useMemo, useState } from "react";

interface Props {
  features: string[];
  initialVisibleCount?: number;
}

const FoldableFeatures: React.FC<Props> = ({
  features,
  initialVisibleCount = 5,
}) => {
  const [showAll, setShowAll] = useState(false);
  const listId = useId();

  const { visible, remaining } = useMemo(() => {
    const safeCount = Math.max(0, initialVisibleCount);
    const show = showAll ? features : features.slice(0, safeCount);
    const rem = Math.max(0, features.length - safeCount);
    return { visible: show, remaining: rem };
  }, [features, initialVisibleCount, showAll]);

  if (!features?.length) return null;

  return (
    <div>
      <ul
        id={listId}
        className="space-y-1 max-h-52 overflow-y-auto pr-1"
        aria-live="polite"
      >
        {visible.map((feature, i) => (
          <li key={`${feature}-${i}`} className="text-sm text-muted-foreground flex items-center">
            <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2" aria-hidden="true" />
            {feature}
          </li>
        ))}
      </ul>

      {features.length > Math.max(0, initialVisibleCount) && (
        <button
          type="button"
          onClick={() => setShowAll((v) => !v)}
          aria-controls={listId}
          aria-expanded={showAll}
          className="mt-2 text-sm font-semibold text-blue-600 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-400 rounded"
        >
          {showAll ? "Show Less" : `Show ${remaining} More`}
        </button>
      )}
    </div>
  );
};

export default FoldableFeatures;

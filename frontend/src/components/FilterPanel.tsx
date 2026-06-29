import React, { useState } from 'react';

interface FilterPanelProps {
  onOperationalFilter?: (value: boolean | null) => void;
}

export const FilterPanel: React.FC<FilterPanelProps> = ({ onOperationalFilter }) => {
  const [expanded, setExpanded] = useState(false);
  const [operationalOnly, setOperationalOnly] = useState(false);

  const toggleOperational = () => {
    const next = !operationalOnly;
    setOperationalOnly(next);
    onOperationalFilter?.(next ? true : null);
  };

  return (
    <div className="filter-panel" id="filter-panel">
      <button
        className="filter-panel__toggle"
        onClick={() => setExpanded(!expanded)}
        id="btn-toggle-filters"
      >
        <div className="filter-panel__toggle-left">
          <span className="material-symbols-outlined">tune</span>
          <span className="filter-panel__toggle-label">Filters</span>
        </div>
        <span
          className="material-symbols-outlined filter-panel__chevron"
          style={{ transform: expanded ? 'rotate(180deg)' : 'rotate(0)' }}
        >
          expand_more
        </span>
      </button>

      <div className={`filter-panel__body ${expanded ? 'filter-panel__body--open' : ''}`}>
        <div className="filter-panel__group">
          <label className="filter-panel__label">Station Status</label>
          <div className="filter-panel__chips">
            <button
              className={`filter-panel__chip ${operationalOnly ? 'filter-panel__chip--active' : ''}`}
              onClick={toggleOperational}
            >
              <span
                className="filter-panel__chip-dot"
                style={{ background: operationalOnly ? '#22C55E' : '#6B7280' }}
              />
              Operational Only
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;

import React from 'react';
import Tag from './Tag';

type FilterProps = {
  title: string;
  category: 'class' | 'categoryA' | 'categoryB' | 'categoryC';
  keywords: string[];
  selectedTags: Set<string>;
  onTagClick: (category: string, tag: string) => void;
};

const Filter: React.FC<FilterProps> = ({ title, category, keywords, selectedTags, onTagClick }) => {
  return (
    <div className="filter-row mb-2">
      {title && <div className="filter-title">{title}</div>}
      <div className="flex flex-wrap">
        {keywords.map((keyword) => (
          <Tag
            key={`${category}-${keyword}`}
            text={keyword}
            category={category}
            isActive={selectedTags.has(keyword)}
            onClick={() => onTagClick(category, keyword)}
          />
        ))}
      </div>
    </div>
  );
};

export default Filter; 
import React, { useState } from 'react';

function DescriptionWithReadMore({ desc }) {

    console.log(desc)
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  // Split description into words
  const words = desc.split(' ');

  // Render regular text content if not expanded
  if (!isExpanded) {
    const shortenedDesc = words.slice(0, 30).join(' ') + '...';
    return (
      <span className="siFeatures">
        {shortenedDesc}
        {words.length > 30 && <button onClick={toggleExpand}>Read More</button>}
      </span>
    );
  }

  // Render with dangerouslySetInnerHTML if expanded
  return (
    <span className="siFeatures">
      <span dangerouslySetInnerHTML={{ __html: desc }} />
      <button onClick={toggleExpand}>Read Less</button>
    </span>
  );
}

export default DescriptionWithReadMore;

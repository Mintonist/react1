import React from 'react';

interface QualityProps {
  color: string;
  title: string;
}

const QualityBadge = ({ color, title }: QualityProps) => {
  return <span className={'badge m-1 bg-' + color}>{title}</span>;
};

export default QualityBadge;

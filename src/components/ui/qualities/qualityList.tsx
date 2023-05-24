import React from 'react';
import QualityBadge from './qualityBadge';

interface QualityProps {
  qualities: Array<any>;
}

const QualityList = ({ qualities }: QualityProps) => {
  return <>{qualities && qualities.map((q) => <QualityBadge key={q._id} color={q.color} title={q.name} />)}</>;
};

export default QualityList;

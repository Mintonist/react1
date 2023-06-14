import React from 'react';
import { useQualities } from '../../../hooks/useQualities';
import QualityBadge from './qualityBadge';

interface QualityProps {
  qualities: string[];
}

const QualityList = ({ qualities }: QualityProps) => {
  const { isLoading, getQuality } = useQualities();

  return (
    <>
      {!isLoading
        ? qualities.map((id) => {
            const q = getQuality(id);
            return <QualityBadge key={q._id} color={q.color} title={q.name} />;
          })
        : '...'}
    </>
  );

  //return <>{qualities && qualities.map((q) => <QualityBadge key={q._id} color={q.color} title={q.name} />)}</>;
};

export default QualityList;

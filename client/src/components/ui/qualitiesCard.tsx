import React from 'react';
import { IQuality } from '../../models';
import QualityList from './qualities/qualityList';

interface Props {
  qualities: string[];
}

const QualitiesCard = ({ qualities }: Props) => {
  return (
    <div className="card mb-3">
      <div className="card-body d-flex flex-column justify-content-center text-center">
        <h5 className="card-title">
          <span>Qualities</span>
        </h5>
        <p className="card-text">
          <QualityList qualities={qualities} />
        </p>
      </div>
    </div>
  );
};

export default QualitiesCard;

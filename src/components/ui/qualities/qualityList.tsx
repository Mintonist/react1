import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getQualities,
  getQualitiesLastFetch,
  getQualitiesLoadingStatus,
  getQualityById,
  loadQualitiesList,
} from '../../../store/qualities';
//import { useQualities } from '../../../hooks/useQualities';
import QualityBadge from './qualityBadge';

interface QualityProps {
  qualities: string[];
}

const QualityList = ({ qualities: qualitiesIDs }: QualityProps) => {
  //const { isLoading, getQuality } = useQualities();

  const isLoading = useSelector(getQualitiesLoadingStatus());
  const qualities = useSelector(getQualities());

  // каждый раз обновляем все qualities (но внутри - будет проверка на актуальность по lastFetch)
  const dispatch: any = useDispatch();
  dispatch(loadQualitiesList());

  const getQuality = (id) => {
    return qualities.find((q) => q._id === id);
  };

  return (
    <>
      {!isLoading && qualitiesIDs
        ? qualitiesIDs.map((id) => {
            const q = getQuality(id);
            return <QualityBadge key={q._id} color={q.color} title={q.name} />;
          })
        : '...'}
    </>
  );

  //return <>{qualities && qualities.map((q) => <QualityBadge key={q._id} color={q.color} title={q.name} />)}</>;
};

export default QualityList;

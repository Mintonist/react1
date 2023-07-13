import React from 'react';
import { useSelector } from 'react-redux';
import { getProfessionById, getProfessionsLoadingStatus } from '../../store/professions';
//import { useProfessions } from '../../hooks/useProfessions';

interface Props {
  id: string;
}

const ProfessionBadge = ({ id }: Props) => {
  //const { isLoading, getProfession } = useProfessions();

  const isLoading = useSelector(getProfessionsLoadingStatus());
  const prof = useSelector(getProfessionById(id));
  return <>{!isLoading ? (prof ? prof.name : 'нет') : '...'}</>;
};

export default ProfessionBadge;

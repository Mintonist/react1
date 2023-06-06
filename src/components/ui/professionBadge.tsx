import React from 'react';
import { useProfessions } from '../../hooks/useProfessions';

interface Props {
  id: string;
}

const ProfessionBadge = ({ id }: Props) => {
  const { isLoading, getProfession } = useProfessions();
  const prof = getProfession(id);
  return <>{!isLoading ? prof.name : '...'}</>;
};

export default ProfessionBadge;

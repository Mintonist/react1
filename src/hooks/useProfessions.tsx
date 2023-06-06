import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { IProfession } from '../models';
import professionService from '../services/profession.service';

interface IProfessionContext {
  isLoading: boolean;
  professions: IProfession[];
  getProfession?: (string) => IProfession;
  updateProfession?: (string, any) => Promise<IProfession>;
  addProfession?: (any) => Promise<IProfession>;
  deleteProfession?: (string) => Promise<IProfession>;
}

const ProfessionsContext = createContext<IProfessionContext>(null);

export const ProfessionsProvider = ({ children }) => {
  const [professions, setProfessions] = useState<IProfession[]>([]);
  const [error, setError] = useState<string>(null);
  const [isLoading, setLoading] = useState(true);
  //const prevState = useRef<IProfession[]>(null);

  async function getAll() {
    try {
      const data = await professionService.fetchAll();
      console.log('UsersProvider', data);
      setProfessions(data.content);
      setLoading(false);
    } catch (err) {
      console.log('UsersProvider err', err);
      const { message } = err.response.data;
      setError(message);
    }
  }

  useEffect(() => {
    getAll();
  }, []);

  const getProfession = (id) => {
    return professions.find((q) => q._id === id);
  };

  // const updateProfession = async (id: string, data: any) => {
  //   try {
  //     const { content } = await professionService.update(id, data);
  //     setProfessions((prevState) =>
  //       prevState.map((q) => {
  //         if (q._id === content._id) {
  //           q = { ...q, ...content };
  //         }
  //         return q;
  //       })
  //     );
  //     return content as IProfession;
  //   } catch (err) {
  //     catchError(err);
  //   }
  // };

  // const addProfession = async (data) => {
  //   try {
  //     const { content } = await professionService.add(data);
  //     setProfessions((prevState) => prevState.concat([content]));
  //     return content as IProfession;
  //   } catch (err) {
  //     catchError(err);
  //   }
  // };

  // const deleteProfession = async (id) => {
  //   prevState.current = professions;

  //   try {
  //     setProfessions((prevState) => {
  //       return prevState.filter((q) => q._id !== id);
  //     });
  //     const { content } = await professionService.delete(id);
  //     return content as IProfession;
  //   } catch (err) {
  //     console.log(err);
  //     setProfessions(prevState.current);
  //     catchError(err);
  //   }
  // };

  const catchError = (err) => {
    const { message, code } = err.response.data;
    const status = err.response.status;
    setError(message);
    console.log('Expected error: ' + status, code, message);
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    setError(null);
  }, [error]);

  return (
    <ProfessionsContext.Provider value={{ isLoading, professions, getProfession }}>
      {/* {!isLoading ? children : <h2>Loading professions...</h2>} */}
      {children}
    </ProfessionsContext.Provider>
  );
};

export const useProfessions = () => {
  return useContext(ProfessionsContext);
};

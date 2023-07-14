import React, { createContext, useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { IQuality } from '../models';
import qualityService from '../services/quality.service';

interface IQualityContext {
  isLoading: boolean;
  qualities: IQuality[];
  getQuality?: (string) => IQuality;
  updateQuality?: (string, any) => Promise<IQuality>;
  addQuality?: (any) => Promise<IQuality>;
  deleteQuality?: (string) => Promise<IQuality>;
}

const QualitiesContext = createContext<IQualityContext>(null);

export const QualitiesProvider = ({ children }) => {
  const [qualities, setQualities] = useState<IQuality[]>([]);
  const [error, setError] = useState<string>(null);
  const [isLoading, setLoading] = useState(true);
  //const prevState = useRef<IQuality[]>(null);

  async function getAll() {
    try {
      const data = await qualityService.fetchAll();

      setQualities(data.content);
      setLoading(false);
    } catch (err) {
      const { message } = err.response.data;
      setError(message);
    }
  }

  useEffect(() => {
    getAll();
  }, []);

  const getQuality = (id) => {
    return qualities.find((q) => q._id === id);
  };

  // const updateQuality = async (id: string, data: any) => {
  //   try {
  //     const { content } = await qualityService.update(id, data);
  //     setQualities((prevState) =>
  //       prevState.map((q) => {
  //         if (q._id === content._id) {
  //           q = { ...q, ...content };
  //         }
  //         return q;
  //       })
  //     );
  //     return content as IQuality;
  //   } catch (err) {
  //     catchError(err);
  //   }
  // };

  // const addQuality = async (data) => {
  //   try {
  //     const { content } = await qualityService.add(data);
  //     setQualities((prevState) => prevState.concat([content]));
  //     return content as IQuality;
  //   } catch (err) {
  //     catchError(err);
  //   }
  // };

  // const deleteQuality = async (id) => {
  //   prevState.current = qualities;

  //   try {
  //     setQualities((prevState) => {
  //       return prevState.filter((q) => q._id !== id);
  //     });
  //     const { content } = await qualityService.delete(id);
  //     return content as IQuality;
  //   } catch (err) {
  //     console.log(err);
  //     setQualities(prevState.current);
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

  return <QualitiesContext.Provider value={{ isLoading, qualities, getQuality }}>{children}</QualitiesContext.Provider>;
};

export const useQualities = () => {
  return useContext(QualitiesContext);
};

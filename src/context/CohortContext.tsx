import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useUser } from './UserContext';
import type { Cohort } from '../types';

export interface Topic {
  _id: string; 
  title: string;
  description: string;
  category: string;
  difficulty: string;
  totalQuestions: number;
  solvedQuestions: number;
  subTopics: string[];
}

interface CohortContextType {
  activeCohort: string;
  setActiveCohort: (cohort: string) => void;
  cohortData: Record<string, Topic[]>;
  cohorts: Cohort[];
  isLoading: boolean;
  refreshData: () => Promise<void>;
}


import { cohortApi, dashboardApi } from '../api';

const CohortContext = createContext<CohortContextType | undefined>(undefined);
const API_URL = import.meta.env.VITE_API_URL;
export const CohortProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeCohort, setActiveCohort] = useState('');
  const [cohortData, setCohortData] = useState<Record<string, Topic[]>>({});
  const [cohorts, setCohorts] = useState<Cohort[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const { user } = useUser();
  const refreshData = useCallback(async () => {
    if (!user) return;

    try {
      const [dashRes, cohRes] = await Promise.all([
        dashboardApi.getDashboardStats(user._id),
        cohortApi.getMyCohorts()
      ]);
      
      const dashResult = dashRes.data;
      
      if (dashResult.success) {
        setCohortData(dashResult.data);
        
        const availableCohorts = Object.keys(dashResult.data);
        if (availableCohorts.length > 0 && !activeCohort) {
          setActiveCohort(availableCohorts[0]);
        }
      }

      if (cohRes.data.success) {
        setCohorts(cohRes.data.data);
      }
    } catch (error) {
      console.error("Failed to fetch cohorts from backend:", error);
    }
  }, [user?._id]); // Only depend on user._id

  useEffect(() => {
    if (!user?._id) {
      setIsLoading(false);
      return;
    }
    
    setIsLoading(true);
    refreshData().finally(() => setIsLoading(false));
  }, [user?._id, refreshData]);

  const contextValue = React.useMemo(() => ({ 
    activeCohort, 
    setActiveCohort, 
    cohortData, 
    cohorts, 
    isLoading, 
    refreshData 
  }), [activeCohort, cohortData, cohorts, isLoading, refreshData]);

  return (
    <CohortContext.Provider value={contextValue}>
      {children}
    </CohortContext.Provider>
  );
};


export const useCohort = () => {
  const context = useContext(CohortContext);
  if (context === undefined) {
    throw new Error('useCohort must be used within a CohortProvider');
  }
  return context;
};
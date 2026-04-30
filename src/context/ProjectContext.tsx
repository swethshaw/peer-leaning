import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { projectApi, applicationApi, taskApi, notificationApi } from '../api';
import { useAuthStore } from '../store/authStore';
import { Project, Application, Task, ActivityItem, User, Cohort, ApplicationStatus, TaskStatus } from '../types'

interface ProjectContextType {
  projects: Project[];
  hostedProjects: Project[];
  enrolledProjects: Project[];
  applications: Application[];
  tasks: Task[];
  activities: ActivityItem[];
  isLoading: boolean;
  refreshData: () => Promise<void>;
  updateApplicationStatus: (appId: string, status: ApplicationStatus) => Promise<void>;
  updateTaskStatus: (taskId: string, status: TaskStatus) => Promise<void>;
  markActivityRead: (actId: string) => Promise<void>;
}

const ProjectContext = createContext<ProjectContextType | null>(null);

export function ProjectProvider({ children }: { children: ReactNode }) {
  const { user } = useAuthStore();
  const [hostedProjects, setHostedProjects] = useState<Project[]>([]);
  const [enrolledProjects, setEnrolledProjects] = useState<Project[]>([]);
  const [allProjects, setAllProjects] = useState<Project[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [activities, setActivities] = useState<ActivityItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const refreshData = useCallback(async () => {
    if (!user?._id) return;
    setIsLoading(true);
    try {
      const [hRes, eRes, aRes, tRes, nRes, allRes] = await Promise.all([
        projectApi.getHosted(user._id),
        projectApi.getEnrolled(user._id),
        applicationApi.getByUser(user._id),
        taskApi.getByUser(user._id),
        projectApi.getActivities(user._id),
        projectApi.getAll()
      ]);

      if (hRes.data.success) setHostedProjects(hRes.data.data);
      if (eRes.data.success) setEnrolledProjects(eRes.data.data);
      if (aRes.data.success) setApplications(aRes.data.data);
      if (tRes.data.success) setTasks(tRes.data.data);
      if (nRes.data.success) setActivities(nRes.data.data);
      if (allRes.data.success) setAllProjects(allRes.data.data);

    } catch (err) {
      console.error('Project data fetch failed:', err);
    } finally {
      setIsLoading(false);
    }
  }, [user?._id]);

  useEffect(() => {
    refreshData();
  }, [refreshData]);

  const updateApplicationStatus = async (appId: string, status: ApplicationStatus) => {
    try {
      await applicationApi.updateStatus(appId, status);
      await refreshData();
    } catch (err) {
      console.error('Failed to update application status', err);
    }
  };

  const updateTaskStatus = async (taskId: string, status: TaskStatus) => {
    try {
      await taskApi.updateStatus(taskId, status);
      await refreshData();
    } catch (err) {
      console.error('Failed to update task status', err);
    }
  };

  const markActivityRead = async (actId: string) => {
    try {
      await notificationApi.markRead(actId);
      await refreshData();
    } catch (err) {
      console.error('Failed to mark activity read', err);
    }
  };

  return (
    <ProjectContext.Provider
      value={{
        projects: allProjects,
        hostedProjects,
        enrolledProjects,
        applications,
        tasks,
        activities,
        isLoading,
        refreshData,
        updateApplicationStatus,
        updateTaskStatus,
        markActivityRead,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
}

export function useProject() {
  const ctx = useContext(ProjectContext);
  if (!ctx) throw new Error('useProject must be used within ProjectProvider');
  return ctx;
}

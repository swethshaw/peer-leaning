import React, { createContext, useContext, useState, ReactNode } from 'react';
import {
  projects as initialProjects,
  applications as initialApplications,
  tasks as initialTasks,
  activities as initialActivities,
  users,
  cohorts,
  currentUserId,
} from '../data/mockData';
import { Project, Application, Task, ActivityItem, User, Cohort, ApplicationStatus, TaskStatus } from '../types'

interface ProjectContextType {
  projects: Project[];
  applications: Application[];
  tasks: Task[];
  activities: ActivityItem[];
  users: User[];
  cohorts: Cohort[];
  currentUserId: string;
  currentUser: User;
  updateApplicationStatus: (appId: string, status: ApplicationStatus) => void;
  updateTaskStatus: (taskId: string, status: TaskStatus) => void;
  markActivityRead: (actId: string) => void;
  unreadCount: number;
}

const ProjectContext = createContext<ProjectContextType | null>(null);

export function ProjectProvider({ children }: { children: ReactNode }) {
  const [projectList] = useState<Project[]>(initialProjects);
  const [applicationList, setApplicationList] = useState<Application[]>(initialApplications);
  const [taskList, setTaskList] = useState<Task[]>(initialTasks);
  const [activityList, setActivityList] = useState<ActivityItem[]>(initialActivities);

  const currentUser = users.find(u => u.id === currentUserId)!;
  const unreadCount = activityList.filter(a => !a.read).length;

  const updateApplicationStatus = (appId: string, status: ApplicationStatus) => {
    setApplicationList(prev =>
      prev.map(a => (a.id === appId ? { ...a, status } : a))
    );
  };

  const updateTaskStatus = (taskId: string, status: TaskStatus) => {
    setTaskList(prev =>
      prev.map(t => (t.id === taskId ? { ...t, status } : t))
    );
  };

  const markActivityRead = (actId: string) => {
    setActivityList(prev =>
      prev.map(a => (a.id === actId ? { ...a, read: true } : a))
    );
  };

  return (
    <ProjectContext.Provider
      value={{
        projects: projectList,
        applications: applicationList,
        tasks: taskList,
        activities: activityList,
        users,
        cohorts,
        currentUserId,
        currentUser,
        updateApplicationStatus,
        updateTaskStatus,
        markActivityRead,
        unreadCount,
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

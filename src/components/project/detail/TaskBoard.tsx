import React from 'react';
import { useProject } from '../../../context/ProjectContext';
import { getUserById } from '../../../data/mockData';
import { getStatusLabel, getDaysUntil, formatDate } from '../../../utils/helpers';
import { Calendar, AlertTriangle, CheckCircle2, Clock, FileText, Activity, LayoutList } from 'lucide-react';

interface TaskBoardProps {
  projectId: string;
}

// Configuration objects for cleaner mapping of colors and icons
const STATUS_CONFIG: Record<string, { icon: React.ElementType, color: string, bg: string, border: string }> = {
  'done': { 
    icon: CheckCircle2, 
    color: 'text-emerald-600 dark:text-emerald-400', 
    bg: 'bg-emerald-50 dark:bg-emerald-500/10',
    border: 'border-emerald-200 dark:border-emerald-500/20'
  },
  'in-review': { 
    icon: Clock, 
    color: 'text-amber-600 dark:text-amber-400', 
    bg: 'bg-amber-50 dark:bg-amber-500/10',
    border: 'border-amber-200 dark:border-amber-500/20'
  },
  'revision': { 
    icon: AlertTriangle, 
    color: 'text-rose-600 dark:text-rose-400', 
    bg: 'bg-rose-50 dark:bg-rose-500/10',
    border: 'border-rose-200 dark:border-rose-500/20'
  },
  'in-progress': { 
    icon: Activity, 
    color: 'text-blue-600 dark:text-blue-400', 
    bg: 'bg-blue-50 dark:bg-blue-500/10',
    border: 'border-blue-200 dark:border-blue-500/20'
  },
  'todo': { 
    icon: FileText, 
    color: 'text-slate-600 dark:text-slate-400', 
    bg: 'bg-slate-100 dark:bg-slate-800/80',
    border: 'border-slate-200 dark:border-slate-700'
  },
};

const PRIORITY_CONFIG: Record<string, string> = {
  'high': 'bg-rose-50 dark:bg-rose-500/10 text-rose-700 dark:text-rose-400 border-rose-200/60 dark:border-rose-500/20',
  'medium': 'bg-amber-50 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-200/60 dark:border-amber-500/20',
  'low': 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-400 border-slate-200/60 dark:border-slate-700',
};

const TaskBoard: React.FC<TaskBoardProps> = ({ projectId }) => {
  const { tasks } = useProject();
  const projectTasks = tasks.filter(t => t.projectId === projectId);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800/80 pb-4">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <LayoutList className="text-blue-600 dark:text-blue-500" size={20} />
          Tasks & Components
        </h2>
        <span className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-full text-[11px] font-bold uppercase tracking-wider border border-slate-200 dark:border-slate-700">
          {projectTasks.length} Tasks
        </span>
      </div>

      {/* Task List */}
      {projectTasks.length > 0 ? (
        <div className="space-y-3">
          {projectTasks.map(task => {
            const assignee = getUserById(task.assigneeId);
            const daysLeft = getDaysUntil(task.dueDate);
            const config = STATUS_CONFIG[task.status] || STATUS_CONFIG['todo'];
            const StatusIcon = config.icon;
            
            // Due date coloring logic
            let dateColor = 'text-slate-500 dark:text-slate-400';
            if (task.status !== 'done') {
              if (daysLeft < 0) dateColor = 'text-rose-600 dark:text-rose-400 font-bold';
              else if (daysLeft <= 3) dateColor = 'text-amber-600 dark:text-amber-400 font-bold';
            }

            return (
              <div 
                key={task.id} 
                className="group flex flex-col md:flex-row md:items-center gap-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 transition-all duration-200 hover:shadow-md hover:border-blue-300 dark:hover:border-blue-500/50"
              >
                {/* Left: Status Icon */}
                <div className={`w-10 h-10 shrink-0 rounded-full flex items-center justify-center border ${config.bg} ${config.border} ${config.color} transition-transform group-hover:scale-110`}>
                  <StatusIcon size={18} />
                </div>

                {/* Middle: Content */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1 truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {task.title}
                  </h3>
                  <p className="text-xs font-medium text-slate-500 dark:text-slate-400 line-clamp-1 md:line-clamp-2">
                    {task.description}
                  </p>
                </div>

                {/* Right: Meta Tags & Assignee */}
                <div className="flex flex-wrap items-center gap-3 shrink-0 pt-2 md:pt-0 mt-2 md:mt-0 border-t md:border-t-0 border-slate-100 dark:border-slate-800">
                  
                  {/* Priority Badge */}
                  <span className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-widest border ${PRIORITY_CONFIG[task.priority] || PRIORITY_CONFIG['low']}`}>
                    {task.priority}
                  </span>

                  {/* Status Badge */}
                  <span className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-widest border ${config.bg} ${config.border} ${config.color}`}>
                    <span className="w-1.5 h-1.5 rounded-full bg-current" />
                    {getStatusLabel(task.status)}
                  </span>

                  {/* Assignee Avatar */}
                  {assignee ? (
                    <img 
                      src={assignee.avatar} 
                      alt={assignee.name} 
                      title={`Assigned to ${assignee.name}`}
                      className="w-7 h-7 rounded-full object-cover border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800"
                    />
                  ) : (
                    <div className="w-7 h-7 rounded-full border border-dashed border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 flex items-center justify-center" title="Unassigned">
                      <span className="text-[10px] text-slate-400">?</span>
                    </div>
                  )}

                  {/* Due Date */}
                  <div className={`flex items-center gap-1.5 text-xs ${dateColor} min-w-[90px] justify-end`}>
                    <Calendar size={14} className={task.status === 'done' ? 'opacity-50' : ''} />
                    <span className="whitespace-nowrap">
                      {formatDate(task.dueDate)}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Empty State */
        <div className="flex flex-col items-center justify-center py-12 px-4 text-center bg-slate-50 dark:bg-slate-800/30 border border-dashed border-slate-300 dark:border-slate-700 rounded-2xl">
          <div className="h-12 w-12 bg-white dark:bg-slate-800 rounded-full flex items-center justify-center mb-3 shadow-sm border border-slate-200 dark:border-slate-700">
            <LayoutList size={24} className="text-slate-400" />
          </div>
          <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1">No tasks created</h3>
          <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
            Tasks and components for this project will appear here.
          </p>
        </div>
      )}
    </div>
  );
};

export default TaskBoard;
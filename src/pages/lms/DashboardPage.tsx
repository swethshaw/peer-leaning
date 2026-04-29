import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  BookOpen, 
  Users, 
  Trophy, 
  TrendingUp, 
  ArrowRight, 
  Play, 
  Sparkles, 
  Award,
  Compass
} from 'lucide-react'
import { useAuthStore } from '../../store/authStore'
import { courseApi, cohortApi } from '../../api'
import { SectionHeader, Progress, DifficultyBadge, Skeleton, Avatar } from '../../components/lms/ui'
import { MY_COURSES, MOCK_COHORTS } from '../../lib/mockData'
import type { Course, Cohort } from '../../types'

export default function DashboardPage() {
  const { user } = useAuthStore()
  const navigate = useNavigate()

  const [myCourses, setMyCourses]   = useState<Course[]>([])
  const [myCohorts, setMyCohorts]   = useState<Cohort[]>([])
  const [loading, setLoading]       = useState(true)

  useEffect(() => {
    const load = async () => {
      try {
        const [cRes, cohRes] = await Promise.all([
          courseApi.getMyCourses(),
          cohortApi.getMyCohorts(),
        ])
        const cd = cRes.data.data ?? []; setMyCourses(cd.length ? cd : MY_COURSES)
        const chd = cohRes.data.data ?? []; setMyCohorts(chd.length ? chd : MOCK_COHORTS.filter(c => c.isEnrolled))
      } catch {
        setMyCourses(MY_COURSES)
        setMyCohorts(MOCK_COHORTS.filter(c => c.isEnrolled))
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  const totalCompleted  = myCourses.filter(c => (c.progressPercent ?? 0) === 100).length
  const avgProgress     = myCourses.length
    ? Math.round(myCourses.reduce((s, c) => s + (c.progressPercent ?? 0), 0) / myCourses.length)
    : 0

  const stats = [
    { label: 'Enrolled Courses',  value: myCourses.length,  icon: BookOpen,   color: 'text-blue-600 dark:text-blue-400',       bg: 'bg-blue-50 dark:bg-blue-500/10' },
    { label: 'Active Cohorts',    value: myCohorts.length,  icon: Users,      color: 'text-violet-600 dark:text-violet-400',   bg: 'bg-violet-50 dark:bg-violet-500/10' },
    { label: 'Completed',         value: totalCompleted,    icon: Trophy,     color: 'text-amber-600 dark:text-amber-400',     bg: 'bg-amber-50 dark:bg-amber-500/10' },
    { label: 'Avg Progress',      value: `${avgProgress}%`, icon: TrendingUp, color: 'text-emerald-600 dark:text-emerald-400', bg: 'bg-emerald-50 dark:bg-emerald-500/10' },
  ]

  // Resume course = latest enrolled with non-zero progress
  const resumeCourse = [...myCourses].sort((a, b) =>
    (b.progressPercent ?? 0) - (a.progressPercent ?? 0)
  ).find(c => (c.progressPercent ?? 0) > 0 && (c.progressPercent ?? 0) < 100)

  return (
    <div className="mx-auto space-y-8">
      
      {/* Welcome Section */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-3">
            Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">{user?.name?.split(' ')[0] ?? 'Learner'}</span>
            <Sparkles className="text-amber-500 animate-pulse" size={24} />
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm md:text-base font-medium mt-1.5">
            Here's what's happening with your learning journey today.
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {stats.map(({ label, value, icon: Icon, color, bg }) => (
          <div key={label} className="bg-white dark:bg-[#0F172A] border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
            <div className={`inline-flex h-12 w-12 items-center justify-center rounded-xl ${bg} mb-4`}>
              <Icon size={24} className={color} />
            </div>
            <p className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">{value}</p>
            <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 mt-1 uppercase tracking-wider">{label}</p>
          </div>
        ))}
      </div>

      {/* Resume Banner */}
      {resumeCourse && (
        <div
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && navigate(`/courses/${resumeCourse._id}`)}
          className="group relative overflow-hidden bg-gradient-to-r from-blue-600 to-indigo-700 dark:from-blue-900/80 dark:to-indigo-900/80 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row md:items-center gap-6 cursor-pointer hover:shadow-xl hover:shadow-blue-500/20 transition-all duration-300 transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-[#0B1120]"
          onClick={() => navigate(`/courses/${resumeCourse._id}`)}
        >
          {/* Background Decorative Pattern */}
          <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay"></div>
          
          <div className="relative flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 shadow-[0_0_20px_rgba(255,255,255,0.3)] group-hover:scale-110 transition-transform duration-300">
            <Play size={28} className="text-white fill-white translate-x-0.5" />
          </div>
          
          <div className="relative flex-1 min-w-0">
            <p className="text-xs md:text-sm text-blue-100 font-bold uppercase tracking-widest mb-1.5">Pick up where you left off</p>
            <h3 className="text-xl md:text-2xl font-black text-white truncate mb-3">{resumeCourse.title}</h3>
            <div className="flex items-center gap-4 max-w-md">
              <Progress 
                value={resumeCourse.progressPercent ?? 0} 
                className="flex-1 h-2 bg-black/20" 
                indicatorClassName="bg-white" 
              />
              <span className="text-sm text-white font-bold flex-shrink-0">
                {resumeCourse.progressPercent}%
              </span>
            </div>
          </div>
          
          <div className="relative hidden md:flex items-center justify-center h-12 w-12 rounded-full bg-white/10 group-hover:bg-white/20 transition-colors">
            <ArrowRight size={24} className="text-white group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="grid lg:grid-cols-3 gap-8">
        
        {/* Left Column: My Courses */}
        <div className="lg:col-span-2 space-y-6">
          <SectionHeader
            title="My Courses"
            subtitle={`${myCourses.length} courses in progress`}
            action={
              <button 
                onClick={() => navigate('/courses')} 
                className="flex items-center gap-1.5 px-4 py-2 text-sm font-bold text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-500/10 rounded-xl transition-colors"
              >
                Browse all <ArrowRight size={16} />
              </button>
            }
          />

          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3].map(i => <Skeleton key={i} className="h-28 rounded-2xl" />)}
            </div>
          ) : myCourses.length === 0 ? (
            <div className="bg-white dark:bg-[#0F172A] border border-dashed border-slate-300 dark:border-slate-700 rounded-2xl p-10 text-center flex flex-col items-center">
              <div className="h-16 w-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4">
                <Compass size={32} className="text-slate-400 dark:text-slate-500" />
              </div>
              <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-1">No courses yet</h4>
              <p className="text-sm text-slate-500 dark:text-slate-400 max-w-xs mb-6">You haven't enrolled in any courses. Explore our catalog to start learning.</p>
              <button 
                onClick={() => navigate('/courses')} 
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-xl transition-all shadow-md shadow-blue-500/20 active:scale-95"
              >
                Explore Courses
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {myCourses.slice(0, 5).map(course => (
                <div
                  key={course._id}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && navigate(`/courses/${course._id}`)}
                  onClick={() => navigate(`/courses/${course._id}`)}
                  className="group flex flex-col sm:flex-row sm:items-center gap-4 bg-white dark:bg-[#0F172A] border border-slate-200 dark:border-slate-800 rounded-2xl p-4 cursor-pointer hover:border-blue-500/40 hover:shadow-lg hover:shadow-blue-500/5 hover:-translate-y-1 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 group-hover:bg-blue-50 dark:group-hover:bg-blue-500/10 group-hover:border-blue-200 dark:group-hover:border-blue-500/20 transition-colors">
                    <BookOpen size={24} className="text-slate-400 dark:text-slate-500 group-hover:text-blue-600 dark:group-hover:text-blue-400" />
                  </div>
                  
                  <div className="flex-1 min-w-0 flex flex-col justify-center">
                    <div className="flex flex-wrap items-center gap-3 mb-2">
                      <h4 className="font-bold text-slate-900 dark:text-white text-base truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {course.title}
                      </h4>
                      <DifficultyBadge level={course.difficulty} />
                    </div>
                    <div className="flex items-center gap-3">
                      <Progress value={course.progressPercent ?? 0} className="flex-1 h-1.5" />
                      <span className="text-[11px] font-black text-slate-500 dark:text-slate-400 flex-shrink-0 w-8 text-right">
                        {course.progressPercent ?? 0}%
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Sidebar */}
        <div className="space-y-6 lg:space-y-8">
          
          {/* Points & Badges Card */}
          <div className="bg-white dark:bg-[#0F172A] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 text-center shadow-sm relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-400 to-orange-500"></div>
            <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-2 mt-2">Total Learning Points</p>
            <div className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-br from-amber-500 to-orange-600 mb-6 drop-shadow-sm">
              {user?.points ?? 0}
            </div>
            
            <div className="pt-5 border-t border-slate-100 dark:border-slate-800">
              <p className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-3">Recent Badges</p>
              <div className="flex items-center justify-center gap-3 flex-wrap">
                {/* Note: Replaced the assumed emoji user.badges render with 
                  Lucide Award icons to strictly adhere to "no emojis" 
                */}
                {(user?.badges ?? []).slice(0, 4).map((b, i) => (
                  <div key={b._id || i} title={b.name} className="h-10 w-10 rounded-full bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 flex items-center justify-center shadow-sm text-amber-500">
                     <Award size={20} />
                  </div>
                ))}
                
                {(user?.badges?.length ?? 0) === 0 && (
                  <div className="flex items-center justify-center gap-2 text-sm font-medium text-slate-400 bg-slate-50 dark:bg-slate-800/50 rounded-xl px-4 py-2 w-full">
                    <Award size={16} /> Complete modules to earn
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* My Cohorts Section */}
          <div className="bg-white dark:bg-[#0F172A] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
            <SectionHeader
              title="My Cohorts"
              action={
                <button 
                  onClick={() => navigate('/cohorts')} 
                  className="p-2 text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-500/10 rounded-lg transition-colors"
                  aria-label="View all cohorts"
                >
                  <ArrowRight size={20} />
                </button>
              }
            />

            {loading ? (
              <div className="space-y-3">
                {[1, 2].map(i => <Skeleton key={i} className="h-20 rounded-xl" />)}
              </div>
            ) : myCohorts.length === 0 ? (
              <div className="text-center py-6">
                <Users size={32} className="text-slate-300 dark:text-slate-600 mx-auto mb-3" />
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-4">You haven't joined any active cohorts yet.</p>
                <button 
                  onClick={() => navigate('/cohorts')} 
                  className="px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-sm font-bold rounded-xl transition-colors"
                >
                  Browse Cohorts
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {myCohorts.map(cohort => (
                  <div
                    key={cohort._id}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => e.key === 'Enter' && navigate(`/cohorts/${cohort._id}`)}
                    onClick={() => navigate(`/cohorts/${cohort._id}`)}
                    className="group flex flex-col p-4 rounded-xl border border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-800/30 cursor-pointer hover:border-violet-500/40 hover:bg-white dark:hover:bg-slate-800 hover:shadow-md hover:-translate-y-0.5 transition-all focus:outline-none focus:ring-2 focus:ring-violet-500"
                  >
                    <h4 className="font-bold text-slate-900 dark:text-white text-sm truncate group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">
                      {cohort.name}
                    </h4>
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center gap-2">
                        <Avatar name={cohort.mentor?.name || "Mentor"} size="sm" />
                        <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">{cohort.mentor?.name || "Mentor"}</span>
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 bg-slate-200/50 dark:bg-slate-700/50 px-2 py-1 rounded-md">
                        {cohort.activeMembers} peers
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          
        </div>
      </div>
    </div>
  )
}
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createContext, useContext, useEffect, useMemo, useState, type PropsWithChildren } from 'react'
import type { AppData, SessionRecord, Task } from './types'
const key = 'lockin-data-v1'
const initial: AppData = {
  onboarded: false,
  intention: '',
  tasks: [
    { id: '1', title: 'Read chapter 4: Cognitive Biases', course: 'Psychology 101', minutes: 25, done: false, priority: 'High' },
    { id: '2', title: 'Problem set 3', course: 'Calculus II', minutes: 45, done: false, priority: 'High' },
    { id: '3', title: 'Outline research essay', course: 'Modern History', minutes: 30, done: false, priority: 'Medium' },
  ],
  sessions: [],
  streak: 3,
  defaultMinutes: 25,
  blockedApps: ['Social media', 'Video streaming', 'Games'],
}
const StoreContext = createContext<{
  data: AppData; loading: boolean; finishOnboarding: (intention: string) => void
  addTask: (task: Omit<Task, 'id' | 'done'>) => void; toggleTask: (id: string) => void
  saveSession: (session: SessionRecord) => void; setPreferences: (values: Partial<AppData>) => void
}>({ data: initial, loading: true, finishOnboarding: () => undefined, addTask: () => undefined, toggleTask: () => undefined, saveSession: () => undefined, setPreferences: () => undefined })
export function StoreProvider({ children }: PropsWithChildren) {
  const [data, setData] = useState(initial)
  const [loading, setLoading] = useState(true)
  useEffect(() => { AsyncStorage.getItem(key).then((raw) => { if (raw) setData({ ...initial, ...JSON.parse(raw) }); setLoading(false) }) }, [])
  useEffect(() => { if (!loading) AsyncStorage.setItem(key, JSON.stringify(data)) }, [data, loading])
  const value = useMemo(() => ({
    data, loading,
    finishOnboarding: (intention: string) => setData((current) => ({ ...current, onboarded: true, intention })),
    addTask: (task: Omit<Task, 'id' | 'done'>) => setData((current) => ({ ...current, tasks: [...current.tasks, { ...task, id: Date.now().toString(), done: false }] })),
    toggleTask: (id: string) => setData((current) => ({ ...current, tasks: current.tasks.map((task) => task.id === id ? { ...task, done: !task.done } : task) })),
    saveSession: (session: SessionRecord) => setData((current) => ({ ...current, sessions: [session, ...current.sessions], streak: session.outcome === 'completed' ? current.streak + 1 : current.streak })),
    setPreferences: (values: Partial<AppData>) => setData((current) => ({ ...current, ...values })),
  }), [data, loading])
  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}
export const useStore = () => useContext(StoreContext)

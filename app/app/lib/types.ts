export type Task = { id: string; title: string; course: string; minutes: number; done: boolean; priority: 'High' | 'Medium' | 'Low' }
export type SessionOutcome = 'completed' | 'partial' | 'not_completed'
export type SessionRecord = { id: string; taskTitle: string; minutes: number; outcome: SessionOutcome; proofUri?: string; createdAt: string }
export type AppData = { onboarded: boolean; intention: string; tasks: Task[]; sessions: SessionRecord[]; streak: number; defaultMinutes: number; blockedApps: string[] }

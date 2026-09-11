import { Pressable, SafeAreaView, Text, View } from 'react-native'
import { useStore } from '@/lib/store'
import type { AppData } from '@/lib/types'
import { colors, styles } from '@/lib/theme'
export default function Notifications() {
  const { data, setPreferences } = useStore(); const options: AppData['notificationMode'][] = ['Off', 'Gentle reminders', 'Hard reminders']
  return <SafeAreaView style={styles.screen}><View style={styles.content}><Text style={styles.eyebrow}>NOTIFICATIONS</Text><Text style={styles.title}>Choose your check-ins.</Text><Text style={[styles.subtitle, { marginTop: 10 }]}>Decide how LOCKIN should remind you to protect your focus time.</Text>{options.map((option) => <Pressable key={option} onPress={() => setPreferences({ notificationMode: option })} style={[styles.card, styles.row, { padding: 18, marginTop: 12, borderColor: data.notificationMode === option ? colors.lime : colors.line }]}><View style={{ flex: 1 }}><Text style={{ fontWeight: '700', color: colors.ink }}>{option}</Text><Text style={{ color: colors.muted, fontSize: 11, marginTop: 5 }}>{option === 'Off' ? 'No reminders' : option === 'Gentle reminders' ? 'A calm nudge before planned focus time' : 'More persistent reminders for missed sessions'}</Text></View><Text>{data.notificationMode === option ? '✓' : ''}</Text></Pressable>)}</View></SafeAreaView>
}

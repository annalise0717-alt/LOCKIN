import { Pressable, SafeAreaView, Text, View } from 'react-native'
import { useRouter } from 'expo-router'
import { useStore } from '@/lib/store'
import { colors, styles } from '@/lib/theme'
export default function Duration() {
  const { data, setPreferences } = useStore(); const router = useRouter()
  return <SafeAreaView style={styles.screen}><View style={styles.content}><Text style={styles.eyebrow}>FOCUS PREFERENCES</Text><Text style={styles.title}>Default session duration.</Text><Text style={[styles.subtitle, { marginTop: 10 }]}>This will preselect the duration whenever you create a focus session.</Text>{[25, 45, 60].map((minutes) => <Pressable key={minutes} onPress={() => { setPreferences({ defaultMinutes: minutes }); router.back() }} style={[styles.card, styles.row, { padding: 18, marginTop: 14, borderColor: data.defaultMinutes === minutes ? colors.lime : colors.line }]}><Text style={{ flex: 1, color: colors.ink, fontWeight: '700' }}>{minutes} minutes</Text><Text>{data.defaultMinutes === minutes ? '✓' : ''}</Text></Pressable>)}</View></SafeAreaView>
}

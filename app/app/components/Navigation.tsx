import { Pressable, Text, View } from 'react-native'
import { usePathname, useRouter } from 'expo-router'
import { colors } from '@/lib/theme'
const items = [{ label: 'Home', icon: '⌂', path: '/' }, { label: 'Tasks', icon: '✓', path: '/tasks' }, { label: 'Progress', icon: '◔', path: '/progress' }, { label: 'Settings', icon: '⚙', path: '/settings' }]
export function Navigation() {
  const path = usePathname(); const router = useRouter()
  return <View style={{ borderTopWidth: 1, borderColor: colors.line, backgroundColor: colors.paper, flexDirection: 'row', paddingBottom: 18, paddingTop: 10 }}>
    {items.map((item) => <Pressable key={item.path} onPress={() => router.push(item.path as never)} style={{ flex: 1, alignItems: 'center', gap: 4 }}><Text style={{ color: path === item.path ? colors.ink : colors.muted, fontSize: 20 }}>{item.icon}</Text><Text style={{ color: path === item.path ? colors.ink : colors.muted, fontSize: 10, fontWeight: '600' }}>{item.label}</Text></Pressable>)}
  </View>
}

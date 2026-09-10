import { Text, View } from 'react-native'
import { colors, styles } from '@/lib/theme'
export function Header({ eyebrow, title, subtitle }: { eyebrow?: string; title: string; subtitle?: string }) {
  return <View style={{ marginBottom: 28 }}>{eyebrow && <Text style={styles.eyebrow}>{eyebrow}</Text>}<Text style={styles.title}>{title}</Text>{subtitle && <Text style={[styles.subtitle, { marginTop: 8 }]}>{subtitle}</Text>}<View style={{ height: 1, backgroundColor: colors.line, marginTop: 22 }} /></View>
}

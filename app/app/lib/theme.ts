import { StyleSheet } from 'react-native'
export const colors = { paper: '#F4F5F0', card: '#FBFCF8', ink: '#252823', muted: '#858D80', line: '#DEE3DA', forest: '#304239', lime: '#C4D96D', pale: '#E8EDDA', cream: '#F3F3DC', danger: '#EADFD8' }
export const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.paper }, content: { padding: 22, paddingBottom: 40 }, brand: { color: colors.ink, fontSize: 16, fontWeight: '700', letterSpacing: 3 },
  eyebrow: { color: '#92998D', fontSize: 10, fontWeight: '700', letterSpacing: 1.4 }, title: { color: colors.ink, fontSize: 36, fontWeight: '500', letterSpacing: -1, marginTop: 8 }, subtitle: { color: colors.muted, fontSize: 14, lineHeight: 21 },
  button: { backgroundColor: colors.ink, paddingVertical: 15, paddingHorizontal: 18, borderRadius: 4, alignItems: 'center', flexDirection: 'row', justifyContent: 'center', gap: 12 }, buttonText: { color: '#FFF', fontWeight: '700', fontSize: 13 }, card: { backgroundColor: colors.card, borderColor: colors.line, borderWidth: 1, borderRadius: 4 }, row: { flexDirection: 'row', alignItems: 'center' },
})

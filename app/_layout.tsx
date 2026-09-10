import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { StoreProvider } from '@/lib/store'
export default function Layout() {
  return <StoreProvider><StatusBar style="dark" /><Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: '#F4F5F0' } }} /></StoreProvider>
}

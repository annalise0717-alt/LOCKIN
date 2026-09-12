import { Platform } from 'react-native'
import { requireOptionalNativeModule } from 'expo-modules-core'
export type BlockingStatus = 'available' | 'unavailable' | 'not_authorized'
export type BlockingSelection = { apps: number; categories: number; webDomains: number }
type NativeScreenTime = {
  requestAuthorization: () => Promise<boolean>
  presentAppPicker: () => Promise<BlockingSelection>
  applyRestrictions: () => Promise<void>
  clearRestrictions: () => Promise<void>
  getStatus: () => Promise<BlockingStatus>
}
const nativeScreenTime = requireOptionalNativeModule<NativeScreenTime>('LockinScreenTime')
export const blockingPlatform = Platform.OS === 'ios' ? 'ios' : Platform.OS === 'android' ? 'android' : 'unsupported'
export const hasNativeBlockingModule = Boolean(nativeScreenTime)
export async function getBlockingStatus(): Promise<BlockingStatus> {
  if (!nativeScreenTime) return 'unavailable'
  return nativeScreenTime.getStatus()
}
export async function requestBlockingAuthorization(): Promise<boolean> {
  if (!nativeScreenTime) return false
  return nativeScreenTime.requestAuthorization()
}
export async function selectBlockedApps(): Promise<BlockingSelection | null> {
  if (!nativeScreenTime) return null
  return nativeScreenTime.presentAppPicker()
}
export async function applyFocusRestrictions(): Promise<void> {
  if (!nativeScreenTime) throw new Error('Native app blocking is unavailable in Expo Go.')
  await nativeScreenTime.applyRestrictions()
}
export async function clearFocusRestrictions(): Promise<void> {
  if (!nativeScreenTime) return
  await nativeScreenTime.clearRestrictions()
}

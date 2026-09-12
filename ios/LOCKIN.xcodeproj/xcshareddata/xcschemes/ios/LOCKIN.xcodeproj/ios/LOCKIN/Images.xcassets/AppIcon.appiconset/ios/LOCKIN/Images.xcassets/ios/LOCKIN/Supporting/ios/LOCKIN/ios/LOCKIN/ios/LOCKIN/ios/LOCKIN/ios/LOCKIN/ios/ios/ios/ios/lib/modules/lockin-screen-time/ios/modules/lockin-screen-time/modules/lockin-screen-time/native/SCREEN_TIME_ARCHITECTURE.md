# Native app-blocking architecture
## Current state
The project now contains a local Expo native module at `modules/lockin-screen-time`. Its Swift implementation requests individual authorization, presents Apple's `FamilyActivityPicker`, persists the opaque `FamilyActivitySelection` in `group.com.lockin.focus`, applies shields with a dedicated `ManagedSettingsStore`, and clears only that store's shields.
The TypeScript bridge in `lib/blocking.ts` calls this module when it is present and reports `unavailable` in Expo Go. The focus screen invokes `applyRestrictions` on mount and `clearRestrictions` on unmount. The app does not derive bundle IDs and does not simulate enforcement.
## iOS implementation
The correct implementation is a local Expo native module plus native extension targets:
1. Request individual authorization with `AuthorizationCenter.shared.requestAuthorization(for: .individual)`.
2. Present `FamilyActivityPicker` and persist its opaque `FamilyActivitySelection` in an App Group shared by the app and extensions. Do not derive or upload bundle IDs.
3. Apply the selected applications, categories, and web domains with a dedicated `ManagedSettingsStore` when a focus session starts.
4. Clear only the store-owned shields when the session ends or is cancelled.
5. A `DeviceActivityMonitor` extension is not required for the initial foreground start/end flow. Add it later for schedules and recovery when the main app is not running; it must reconstruct policy from the App Group rather than JavaScript memory.
6. Reconcile authorization and policy on app launch, including revocation in Settings.
Required native setup:
- Family Controls capability/entitlement on the app and provisioning profiles.
- App Group entitlement on the app now; the same entitlement must be added to any future Device Activity or Shield Configuration/Action extension targets.
- Native iOS development build; Expo Go cannot load these frameworks or extension targets.
- Apple approval/signing for the protected Family Controls entitlement.
The picker, Managed Settings writes, and Device Activity callbacks must remain Swift/native. A config plugin adds the app's Family Controls and App Group entitlements. No extension target is generated yet because the initial implementation is foreground-only; adding a Device Activity extension requires a native Xcode target, its own App Group/Family Controls signing configuration, and a custom development build.
## Android implementation
Keep Android separate from iOS. A user-controlled approach requires explicit, policy-compliant user consent and native code, typically using Android UsageStats/Accessibility or device-policy APIs only where the declared use case and Play policy permit them. Do not use hidden overlays, device-admin escalation, or undisclosed monitoring. Android must expose a separate `LockinAndroidBlocking` adapter and its own settings/permission flow; it should report `unavailable` until the exact approved implementation is shipped.
## Expo workflow
Expo Go is not sufficient. Install a development client and rebuild after adding the native module or entitlements:
```bash
npx expo install expo-dev-client
npx expo run:ios --device
```
Do not run an EAS production build as part of this work. A development build is needed before the bridge can return `available`.
The generated `ios/` project is intentionally included for local development. Before building on a device, register `group.com.lockin.focus`, enable Family Controls for the app identifier, and select a signing team in Xcode.

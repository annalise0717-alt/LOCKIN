# LOCKIN mobile app
LOCKIN is a local-first student focus and accountability app built with Expo, React Native, TypeScript, and Expo Router.
## Install and run
```bash
npm install
npx expo start
```
Scan the QR code with the Expo Go app on an iPhone. Your phone and development computer must be on the same Wi-Fi network. If they cannot connect directly, run `npx expo start --tunnel` and scan that QR code instead.
## MVP routes
- Onboarding intention flow
- Home dashboard with focus time, completion count, streak, upcoming tasks, and LOCK IN CTA
- Task creation, task completion, and start-from-task focus flow
- Focus mode countdown, pause/resume, goal display, and end-session confirmation
- Emergency cancel flow with required stop reason logging
- Session completion outcome selection and optional Proof of Progress photo from the photo library
- Progress metrics and local focus history
- - Settings for default duration, notifications placeholder, privacy, and blocked-app preferences
Tasks, preferences, and history persist with AsyncStorage. The blocked-app selection is deliberately only a configuration/state layer. Actual app blocking requires a native iOS Screen Time/Family Controls implementation and an Android usage/accessibility or device-policy implementation; it is not faked in this Expo Go MVP.
- Unlimited school schedule entries
- Manual focus duration selection
- Settings for default duration, notification modes, privacy insights, and manually selected blocked-app preferences
Tasks, schedule entries, preferences, session history, and stop reasons persist with AsyncStorage. Proof photos can be taken with the camera or selected from the photo library and are optional. The blocked-app selection is deliberately only a configuration/state layer. Actual app blocking requires a native iOS Screen Time/Family Controls implementation and an Android usage/accessibility or device-policy implementation; it is not faked in this Expo Go MVP.
## EAS Build
Install EAS CLI when you are ready to build native binaries:
```bash
npm install --global eas-cli
eas login
npm run build:configure
npm run build:eas
```
Expo Go can test the JavaScript MVP, but native app-blocking functionality will require a custom development build and platform-specific native modules/configuration.

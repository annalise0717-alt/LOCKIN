import DeviceActivity
import ManagedSettings
private let lockinActivityName = DeviceActivityName("lockin.focus.session")
private let lockinStoreName = ManagedSettingsStore.Name("lockin.focus")
final class LockinDeviceActivityMonitor: DeviceActivityMonitor {
  override func intervalDidEnd(for activity: DeviceActivityName) {
    super.intervalDidEnd(for: activity)
    guard activity == lockinActivityName else { return }
    let store = ManagedSettingsStore(named: lockinStoreName)
    store.shield.applications = nil
    store.shield.applicationCategories = nil
    store.shield.webDomains = nil
  }
}

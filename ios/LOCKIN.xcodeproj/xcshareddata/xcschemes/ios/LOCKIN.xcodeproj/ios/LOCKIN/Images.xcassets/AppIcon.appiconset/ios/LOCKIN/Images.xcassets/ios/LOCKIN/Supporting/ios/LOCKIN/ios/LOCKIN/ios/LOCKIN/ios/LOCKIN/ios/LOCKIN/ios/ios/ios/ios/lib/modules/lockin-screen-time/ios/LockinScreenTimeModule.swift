import DeviceActivity
import ExpoModulesCore
import FamilyControls
import ManagedSettings
import SwiftUI
import UIKit
private let appGroup = "group.com.lockin.focus"
private let selectionKey = "lockin.familyActivitySelection"
public class LockinScreenTimeModule: Module {
  private let store = ManagedSettingsStore(named: ManagedSettingsStore.Name("lockin.focus"))
  public func definition() -> ModuleDefinition {
    Name("LockinScreenTime")
    AsyncFunction("requestAuthorization") { () async throws -> Bool in
      try await AuthorizationCenter.shared.requestAuthorization(for: .individual)
      return AuthorizationCenter.shared.authorizationStatus == .approved
    }
    AsyncFunction("getStatus") { () -> String in
      switch AuthorizationCenter.shared.authorizationStatus {
      case .approved: return "available"
      case .denied: return "not_authorized"
      case .notDetermined: return "not_authorized"
      @unknown default: return "not_authorized"
      }
    }
    AsyncFunction("presentAppPicker") { (promise: Promise) in
      guard AuthorizationCenter.shared.authorizationStatus == .approved else {
        promise.reject("NOT_AUTHORIZED", "Family Controls authorization is required before selecting apps.")
        return
      }
      DispatchQueue.main.async {
        guard let presenter = Self.topViewController() else {
          promise.reject("NO_VIEW_CONTROLLER", "Unable to present the Family Activity Picker.")
          return
        }
        let picker = LockinActivityPicker {
          let counts = Self.savedSelectionCounts()
          promise.resolve(counts)
        }
        presenter.present(UIHostingController(rootView: picker), animated: true)
      }
    }
    AsyncFunction("applyRestrictions") {
      guard AuthorizationCenter.shared.authorizationStatus == .approved else {
        throw NSError(domain: "LockinScreenTime", code: 1, userInfo: [NSLocalizedDescriptionKey: "Family Controls authorization is not approved."])
      }
      let selection = Self.loadSelection()
      store.shield.applications = selection.applicationTokens.isEmpty ? nil : selection.applicationTokens
      store.shield.applicationCategories = selection.categoryTokens.isEmpty ? nil : ShieldSettings.ActivityCategoryPolicy.specific(selection.categoryTokens)
      store.shield.webDomains = selection.webDomainTokens.isEmpty ? nil : selection.webDomainTokens
    }
    AsyncFunction("clearRestrictions") {
      store.shield.applications = nil
      store.shield.applicationCategories = nil
      store.shield.webDomains = nil
    }
  }
  private static func loadSelection() -> FamilyActivitySelection {
    guard let data = UserDefaults(suiteName: appGroup)?.data(forKey: selectionKey),
          let selection = try? JSONDecoder().decode(FamilyActivitySelection.self, from: data) else {
      return FamilyActivitySelection()
    }
    return selection
  }
  private static func savedSelectionCounts() -> [String: Int] {
    let selection = loadSelection()
    return [
      "apps": selection.applicationTokens.count,
      "categories": selection.categoryTokens.count,
      "webDomains": selection.webDomainTokens.count
    ]
  }
  private static func topViewController(_ root: UIViewController? = UIApplication.shared.connectedScenes
    .compactMap { ($0 as? UIWindowScene)?.keyWindow?.rootViewController }.first) -> UIViewController? {
    if let presented = root?.presentedViewController { return topViewController(presented) }
    if let navigation = root as? UINavigationController { return topViewController(navigation.visibleViewController) }
    if let tab = root as? UITabBarController { return topViewController(tab.selectedViewController) }
    return root
  }
}
private struct LockinActivityPicker: View {
  @Environment(\.dismiss) private var dismiss
  @State private var selection: FamilyActivitySelection
  private let onSave: () -> Void
  init(onSave: @escaping () -> Void) {
    let existing = UserDefaults(suiteName: appGroup)?.data(forKey: selectionKey)
      .flatMap { try? JSONDecoder().decode(FamilyActivitySelection.self, from: $0) } ?? FamilyActivitySelection()
    _selection = State(initialValue: existing)
    self.onSave = onSave
  }
  var body: some View {
    NavigationStack {
      FamilyActivityPicker(selection: $selection)
        .navigationTitle("Apps to restrict")
        .toolbar {
          ToolbarItem(placement: .confirmationAction) {
            Button("Save") {
              if let data = try? JSONEncoder().encode(selection) {
                UserDefaults(suiteName: appGroup)?.set(data, forKey: selectionKey)
              }
              onSave()
              dismiss()
            }
          }
        }
    }
  }
}

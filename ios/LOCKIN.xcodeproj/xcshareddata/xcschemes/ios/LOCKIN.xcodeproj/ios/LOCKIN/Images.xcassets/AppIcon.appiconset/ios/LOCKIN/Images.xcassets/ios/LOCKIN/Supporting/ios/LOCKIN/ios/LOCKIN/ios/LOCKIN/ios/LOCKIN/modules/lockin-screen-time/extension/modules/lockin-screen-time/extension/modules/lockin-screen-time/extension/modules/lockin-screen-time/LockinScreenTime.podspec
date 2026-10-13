Pod::Spec.new do |s|
  s.name = 'LockinScreenTime'
  s.version = '1.0.0'
  s.summary = 'Native Screen Time enforcement for LOCKIN'
  s.description = 'Family Controls authorization, activity selection, and Managed Settings enforcement.'
  s.license = { :type => 'MIT' }
  s.author = 'LOCKIN'
  s.homepage = 'https://github.com/annalise0717-alt/LOCKIN'
  s.source = { :git => 'https://github.com/annalise0717-alt/LOCKIN.git', :tag => s.version.to_s }
  s.platforms = { :ios => '16.0' }
  s.swift_version = '5.9'
  s.source_files = 'ios/**/*.{h,m,mm,swift}'
  s.frameworks = 'FamilyControls', 'ManagedSettings', 'DeviceActivity', 'SwiftUI'
  s.dependency 'ExpoModulesCore'
end

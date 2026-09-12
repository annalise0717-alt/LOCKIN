const { withEntitlementsPlist } = require('@expo/config-plugins')
const group = 'group.com.lockin.focus'
module.exports = function withLockinScreenTime(config) {
  return withEntitlementsPlist(config, (mod) => {
    mod.modResults['com.apple.developer.family-controls'] = true
    const groups = mod.modResults['com.apple.security.application-groups'] ?? []
    if (!groups.includes(group)) groups.push(group)
    mod.modResults['com.apple.security.application-groups'] = groups
    return mod
  })
}

import Vue from 'vue'

function hasRole (userRoles, role) {
  const roles = userRoles.filter(r => {
    return r === role
  });
  return roles.length > 0;
}
Vue.prototype.$hasRole = hasRole;

// export default function ({ store, redirect }) {
//   // if (store.state.login.token && store.state.login.user && store.state.login.user.user_group_id === 2) {
//   if (store.state.login.token && store.state.login.user_group_id === 2) {
//     return redirect('/admin/users')
//   }
//   else {
//     return redirect('/login')
//   }
// }


export default function ({ store, redirect }) {
  if (!store.state.login.user) {
    return redirect('/login')
  }
  else {
    const user = store.state.login.user.user_group_id;
    if(user.user_group_id === 3 || user.user_group_id === 4){
      return redirect('/Doctor/Admissions')
    }
  }
}

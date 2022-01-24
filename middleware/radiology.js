export default function ({store, redirect}) {
  if (!store.state.login.user) {
    return redirect('/login')
  } else {
    const user_group_id = store.state.login.user.user_group_id;
    if (user_group_id === 5) {
      return redirect('/Doctor/Admissions')
    }
  }
}

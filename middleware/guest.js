export default function ({store, redirect}) {
  if (store.state.login.user) {
    return redirect('/Organization/Admissions')
  }
}

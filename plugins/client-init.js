export default async (context) => {
  await context.store.dispatch('login/nuxtClientInit', context)
}

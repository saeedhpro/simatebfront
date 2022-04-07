<template>
  <div class="container">

    <div>
      <!--  <carousel :data="[]"></carousel>-->
    </div>

    <div class="my-5 flex justify-between" style="align-items: center">
      <div
        class="w-44 h-12 py-2 px-3 text-sm flex bg-blue-904 Bold text-center text-blue-902 border-solid border-2 border-blue-902 rounded-lg"
        style="align-items: center">
        <img src="/img/mostanad.svg" class="w-8 ml-3"/>
        <span>مستندات ارسال شده</span>
      </div>
      <img src="/img/Line%2041-2.svg" class="mx-2 md:flex hidden" width="1000px">
    </div>

    <div class="p-5 bg-white rounded-lg shadow-md" v-if="show">
      <div v-for="(i, n) in docs" :key="n"
           class="-mx-2 my-5 flex flex-wrap justify-between md:border-b-0 border-b border-gray-500 relative"
           style="align-items: end">
        <div class="px-2">
          <img v-if="i.type == 'image'" :src="i.url" class="w-32 h-32"/>
          <a :href="i.url" v-else class="w-32 h-32">{{ i.name }}</a>
        </div>

        <div class="px-2">
          <label class="mb-2 text-blue-906 text-sm">توضیح پزشک</label>
          <div class="w-80 p-3 h-28 border-solid border border-gray-902 rounded-lg">
            {{ i.doctor_desc }}
          </div>
        </div>

        <div class="px-2">
          <label class="mb-2 text-blue-906 text-sm">نظر بیمار</label>
          <input class="w-80 p-3 h-28 border-solid border border-gray-100 rounded-lg" v-model="i.user_desc"/>
          <button class="bg-blue-902" @click="save(i)">ذخیره</button>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: "index",
  layout: 'user',
  middleware: 'auth',
  data() {
    return {
      user_desc: null,
      docs: [],
      show: false,
    }
  },
  async mounted() {
    this.docs = await this.$store.dispatch('docs/userWallet/getUserDocs', this.user.id)
    for (let i = 0; i < this.docs.length; i++) {
      const url = await this.getFile(this.docs[i])
      if (url) {
        this.docs[i] = {
          ...this.docs[i],
          url: url,
        }
      }
    }
    this.show = true
  },
  computed: {
    user() {
      return this.$store.getters["login/getUser"]
    }
  },
  methods: {
    async getFile(i) {
      if (!i.name) return null
      const res = await this.$store.dispatch("upload/getFile", `${i.user_id}/${i.name}`)
      return res.url
    },
    save(i) {
      this.$store.dispatch('docs/userWallet/updateSendDoc', {
        id: i.id,
        user_desc: i.user_desc,
        doctor_desc: i.doctor_desc,
      })
    }
  }
}
</script>

<style scoped>

</style>

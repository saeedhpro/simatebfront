<template>
  <div>

    <div v-for="(i, n) in resultRadiology" :key="n">
      <div class="p-1 w-full bg-gray-500 rounded-lg flex justify-between">
        <div class="text-sm text-gray-900">کدپذیرش:<span class="text-black">{{ i.code | toPersianNumber }}</span></div>
        <div>{{ ($moment(i.created_at.Time).format('jYYYY/jM/jDD')) | toPersianNumber }}</div>
      </div>
      <div class="flex flex-wrap justify-start">
        <img @click="index = k" v-for="(j,k) in i.logos" :src="j" :key="k" class="w-32 h-32 m-2 rounded-lg">
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: "ResultPhotography",
  data() {
    return {
      images: [],
      index: null
    }
  },
  mounted() {
    this.$store.dispatch('doctor/patients/getResultsList', {
      id: this.$route.params.id,
      prof: "photo"
    })
  },
  computed: {
    resultRadiology() {
      return this.$store.getters['doctor/patients/getPhotoResults']
    }
  },
  methods: {
    async getImages(id, prof) {
      this.images[id] = [];
      this.images[id] = await this.$store.dispatch('upload/getAppResultImages', {
        id,
        prof,
      })
    }
  }
}
</script>

<style scoped>

</style>

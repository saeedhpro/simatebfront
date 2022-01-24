<template>
  <div>
    <client-only>
      <light v-if="items.length > 0" :media="items" :showLightBox="showLightBox" @onClosed="closeLightBox">
      </light>
    </client-only>
    <div v-for="(i, n) in resultRadiology" :key="n">
      <div class="p-1 w-full bg-gray-500 rounded-lg flex justify-between">
        <div class="text-sm text-gray-900">کدپذیرش:<span class="text-black">{{ i.code | toPersianNumber }}</span></div>
        <div>{{ ($moment(i.created_at.Time).format('jYYYY/jM/jDD')) | toPersianNumber }}</div>
      </div>
      <div class="flex flex-wrap justify-start">
        <img @click="setItems(j)" v-for="(j,k) in i.logos" :src="j" :key="k" class="w-32 h-32 m-2 rounded-lg">
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: "ResultRadiology",
  data() {
    return {
      items: [],
      showLightBox: false,
      images: [],
    }
  },
  mounted() {
    this.$store.dispatch('doctor/patients/getResultsList', {
      id: this.$route.params.id,
      prof: "radio"
    })
  },
  computed: {
    resultRadiology() {
      return this.$store.getters['doctor/patients/getRadioResults']
    }
  },
  methods: {
    async getImages(id, prof) {
      this.images[id] = [];
      this.images[id] = await this.$store.dispatch('upload/getAppResultImages', {
        id,
        prof,
      })
    },
    setItems(item) {
      this.items.push({
        thumb: item,
        src: item,
      })
      this.showLightBox = true;
    },
    closeLightBox() {
      this.items = [];
      this.showLightBox = false;
    },
  }
}
</script>

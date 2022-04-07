<template>
  <div class="my-4 py-2 px-3 bg-white rounded-lg">
    <div class="mb-2 flex flex-wrap justify-start">
      <div class="flex" style="align-items: center">
        <img src="/img/Header6.svg" class="ml-2 w-2">
        برای امروز،
        <span class="p-1 mx-1 bg-blue-902 rounded-lg text-white">{{ getCount()  | toPersianNumber}}</span>
        مورد پذیرش ثبت شده است
      </div>
    </div>
    <div>
      <SendDocTable :prof="prof"/>
    </div>
  </div>
</template>

<script>
import SendDocTable from "./SendDocTable";

export default {
  name: "SendDocToday",
  props: ['prof'],
  components: {SendDocTable},
  mounted() {
  },
  computed: {
    getRadios() {
      return this.$store.getters['doctor/patients/getRadios']
    },
    getPhotos() {
      return this.$store.getters['doctor/patients/getPhotos']
    },
    getOffs() {
      return this.$store.getters['doctor/patients/getOffs']
    },
  },
  methods: {
    getCount() {
      if (this.prof == 1) {
        return this.getPhotos ? this.getPhotos.pages_count : 0
      } else if (this.prof == 3) {
        return this.getRadios ? this.getRadios.pages_count : 0
      } else if (this.prof != 2) {
        return this.getOffs ? this.getOffs.pages_count : 0
      }
    }
  }
}
</script>

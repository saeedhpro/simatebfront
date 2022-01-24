<template>
  <div class="my-4 py-2 px-3 bg-white rounded-lg">
    <div class="mb-2 flex flex-wrap justify-start">
      <div class="flex" style="align-items: center">
        <img src="/img/Header6.svg" class="ml-2 w-2">
        برای امروز،
        <span class="p-1 mx-1 bg-blue-902 rounded-lg text-white">{{ admissions ? admissions.length : 0  | toPersianNumber}}</span>
        مورد پذیرش ثبت شده است
      </div>
    </div>
    <div>
      <Table/>
    </div>
  </div>
</template>

<script>
import Table from "@/components/DoctorProfile/Table";

export default {
  name: "AdmissionsToday",
  components: {Table},
  mounted() {
  },
  computed: {
    admissions() {
      return this.$store.getters['doctor/patients/getToday']
    }
  }
}
</script>

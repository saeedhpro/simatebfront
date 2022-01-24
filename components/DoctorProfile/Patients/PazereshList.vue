<template>
  <div class="p-3 bg-white rounded-lg" v-if="pazireshUserList">
    <div class="-mx-2 flex" v-for="(i , n) in pazireshUserList" :key="n">
      <div class="px-2 w:1/6">
        <div class="p-3  rounded-lg text-center border-dashed border-blue-902 text-blue-902">
          <div>{{ n + 1 }}</div>
          <div class="w-28 py-2 rounded-lg text-center border-dashed border-blue-902 text-blue-902 bg-blue-904">ویرایش
          </div>
        </div>
      </div>
      <div class="px-2 w:5/6">
        <div class="p-3 flex justify-start">

          <div>
            <div>
              {{ i.created_at ? ($moment(i.created_at.Time).format('jYYYY/jM/jDD hh:mm')) : '' }}
            </div>
            <div class="my-5">علت مراجعه : <span class="bg-gray-908 rounded-lg text-center text-black">{{
                i.case_type
              }}</span> <span class="bg-gray-908 rounded-lg text-center text-black">معاینه</span></div>
            <div>کد پذیرش : <span class="text-black ir-bold">{{ i.file_id }}</span></div>
          </div>

          <div>
            <div>
              اقدامات و دستورات پزشک :
              <span class="mx-1 text-black bg-gray-908 rounded-lg text-center">{{ i.future_prescription }}</span>
            </div>
            <div class="my-5">
              <div v-if="i.photography">فتوگرافی: <span
                class="w-20 py-1 border-solid border border-green1 text-green1 bg-green-400 rounded-ld">{{
                  i.photography_cases
                }}</span></div>
              <div v-else>رادیولوژی: <span
                class="w-14 py-2 rounded-lg text-center border-dashed border-blue-902 text-blue-902 bg-blue-904">{{
                  i.radiolojy_case
                }}</span></div>
            </div>
            <div>
              <img src="#" class="mx-1 w-20 h-20 ">
            </div>
          </div>

        </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: "PazereshList",
  computed: {
    pazireshUserList() {
      return this.$store.getters['doctor/patients/getAppointments']
    },
  },
  mounted() {
    this.$store.dispatch('doctor/patients/getPatientAppointments', this.$route.params.id)
  }
}
</script>

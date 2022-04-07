<template>
  <div>
    <div class="overflow-auto">
      <div class="h-12 flex border-solid border-2 border-gray-901 rounded-t-lg bg-gray-902 minWight">
        <div class="w-10 py-2 border-l-2 border-gray-901"></div>
        <div class="w-64 py-2 border-l-2 border-gray-901 text-center">عناون</div>
        <div class="w-32 py-2 border-l-2 border-gray-901 text-center">مدت ویزیت</div>
        <div class="w-72 py-2 border-l-2 border-gray-901 text-center">دارای محدودیت</div>
        <div class="w-28 py-2 border-l-2 border-gray-901 text-center">میزان محدودیت</div>
        <div class="w-28 py-2 px-auto text-center">عملیات</div>
      </div>
      <div class="h-auto flex border-b-2 border-r-2 border-l-2 border-gray-901 minWight table-link"
           v-for="(i , n) in casesList" :key="n">
        <div class="w-10 py-2 text-center border-l-2 border-gray-901">{{ n + 1 }}</div>
        <div class="w-64 px-3 py-2 flex border-l-2 border-gray-901 text-center" style="align-items: center">
          {{ i.name }}
        </div>
        <div class="w-32 py-2 border-l-2 border-gray-901 text-center">{{ i.duration }}</div>
        <div class="w-72 py-2 border-l-2 border-gray-901 text-center">{{ i.is_limited }}</div>
        <div class="w-28 py-2 border-l-2 border-gray-901 text-center">{{ i.limitation }}</div>
        <div class="w-28 py-2 px-auto text-center"></div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "CaseTypeTable",
  data() {
    return {
      page: 1
    }
  },
  mounted() {
    this.$store.dispatch('case_types/userWallet/getCaseTypes')
  },
  computed: {
    casesList() {
      return this.$store.getters['case_types/userWallet/getCases']
    },
  },
  methods: {}
}
</script>


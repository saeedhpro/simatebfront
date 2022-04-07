<template>
  <div class="overflow-x-auto">
    <div class="h-12 flex border-solid border-2 border-gray-901 rounded-t-lg bg-gray-902 minWight">
      <div class="w-10 py-2 border-l-2 border-gray-901"></div>
      <div class="w-64 py-2 border-l-2 border-gray-901 text-center">نام</div>
      <div class="w-28 py-2 border-l-2 border-gray-901 text-center">شماره تماس</div>
      <div class="w-28 py-2 border-l-2 border-gray-901 text-center">شماره پرونده</div>
      <div class="w-32 py-2 border-l-2 border-gray-901 text-center">گروه</div>
      <div class="w-12 py-2 border-l-2 border-gray-901 text-center">سن</div>
      <div class="w-64 py-2 border-l-2 border-gray-901 text-center">موسسه</div>
      <div class="w-32 py-2 border-l-2 border-gray-901 text-center">ثبت در سیستم</div>
      <div class="w-32 py-2 mx-auto text-center">آخرین ورود</div>
    </div>
    <div v-if="InstitutionList">
      <div class="h-10 flex border-b-2 border-r-2 border-l-2 border-gray-901 minWight table-link"
           v-for="(i , n) in InstitutionList.data" :key="n">
        <div class="w-10 py-2 border-l-2 border-gray-901 text-center">{{ n + 1 }}</div>
        <div class="w-64 py-2 border-l-2 border-gray-901 text-center">
          <input @change="selectItem($event, i.id)" type="checkbox" :checked="isSelected(i.id)">
          {{ i.fname }} {{ i.lname }}
        </div>
        <div class="w-28 py-2 border-l-2 border-gray-901 text-center">{{ i.tel | toPersianNumber }}</div>
        <div class="w-28 py-2 border-l-2 border-gray-901 text-center">{{ i.file_id | toPersianNumber }}</div>
        <div class="w-32 py-2 border-l-2 border-gray-901 text-center">{{ i.user_group_name }}</div>
        <div class="w-12 py-2 border-l-2 border-gray-901 text-center">{{ i.birth | toPersianNumber }}</div>
        <div class="w-64 py-2 border-l-2 border-gray-901 text-center">{{ i.organization_name }}</div>
        <div class="w-32 py-2 border-l-2 border-gray-901 text-center">{{
            ($moment(i.created).format('YYYY/M/DD ')) | toRelativeDate
          }}
        </div>
        <div class="w-32 py-2 mx-auto text-center">
          {{ i.last_login ? ($moment(i.last_login.Time).format('jYYYY/jM/jDD hh:mm')) : '-' }}
        </div>
      </div>
    </div>
    <!--  <pagination v-if="InstitutionList && InstitutionList.data" :data="InstitutionList.data" @pagination-change-page="getResults"></pagination>-->

  </div>
</template>

<script>
export default {
  name: "InstitutionUsersTable",
  mounted() {
    setTimeout(() => {
      this.getResults()
    }, 500)
  },
  computed: {
    InstitutionList() {
      return this.$store.getters['admin/Institution/getInstituteUsers']
    },
    selectedItems() {
      return this.$store.getters['selected/getSelected']
    },
  },
  methods: {
    isSelected(id){
      const item = this.selectedItems.find(i => i.id == id)
      return !!item;
    },
    getResults(page = 1) {
      this.$store.dispatch('admin/Institution/getInstituteUsers', {
        id: this.$route.params.id,
        page: this.$route.query.page || 1,
        q: this.$route.query.q || null,
      })
    },
    selectItem(e, id) {
      this.$store.dispatch('selected/updateSelected', {
        checked: e.target.checked,
        id: id,
      })
    },
    g(i) {
      switch (i) {
        case 1 :
          return "بیمار"
        case 2 :
          return " مدیر سیستم"
        case 3 :
          return "پزشک"
        case 4 :
          return "منشی پزشک"
        case 5 :
          return "مسئول آزمایشگاه"
      }
    }
  },
}
</script>

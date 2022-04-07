<template>
  <div class="overflow-auto">
    <div class="h-12 flex border-solid border-2 border-gray-901 rounded-t-lg bg-gray-902 minWight">
      <div class="w-10 py-2 border-l-2 border-gray-901"></div>
      <div class="w-64 py-2 border-l-2 border-gray-901 text-center">بیمار</div>
      <div class="w-32 py-2 border-l-2 border-gray-901 text-center">شماره تماس</div>
      <div class="w-32 py-2 border-l-2 border-gray-901 text-center">پزشک</div>
      <div class="w-12 py-2 border-l-2 border-gray-901 text-center">سن</div>
      <div class="w-32 py-2 border-l-2 border-gray-901 text-center">ثبت در سیستم</div>
      <div class="w-32 py-2 mx-auto text-center">آخرین ورود</div>
    </div>
    <div v-if="userList">
      <div class="h-10 flex border-b-2 border-r-2 border-l-2 border-gray-901 minWight table-link" v-for="(i , n) in userList.data" :key="n">
        <div class="w-10 py-2 text-center border-l-2 border-gray-901">{{n + 1}}</div>
        <nuxt-link :to="`/Radiology/PatientsRadiology/${i.id}`" class="w-64 px-3 py-2 flex border-l-2 border-gray-901 text-center" style="align-items: center">
          <input type="checkbox">
          <img src="#" class="mx-2 w-5 h-5 rounded-lg">
          {{i.fname}} {{i.lname}}
        </nuxt-link>
        <div class="w-32 py-2 border-l-2 border-gray-901 text-center">{{ i.tel }}</div>
        <div class="w-32 py-2 border-l-2 border-gray-901 text-center">{{ i.fname }}</div>
        <div class="w-12 py-2 border-l-2 border-gray-901 text-center">{{ i.birth }}</div>
        <div class="w-32 py-2 border-l-2 border-gray-901 text-center">{{ i.created ? ($moment(i.created.Time).format('jYYYY/jM/jDD')) :'-'  }}</div>
        <div class="w-32 py-2 text-center mx-auto">{{i.last_login ? ($moment(i.last_login.Time).format('jYYYY/jM/jDD hh:mm'))  :'-' }}</div>
      </div>
    </div>
<!--    <pagination v-if="userList && userList.data" :limit="10" :data="userList.data" @pagination-change-page="getResults"></pagination>-->
   <div v-if="userList && userList.pages_count > 10">
    <paginate
      v-model="page"
      :page-count="parseInt(userList.pages_count / 10)"
      :page-range="3"
      :margin-pages="2"
      :click-handler="clickCallback"
      :prev-text="'<'"
      :next-text="'>'"
      :container-class="'pagination'"
      :page-class="'page-item'">
    </paginate>
     </div>
  </div>
</template>
<script>
export default {
  name: "PatientsTableRadiology",
  data(){
    return{
      page : 1
    }
  },
  mounted() {
    const page = this.$route.query.page || 1
    let r = "/api/v1/organizations/"
    r += `${this.user.organization_id}/users?page=${page}&group=1`
    this.$store.dispatch('doctor/patients/getPatients' , r)
  },
  computed:{
    userList(){
      return this.$store.getters['doctor/patients/getPatients']
    },
    user() {
      return this.$store.getters['login/getUser']
    }
  },
  methods: {
    getResults(page = 1) {
      let r = "/api/v1/organizations/"
      r += `${this.user.organization_id}/users?page=${page}&group=1`
      if (this.$route.query.q) {
        r += `&q=${this.$route.query.q}`
      }
      if (this.$route.query.start_date) {
        r += `&q=${this.$route.query.start_date}`
      }
      if (this.$route.query.end_date) {
        r += `&q=${this.$route.query.end_date}`
      }
      this.$store.dispatch('doctor/patients/getPatients', r)
    },
    clickCallback (pageNum) {
      this.getResults(pageNum)
    }
  },
}
</script>


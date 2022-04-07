<template>
  <div class="my-4 py-2 px-3 bg-white rounded-lg">
    <div class="mb-10 flex flex-wrap justify-between">
      <div>
        <SearchTurnsFrom />
      </div>
    </div>
    <div class="overflow-auto">
      <div class="h-12 flex border-solid border-2 border-gray-901 rounded-t-lg bg-gray-902 minWight">
        <div class="w-10 py-2 border-l-2 border-gray-901"></div>
        <div class="w-64 py-2 border-l-2 border-gray-901 text-center">نام</div>
        <div class="w-32 py-2 border-l-2 border-gray-901 text-center">شماره تماس</div>
        <div class="w-12 py-2 border-l-2 border-gray-901 text-center">پرونده</div>
        <div class="w-64 py-2 border-l-2 border-gray-901 text-center">تاریخ</div>
        <div class="w-32 py-2 mx-auto text-center">وضعیت</div>
      </div>
      <div v-if="userList">
        <div class=" flex border-b-2 border-r-2 border-l-2 border-gray-901 minWight table-link"
             v-for="(i , n) in userList.data" :key="n">
          <div class="w-10 py-2 text-center border-l-2 border-gray-901">{{ n + 1 }}</div>
          <nuxt-link :to="`/Organization/Patients/${i.id}`"
                     class="w-64 px-3 py-2 flex border-l-2 border-gray-901 text-center"
                     style="align-items: center">
            <input type="checkbox">
            <img src="#" class="mx-2 w-5 h-5 rounded-lg">
            {{ i.fname }} {{ i.lname }}
          </nuxt-link>
          <div class="w-32 py-2 border-l-2 border-gray-901 text-center">{{ i.tel }}</div>
          <div class="w-12 py-2 border-l-2 border-gray-901 text-center">{{ i.file_id }}</div>
          <div class="w-64 py-2 border-l-2 border-gray-901 text-center">
            {{ i.created_at ? ($moment(i.created_at.Time).format('jYYYY/jM/jDD')) : '-' }}
          </div>
          <div class="w-32 py-2 text-center">
            <div class="w-32 py-2 mx-auto justify-center text-center">
              <span class="w-20 px-2  text-blue-905 bg-gray-906 rounded-md" v-if="i.status == 2">پذیرش شده</span>
              <span class="w-20 px-1 py-2 text-gray-900 bg-gray-903 rounded-md"
                    v-else-if="i.status == 4">عدم حضور</span>
              <span class="w-20 px-1 py-2 text-orange-100 rounded-md" v-else-if="i.status == 5">در انتظار</span>
              <span class="w-20 px-1 py-2 text-orange-100 bg-orange-200 rounded-md"
                    v-else-if="i.status == 1">رزرو شده</span>
              <span class="w-20 px-1 py-2 text-pink-200 bg-red-200 rounded-md" v-else-if="i.status == 3">کنسل شده</span>
            </div>
          </div>

        </div>
        <paginate
          v-if="userList && userList.pages_count > 10"
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
  </div>
</template>
<script>
import SearchTurnsFrom from "../SearchTurnsFrom";

export default {
  name: "SearchTurns",
  components: {SearchTurnsFrom},
  data() {
    return {
      page: 1,
      pageCount: null
    }
  },
  mounted() {
    this.search()
  },
  computed: {
    userList() {
      return this.$store.getters['doctor/patients/getAppointments']
    },
    userLogin() {
      return this.$store.getters['login/getUser']
    }
  },
  methods: {
    search() {
      let r = `/api/v1/organizations/${this.userLogin.organization_id}/appointments?`
      const query = this.$route.query;
      if (this.start_date) {
        r += `&start_date=${this.start_date}`
      }
      if (this.end_date) {
        r += `&end_date=${this.end_date}`
      }
      if (this.q) {
        r += `&q=${this.q}`
      }
      if (!query.page) {
        query.page = '1'
      }
      if (query.page) {
        r += `&page=${query.page}`
      }
      this.$router.push({
        path: this.$route.path,
        query: {
          ...query,
          q: this.q || null,
          start_date: this.start_date,
          end_date: this.end_date,
        }
      })
      this.$store.dispatch('doctor/patients/getAppointments', r)
    },
    getResults(page = 1) {
      this.$router.push({
        path: this.$route.path,
        query: {
          ...this.$route.query,
          page: page,
        }
      })
      setTimeout(() => {
        this.search()
      }, 200)
    },
    clickCallback(pageNum) {
      this.getResults(pageNum)
    }
  },
}
</script>


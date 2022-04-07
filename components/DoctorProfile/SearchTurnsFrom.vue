<template>
  <div>
    <vue-modaltor :visible="open" @hide="open=false">
      <template #header>
        <!--    add your custom header     -->
        <div class="pb-3 flex justify-between border-b border-gray-700" style="align-items: center">
          <div class="flex" style="align-items: center">
                       <button class="mr-3 w-5 h-5 p-1 border-solid border-gray-901 border rounded">

              <img src="/img/xmark.svg" @click="close">
            </button>
            <p class="mr-2">جستجو پیشرفته</p>
          </div>
        </div>
      </template>
      <template #body>

        <div class="mt-3 flex flex-wrap justify-between" style="align-items: center">
          <div>
            <div class="mb-2">عبارت جستجو</div>
            <input v-model="q" class="w-56 h-10 px-2 bg-white border-solid border-gray-901 border rounded-lg"/>
          </div>
          <div>
            <div class="mb-2">تاریخ ابتدا</div>
            <div class="w-56 h-10 px-2 bg-white border-solid border-gray-901 border rounded-lg">
              <date-picker format="YYYY-MM-DD HH:mm:ss" display-format="jYYYY/jMM/jDD HH:mm:ss" :value="start_date"
                           @input="onChangeStart"
                           type="datetime"
                           placeholder="تاریخ را انتخاب کنید"></date-picker>
            </div>
          </div>
          <div>
            <div class="mb-2">تاریخ انتها</div>
            <div class="w-56 h-10 px-2 bg-white border-solid border-gray-901 border rounded-lg">
              <date-picker format="YYYY-MM-DD HH:mm:ss" display-format="jYYYY/jMM/jDD HH:mm:ss" :value="end_date"
                           @input="onChangeEnd"
                           type="datetime"
                           placeholder="تاریخ را انتخاب کنید"></date-picker>
            </div>
          </div>

        </div>

        <div class="mt-8 flex flex-wrap justify-between">
          <div class="w-28 h-10 py-2 border-solid border border-gray-700 rounded-lg text-gray-700 text-center">پاک کردن
            فرم
          </div>
          <div class="flex" style="align-items: center">
            <div @click="close" class="w-28 h-10 py-2 text-center bg-gray-907 rounded-lg">بستن</div>
            <div @click="search"
                 class="cursor-pointer w-56 h-10 py-2 mr-3 text-center bg-blue-902 rounded-lg text-white">جستجو
            </div>
          </div>
        </div>
      </template>
    </vue-modaltor>

    <div class="flex md:mt-0 mt-2" style="align-items: center">
      <div class="ml-5 text-gray-700 text-sm">{{ listUser ? listUser.pages_count : 0 }} نتیجه</div>
      <div class="relative">
        <input v-model="q"
               class="h-12 pl-5 wh pr-10 pb-2 border-2 border-gray-901 rounded-lg placeholder-gray-600 text-gray-600 bg-white focus:outline-none appearance-none wight-search"
               placeholder="جستجو">
        <img src="/img/magnifying-glass.svg" class="w-4 mr-3 absolute" style="margin-top: -35px">

        <div
          @click="search"
          class="cursor-pointer mr-auto w-10 h-10 p-2 absolute flex bg-gray-100 hover:bg-blue-904 text-blue-906 hover:text-blue-902 border-solid border-2 border-gray-901 hover:border-blue-902 rounded-lg hover1 click"
          style="align-items: center;left: 77px;margin-top: -44px">
          <img src="/img/magnifying-glassBlue.svg" class="w-5 blue1"/>
          <img src="/img/magnifying-glass.svg" class="w-5 gray1"/>
        </div>

        <div
          class="mr-auto w-16 h-10 py-2 px-3 absolute flex bg-gray-100 hover:bg-blue-904 text-blue-906 hover:text-blue-902 border-solid border-2 border-gray-901 hover:border-blue-902 rounded-lg hover1 click"
          style="align-items: center;left: 5px;margin-top: -44px"
          @click="open=true">
          <!--      <img src="/img/magnifying-glassBlue.svg" class="w-3 ml-1 blue1"/>-->
          <img src="/img/filter.svg" class="w-3 ml-1 gray1"/>
          <span class="mb-1 text-sm click">فیلتر</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SearchTurnsFrom",
  data() {
    return {
      open: false,
      q: null,
      start_date: null,
      end_date: null,
    }
  },
  mounted() {
    this.q = this.$route.query.q || null
    this.start_date = this.$route.query.start_date || null
    this.end_date = this.$route.query.end_date || null
  },
  computed: {
    listUser() {
      return this.$store.getters['doctor/patients/getAppointments']
    },
    userLogin() {
      return this.$store.getters['login/getUser']
    }
  },
  methods: {
    onChangeStart(val) {
      this.start_date = val
    },
    onChangeEnd(val) {
      this.end_date = val
    },
    close() {
      this.open = false
    },
    search() {
      let r = `/api/v1/organizations/${this.userLogin.organization_id}/appointments?`
      const query = this.$route.query;
      if (query.page) {
        r += `page=${query.page}`
      } else {
        r += `page=1`
      }
      if (this.start_date) {
        r += `&start_date=${this.start_date}`
      }
      if (this.end_date) {
        r += `&end_date=${this.end_date}`
      }
      if (this.q) {
        r += `&q=${this.q}`
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
  }
}
</script>

<style scoped>
@media (min-width: 720px) {
  .wh {
    width: 436px
  }

  .wight-search {
    width: 536px !important;
  }
}

.wh {
  width: 100%;
}

.wight-search {
  width: 100%;
}

.hover1 .blue1 {
  display: none;
}

.hover1 gray1 {
  display: flex;
}

.hover1:hover .blue1 {
  display: flex;
}

.hover1:hover .gray1 {
  display: none;
}
</style>

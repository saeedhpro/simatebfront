<template>
  <div class="container">
    <vue-modaltor :visible="open" @hide="open=false">
      <template #header>
        <!--    add your custom header     -->
        <div class="pb-3 flex justify-between border-b border-gray-700" style="align-items: center">
          <div class="flex" style="align-items: center">
            <div class="w-5 h-5 p-1 border-solid border-gray-901 border rounded">
              <img src="/img/xmark.svg" @click="close">
            </div>
            <p class="mr-2">تعطیلات رسمی</p>
          </div>
        </div>
      </template>
      <template #body>
        <div class="flex flex-wrap justify-between">
          <div>
            <label>عنوان</label>
            <div class="w-56 h-10 px-2 bg-white border-solid border-gray-901 border rounded-lg">
              <input type="text" class="w-56 h-10 px-2 bg-white border-solid border-gray-901 border rounded-lg"
                     v-model="title">
            </div>
          </div>
          <div>
            <label>تاریخ</label>
            <div class="w-56 h-10 px-2 bg-white border-solid border-gray-901 border rounded-lg">
              <date-picker format="YYYY-MM-DD" display-format="jYYYY/jMM/jDD" :value="hdate" @input="onChange"
                           placeholder="تاریخ را انتخاب کنید"></date-picker>
            </div>
          </div>
        </div>
        <div class="mt-8 flex flex-wrap ">
          <button class="w-28 h-10 py-2 text-center bg-gray-907 rounded-lg" @click="close">بستن</button>
          <button class="w-56 h-10 py-2 mr-3 text-center bg-blue-902 rounded-lg text-white" @click="addHoliday">ذخیره
          </button>
        </div>

      </template>
    </vue-modaltor>

    <div class="flex justify-between" style="align-items: center">
      <div
        class="w-44 h-12 py-2 px-3 text-sm flex bg-blue-904 Bold text-center text-blue-902 border-solid border-2 border-blue-902 rounded-lg"
        style="align-items: center">
        <img src="/img/calenderBlue.svg" class="w-8 ml-3"/>
        <span>تعطیلات رسمی</span>
      </div>
      <img src="/img/Line%2041-2.svg" class="mx-2 md:flex hidden" width="1000px">
      <button class="w-40 h-12 px-2 text-sm flex bg-blue-902 rounded-lg text-white text-center click"
              style="align-items: center" @click="open = true">
        <div class="p-2 ml-4 bg-blue-903 rounded-lg text-center">
          <img src="/img/user-plus.svg">
        </div>
        <span class="mx-auto click">افزودن</span>
      </button>
    </div>
    <div class="my-5">
      سال :
      <div class="relative inline-flex">
        <svg class="w-2 h-2 absolute top-0 right-0 m-4 pointer-events-none" xmlns="http://www.w3.org/2000/svg"
             viewBox="0 0 412 232">
          <path
            d="M206 171.144L42.678 7.822c-9.763-9.763-25.592-9.763-35.355 0-9.763 9.764-9.763 25.592 0 35.355l181 181c4.88 4.882 11.279 7.323 17.677 7.323s12.796-2.441 17.678-7.322l181-181c9.763-9.764 9.763-25.592 0-35.355-9.763-9.763-25.592-9.763-35.355 0L206 171.144z"
            fill="#648299" fill-rule="nonzero"/>
        </svg>
        <select
          v-model="year"
          class="border border-gray-500 rounded-lg text-gray-600 h-12 w-40 pl-5 pr-2 bg-white hover:border-gray-400 focus:outline-none appearance-none">
          <option v-for="(i,n) in years" :value="i" :key="n">{{ i }}</option>
        </select>
      </div>
    </div>
    <HolidaysTable/>
    <vue-snotify class="material"></vue-snotify>
  </div>
</template>

<script>

import HolidaysTable from "@/components/DoctorProfile/Appoinment/Holidays";
export default {
  name: "index",
  layout: 'default',
  middleware: 'auth',
  components: {HolidaysTable},
  data() {
    return {
      open: false,
      title: null,
      year: null,
      start_date: null,
      end_date: null,
      years: [],
      hdate: null,
      organization_id: null,
      normalizer(node) {
        return {
          id: node.id,
          label: `${node.name}`,
          children: null,
        }
      },
    }
  },
  mounted() {
    const year = this.$route.query.year || parseInt(this.$moment(new Date()).format("jYYYY"));
    this.year = year
    // let m = this.$moment(`${year}/01/01`, "jYYYY/jMM/jDD")
    // let start_date = m
    let start_date = ""
    // let end_date = m.endOf('jYear')
    let end_date = ""
    // this.start_date = start_date
    // this.end_date = end_date
    for (let i = 1398; i < year + 10; i++) {
      this.years.push(i)
    }
    this.$store.dispatch('admin/holiday/getOrganizationHolidayList', {
      id: this.userLogin.organization_id,
      start_date,
      end_date
    })
    this.$router.push({
      path: this.$route.path,
      query: {
        ...this.$route.query,
        year: this.year,
        start_date,
        end_date,
      }
    })
  },
  computed: {
    userLogin() {
      return this.$store.getters['login/getUser']
    }
  },
  methods: {
    onChange(val) {
      this.hdate = val;
    },
    addHoliday() {
      this.$store.dispatch('admin/holiday/addHoliday', {
          title: this.title,
          hdate: this.hdate,
          organization_id: parseInt(this.userLogin.organization_id)
        }
      )
        .then(res => {
          this.$snotify.success('تعطیلات با موفقیت اضافه شد', {
            timeout: 2000,
            showProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true
          })
          this.$store.dispatch('admin/holiday/getOrganizationHolidayList', {
            id: this.userLogin.organization_id,
            start_date: this.start_date,
            end_date: this.end_date
          })
          this.close();
        })
        .catch(async err => {
          if (err.response.status === 404) {
            this.$snotify.error('خطا در ثبت اطلاعات', {
              timeout: 2000,
              showProgressBar: false,
              closeOnClick: false,
              pauseOnHover: true
            })
          } else {
            if (err.response.data.errors.password) {
              this.$snotify.error(err.response.data.errors.password, {
                timeout: 2000,
                showProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true
              })
              return;
            }
            const keys = Object.keys(err.response.data.errors);
            for (let i = 0; i < keys.length; i++) {
              for (let j = 0; j < err.response.data.errors[keys[i]].length; j++) {
                await this.$snotify.error(err.response.data.errors[keys[i]][j], {
                  timeout: 2000,
                  showProgressBar: false,
                  closeOnClick: false,
                  pauseOnHover: true
                })
              }
            }
          }
        })
    },
    close() {
      this.open = false
    },
  },
}
</script>

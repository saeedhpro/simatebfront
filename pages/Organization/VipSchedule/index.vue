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
            <p class="mr-2">مورد جدید</p>
          </div>
        </div>
      </template>
      <template #body>
        <div>
          <div class="my-5 flex flex-wrap justify-between">
            <div class="mr-5">
              <div class="mb-2">تاریخ</div>
              <!--          <input class="w-56 h-10 px-2 bg-white border-solid border-gray-901 border rounded-lg" v-model="birth_date"/>-->
              <div class="w-56 h-10 px-2 bg-white border-solid border-gray-901 border rounded-lg">
                <date-picker format="YYYY-MM-DD" display-format="jYYYY/jMM/jDD" :value="item.start_date"
                             @input="onDateChange"
                             placeholder="تاریخ را انتخاب کنید"></date-picker>
              </div>
            </div>
            <div class="mr-5">
              <div class="mb-2">ساعت شروع</div>
              <!--          <input class="w-56 h-10 px-2 bg-white border-solid border-gray-901 border rounded-lg" v-model="birth_date"/>-->
              <div class="w-56 h-10 px-2 bg-white border-solid border-gray-901 border rounded-lg">
                <date-picker :value="item.start_time"
                             @input="onStartTimeChange"
                             type="time"
                             placeholder="ساعت شروع را انتخاب کنید"></date-picker>
              </div>
            </div>
            <div class="mr-5">
              <div class="mb-2">ساعت پایان</div>
              <!--          <input class="w-56 h-10 px-2 bg-white border-solid border-gray-901 border rounded-lg" v-model="birth_date"/>-->
              <div class="w-56 h-10 px-2 bg-white border-solid border-gray-901 border rounded-lg">
                <date-picker format="HH:mm" display-format="HH:mm" :value="item.end_time"
                             @input="onEndTimeChange"
                             :min="item.start_time"
                             type="time"
                             placeholder="ساعت پایان را انتخاب کنید"></date-picker>
              </div>
            </div>
            <div class="mt-2 flex flex-row justify-center items-center">
              <label>ظرفیت پذیرش دکتر</label>
              <input type="number" min="0"
                     class="w-56 h-10 px-2 bg-white border-solid border-gray-901 border rounded-lg"
                     v-model="item.doctor_count">
            </div>
            <div class="mt-2 flex flex-row justify-center items-center">
              <label>ظرفیت پذیرش سایت</label>
              <input type="number" min="0"
                     class="w-56 h-10 px-2 bg-white border-solid border-gray-901 border rounded-lg"
                     v-model="item.site_count">
            </div>
            <div class="mt-2 flex flex-row justify-center items-center">
              <label>ظرفیت پذیرش اپ</label>
              <input type="number" min="0"
                     class="w-56 h-10 px-2 bg-white border-solid border-gray-901 border rounded-lg"
                     v-model="item.app_count">
            </div>
          </div>
        </div>
        <div class="mt-8 flex flex-wrap justify-end">
          <button class="w-28 h-10 py-2 text-center bg-gray-907 rounded-lg" @click="close">بستن</button>
          <button class="w-56 h-10 py-2 mr-3 text-center bg-blue-902 rounded-lg text-white" @click="create">
            افزودن
          </button>
        </div>

      </template>
    </vue-modaltor>
    <div>
      <div class="flex flex-wrap justify-between">
        <button class="px-3 selectedBlue py-2 flex  bg-white rounded-lg shadow-md text-sm click"
                style="align-items: center">
          <img src="/img/calenderBlue.png" class="ml-2 w-8">
          برنامه نوبت دهی VIP
        </button>

        <img src="/img/Line%2041-2.svg" class="md:flex hidden mx-3" style="max-width: 726px">
        <button @click="open=true"
                class="w-36 h-12 px-2 text-sm flex bg-blue-902 rounded-lg text-white text-center click"
                style="align-items: center">
          <div class="w-8 h-8 p-2 ml-4 bg-blue-903 rounded-lg text-center">
            <img src="/img/user-plus.svg">
          </div>
          <span>افزودن</span>
        </button>
      </div>
    </div>
    <div class="py-5 px-10 my-5 bg-white rounded-lg">
      <div>
        <VipScheduleTable/>
      </div>
    </div>
    <vue-snotify></vue-snotify>
  </div>
</template>

<script>
import VipScheduleTable from "../../../components/DoctorProfile/VipScheduleTable";

export default {
  name: "index",
  middleware: 'auth',
  components: {
    VipScheduleTable,
  },
  data() {
    return {
      open: false,
      open1: false,
      openMessage: false,
      item: {
        start_date: null,
        start_time: null,
        end_time: null,
        doctor_count: 0,
        site_count: 0,
        app_count: 0,
      },
      status3: true,
      status4: false,
    }
  },
  computed: {
    userLogin() {
      return this.$store.getters['login/getUser']
    },
  },
  methods: {
    close() {
      this.open = false
    },
    onDateChange(val) {
      this.item.start_date = val
    },
    onStartTimeChange(val) {
      this.item.start_time = val
    },
    onEndTimeChange(val) {
      this.item.end_time = val
    },
    create() {
      this.$store.dispatch('case_types/userWallet/createVipSchedule', {
        start_at: `${this.item.start_date} ${this.item.start_time}`,
        end_at: `${this.item.start_date} ${this.item.end_time}`,
        doctor_count: parseInt(this.item.doctor_count),
        app_count: parseInt(this.item.app_count),
        site_count: parseInt(this.item.site_count),
        organization_id: parseInt(this.userLogin.organization_id),
      })
        .then(() => {
          setTimeout(() => {
            this.$store.dispatch('case_types/userWallet/getVipSchedules', this.userLogin.organization_id)
            this.open = false
            this.item = {
              start_time: '',
              end_time: '',
              doctor_count: 0,
              app_count: 0,
              site_count: 0,
              start_date: '',
            }
          }, 100)
        })
      .catch(err => {
        console.log(err)
      })
    },
    status1() {
      this.status3 = true
      this.status4 = false
    },
    status2() {
      this.status4 = true
      this.status3 = false
    }
  }
}
</script>

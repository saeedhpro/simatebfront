<template>
  <div class="container">

    <vue-modaltor :visible="open" @hide="open=false">
      <template #header>
        <div class="pb-3 flex justify-between border-b border-gray-700" style="align-items: center">
          <div class="flex" style="align-items: center">
                       <button class="mr-3 w-5 h-5 p-1 border-solid border-gray-901 border rounded">

              <img src="/img/xmark.svg" @click="close">
            </button>
            <p class="mr-2">فرم پذیرش</p>
          </div>
        </div>
      </template>
      <template #body>
        <div>
          <div class="my-5 flex flex-wrap justify-between">
            <div>
              <div class="mb-2 Bold text-sm">تاریخ و ساعت ویزیت</div>
              <div class="w-56 h-10 px-2 bg-white border-solid border-gray-901 border rounded-lg">
                <date-picker type="datetime" format="YYYY-MM-DD HH:mm:ss" display-format="jYYYY/jMM/jDD HH:mm:ss"
                             :value="start_at"
                             @input="onChange"
                             placeholder="تاریخ را انتخاب کنید"></date-picker>
              </div>
            </div>
            <div class="mr-5">
              <div class="mb-2 Bold text-sm">نام بیمار</div>
              <tree-select
                class="w-56"
                v-model="userid"
                :multiple="false"
                :show-count="true"
                :default-expand-level="0"
                :options="allUsers"
                :normalizer="normalizer"
              >
              </tree-select>
            </div>
            <div>
              <div class="mb-2 Bold text-sm">شماره موبایل</div>
              <input disabled :value="user ? user.tel : ''"
                     class="w-56 h-10 px-2 bg-white border-solid border-gray-901 border rounded-lg"/>
            </div>
          </div>
          <div class="flex mb-5 flex-wrap justify-between">
            <div>
              <div class="mb-2 Bold text-sm">کدملی</div>
              <input disabled class="w-56 h-10 px-2 bg-white border-solid border-gray-901 border rounded-lg"
                     :value="user ? user.nid : ''"/>
            </div>
            <div>
              <div class="mb-2 Bold text-sm">شماره پرونده</div>
              <input disabled class="w-56 h-10 px-2 bg-white border-solid border-gray-901 border rounded-lg"
                     :value="user ? user.file_id : ''"/>
            </div>
            <div>
              <div class="mb-2 Bold text-sm">هزینه ویزیت</div>
              <input v-model="income" class="w-56 h-10 px-2 bg-white border-solid border-gray-901 border rounded-lg"/>
            </div>
          </div>
        </div>

        <div class="Bold text-sm ">علت مراجعه</div>
        <div class="m-2 flex justify-start" style="align-items: center">
          <div v-for="(i,n) in cases"
               class="cursor-pointer px-3 py-2 ml-2 flex bg-white border-gray-901 border-solid rounded-lg border"
               :class="{'selectedBlue' : status1 === '1'}">
            <div style="align-items: center">
              <input v-model="caseType" type="radio" :value="i.name" class="w-5 bg-gray-907 rounded-full">
              <span>{{ i.name }}</span>
            </div>
          </div>
        </div>

        <div>
          <div class="mb-2 mt-5 Bold text-sm">شرح حال و توضیحات پذیرش</div>
          <textarea class="w-full h-32 bg-white border-solid border-gray-901 border rounded-lg"
                    v-model="info"></textarea>
        </div>

        <div class="mt-8 flex flex-wrap justify-between">
          <button class="w-28 h-10 py-2 border-solid border border-gray-700 rounded-lg text-gray-700 text-center"
                  @click="clean">پاک کردن فرم
          </button>
          <div class="flex" style="align-items: center">
            <button class="w-28 h-10 py-2 text-center bg-gray-907 rounded-lg" @click="close">انصراف</button>
            <button class="w-56 h-10 py-2 mr-3 text-center bg-blue-902 rounded-lg text-white" @click="savePaziresh">
              ذخیره
            </button>
          </div>
        </div>

      </template>
    </vue-modaltor>
    <vue-modaltor v-if="user" :visible="save" @hide="save=false">
      <template #header>
        <!--    add your custom header     -->
        <div class="pb-3 flex justify-between" style="align-items: center">
          <div class="flex" style="align-items: center">
                       <div class="mr-3 w-5 h-5 p-1 border-solid border-gray-901 border rounded">

              <img src="/img/xmark.svg" @click="close1">
            </div>
            <!--          <p class="mr-2">فرم پذیرش</p>-->
          </div>
        </div>
      </template>
      <template #body>

        <div>
          <div class="my-3 text-center Bold text-xl">رزرو وقت</div>
          <div class="my-3 text-blue-907 text-center text-sm">آیا از رزرو وقت برای <span
            class="Bold">{{ `${user.fname} ${user.lname}` }}</span> در روز <span
            class="text-blue-902">{{ start_at ? $moment(start_at).format("dddd") : '' }}</span> ساعت <span
            class="text-blue-902">{{ start_at ? $moment(start_at).format("HH:mm") : '' }}</span> اطمینان دارید؟
          </div>
        </div>


        <div class="mt-8 flex flex-wrap justify-between">
          <div class="w-1/2 h-10 px-2">
            <button class="w-full py-2 text-center bg-gray-907 rounded-lg" @click="close1">خیر</button>
          </div>
          <div class="w-1/2 h-10 px-2">
            <button class="w-full py-2 mr-3 text-center bg-blue-902 rounded-lg text-white" @click="saveAppointment">بله،
              رزرو کن
            </button>
          </div>
        </div>

      </template>
    </vue-modaltor>

    <div class="flex flex-wrap justify-between">
      <button @click="status1" class="px-3 py-2 flex  bg-white rounded-lg shadow-md text-sm click"
              style="align-items: center" :class="{'selectedBlue' : menu1 === true}">
        <img src="/img/calenderBlue.png" class="ml-2 w-8" v-if="status = 'app-component-1'">
        <img src="/img/calenderGray.png" class="ml-2 w-8" v-else>
        جدول نوبت دهی
      </button>

      <button @click="status2" class="px-3 py-2 flex bg-white rounded-lg shadow-md text-sm click"
              style="align-items: center" :class="{'selectedBlue' : menu2 === true}">
        <img src="/img/Search.svg" class="ml-2 w-8" v-if="status = 'app-component-2'">
        <img src="/img/SearchBlue.svg" class="ml-2 w-8" v-else>
        جستجوی نوبت ها
      </button>

      <button @click="status3" class="px-3 py-2 flex bg-white rounded-lg shadow-md text-sm click"
              style="align-items: center" :class="{'selectedBlue' : menu3 === true}">
        <img src="/img/Search.svg" class="ml-2 w-8" v-if="status = 'app-component-3'">
        <img src="/img/SearchBlue.svg" class="ml-2 w-8" v-else>
        جدول جراحی
      </button>

      <img src="/img/Line%2041-2.svg" class="md:flex hidden mx-3" style="width: 426px">
      <div class="py-3 px-4 border-solid border-2 border-gray-901 rounded-lg text-blue-901 text-sm">
        امروز {{ $moment(new Date).locale("fa").format("dddd DD jMMM") | toPersianNumber}}
      </div>

      <div @click="open = true"
           class="cursor-pointer w-36 h-12 px-2 text-sm flex bg-blue-902 rounded-lg text-white text-center click"
           style="align-items: center">
        <div class="w-8 h-8 p-2 ml-4 bg-blue-903 rounded-lg text-center">
          <img src="/img/user-plus.svg">
        </div>
        <span>پذیرش جدید</span>
      </div>
    </div>

    <!--    <component :is="status"></component>-->
    <div v-if="menu1">
      <SchedulingTable/>
    </div>
    <div v-if="menu2">
      <SearchTurns/>
    </div>
    <div v-if="menu3">
      <SurgicalTable/>
    </div>
  </div>
</template>

<script>
import SchedulingTable from "@/components/DoctorProfile/Appoinment/SchedulingTable";
import SearchTurns from "@/components/DoctorProfile/Appoinment/SearchTurns";
import SurgicalTable from "@/components/DoctorProfile/Appoinment/SurgicalTable";

export default {
  name: "index",
  middleware: 'auth',
  data() {
    return {
      open: false,
      status: 'app-component-1',
      menu1: true,
      menu2: false,
      save: false,
      menu3: false,
      start_at: null,
      userid: null,
      info: null,
      income: 0,
      caseType: null,
      normalizer(node) {
        return {
          id: node.id,
          label: `${node.fname} ${node.lname}`,
          children: null,
        }
      },
    }
  },
  components: {
    "app-component-1": SchedulingTable,
    "app-component-2": SearchTurns,
    "app-component-3": SurgicalTable,
    SchedulingTable, SearchTurns, SurgicalTable
  },
  mounted() {
    this.$store.dispatch('admin/user/getOrganizationAllUsers', this.userLogin.organization_id)
    this.$store.dispatch('selected/resetSelected')
    this.$store.dispatch('case_types/userWallet/getCaseTypes')
  },
  computed: {
    allUsers() {
      return this.$store.getters['admin/user/getUsers']
    },
    selectedItems() {
      return this.$store.getters['selected/getSelected']
    },
    userLogin() {
      return this.$store.getters['login/getUser']
    },
    user: {
      get() {
        return this.$store.getters['admin/user/getUser']
      },
      set(val) {
        this.$store.commit('admin/user/setUser', null)
      }
    },
    cases() {
      return this.$store.getters['case_types/userWallet/getCases']
    }
  },
  methods: {
    onChange(val) {
      this.start_at = val
    },
    close1() {
      this.save = false
    },
    status1() {
      this.menu1 = true
      this.menu2 = false
      this.menu3 = false
    },
    status2() {
      this.menu1 = false
      this.menu2 = true
      this.menu3 = false
    },
    status3() {
      this.menu1 = false
      this.menu2 = false
      this.menu3 = true
    },
    close() {
      this.open = false
    },
    savePaziresh() {
      this.save = true
    },
    saveAppointment() {
      this.$store.dispatch('doctor/patients/createPaziresh', {
        start_at: this.start_at,
        case_type: this.caseType,
        info: this.info,
        user_id: parseInt(this.userid),
        organization_id: parseInt(this.user.organization_id),
        is_vip: 0,
        income: parseFloat(this.income),
      })
        .then(res => {
          this.$snotify.success('پذیرش با موفقیت ایجاد شد', {
            timeout: 2000,
            showProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true
          })
          this.clean()
          this.open = false;
          this.save = false;
        })
        .catch(async err => {
          this.$snotify.error('متاسفانه خطایی رخ داده است', {
            timeout: 2000,
            showProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true
          })
          this.clean()
        })
    },
    clean() {
      this.user = null
      this.info = null
    },
    async getUser(id) {
      await this.$store.dispatch('admin/user/getUser', id)
    }
  },
  watch: {
    userid() {
      this.getUser(this.userid)
    }
  }
}
</script>

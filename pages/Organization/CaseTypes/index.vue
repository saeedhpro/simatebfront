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
            <div>
              <label>عنوان</label>
              <div class="w-56 h-10 px-2 bg-white border-solid border-gray-901 border rounded-lg">
                <input type="text" class="w-56 h-10 px-2 bg-white border-solid border-gray-901 border rounded-lg"
                       v-model="item.name">
              </div>
            </div>
            <div>
              <label>مدت زمان ویزیت (دقیقه)</label>
              <div class="w-56 h-10 px-2 bg-white border-solid border-gray-901 border rounded-lg">
                <input type="number" class="w-56 h-10 px-2 bg-white border-solid border-gray-901 border rounded-lg"
                       v-model="item.duration">
              </div>
            </div>
            <div class="flex flex-row justify-center items-center">
              <label>دارای محدودیت</label>
              <input type="checkbox" class="w-5 h-5 px-2 bg-white border-solid border-gray-901 border rounded-lg"
                     v-model="item.is_limited">
            </div>
            <div v-if="item.is_limited">
              <label>میزان محدودیت</label>
              <div class="w-56 h-10 bg-white border-solid border-gray-901 border rounded-lg">
                <input type="number" class="w-full h-full px-2 bg-white border-solid border-gray-901 border rounded-lg"
                       v-model="item.limitation">
              </div>
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
          علل مراجعه
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
        <CaseTypeTable/>
      </div>
    </div>
    <vue-snotify></vue-snotify>
  </div>
</template>

<script>
import CaseTypeTable from "@/components/DoctorProfile/CaseTypeTable";

export default {
  name: "index",
  // middleware:'doctor',
  components: {
    CaseTypeTable
  },
  data() {
    return {
      open: false,
      open1: false,
      openMessage: false,
      item: {
        name: null,
        duration: 0,
        is_limited: false,
        limitation: 0,
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
    create() {
      this.$store.dispatch('case_types/userWallet/createCaseType', {
        name: this.item.name,
        duration: parseInt(this.item.duration),
        is_limited: this.item.is_limited,
        limitation: parseInt(this.item.limitation),
        organization_id: parseInt(this.userLogin.organization_id),
      })
      setTimeout(() => {
        this.$store.dispatch('case_types/userWallet/getCaseTypes')
        this.open = false
        this.item = {
          name: null,
          duration: 0,
          is_limited: false,
          limitation: 0,
        }
      }, 100)
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

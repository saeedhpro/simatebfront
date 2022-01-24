<template>
  <div class="overflow-auto">
    <vue-modaltor :visible="openAddModal" @hide="closeModal">
      <template #header>
        <!--    add your custom header     -->
        <div class="pb-3 flex justify-between border-b border-gray-700" style="align-items: center">
          <div class="flex" style="align-items: center">
            <div class="w-5 h-5 p-1 border-solid border-gray-901 border rounded">
              <img src="/img/xmark.svg" @click="close">
            </div>
            <p class="mr-2">فرم پذیرش</p>
          </div>
        </div>
      </template>
      <template #body v-if="item && user">
        <div>
          <div class="flex flex-row">
            <div class="w-full md:w-1/3 flex flex-row">
              <img v-if="user.logo" class="w-25 h-25 rounded-full" :src="user.logo"/>
              <img v-else class="w-25 h-25 rounded-full" src="/img/imgUser.svg"/>
            </div>
            <div class="w-full md:w-2/3 flex flex-row">
              <div class="w-full md:w-1/2 flex flex-col user-details">
                <span>{{ `${user.fname} ${user.lname}` | toPersianNumber }}</span>
                <span>{{ `${user.tel}` | toPersianNumber }}</span>
                <span>{{ item.code | toPersianNumber }}</span>
              </div>
              <div class="w-full md:w-1/2 flex flex-col user-details">
                <span>تاریخ ویزیت: {{
                    $moment(item.start_at.Time).locale("fa").format("dddd DD jMMM") | toPersianNumber
                  }}</span>
                <span>علت مراجعه: {{ item.case_type ? item.case_type : 'معاینه' }}</span>
                <span class="p-2 flex justify-center text-blue-905 bg-gray-906 rounded-md" style="max-width: 120px;"
                      v-if="item.status == 2">پذیرش شده</span>
                <span class="p-2 flex justify-center text-gray-900 bg-gray-903 rounded-md" style="max-width: 120px;"
                      v-else-if="item.status == 4">عدم حضور</span>
                <span class="p-2 flex justify-center text-orange-100 rounded-md" style="max-width: 120px;"
                      v-else-if="item.status == 5">در انتظار</span>
                <span class="p-2 flex justify-center text-orange-100 bg-orange-200 rounded-md" style="max-width: 120px;"
                      v-else-if="item.status == 1">رزرو شده</span>
                <span class="p-2 flex justify-center text-pink-200 bg-red-200 rounded-md" style="max-width: 120px;"
                      v-else-if="item.status == 3">کنسل شده</span>
                <span v-if="user.appcode">کد اپ: {{ user.appcode }}</span>
                <span v-else>کد اپ: <span>غیرفعال</span><button @click="createCode">ایجاد کد جدید</button></span>
              </div>
            </div>
          </div>
          <div class="flex flex-row">
            <div class="flex flex-col">
              <div class="flex flex-col mt-4">
                <span>درخواست پزشک: </span>
                <div class="flex flex-row flex-wrap">
                  <span v-for="(i,n) in cases" class="p-2.5 border-green-200" :key="n">{{ i }}</span>
                </div>
              </div>
            </div>
          </div>
          <div class="flex flex-row">
            <div class="flex flex-col">
              <div class="flex flex-col mt-4">
                <span>توضحات پزشک: </span>
                <span class="p-2.5 border-green-200">{{ item.prescription }}</span>
              </div>
            </div>
          </div>
          <div class="flex flex-row">
            <div class="flex flex-col">
              <div class="flex flex-col mt-4">
                <span>{{ `نتایج ${user.profession ? user.profession.name : '-'}:` }}</span>
                <div class="flex flex-row flex-wrap">
                  <img v-for="(i,n) in logos" :src="i" :key="n" style="max-width: 150px; margin: 5px">
                  <button
                    class="w-40 h-12 px-2 ml-2 text-sm flex border-solid border border-blue-902 rounded-lg text-blue-902 text-center click"
                    @click="openFileChooser"
                    style="align-items: center">
                    <img src="/img/Group%20191.svg" class="w-8 h-8 ml-2">
                    <span class="mx-auto">ارسال نتایج</span>
                  </button>
                </div>
                <input @change="uploadImage" name="logo" type="file" hidden ref="logo" accept="image/*">
              </div>
            </div>
          </div>
        </div>
        <div class="mt-8 flex flex-wrap justify-end">
          <button class="w-28 h-10 py-2 text-center bg-gray-907 rounded-lg" @click="closeModal">بستن</button>
          <button class="w-56 h-10 py-2 mr-3 text-center bg-blue-902 rounded-lg text-white" @click="saveAdd">
            تایید
          </button>
        </div>

      </template>
    </vue-modaltor>
    <div class="flex border-solid border-2 border-gray-901 rounded-t-lg bg-gray-902 minWight ">
      <div class="w-10 py-5 border-l-2 border-gray-901"></div>
      <div class="w-64 py-5 border-l-2 border-gray-901 text-center">بیمار</div>
      <div class="w-32 py-5 border-l-2 border-gray-901 text-center">موبایل</div>
      <div class="w-32 py-5 border-l-2 border-gray-901 text-center">پرونده</div>
      <div class="w-40 py-5 border-l-2 border-gray-901 text-center">تاریخ</div>
      <div class="w-32 py-5 border-l-2 border-gray-901 text-center">ساعت</div>
      <div class="w-64  border-l-2 border-gray-901 text-center">
        <div class="py-2 border-b-2 border-gray-901">ارجاعیات</div>
        <div class="flex justify-center">
          <div class="py-2 w-32 flex border-l-2 border-gray-901 justify-center" style="align-items: center">
            <img src="/img/circle-radiation.svg" class="ml-2">
            رادیولوژی
          </div>
          <div class="py-2 w-32 mx-auto flex justify-center">
            <img src="/img/camera.svg" class="ml-2" style="align-items: center">
            فتوگرافی
          </div>
        </div>
      </div>
      <div class="w-32 py-5 mx-auto text-center">وضعیت</div>
    </div>
    <div class="flex border-b-2 border-l-2 border-r-2 border-gray-901 minWight table-link"
         v-for="(i , n) in listUser">
      <div class="w-10 py-2 border-l-2 border-gray-901 text-center">{{ n + 1 | toPersianNumber }}</div>

      <button class="w-64 py-2 pr-2 flex border-l-2 border-gray-901 text-center" style="align-items: center"

      >
        <input @click="selectItem($event, i.id)" type="checkbox" :checked="isSelected(i.id)">
        <img :src="i.logo" class="w-8 h-8 mx-2 rounded-md" v-if="i.logo">
        <img src="/img/1601734331278.jpg" class="w-8 h-8 mx-2 rounded-md" v-else>
        <span @click="itemClicked(i)">
        {{ i.fname | toPersianNumber }} {{ i.lname | toPersianNumber }}
        </span>
      </button>

      <div class="w-32 py-2 border-l-2 border-gray-901 text-center">{{ i.tel | toPersianNumber }}</div>
      <div class="w-32 py-2 border-l-2 border-gray-901 text-center">
        <span class="p-1 bg-gray-200 rounded">{{ i.file_id | toPersianNumber }}</span>
      </div>
      <div class="w-40 py-2 border-l-2 border-gray-901 text-center">{{
          $moment(i.start_at.Time).format("jYYYY/jMM/jDD") | toPersianNumber
        }}
      </div>
      <div class="w-32 py-2 border-l-2 border-gray-901 text-center">{{
          $moment(i.start_at.Time).format("HH:mm:ss") | toPersianNumber
        }}
      </div>
      <div class="w-64 flex justify-center border-l-2 border-gray-901 text-center">
        <div class="py-2 w-32 flex border-l-2 border-gray-901 justify-center" style="align-items: center">
          <span class="p-2 bg-gray-904 rounded-md" v-if="i.radiology_status == 1 "><img src="/img/blueTik.svg"
                                                                                        class="w-4"/></span>
          <span class="p-2 bg-gray-905 rounded-md" v-else-if="i.radiology_status == 2"><img src="/img/blackTik.svg"
                                                                                            class="w-4"></span>
          <span class="p-2 bg-green-300 rounded-md" v-else-if="i.radiology_status == 3"><img src="/img/greenTik.svg"
                                                                                             class="w-4"></span>
        </div>
        <div class="py-1 w-32 mx-auto flex justify-center">
          <span class="p-2 bg-gray-904 rounded-md" v-if="i.photography_status == 1"><img src="/img/blueTik.svg"
                                                                                         class="w-4"/></span>
          <span class="p-2 bg-gray-905 rounded-md" v-else-if="i.photography_status == 2"><img src="/img/blackTik.svg"
                                                                                              class="w-4"></span>
          <span class="p-2 bg-green-300 rounded-md" v-else-if="i.photography_status == 3"><img src="/img/greenTik.svg"
                                                                                               class="w-4"></span>
        </div>
      </div>
      <div class="w-32 py-2 mx-auto text-center">
        <span class="w-20 px-4 text-blue-905 bg-gray-906 rounded-md" v-if="i.status == 2">پذیرش شده</span>
        <span class="w-20 px-4 text-gray-900 bg-gray-903 rounded-md" v-else-if="i.status == 4">عدم حضور</span>
        <span class="w-20 px-4 text-orange-100 rounded-md" v-else-if="i.status == 5">در انتظار</span>
        <span class="w-20 px-4 text-orange-100 bg-orange-200 rounded-md" v-else-if="i.status == 1">رزرو شده</span>
        <span class="w-20 px-4 text-pink-200 bg-red-200 rounded-md" v-else-if="i.status == 3">کنسل شده</span>
      </div>
    </div>
    <!--    <paginate-->
    <!--      v-model="page"-->
    <!--      :page-count="listUser"-->
    <!--      :page-range="3"-->
    <!--      :margin-pages="2"-->
    <!--      :click-handler="clickCallback"-->
    <!--      :prev-text="'<'"-->
    <!--      :next-text="'>'"-->
    <!--      :container-class="'pagination'"-->
    <!--      :page-class="'page-item'">-->
    <!--    </paginate>-->
  </div>
</template>

<script>
export default {
  name: "TableSearch",
  data() {
    return {
      openAddModal: false,
      open: false,
      menu: false,
      showDelete: false,
      page: 1,
      edit: false,
      biography: false,
      addBiography: false,
      item: null,
      user: null,
      cases: [],
      logos: [],
    }
  },
  mounted() {
    this.$store.dispatch('selected/resetSelected')
    let today = new Date();
    let start_date = ''
    let end_date = ''
    if (this.seeToday()) {
      start_date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate() + " 00:00:00";
      end_date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate() + " 23:59:59";
    }
    this.$router.push({
      path: this.$route.path,
      query: {
        ...this.$route.query,
        start_date: start_date,
        end_date: end_date,
      }
    })
    this.$store.dispatch('doctor/patients/getToday', {
      start_date, end_date, page: this.page, q: this.$route.query.q || null
    })
  },
  computed: {
    selectedItems() {
      return this.$store.getters['selected/getSelected']
    },
    listUser() {
      return this.$store.getters['doctor/patients/getToday']
    },
    userLogin() {
      return this.$store.getters['login/getUser']
    }
  },
  methods: {
    seeToday() {
      const profession = this.userLogin.profession;
      if (profession.id != 1 && profession.id != 2 && profession.id != 3) {
        return true
      }
      return false;
    },
    isSelected(id){
      const item = this.selectedItems.find(i => i.id == id)
      return !!item;
    },
    close() {
      this.open = false
    },
    menu1() {
      this.menu = true
    },
    closeModal() {
      this.openAddModal = !this.openAddModal
    },
    clickCallback(pageNum) {
      console.log(pageNum)
    },
    async getUser(i) {
      this.user = await this.$store.dispatch('admin/user/getUser', i.id)
      this.open = true
    },
    async saveAdd() {
      this.closeModal()
    },
    async itemClicked(item) {
      this.item = item
      this.user = await this.$store.dispatch('admin/user/getUser', item.user_id);
      let cases = this.getCases(item);
      if (this.prof == 1 || this.prof == 3) {
        this.cases = cases.split(",")
      } else if (this.prof != 2) {
        this.cases = [item.prescription]
      } else {
        this.cases = []
      }
      this.closeModal()
    },
    getCases(item) {
      if (this.prof == 1) {
        return item.photography_cases
      } else if (this.prof == 3) {
        return item.radiology_cases
      } else if (this.prof != 2) {
        return item.prescription
      }
    },
    openFileChooser() {
      this.$refs.logo.click();
    },
    uploadImage(e) {
      const logoFile = e.target.files[0];
      if (!logoFile) {
        return
      }
      const formData = new FormData();
      formData.set("file", logoFile)
      this.$store.dispatch("upload/sendResult", {
        id: this.item.id,
        data: formData,
        prof: this.prof
      })
        .then(res => {
          this.getFile(`${res.id}/${res.prof}/${res.name}`)
        })
        .catch(err => {
          console.log(err)
        })
    },
    async getFile(path) {
      const res = await this.$store.dispatch("upload/getResultFile", path)
      this.logos.push(res.url);
    },
    createCode() {
      if (this.item) {
        this.$store.dispatch('upload/createCode', this.item.user_id)
          .then(res => {
            this.user = {
              ...this.user,
              appcode: res,
            }
            this.$store.dispatch('admin/user/changeUserCode', res)
          })
      }
    },
    selectItem(e, id) {
      this.$store.dispatch('selected/updateSelected', {
        checked: e.target.checked,
        id: id,
      })
    }
  },
}
</script>

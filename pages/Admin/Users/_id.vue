<template>
  <div class="container" v-if="getProfile">
    <input @change="uploadLogo" name="logo" type="file" hidden ref="logo" accept="image/*">
    <vue-modaltor :visible="editModal" @hide="editModal=false">
      <template #header>
        <!--    add your custom header     -->
        <div class="pb-3 flex justify-between border-b border-gray-700" style="align-items: center">
          <div class="flex" style="align-items: center">
                       <div class="mr-3 w-5 h-5 p-1 border-solid border-gray-901 border rounded">

              <img src="/static/img/xmark.svg" @click="close">
            </div>
            <p class="mr-2">ویرایش کاربر</p>
          </div>
        </div>
      </template>
      <template #body v-if="getProfile">
        <div class="pt-3 flex flex-wrap justify-between" style="align-items: center">
          <div class="flex align-top" @click="openFileChooser">
            <div>تصویر کاربری</div>
            <img v-if="getProfile.logo" :src="getProfile.logo" class="mr-2 w-36 h-36">
            <img v-else src="/static/img/imgUser.svg" class="mr-2 w-36 h-36">
          </div>
          <div>
            <div class="flex flex-wrap">
              <div>
                <div class="mb-2">نام</div>
                <input class="w-56 h-10 px-2 bg-white border-solid border-gray-901 border rounded-lg"
                       v-model="getProfile.fname"/>
              </div>
              <div class="mr-5">
                <div class="mb-2">نام خانوادگی</div>
                <input class="w-56 h-10 px-2 bg-white border-solid border-gray-901 border rounded-lg"
                       v-model="getProfile.lname"/>
              </div>
            </div>
          </div>
        </div>

        <div class="mt-3 flex flex-wrap justify-between" style="align-items: center">
          <div>
            <div class="mb-2">شماره موبایل</div>
            <input class="w-56 h-10 px-2 bg-white border-solid border-gray-901 border rounded-lg"
                   v-model="getProfile.tel"/>
          </div>
          <div>
            <div class="mb-2">شماره تماس</div>
            <input class="w-56 h-10 px-2 bg-white border-solid border-gray-901 border rounded-lg"
                   v-model="getProfile.tel1"/>
          </div>
          <div class="mr-5">
            <div class="mb-2">کد ملی</div>
            <input class="w-56 h-10 px-2 bg-white border-solid border-gray-901 border rounded-lg"
                   v-model="getProfile.nid"/>
          </div>
        </div>

        <div class="mt-3 flex flex-wrap justify-between" style="align-items: center">
          <div class="md:w-1/3">
            <div class="mb-2">شماره پرونده</div>
            <input class="w-56 h-10 px-2 bg-white border-solid border-gray-901 border rounded-lg"
                   v-model="getProfile.file_id"/>
          </div>
          <div class="mr-5">
            <div class="mb-2">تاریخ تولد</div>
            <!--          <input class="w-56 h-10 px-2 bg-white border-solid border-gray-901 border rounded-lg" v-model="birth_date"/>-->
            <date-picker format="YYYY-MM-DD" display-format="jYYYY/jMM/jDD" :value="getProfile.birth_date"
                         @input="onBirthDateChange"
                         placeholder="تاریخ را انتخاب کنید"></date-picker>

          </div>
        </div>
        <div class="-mx-4 mt-3 flex flex-wrap justify-between" style="align-items: center">
          <div class="md:w-2/3 px-4">
            <div class="mb-2">آدرس محل سکونت</div>
            <textarea class="w-full h-20 bg-white border-solid border-gray-901 border rounded-lg"
                      v-model="getProfile.address"></textarea>
          </div>
        </div>

        <div class="mt-8 flex flex-wrap justify-between">
          <div class="w-28 h-10 py-2 border-solid border border-gray-700 rounded-lg text-gray-700 text-center"
               @click="cleanForm">پاک کردن فرم
          </div>
          <div class="flex" style="align-items: center">
            <button class="w-28 h-10 py-2 text-center bg-gray-907 rounded-lg" @click="close">انصراف</button>
            <button class="w-56 h-10 py-2 mr-3 text-center bg-blue-902 rounded-lg text-white" @click="editUser">ذخیره
            </button>
          </div>
        </div>

      </template>
    </vue-modaltor>
    <div v-if="getProfile"
         class="w-full p-5 flex flex-wrap justify-end bg-white rounded-md shadow-xl border-b-4 border-blue-902"
         style="align-items: center">
      <div class="flex" style="align-items: center">
        <img :src="getProfile.logo" class="w-28 h-28 ml-3" v-if="getProfile.logo">
        <img src="/static/img/img-doc.svg" class="w-28 h-28 ml-3" v-else>
        <div class="flex flex-col">
          <span class="my-2 text-gray-500"> نام و نام خانوادگی : <span class="text-black Bold">{{
              getProfile.fname
            }} {{ getProfile.lname }}</span></span>
          <span class="my-2 text-gray-500">سن : <span class="text-black Bold">{{
              getProfile.birth | toPersianNumber
            }}</span>  </span>
          <span class="my-2 text-gray-500">شماره موبایل : <span class="text-black Bold">{{
              getProfile.tel | toPersianNumber
            }}</span> </span>
          <span class="my-2 text-gray-500">شماره تماس :<span
            class="text-black Bold">{{ getProfile.tel1 | toPersianNumber }}</span>  </span>
          <span class="my-2 text-gray-500">شماره پرونده : <span
            class="text-black Bold">{{ getProfile.file_id | toPersianNumber }}</span>  </span>
        </div>
      </div>
      <div class="mr-auto">
        <div class="flex flex-col">
          <span class="my-2 text-gray-500"> کدملی : <span class="text-black Bold">{{
              getProfile.nid | toPersianNumber
            }}</span></span>
          <span class="my-2 text-gray-500">تاریخ تولد :<span
            class="text-black Bold">
            <span v-if="getProfile.birth_date">
              {{ ($moment(getProfile.birth_date.Time).format('jYYYY/jM/jDD')) | toPersianNumber }}
            </span>
            <span v-else>-</span>
            </span>
          </span>
          <span class="my-2 text-gray-500">آدرس :<span class="text-black Bold">{{ getProfile.address }}</span>  </span>
          <div class="my-4 flex mr-auto justify-end">
            <div @click="openEditModal"
                 class="cursor-pointer w-48 h-9 py-3 px-5 mr-4 text-sm text-center click flex bg-white hover:bg-blue-904 text-center text-gray-700 hover:text-blue-902 border-solid border-2 border-gray-500 hover:border-blue-902 rounded-lg"
                 style="align-items: center">
              <img src="/static/img/pen.svg" class="w-4 ml-3 hh"/>
              <img src="/static/img/pengray.svg" class="w-4 ml-3 hg"/>
              <span class="click">ویرایش اطلاعات</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Profile",
  middleware: "auth",
  layout:'admin',
  data() {
    return {
      editModal: false,
      getProfile: null,
      status: '1',
    }
  },
  async mounted() {
    await this.getUser()
  },
  methods: {
    openEditModal() {
      this.editModal = !this.editModal
    },
    close() {
      this.openEditModal()
    },
    async getUser() {
      const getProfile = await this.$store.dispatch('admin/user/getProfile', this.$route.params.id)
      this.getProfile = {
        ...getProfile,
        fname: getProfile.fname,
        lname: getProfile.lname,
        birth: getProfile.birth,
        birth_date: getProfile.birth_date ? getProfile.birth_date.Time : '',
        tel: getProfile.tel,
        tel1: getProfile.tel1,
        file_id: getProfile.file_id,
        nid: getProfile.nid,
        address: getProfile.address,
        logo: getProfile.logo,
        organization_name: getProfile.organization_name,
      }
    },
    editUser() {
      this.$store.dispatch('admin/user/editUser', this.getProfile)
        .then(() => {
          this.openEditModal()
          setTimeout(async () => {
            window.location.reload()
          }, 200)
        })
    },
    cleanForm() {

    },
    onBirthDateChange(val) {
      this.getProfile.birth_date = val
    },
    setMale() {
      this.status = '1';
      this.getProfile.gender = 'male'
    },
    setFemale() {
      this.status = '2';
      this.getProfile.gender = 'female'
    },
    openFileChooser() {
      this.$refs.logo.click();
    },
    uploadLogo(e) {
      const logoFile = e.target.files[0];
      if (!logoFile) {
        return
      }
      const formData = new FormData();
      formData.set("file", logoFile)
      this.$store.dispatch("upload/logo", formData)
        .then(res => {
          this.getFile(`${res.id}/${res.name}`)
        })
        .catch(err => {
          console.log(err)
        })
    },
    async getFile(path) {
      const res = await this.$store.dispatch("upload/getFile", path)
      this.getProfile.logo = res.url;
    },
  }
}
</script>

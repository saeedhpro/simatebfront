<template>
  <div class="container">
    <vue-modaltor :visible="open" @hide="open=false">
      <template #header class="bg-gray-901">
        <!--    add your custom header     -->
        <div class="pb-3 flex justify-between border-b border-gray-700" style="align-items: center">
          <div class="flex" style="align-items: center">
            <div class="w-5 h-5 p-1 border-solid border-gray-901 border rounded">
              <img src="/img/xmark.svg" @click="close">
            </div>
            <p class="mr-2">افزودن کاربر</p>
          </div>
          <div>
            ثبت در سیستم توسط: <span v-if="userLogin">{{ userLogin.fname }} {{ userLogin.lname }}</span>
            ({{ $moment(userLogin.created).format("HH:mm:ss jYYYY/jM/jDD") }})
          </div>
        </div>
      </template>
      <template #body>
        <div class="pt-3 flex flex-wrap justify-between" style="align-items: center">
          <div @click="openFileChooser" class="flex align-top">
            <div>تصویر کاربری</div>
            <input @change="uploadLogo" name="logo" type="file" hidden ref="logo" accept="image/*">
            <img v-if="!logo" src="/img/imgUser.svg" class="mr-2 w-36 h-36">
            <img v-else :src="logo" class="mr-2 w-36 h-36">
          </div>
          <div>
            <div class="flex flex-wrap">
              <div>
                <div class="mb-2">نام</div>
                <input class="w-56 h-10 px-2 bg-white border-solid border-gray-901 border rounded-lg" v-model="fname"/>
              </div>
              <div class="mr-5">
                <div class="mb-2">نام خانوادگی</div>
                <input class="w-56 h-10 px-2 bg-white border-solid border-gray-901 border rounded-lg" v-model="lname"/>
              </div>
            </div>
            <div class="mt-5 flex flex-wrap">
              <div>
                <div class="mb-2">توضیحات</div>
                <input class="w-56 h-10 px-2 bg-white border-solid border-gray-901 border rounded-lg" v-model="info"/>
              </div>
              <div class="mr-5">
                <div class="mb-2">جنسیت</div>
                <div class="flex justify-right">
                  <div
                    class="w-28 h-10 px-2 py-2 flex text-center  rounded-lg border-l-2 bg-gray-902 text-sm click cursor-pointer"
                    style="align-items: center"
                    @click="setMale" :class="{'selectedBlue' : status === '1'}">
                    <img src="/img/man.svg.svg" class="w-8 h-8 ml-2" v-if="status === 'male'"/>
                    <img src="/img/manGray.svg" class="w-8 h-8 ml-2" v-else/>
                    <span class="mx-auto">آقا</span>
                  </div>
                  <div
                    class="w-28 h-10 px-2 py-2 mr-5 flex text-center  rounded-lg border-l-2 bg-gray-902 text-sm click cursor-pointer"
                    style="align-items: center"
                    @click="setFemale" :class="{'selectedBlue' : status === '2'}">
                    <img src="/img/womanBlue.svg" class="w-8 h-8 ml-2" v-if="status === 'female'"/>
                    <img src="/img/woman.svg" class="w-8 h-8 ml-2" v-else/>
                    <span class="mx-auto">خانم</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="mt-3 flex flex-wrap justify-between" style="align-items: center">
          <!--          <div>-->
          <!--            <div class="mb-2">گروه</div>-->
          <!--            <select class="w-56 h-10 px-2 bg-white border-solid border-gray-901 border rounded-lg" v-model="user_group_id">-->
          <!--              <option value="1">بیمار</option>-->
          <!--              <option value="2">منشی پزشک</option>-->
          <!--            </select>-->
          <!--          </div>-->
          <!--          <div>-->
          <!--            <div class="mb-2">موسسه</div>-->
          <!--            <select class="w-56 h-10 px-2 bg-white border-solid border-gray-901 border rounded-lg" v-model="organization_id">-->
          <!--              <option v-for="i in institutionList" :value="i.id" >{{i.name}}</option>-->
          <!--            </select>-->
          <!--          </div>-->
        </div>

        <div class="mt-3 flex flex-wrap justify-between" style="align-items: center">
          <div>
            <div class="mb-2">شماره موبایل</div>
            <input class="w-56 h-10 px-2 bg-white border-solid border-gray-901 border rounded-lg" v-model="tel"/>
          </div>
          <div>
            <div class="mb-2">شماره تماس</div>
            <input class="w-56 h-10 px-2 bg-white border-solid border-gray-901 border rounded-lg" v-model="tel1"/>
          </div>
          <div class="mr-5">
            <div class="mb-2">کد ملی</div>
            <input class="w-56 h-10 px-2 bg-white border-solid border-gray-901 border rounded-lg" v-model="nid"/>
          </div>
        </div>

        <div class="-mx-4 mt-3 flex flex-wrap justify-between" style="align-items: center">
          <div class="mr-5">
            <div class="mb-2">تاریخ تولد</div>
            <!--          <input class="w-56 h-10 px-2 bg-white border-solid border-gray-901 border rounded-lg" v-model="birth_date"/>-->
            <div class="w-56 h-10 px-2 bg-white border-solid border-gray-901 border rounded-lg">
              <date-picker format="YYYY-MM-DD" display-format="jYYYY/jMM/jDD" :value="birth_date" @input="onChange"
                           placeholder="تاریخ را انتخاب کنید"></date-picker>
            </div>
          </div>
          <div class="md:w-1/3 px-4">
            <div class="mb-2">شماره پرونده</div>
            <input class="w-56 h-10 px-2 bg-white border-solid border-gray-901 border rounded-lg" v-model="file_id"/>
          </div>

        </div>
        <div>
          <div class="my-2">آدرس محل سکونت</div>
          <input class="w-full h-10 px-4 bg-white border-solid border-gray-901 border rounded-lg" v-model="address"/>
        </div>

        <div class="mt-3 flex flex-wrap justify-between" style="align-items: center" v-if="user_group_id == 1">
          <div class="w-full">
            <div class="mb-2">شرح حال</div>
            <textarea class="w-full h-10 bg-white border-solid border-gray-901 border rounded-lg"
                      v-model="description"></textarea>
          </div>
        </div>

        <div class="mt-3 flex flex-wrap justify-between" style="align-items: center">
          <div class="mr-3">
            <div class="mb-2">سابقه جراحی</div>
            <div class="flex" style="align-items: center">
              <div class="flex" style="align-items: center">
                <input type="radio" class="w-5 h-5 bg-white border-solid border-gray-901 border rounded-lg"
                       v-model="relation" value="'فک'"/>
                <span class="mr-1">فک</span>
              </div>
              <div class="mx-3 flex" style="align-items: center">
                <input type="radio" class="w-5 h-5 bg-white border-solid border-gray-901 border rounded-lg"
                       v-model="relation" value="'بینی'"/>
                <span class="mr-1">بینی</span>
              </div>
              <div class="flex" style="align-items: center">
                <input type="radio" class="w-5 h-5 bg-white border-solid border-gray-901 border rounded-lg"
                       v-model="relation" value="'غیره'"/>
                <span class="mr-1">غیره</span>
              </div>
            </div>
          </div>
          <div class="flex flex-wrap" style="align-items: center">
            <div>
              <div class="mb-2">معرف</div>
              <input class="w-56 h-10 px-2 bg-white border-solid border-gray-901 border rounded-lg"
                     v-model="introducer"/>
            </div>
            <div class="mr-3">
              <div class="mb-2">هزینه درمان</div>
              <input class="w-56 h-10 px-2 bg-white border-solid border-gray-901 border rounded-lg" v-model="income"/>
            </div>
          </div>
        </div>

        <div class="mt-8 flex flex-wrap justify-between">
          <div class="w-28 h-10 py-2 border-solid border border-gray-700 rounded-lg text-gray-700 text-center"
               @click="cleanForm">پاک کردن فرم
          </div>
          <div class="flex" style="align-items: center">
            <button class="w-28 h-10 py-2 text-center bg-gray-907 rounded-lg" @click="close">انصراف</button>
            <button class="w-56 h-10 py-2 mr-3 text-center bg-blue-902 rounded-lg text-white" @click="addUser">ذخیره
            </button>
          </div>
        </div>

      </template>
    </vue-modaltor>
    <div class="flex flex-wrap justify-between">
      <div class="px-6 py-2 flex bg-white text-blue-902 rounded-lg shadow-md text-sm click"
           style="align-items: center">
        <img src="/img/bim.svg" class="ml-2 w-8">
        بیماران
      </div>
      <img src="/img/Line%2041-2.svg" class="md:flex hidden mx-3" style="width: 926px">
      <!--      <div class="py-3 px-4 border-solid border-2 border-gray-901 rounded-lg text-blue-901 text-sm">امروز شنبه ۱۹ تیر</div>-->

      <button class="w-36 h-12 px-2 text-sm flex bg-blue-902 rounded-lg text-white text-center click"
              @click="open=true"
              style="align-items: center">
        <div class="w-8 h-8 p-2 ml-4 bg-blue-903 rounded-lg text-center">
          <img src="/img/user-plus.svg">
        </div>
        <span>بیمار جدید</span>
      </button>

    </div>
    <div class="py-5 px-10 my-5 bg-white rounded-lg">
      <div class="mb-10 flex flex-wrap justify-between">
        <div class="flex" style="align-items: center">
          <div>
            <input type="checkbox"
                   v-model="selectAll"
                   class="w-5 h-5 mt-2 border-solid border-2 border-gray-901 rounded-xl hover:border-gray-400">
          </div>
          <div class="mx-3">
            <div class="relative inline-flex" style="direction: ltr">
              <svg class="w-2 h-2 absolute top-0 right-0 m-4 pointer-events-none" xmlns="http://www.w3.org/2000/svg"
                   viewBox="0 0 412 232">
                <path
                  d="M206 171.144L42.678 7.822c-9.763-9.763-25.592-9.763-35.355 0-9.763 9.764-9.763 25.592 0 35.355l181 181c4.88 4.882 11.279 7.323 17.677 7.323s12.796-2.441 17.678-7.322l181-181c9.763-9.764 9.763-25.592 0-35.355-9.763-9.763-25.592-9.763-35.355 0L206 171.144z"
                  fill="#648299" fill-rule="nonzero"/>
              </svg>
              <select
                v-model="act"
                class="border border-gray-500 rounded-lg text-gray-600 h-12 w-40 pl-5 pr-2 bg-white hover:border-gray-400 focus:outline-none appearance-none">
                <option value="1">حذف</option>
              </select>
            </div>
          </div>
          <div @click="doAction"
               class="cursor-pointer w-24 h-12 py-3 bg-gray-100 text-sm text-center text-black border-gray-901 border-solid border-2 rounded-lg">
            انجام بده
          </div>
        </div>
        <div>
          <SearchDoctorP/>
        </div>
      </div>
      <PatientsTable/>
    </div>

  </div>
</template>

<script>
import PatientsTable from "@/components/DoctorProfile/PatientsTable";
import SearchDoctorP from "@/components/DoctorProfile/Patients/SearchDoctorP";

export default {
  name: "index",
  middleware: 'auth',
  components: {PatientsTable, SearchDoctorP},
  data() {
    return {
      open: false,
      status: '1',
      lname: null,
      fname: null,
      info: null,
      gender: 'male',
      user_group_id: 1,
      organization_id: null,
      tel: null,
      nid: null,
      birth_date: null,
      address: null,
      introducer: null,
      email: null,
      password: null,
      income: 0,
      file_id: null,
      tel1: null,
      description: null,
      logo: null,
      relation: null,
      logoFile: null,
      act: null,
    }
  },
  methods: {
    close() {
      this.open = false
    },
    addUser() {
      this.$store.dispatch('admin/user/addUser', {
        fname: this.fname,
        lname: this.lname,
        info: this.info,
        user_group_id: this.user_group_id,
        gender: this.gender,
        organization_id: parseInt(this.userLogin.organization_id),
        tel: this.tel,
        nid: this.nid,
        birth_date: this.birth_date,
        address: this.address,
        introducer: this.introducer,
        email: this.email,
        password: this.password,
        file_id: this.file_id,
        tel1: this.tel1,
        description: this.description,
        relation: this.relation,
        logo: this.logo
      })
        .then(res => {
          this.$snotify.success('بیمار با موفقیت ثبت شد', {
            timeout: 2000,
            showProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true
          })
          this.close()
          this.getResults(this.$route.query.page || 1)
        })
        .catch(async err => {
          console.log(err, 'add user error')
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
    cleanForm() {
      this.fname = null
      this.lname = null
      this.info = null
      this.gender = null
      this.organization_id = null
      this.tel = null
      this.nid = null
      this.birth_date = null
      this.address = null
      this.introducer = null
      this.email = null
      this.password = null
      this.file_id = null
      this.tel1 = null
      this.description = null
      this.relation = null
    },
    onChange(val) {
      this.birth_date = val
    },
    doAction() {
      switch (this.act) {
        case 1:
        case '1':
          this.deleteItems();
          break;
        default:
          return;
      }
    },
    deleteItems() {
      if (this.selectedItems.length === 0) {
        return;
      }
      this.$store.dispatch('admin/user/deleteUsers', this.selectedItems)
        .then(() => {
          this.getResults(this.$route.query.page || 1)
        })
        .catch(err => {
          console.log(err)
          alert('انجام نشد!')
        })
    },
    getResults(page = 1) {
      let r = "/api/v1/organizations/"
      r += `${this.userLogin.organization_id}/users?page=${page}&group=1`
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
      this.logo = res.url;
    },
    setMale() {
      this.status = '1';
      this.gender = 'male'
    },
    setFemale() {
      this.status = '2';
      this.gender = 'female'
    },
    selectItem(checked, id) {
      this.$store.dispatch('selected/updateSelected', {
        checked: checked,
        id: id,
      })
    },
  },
  computed: {
    selectAll: {
      get() {
        return this.userList ? this.selectedItems.length == this.userList.data.length : false;
      },
      set(val) {
        if (this.userList) {
          const self = this
          this.userList.data.forEach(function (user) {
            self.selectItem(val, user.id)
          });
        }
      }
    },
    userList() {
      return this.$store.getters['doctor/patients/getPatients']
    },
    institutionList() {
      return this.$store.getters['admin/user/getInstitutionList']
    },
    userLogin() {
      return this.$store.getters['login/getUser']
    },
    selectedItems() {
      return this.$store.getters['selected/getSelected']
    },
  }
}
</script>

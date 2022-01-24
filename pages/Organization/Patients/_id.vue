<template>
  <div class="container">
    <input @change="uploadLogo" name="logo" type="file" hidden ref="logo" accept="image/*">
    <vue-modaltor :visible="editUserModal" @hide="editUserModal=false">
      <template #header>
        <!--    add your custom header     -->
        <div class="pb-3 flex justify-between border-b border-gray-700" style="align-items: center">
          <div class="flex" style="align-items: center">
            <div class="w-5 h-5 p-1 border-solid border-gray-901 border rounded">
              <img src="/img/xmark.svg" @click="closeEditUser">
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
            <img v-else src="/img/imgUser.svg" class="mr-2 w-36 h-36">
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
            <div class="mt-5 flex flex-wrap">
              <div>
                <div class="mb-2">توضیحات</div>
                <input class="w-56 h-10 px-2 bg-white border-solid border-gray-901 border rounded-lg"
                       v-model="getProfile.info"/>
              </div>
              <div class="mr-5">
                <div class="mb-2">جنسیت</div>
                <div class="flex justify-right">
                  <div class="w-28 h-10 px-2 py-2 flex text-center  rounded-lg border-l-2 bg-gray-902 text-sm click"
                       style="align-items: center"
                       @click="setMale" :class="{'selectedBlue' : status === '1'}">
                    <img src="/img/man.svg.svg" class="w-8 h-8 ml-2" v-if="status === 'male'"/>
                    <img src="/img/manGray.svg" class="w-8 h-8 ml-2" v-else/>
                    <span class="mx-auto">آقا</span>
                  </div>
                  <div
                    class="w-28 h-10 px-2 py-2 mr-5 flex text-center  rounded-lg border-l-2 bg-gray-902 text-sm click"
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
          <div>
            <div class="mb-2">گروه</div>
            <select class="w-56 h-10 px-2 bg-white border-solid border-gray-901 border rounded-lg"
                    v-model="getProfile.user_group_id">
              <option value="1">بیمار</option>
              <option value="2" v-if="isAdmin">مدیر سیستم</option>
              <option value="3" v-if="isAdmin">پزشک</option>
              <option value="4">منشی پزشک</option>
              <option value="5" v-if="isAdmin">مسئول آزمایشگاه</option>
              <option value="100" v-if="isAdmin">پشتیبان فنی سیستم</option>
            </select>
          </div>
          <div>
            <div class="mb-2">موسسه</div>
            {{ getProfile.organization_name }}
          </div>
          <div>
            <div class="mb-2">شماره موبایل</div>
            <input class="w-56 h-10 px-2 bg-white border-solid border-gray-901 border rounded-lg"
                   v-model="getProfile.tel"/>
          </div>
        </div>

        <div class="mt-3 flex flex-wrap justify-between" style="align-items: center">
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
          <div class="mr-5">
            <div class="mb-2">تاریخ تولد</div>
            <!--          <input class="w-56 h-10 px-2 bg-white border-solid border-gray-901 border rounded-lg" v-model="birth_date"/>-->
            <date-picker format="YYYY-MM-DD" display-format="jYYYY/jMM/jDD" :value="getProfile.birth_date"
                         @input="onBirthDateChange"
                         placeholder="تاریخ را انتخاب کنید"></date-picker>

          </div>
        </div>

        <div class="-mx-4 mt-3 flex flex-wrap justify-between" style="align-items: center">
          <div class="md:w-1/3 px-4">
            <div class="mb-2">شماره پرونده</div>
            <input class="w-56 h-10 px-2 bg-white border-solid border-gray-901 border rounded-lg"
                   v-model="getProfile.file_id"/>
          </div>
          <div class="md:w-2/3 px-4">
            <div class="mb-2">آدرس محل سکونت</div>
            <input class="w-full h-10 bg-white border-solid border-gray-901 border rounded-lg"
                   v-model="getProfile.address"/>
          </div>
        </div>

        <div class="mt-3 flex flex-wrap justify-between" style="align-items: center"
             v-if="getProfile.user_group_id == 1">
          <div class="w-full">
            <div class="mb-2">شرح حال</div>
            <textarea class="w-full h-10 bg-white border-solid border-gray-901 border rounded-lg"
                      v-model="getProfile.description"></textarea>
          </div>
        </div>

        <div class="mt-3 flex flex-wrap justify-between" style="align-items: center">
          <div class="mr-5" v-if="getProfile.user_group_id == 1">
            <div class="mb-2">سابقه جراحی</div>
            <div class="flex" style="align-items: center">
              <div class="flex" style="align-items: center">
                <input type="radio" class="w-5 h-5 bg-white border-solid border-gray-901 border rounded-lg"
                       v-model="getProfile.relation" value="'فک'"/>
                <span class="mr-1">فک</span>
              </div>
              <div class="mx-3 flex" style="align-items: center">
                <input type="radio" class="w-5 h-5 bg-white border-solid border-gray-901 border rounded-lg"
                       v-model="getProfile.relation" value="'بینی'"/>
                <span class="mr-1">بینی</span>
              </div>
              <div class="flex" style="align-items: center">
                <input type="radio" class="w-5 h-5 bg-white border-solid border-gray-901 border rounded-lg"
                       v-model="getProfile.relation" value="'غیره'"/>
                <span class="mr-1">غیره</span>
              </div>
            </div>
          </div>
          <div class="flex flex-wrap" style="align-items: center">
            <div>
              <div class="mb-2">معرف</div>
              <input class="w-56 h-10 px-2 bg-white border-solid border-gray-901 border rounded-lg"
                     v-model="getProfile.introducer"/>
            </div>
            <div class="mr-3">
              <div class="mb-2">رمز ورود</div>
              <input class="w-56 h-10 px-2 bg-white border-solid border-gray-901 border rounded-lg"
                     v-model="getProfile.password"/>
            </div>
          </div>
        </div>

        <div class="mt-8 flex flex-wrap justify-between">
          <div class="w-28 h-10 py-2 border-solid border border-gray-700 rounded-lg text-gray-700 text-center"
               @click="cleanForm">پاک کردن فرم
          </div>
          <div class="flex" style="align-items: center">
            <button class="w-28 h-10 py-2 text-center bg-gray-907 rounded-lg" @click="closeEditUser">انصراف</button>
            <button class="w-56 h-10 py-2 mr-3 text-center bg-blue-902 rounded-lg text-white" @click="addUser">ذخیره
            </button>
          </div>
        </div>

      </template>
    </vue-modaltor>

    <vue-modaltor :visible="open" @hide="open=false">
      <template #body>
        <!--    add your custom header     -->
        <div class="pb-3" style="align-items: center">
          <div class="w-5 h-5 p-1 border-solid border-gray-901 border rounded">
            <img src="/img/xmark.svg" @click="close">
          </div>
          <div class="text-center Bold text-lg">لطفا در انجام این عمل دقت کنید!</div>
          <div class="my-4 text-sm text-center text-blue-907">همه سوابق و مشخصات بیمار حذف خواهند شد و قابل بازگشت
            نیستند
          </div>
          <div class="-mx-2 flex justify-between">
            <div class="px-2 w-1/2">
              <button class="w-full h-10 text-center bg-gray-907 text-gray-900 rounded-lg text-sm" @click="deleteUser">
                ادامه بده
              </button>
            </div>
            <div class="px-2 w-1/2">
              <button class="w-full h-10  text-center text-white rounded-lg bg-blue-902" @click="close">انصراف</button>
            </div>
          </div>
        </div>
      </template>

    </vue-modaltor>
    <vue-modaltor :visible="open1" @hide="open1=false">
      <template #body>
        <!--    add your custom header     -->
        <div class="pb-3" style="align-items: center">
          <div class="w-5 h-5 p-1 border-solid border-gray-901 border rounded">
            <img src="/img/xmark.svg" @click="close">
          </div>
          <div class="text-center Bold text-lg">حذف کاربر</div>
          <div class="my-4 text-sm text-center text-blue-907">آیا از حذف کردن این کاربر اطمینان دارید؟ لطفا دقت کنید که
            پس از حذف، اطلاعات کاربر قابل بازگشت نیست
          </div>
          <div class="-mx-2 flex justify-between">
            <div class="px-2 w-1/2">
              <button class="w-full h-10 text-center bg-gray-907 text-gray-900 rounded-lg text-sm" @click="close1">
                انصراف
              </button>
            </div>
            <div class="px-2 w-1/2">
              <button class="w-full h-10 text-center bg-pink-200 text-white rounded-lg text-sm"
                      @click="deleteUser(user.id)">بله، حذف کن
              </button>
            </div>
          </div>
        </div>
      </template>

    </vue-modaltor>

    <vue-modaltor :visible="open11" @hide="open11=false">
      <template #header class="bg-gray-901" v-if="user">
        <!--    add your custom header     -->
        <div class="pb-3 flex justify-between border-b border-gray-700" style="align-items: center">
          <div class="flex" style="align-items: center">
            <div class="w-5 h-5 p-1 border-solid border-gray-901 border rounded">
              <img src="/img/xmark.svg" @click="close">
            </div>
            <p class="mr-2">تاریخچه درمان</p>
          </div>
          <div class="flex" style="align-items: center">
            {{ `${user.fname} ${user.lname}` }}
          </div>
        </div>
      </template>
      <template #body>

        <div class="my-5">
          <div class=" my-5 flex flex-wrap justify-between" style="align-items: center">

            <button @click="menuStatus41"
                    class="h-12 px-4 mx-5 flex text-sm bg-white shadow-md text-center text-md rounded-lg click"
                    style="align-items: center"
                    :class="{'selectedBlue' : menu41 === true}">
              <span>Medical Condition</span>
            </button>

            <button @click="menuStatus31"
                    class="h-12 px-4 mx-5 flex text-sm bg-white shadow-md text-center text-md rounded-lg click"
                    style="align-items: center"
                    :class="{'selectedBlue' : menu31 === true}">
              <span>Dental Examination</span>
            </button>

            <button @click="menuStatus21"
                    class="h-12 px-4 mx-5 flex text-sm bg-white shadow-md text-center text-md rounded-lg click"
                    style="align-items: center"
                    :class="{'selectedBlue' : menu21 === true}">
              <span>Occlusal Examination</span>
            </button>

            <button @click="menuStatus11"
                    class="h-12 px-4 mx-5 flex text-sm bg-white shadow-md text-center text-md rounded-lg click"
                    style="align-items: center"
                    :class="{'selectedBlue' : menu11 === true}">
              <span>Treatment</span>
            </button>

          </div>

          <div>
            <div v-if="menu11">
              <Treatment @changed="onChanged" :histories="histories"/>
            </div>
            <div v-if="menu21">
              <OcclusalExamination @changed="onChanged" :histories="histories"/>
            </div>
            <div v-if="menu31">
              <DentalExamination @changed="onChanged" :histories="histories"/>
            </div>
            <div v-if="menu41">
              <MedicalCondition @changed="onChanged" :histories="histories"/>
            </div>
          </div>

        </div>

        <div class="mt-8 flex flex-wrap justify-between">
          <div class="w-28 h-10 py-2 border-solid border border-gray-700 rounded-lg text-gray-700 text-center"
               @click="cleanForm">پاک کردن فرم
          </div>
          <div class="flex" style="align-items: center">
            <button class="w-28 h-10 py-2 text-center bg-gray-907 rounded-lg" @click="open11 = false">انصراف</button>
            <button class="w-56 h-10 py-2 mr-3 text-center bg-blue-902 rounded-lg text-white"
                    @click="saveMedicalHistory">ذخیره
            </button>
          </div>
        </div>

      </template>
    </vue-modaltor>

    <div v-if="user">
      <div
        class="w-full pb-0 px-3 pt-3 flex flex-wrap justify-end bg-white rounded-md shadow-xl border-b-4 border-blue-902"
        style="align-items: center">
        <div class="my-5 flex" style="align-items: center">
          <img src="/img/img-doc1.svg" class="w-28 h-28 ml-3">
          <div class="flex flex-col">
          <span style="align-items: center">
            <span
              class="px-2 border-l-2 border-gray-901">{{ user.fname | toPersianNumber }} {{
                user.lname | toPersianNumber
              }}</span>
              <span class="px-2 text-sm">پرونده</span>
              <span class="p-2 w-10 h-10 rounded-lg bg-gray-901">{{ user.file_id | toPersianNumber }}</span>
            </span>
            <span class="my-5 mr-2">{{ user.tel | toPersianNumber }}</span>
            <span style="align-items: center">
            <span class="px-2 border-l-2 border-gray-901">{{ user.organization_name | toPersianNumber }}</span>
              <span
                class="px-3 py-1 w-10 h-10 text-sm rounded-lg bg-gray-901">{{ user.user_group_name | toPersianNumber }}</span>
            </span>
          </div>
        </div>
        <div class="mr-auto">
          <div class="mb-2 text-sm">توضیحات</div>
          <div class="text-sm" style="max-width: 629px">{{ user.description }}</div>
          <div class="my-6 flex mr-auto justify-end">
            <div class="relative">
              <button class="w-10 h-9 pb-1 text-center border-solid border-2 border-gray-500 text-gray-500 rounded-lg"
                      @click="showDelete =! showDelete ">...
              </button>
              <button
                class="py-1 w-28 h-10 mt-9 -mr-28 text-sm absolute border-solid border-2 border-gray-500 hover:border-pink-200 rounded-lg text-gray-700 hover:text-pink-200 bg-white hover:bg-pink-300 text-center"
                v-if="showDelete"
                @click="deleteUserPop">
                حذف کاربر
              </button>
            </div>

            <button
              @click="openHistoryModal"
              class="w-48 h-9 py-3 px-5 mr-4 text-sm text-center click flex bg-white hover:bg-blue-904 text-center text-gray-700 hover:text-blue-902 border-solid border-2 border-gray-500 hover:border-blue-902 rounded-lg"
              style="align-items: center">
              <img src="/img/pen.svg" class="w-4 ml-3 hh"/>
              <img src="/img/address-card.svg" class="w-4 ml-3 hg"/>
              <span class="click">تاریخچه درمانی</span>
            </button>

            <button
              @click="openEditUser"
              class="w-48 h-9 py-3 px-5 mr-4 text-sm text-center click flex bg-white hover:bg-blue-904 text-center text-gray-700 hover:text-blue-902 border-solid border-2 border-gray-500 hover:border-blue-902 rounded-lg"
              style="align-items: center">
              <img src="/img/pen.svg" class="w-4 ml-3 hh"/>
              <img src="/img/pengray.svg" class="w-4 ml-3 hg"/>
              <span class="click">ویرایش اطلاعات</span>
            </button>

          </div>
        </div>
      </div>

      <div class="mt-8 mb-3 px-5 flex justify-start">

        <button @click="menuStatus1"
                class="h-12 px-4 mx-5 flex text-sm bg-white shadow-md text-center text-md rounded-lg click"
                style="align-items: center"
                :class="{'selectedBlue' : menu1 === true}">
          <img src="/img/GroupPicBlue.svg" class="ml-3 w-7" v-if="menu1">
          <img src="/img/GroupPic.svg" class="ml-3 w-7" v-else>
          <span>لیست پذیرش</span>
        </button>

        <button
          v-if="canShow('radio')"
          @click="menuStatus2"
          class="h-12 px-4 mx-5 flex text-sm bg-white shadow-md text-center text-md rounded-lg click"
          style="align-items: center"
          :class="{'selectedBlue' : menu2 === true}">
          <img src="/img/GroupPicBlue.svg" class="ml-3 w-7" v-if="menu2">
          <img src="/img/GroupPic.svg" class="ml-3 w-7" v-else>
          <span>نتایج رادیولوژی</span>
        </button>

        <button
          v-if="canShow('photo')"
          @click="menuStatus3"
          class="h-12 px-4 mx-5 flex text-sm bg-white shadow-md text-center text-md rounded-lg click"
          style="align-items: center"
          :class="{'selectedBlue' : menu3 === true}">
          <img src="/img/GroupPicBlue.svg" class="ml-3 w-7" v-if="menu3">
          <img src="/img/GroupPic.svg" class="ml-3 w-7" v-else>
          <span>نتایج فتوگرافی</span>
        </button>

        <button
          v-if="canShow('doc')"
          @click="menuStatus4"
          class="h-12 px-4 mx-5 flex text-sm bg-white shadow-md text-center text-md rounded-lg click"
          style="align-items: center"
          :class="{'selectedBlue' : menu4 === true}">
          <img src="/img/GroupPicBlue.svg" class="ml-3 w-7" v-if="menu4">
          <img src="/img/GroupPic.svg" class="ml-3 w-7" v-else>
          <span>ارسال مستندات</span>
        </button>

        <button
          v-if="canShow('pay')"
          @click="menuStatus5"
          class="h-12 px-4 mx-5 flex text-sm bg-white shadow-md text-center text-md rounded-lg click"
          style="align-items: center"
          :class="{'selectedBlue' : menu5 === true}">
          <img src="/img/GroupPicBlue.svg" class="ml-3 w-7" v-if="menu5">
          <img src="/img/GroupPic.svg" class="ml-3 w-7" v-else>
          <span>پرداخت</span>
        </button>


      </div>
      <div v-if="menu1">
        <PazereshList/>
      </div>
      <div v-if="menu2">
        <ResultRadiology/>
      </div>
      <div v-if="menu3">
        <ResultPhotography/>
      </div>
      <div v-if="menu4">
        <SendDocumentation/>
      </div>
      <div v-if="menu5">
        <Payments/>
      </div>

    </div>
  </div>
</template>

<script>
import PazereshList from "@/components/DoctorProfile/Patients/PazereshList";
import SendDocumentation from "@/components/DoctorProfile/Patients/SendDocumentation";
import Payments from "@/components/DoctorProfile/Patients/Payments";
import ResultPhotography from "@/components/DoctorProfile/Patients/ResultPhotography";
import ResultRadiology from "@/components/DoctorProfile/Patients/ResultRadiology";
import Treatment from "../../../components/TreatmentHistory/Treatment";
import OcclusalExamination from "../../../components/TreatmentHistory/OcclusalExamination";
import DentalExamination from "../../../components/TreatmentHistory/DentalExamination";
import MedicalCondition from "../../../components/TreatmentHistory/MedicalCondition";

export default {
  name: "Patient",
  middleware: 'auth',
  data() {
    return {
      open11: false,
      menu11: true,
      menu21: false,
      menu31: false,
      menu41: false,
      menu51: false,
      menu1: true,
      editUserModal: false,
      menu2: false,
      menu3: false,
      menu4: false,
      menu5: false,
      showDelete: false,
      open: false,
      open1: false,
      editUser: {},
      getProfile: null,
      status: '1',
      gender: 'male',
    }
  },
  components: {
    ResultPhotography,
    MedicalCondition,
    DentalExamination,
    OcclusalExamination,
    Treatment,
    PazereshList,
    ResultRadiology,
    SendDocumentation,
    Payments
  },
  mounted() {
    this.getUser()
    this.$store.dispatch('medical_histories/userWallet/getUserHistories', this.$route.params.id)
  },
  computed: {
    user() {
      return this.$store.getters['admin/user/getUser']
    },
    userLogin() {
      return this.$store.getters['login/getUser']
    },
    histories() {
      return this.$store.getters['medical_histories/userWallet/getUserHistories']
    },
    isAdmin() {
      const profession = this.userLogin.profession;
      return profession.id == 2;
    }
  },
  methods: {
    onChanged(item) {
      const h = {
        ...this.histories,
        ...item
      }
      this.$store.dispatch('medical_histories/userWallet/setUserHistories', h)
    },
    getUser() {
      this.$store.dispatch('admin/user/getUser', this.$route.params.id)
    },
    onBirthDateChange(val) {
      this.editUser.birth_date = val
    },
    async openEditUser() {
      this.editUserModal = !this.editUserModal
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
    async closeEditUser() {
      this.editUserModal = false
      this.getProfile = null
    },
    cleanForm() {

    },
    addUser() {
      this.$store.dispatch('admin/user/editUser', this.getProfile)
        .then(() => {
          this.editUserModal = !this.editUserModal
          setTimeout(async () => {
            window.location.reload()
          }, 200)
        })
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
    canShow(prof) {
      const p = this.userLogin.profession
      switch (prof) {
        case "radio":
          if (p.id != 1 && p.id != 2) {
            console.log(p.name)
            return true
          }
          break;
        case "photo":
          if (p.id != 2 && p.id != 3) {
            return true
          }
          break;
        case "lab":
          if (p.id != 1 && p.id != 3) {
            return true
          }
          break;
        case "doc":
        case "pay":
          if (p.id != 1 && p.id != 2 && p.id != 3) {
            return true
          }
          break;
      }
      return false;
    },
    close() {
      this.open = false
    },
    close1() {
      this.open1 = false
    },
    deleteUserPop() {
      this.open = true
    },
    deleteUser() {
      if (!this.user) return
      this.$store.dispatch('admin/user/deleteUser', this.user.id)
        .then(res => {
          window.location.href = '/Organization/Patients?page=1'
        })
        .catch(err => {
        })
      window.location.href = '/Organization/Patients?page=1'
    },
    openHistoryModal() {
      this.open11 = true;
    },
    saveMedicalHistory() {
      this.$store.dispatch('medical_histories/userWallet/createUserHistories', {
        ...this.histories,
        user_id: parseInt(this.$route.params.id),
      })
        .then(() => {
          this.open11 = false
        })
    },
    menuStatus1() {
      this.menu1 = true
      this.menu2 = false
      this.menu3 = false
      this.menu4 = false
      this.menu5 = false
    },
    menuStatus11() {
      this.menu11 = true
      this.menu21 = false
      this.menu31 = false
      this.menu41 = false
      this.menu51 = false
    },
    menuStatus2() {
      this.menu1 = false
      this.menu2 = true
      this.menu3 = false
      this.menu4 = false
      this.menu5 = false
    },
    menuStatus21() {
      this.menu11 = false
      this.menu21 = true
      this.menu31 = false
      this.menu41 = false
      this.menu51 = false
    },
    menuStatus3() {
      this.menu1 = false
      this.menu2 = false
      this.menu3 = true
      this.menu4 = false
      this.menu5 = false
    },
    menuStatus31() {
      this.menu11 = false
      this.menu21 = false
      this.menu31 = true
      this.menu41 = false
      this.menu51 = false
    },
    menuStatus4() {
      this.menu1 = false
      this.menu2 = false
      this.menu3 = false
      this.menu4 = true
      this.menu5 = false
    },
    menuStatus41() {
      this.menu11 = false
      this.menu21 = false
      this.menu31 = false
      this.menu41 = true
      this.menu51 = false
    },
    menuStatus5() {
      this.menu1 = false
      this.menu2 = false
      this.menu3 = false
      this.menu4 = false
      this.menu5 = true
    },
    getFilePath(path) {
      return 'http://localhost:3000' + path
    },
    setMale() {
      this.status = '1';
      this.gender = 'male'
    },
    setFemale() {
      this.status = '2';
      this.gender = 'female'
    },
  }
}
</script>

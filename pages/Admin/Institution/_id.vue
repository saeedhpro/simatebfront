<template>
  <div class="container">
    <vue-modaltor :visible="instModal" @hide="instModal=false">
      <template #header>
        <div class="pb-3 flex justify-start border-b border-gray-700" style="align-items: center">
          <div class="flex" style="align-items: center">
            <div class="cursor-pointer w-5 h-5 p-1 border-solid border-gray-901 border rounded">
              <img src="/img/xmark.svg" @click="instModal = false">
            </div>
            <p class="mr-2">ویرایش موسسه</p>
          </div>
        </div>
      </template>
      <template #body v-if="institution">
        <div class="pt-3 flex flex-wrap justify-between" style="align-items: center">
          <div @click="openFileChooser" class="cursor-pointer flex align-top">
            <div>لوگو موسسه</div>
            <img :src="logo ? logo : `/img/imgUser.svg`" class="mr-2 w-36 h-36">
            <input @change="uploadLogo" name="logo" type="file" hidden ref="logo" accept="image/*">
          </div>
          <div>
            <div class="flex flex-wrap">
              <div>
                <div class="mb-2">نام</div>
                <input class="w-56 h-10 px-2 bg-white border-solid border-gray-901 border rounded-lg"
                       v-model="institution.name"/>
              </div>
              <div class="mr-5">
                <div class="mb-2">توضیح</div>
                <input class="w-56 h-10 px-2 bg-white border-solid border-gray-901 border rounded-lg"
                       v-model="institution.info"/>
              </div>
            </div>
            <div class="mt-5 flex flex-wrap">
              <div>
                <div class="mb-2">تخصص</div>
                <select class="w-56 h-10 px-3 bg-white border-solid border-gray-901 border rounded-lg"
                        v-model="institution.profession_id">
                  <option value="1">فتوگرافی</option>
                  <option value="2">آزمایشگاه</option>
                  <option value="3">رادیولوژی</option>
                  <option value="4">جراح و فک و صورت</option>
                  <option value="5">ارتودنسی</option>
                  <option value="6">متخصص گوش و حلق و بینی</option>
                  <option value="7">دندان پزشک</option>
                </select>
              </div>
              <div class="mr-5">
                <div class="mb-2">وبسایت</div>
                <input class="w-56 h-10 px-2 bg-white border-solid border-gray-901 border rounded-lg"
                       v-model="institution.website"/>
              </div>
            </div>
          </div>
        </div>

        <div class="mt-3 flex flex-wrap justify-between" style="align-items: center">
          <div>
            <div class="mb-2">شماره تماس ۱</div>
            <input class="w-56 h-10 px-2 bg-white border-solid border-gray-901 border rounded-lg"
                   v-model="institution.phone"/>
          </div>
          <div>
            <div class="mb-2">شماره تماس ۲</div>
            <input class="w-56 h-10 px-2 bg-white border-solid border-gray-901 border rounded-lg"
                   v-model="institution.phone1"/>
          </div>
          <div>
            <div class="mb-2">آدرس اینستاگرام</div>
            <input class="w-56 h-10 px-2 bg-white border-solid border-gray-901 border rounded-lg"
                   v-model="institution.instagram"/>
          </div>
        </div>

        <div class="mt-3 flex flex-wrap justify-start" style="align-items: center">
          <div>
            <div class="mb-2">هزینه پیامک</div>
            <input class="w-56 h-10 px-2 bg-white border-solid border-gray-901 border rounded-lg"
                   v-model="institution.sms_price"/>
          </div>
          <div class="mr-5">
            <div class="mb-2">اعتبار پیامک</div>
            <input class="w-56 h-10 px-2 bg-white border-solid border-gray-901 border rounded-lg"
                   v-model="institution.sms_credit"/>
          </div>
        </div>
        <div class="mt-3 flex flex-wrap justify-between" style="align-items: center">
          <div class="w-full">
            <div class="mb-2">دسته بندی مراجعات بیماران</div>
            <textarea class="w-full h-10 p-2 bg-white border-solid border-gray-901 border rounded-lg"
                      v-model="institution.known_as"></textarea>
          </div>
        </div>
        <div class="mt-3 flex flex-wrap justify-between" style="align-items: center">

          <div>
            <div class="py-2 text-center bg-gray-902 border-solid border border-gray-902 rounded-t-lg">آزمایشگاه</div>
            <div class="p-2 border-solid border border-gray-902 rounded-b-lg">
              <select class="w-56 h-10 px-3 bg-white border-solid border-gray-901 border rounded-lg"
                      v-model="lab_rel_id"
                      @change="addLabRel">
                <option v-for="i in labRels" :value="i">{{ i.name }}</option>
              </select>

              <div class="p-2 mt-2 border-solid border border-blue-902 bg-blue-904 rounded-lg flex justify-between"
                   v-for="i in orgLabRels">
                <div>{{ i.name }}</div>
                <div class="w-6 h-6 p-1 border-solid border-blue-902 border rounded">
                  <img src="/img/xmark.svg" @click="removeLab(i.id)">
                </div>
              </div>
            </div>
          </div>
          <div>
            <div class="py-2 text-center bg-gray-902 border-solid border border-gray-902 rounded-t-lg">رادیولوژی</div>
            <div class="p-2 border-solid border border-gray-902 rounded-b-lg">
              <select class="w-56 h-10 px-2 bg-white border-solid border-gray-901 border rounded-lg"
                      v-model="ra_rel_id" @change="addRaRel">
                <option v-for="i in raRels" :value="i">{{ i.name }}</option>
              </select>

              <div class="p-2 mt-2 border-solid border border-blue-902 bg-blue-904 rounded-lg flex justify-between"
                   v-for="i in orgRaRels">
                <div>{{ i.name }}</div>
                <div class="w-6 h-6 p-1 border-solid border-blue-902 border rounded">
                  <img src="/img/xmark.svg" @click="removeRa(i.id)">
                </div>
              </div>
            </div>
          </div>
          <div>
            <div class="py-2 text-center bg-gray-902 border-solid border border-gray-902 rounded-t-lg">مطب</div>
            <div class="p-2 border-solid border border-gray-902 rounded-b-lg">
              <select
                v-model="of_rel_id"
                class="w-56 h-10 px-2 bg-white border-solid border-gray-901 border rounded-lg"
                @change="addOfRel">
                <option v-for="i in ofRels" :value="i">{{ i.name }}</option>
              </select>

              <div class="p-2 mt-2 border-solid border border-blue-902 bg-blue-904 rounded-lg flex justify-between"
                   v-for="i in orgOfRels">
                <div>{{ i.name }}</div>
                <div @click="removeOf(i.id)" class="w-6 h-6 p-1 border-solid border-blue-902 border rounded">
                  <img src="/img/xmark.svg">
                </div>
              </div>
            </div>
          </div>

        </div>


        <div class="mt-8 flex flex-wrap justify-between">
          <button class="w-28 h-10 py-2 border-solid border border-gray-700 rounded-lg text-gray-700 text-center"
                  @click="cleanForm">پاک کردن فرم
          </button>
          <div class="flex" style="align-items: center">
            <button class="w-28 h-10 py-2 text-center bg-gray-907 rounded-lg" @click="instModal = false">انصراف</button>
            <button class="w-60 h-10 py-2 mr-3 text-center bg-blue-902 rounded-lg text-white" @click="saveForm">ذخیره
            </button>
          </div>
        </div>

      </template>
    </vue-modaltor>
    <vue-modaltor :visible="open" @hide="open=false">
      <template #header>
        <!--    add your custom header     -->
        <div class="pb-3 flex justify-between border-b border-gray-700" style="align-items: center">
          <div class="flex" style="align-items: center">
                       <button class="mr-3 w-5 h-5 p-1 border-solid border-gray-901 border rounded">

              <img src="/img/xmark.svg" @click="close">
            </button>
            <p class="mr-2">افزودن بیمار</p>
          </div>
          <div>
            ثبت در سیستم توسط: <span v-if="userLogin">{{ userLogin.fname }} {{ userLogin.lname }}</span>
            ({{ $moment(userLogin.created).format('YYYY/M/DD HH:mm:ss') | toRelativeDate }})
          </div>
        </div>
      </template>
      <template #body>

        <div class="pt-3 flex flex-wrap justify-between" style="align-items: center">
          <div @click="openUserFileChooser" class="flex align-top">
            <div>تصویر کاربری</div>
            <input @change="uploadUserLogo" name="logo" type="file" hidden ref="userlogo" accept="image/*">
            <img v-if="!user.logo" src="/img/imgUser.svg" class="mr-2 w-36 h-36">
            <img v-else :src="user.logo" class="mr-2 w-36 h-36">
          </div>
          <div>
            <div class="flex flex-wrap">
              <div>
                <div class="mb-2">نام</div>
                <input class="w-56 h-10 px-2 bg-white border-solid border-gray-901 border rounded-lg"
                       v-model="user.fname"/>
              </div>
              <div class="mr-5">
                <div class="mb-2">نام خانوادگی</div>
                <input class="w-56 h-10 px-2 bg-white border-solid border-gray-901 border rounded-lg"
                       v-model="user.lname"/>
              </div>
            </div>
            <div class="mt-5 flex flex-wrap">
              <div>
                <div class="mb-2">توضیحات</div>
                <input class="w-56 h-10 px-2 bg-white border-solid border-gray-901 border rounded-lg"
                       v-model="user.info"/>
              </div>
              <div class="mr-5">
                <div class="mb-2">جنسیت</div>
                <div class="flex justify-right">
                  <div
                    class="w-28 h-10 px-2 py-2  flex text-center  rounded-lg border-l-2 bg-gray-902 text-sm click cursor-pointer"
                    style="align-items: center"
                    @click="setFemale" :class="{'selectedBlue' : user.status === '2'}">
                    <img src="/img/womanBlue.svg" class="w-8 h-8 ml-2" v-if="user.status === 'female'"/>
                    <img src="/img/woman.svg" class="w-8 h-8 ml-2" v-else/>
                    <span class="mx-auto">خانم</span>
                  </div>
                  <div
                    class="w-28 h-10 px-2 py-2 mr-5 flex text-center  rounded-lg border-l-2 bg-gray-902 text-sm click cursor-pointer"
                    style="align-items: center"
                    @click="setMale" :class="{'selectedBlue' : user.status === '1'}">
                    <img src="/img/man.svg.svg" class="w-8 h-8 ml-2" v-if="user.status === 'male'"/>
                    <img src="/img/manGray.svg" class="w-8 h-8 ml-2" v-else/>
                    <span class="mx-auto">آقا</span>
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
                    v-model="user.user_group_id">
              <option value="1">بیمار</option>
              <option value="2">مدیر سیستم</option>
              <option value="3">پزشک</option>
              <option value="4">منشی پزشک</option>
              <option value="5">مسئول آزمایشگاه</option>
              <option value="100">منشی پزشک</option>
            </select>
          </div>
          <div>
            <div class="mb-2">شماره موبایل</div>
            <input class="w-56 h-10 px-2 bg-white border-solid border-gray-901 border rounded-lg" v-model="user.tel"/>
          </div>
        </div>

        <div class="mt-3 flex flex-wrap justify-between" style="align-items: center">
          <div>
            <div class="mb-2">شماره تماس</div>
            <input class="w-56 h-10 px-2 bg-white border-solid border-gray-901 border rounded-lg" v-model="user.tel1"/>
          </div>
          <div class="mr-5">
            <div class="mb-2">کد ملی</div>
            <input class="w-56 h-10 px-2 bg-white border-solid border-gray-901 border rounded-lg" v-model="user.nid"/>
          </div>
          <div class="mr-5">
            <div class="mb-2">تاریخ تولد</div>
            <!--          <input class="w-56 h-10 px-2 bg-white border-solid border-gray-901 border rounded-lg" v-model="birth_date"/>-->
            <date-picker format="YYYY-MM-DD" display-format="jYYYY/jMM/jDD" :value="user.birth_date"
                         @input="onBirthDateChange"
                         placeholder="تاریخ را انتخاب کنید"></date-picker>
          </div>
        </div>

        <div class="-mx-4 mt-3 flex flex-wrap justify-between" style="align-items: center">
          <div class="md:w-1/3 px-4">
            <div class="mb-2">شماره پرونده</div>
            <input class="w-56 h-10 px-2 bg-white border-solid border-gray-901 border rounded-lg"
                   v-model="user.file_id"/>
          </div>
          <div class="md:w-2/3 px-4">
            <div class="mb-2">آدرس محل سکونت</div>
            <input class="w-full h-10 bg-white border-solid border-gray-901 border rounded-lg" v-model="user.address"/>
          </div>
        </div>

        <div class="mt-3 flex flex-wrap justify-between" style="align-items: center" v-if="user.user_group_id == 1">
          <div class="w-full">
            <div class="mb-2">شرح حال</div>
            <textarea class="w-full h-10 bg-white border-solid border-gray-901 border rounded-lg"
                      v-model="user.description"></textarea>
          </div>
        </div>

        <div class="mt-3 flex flex-wrap justify-between" style="align-items: center">
          <div class="mr-5" v-if="user.user_group_id == 1">
            <div class="mb-2">سابقه جراحی</div>
            <div class="flex" style="align-items: center">
              <div class="flex" style="align-items: center">
                <input type="radio" class="w-5 h-5 bg-white border-solid border-gray-901 border rounded-lg"
                       v-model="user.relation" value="فک"/>
                <span class="mr-1">فک</span>
              </div>
              <div class="mx-3 flex" style="align-items: center">
                <input type="radio" class="w-5 h-5 bg-white border-solid border-gray-901 border rounded-lg"
                       v-model="user.relation" value="بینی"/>
                <span class="mr-1">بینی</span>
              </div>
              <div class="flex" style="align-items: center">
                <input type="radio" class="w-5 h-5 bg-white border-solid border-gray-901 border rounded-lg"
                       v-model="user.relation" value="غیره"/>
                <span class="mr-1">غیره</span>
              </div>
            </div>
          </div>
          <div class="flex flex-wrap" style="align-items: center">
            <div>
              <div class="mb-2">معرف</div>
              <input class="w-56 h-10 px-2 bg-white border-solid border-gray-901 border rounded-lg"
                     v-model="user.introducer"/>
            </div>
            <div class="mr-3">
              <div class="mb-2">رمز ورود</div>
              <input type="password" class="w-56 h-10 px-2 bg-white border-solid border-gray-901 border rounded-lg"
                     v-model="user.password"/>
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

    <div class="w-full p-5 flex flex-wrap justify-end bg-white rounded-md shadow-xl border-b-4 border-blue-902"
         style="align-items: center"
         v-if="institution">
      <div class="flex" style="align-items: center">
        <img :src="institution.logo" class="w-28 h-28 ml-3" v-if="institution.logo">
        <img src="/img/img-doc.svg" class="w-28 h-28 ml-3" v-else>
        <div class="flex flex-col">
          <span>{{ institution.name }}</span>
          <span class="my-5">{{ institution.phone | toPersianNumber }}</span>
          <span class="text-md">{{ institution.case_types }}</span>
        </div>
      </div>
      <div class="mr-auto">
        <div class="mb-2 text-sm">توضیحات</div>
        <div class="text-sm" style="max-width: 629px">{{ institution.info }}</div>
        <div class="my-4 flex mr-auto justify-end">
          <div
            class="cursor-pointer w-48 h-9 py-3 px-5 mr-4 text-sm text-center click flex bg-white hover:bg-blue-904 text-center text-gray-700 hover:text-blue-902 border-solid border-2 border-gray-500 hover:border-blue-902 rounded-lg"
            style="align-items: center"
            @click="openEditInstModal"
          >
            <img src="/img/pen.svg" class="w-4 ml-3 hh"/>
            <img src="/img/pengray.svg" class="w-4 ml-3 hg"/>
            <span class="click">ویرایش اطلاعات</span>
          </div>
        </div>
      </div>
    </div>
    <div class="my-10 flex justify-between">
      <div class="flex">
        <button @click="menuStatus2"
                class="h-12 px-4 text-sm flex bg-white shadow-md text-center text-md rounded-lg click"
                style="align-items: center"
                :class="{'selectedBlue' : menu1 === true}">
          <img src="/img/usersBlue.svg" class="w-7 ml-3" v-if="menu1">
          <img src="/img/GroupPic.svg" class="ml-3" v-else>
          <span>بیماران</span>
        </button>
        <button @click="menuStatus3"
                class="h-12 px-4 mx-5 flex text-sm bg-white shadow-md text-center text-md rounded-lg click"
                style="align-items: center"
                :class="{'selectedBlue' : menu2 === true}">
          <img src="/img/GroupPicBlue.svg" class="ml-3 w-7" v-if="menu2">
          <img src="/img/GroupPic.svg" class="ml-3 w-7" v-else>
          <span>تصاویر اسلایدر</span>
        </button>
        <button @click="menuStatus4"
                class="h-12 px-4 flex text-sm bg-white shadow-md text-center text-md rounded-lg click"
                style="align-items: center"
                :class="{'selectedBlue' : menu3 === true}">
          <img src="/img/GroupAboutBlue.svg" class="ml-3 w-7" v-if="menu3">
          <img src="/img/GroupAbout.svg" class="ml-3 w-7" v-else>
          <span>درباره موسسه</span>
        </button>
      </div>
      <img src="/img/Line%2041-2.svg" class="md:flex hidden mx-3" style="width: 626px" v-if="menu = 'app-component-1'">
      <img src="/img/Line%2041-2.svg" class="md:flex hidden mx-3" style="width: 726px" v-else>
      <button class="w-36 h-12 px-2 text-sm flex bg-blue-902 rounded-lg text-white text-center"
              @click="open=true"
              style="align-items: center">
        <div class="w-8 h-8 p-2 ml-4 bg-blue-903 rounded-lg text-center">
          <img src="/img/user-plus.svg">
        </div>
        <span>افزودن بیمار</span>
      </button>
    </div>
    <div>
      <!--    <component :is="menu"></component>-->
      <div v-if="menu1">
        <InstitutionUsers/>
      </div>
      <div v-if="menu2">
        <InstitutionPic/>
      </div>
      <div v-if="menu3">
        <AboutInstitution/>
      </div>
    </div>
    <vue-snotify/>
  </div>
</template>

<script>
import InstitutionUsers from "@/components/Admin/InstitutionUsers";
import InstitutionPic from "@/components/Admin/InstitutionPic";
import AboutInstitution from "@/components/Admin/AboutInstitution";

export default {
  name: "show-org",
  layout: 'admin',
  middleware: 'auth',
  async mounted() {
    await this.$store.dispatch('admin/user/institutionList')
    this.orgRaRels = await this.$store.dispatch('admin/Institution/getInstitutionRels', {
      id: this.$route.params.id,
      prof: 3,
    })
    this.orgLabRels = await this.$store.dispatch('admin/Institution/getInstitutionRels', {
      id: this.$route.params.id,
      prof: 1,
    })
    this.orgOfRels = await this.$store.dispatch('admin/Institution/getInstitutionOfRels', this.$route.params.id)
    await this.getOrg();
    await this.$store.dispatch('admin/Institution/getAdminAllOrg')
  },
  data() {
    return {
      logo: null,
      institution: null,
      lab_rel_id: null,
      ra_rel_id: null,
      of_rel_id: null,
      orgLabRels: [],
      orgRaRels: [],
      orgOfRels: [],
      menu1: true,
      menu2: false,
      menu3: false,
      instModal: false,
      open: false,
      status: '1',
      user: {
        lname: null,
        fname: null,
        info: null,
        gender: 'male',
        status: '1',
        user_group_id: 1,
        organization_id: null,
        tel: null,
        nid: null,
        birth_date: '',
        address: null,
        introducer: null,
        email: null,
        password: null,
        file_id: null,
        tel1: null,
        description: null,
        logo: null,
        relation: null,
      }
    }
  },
  components: {
    InstitutionUsers,
    InstitutionPic,
    AboutInstitution,
  },
  computed: {
    institutionList() {
      return this.$store.getters['admin/user/getInstitutionList']
    },
    userLogin() {
      return this.$store.getters['login/getUser']
    },
    labRels() {
      return this.$store.getters['admin/Institution/getOrgLabRels']
    },
    raRels() {
      return this.$store.getters['admin/Institution/getOrgRaRels']
    },
    ofRels() {
      return this.$store.getters['admin/Institution/getOrgOfRels']
    }
  },
  methods: {
    async getOrg() {
      const inst = await this.$store.dispatch('admin/Institution/getInstitution', this.$route.params.id)
      this.institution = {
        case_types: inst.case_types,
        created_at: inst.created_at,
        id: inst.id,
        info: inst.info,
        instagram: inst.instagram,
        known_as: inst.known_as,
        logo: inst.logo,
        name: inst.name,
        phone: inst.phone,
        phone1: inst.phone1,
        profession: inst.profession,
        profession_id: inst.profession_id,
        sms_credit: inst.sms_credit,
        sms_price: inst.sms_price,
        staff: inst.staff,
        staff_id: inst.staff_id,
        website: inst.website,
      }
      this.logo = inst.logo
    },
    saveForm() {
      this.$store.dispatch('admin/Institution/editInstitution', {
        id: this.institution.id,
        name: this.institution.name,
        info: this.institution.info,
        profession_id: parseInt(this.institution.profession_id),
        website: this.institution.website,
        logo: this.logo,
        phone: this.institution.phone,
        phone1: this.institution.phone1,
        instagram: this.institution.instagram,
        sms_price: parseInt(this.institution.sms_price),
        sms_credit: parseInt(this.institution.sms_credit),
        rel_laboratories: this.orgLabRels,
        rel_radiologies: this.orgRaRels,
        rel_doctor_offices: this.orgOfRels,
        known_as: this.institution.known_as,
      })
        .then(res => {
          this.$snotify.success('سازمان با موفقیت ثبت شد', {
            timeout: 2000,
            showProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true
          })
          this.instModal = false
          this.getOrg()
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
    addLabRel() {
      const i = this.orgLabRels.find(i => i.id === this.lab_rel_id.id);
      if (!i) {
        this.orgLabRels.push(this.lab_rel_id)
      }
    },
    addRaRel() {
      const i = this.orgRaRels.find(i => i.id === this.ra_rel_id.id);
      if (!i) {
        this.orgRaRels.push(this.ra_rel_id)
      }
    },
    addOfRel() {
      const i = this.orgOfRels.find(i => i.id === this.of_rel_id.id);
      if (!i) {
        this.orgOfRels.push(this.of_rel_id)
      }
    },
    removeLab(id) {
      this.orgLabRels = this.orgLabRels.filter(i => i.id !== id);
    },
    removeRa(id) {
      this.orgRaRels = this.orgRaRels.filter(i => i.id !== id);
    },
    removeOf(id) {
      this.orgOfRels = this.orgOfRels.filter(i => i.id !== id);
    },
    getResults(page = 1) {
      this.$store.dispatch('admin/Institution/getInstituteUsers', {
        id: this.$route.params.id,
        page: this.$route.query.page || 1,
        q: this.$route.query.q || null,
      })
    },
    openEditInstModal() {
      this.instModal = !this.instModal
    },
    onBirthDateChange(val) {
      this.user.birth_date = val;
    },
    openFileChooser() {
      this.$refs.logo.click();
    },
    openUserFileChooser() {
      this.$refs.userlogo.click();
    },
    uploadUserLogo(e) {
      const logoFile = e.target.files[0];
      if (!logoFile) {
        return
      }
      const formData = new FormData();
      formData.set("file", logoFile)
      this.$store.dispatch("upload/logo", formData)
        .then(res => {
          this.getUserFile(`${res.id}/${res.name}`)
        })
        .catch(err => {
          console.log(err)
        })
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
          this.getUserFile(`${res.id}/${res.name}`)
        })
        .catch(err => {
          console.log(err)
        })
    },
    async getFile(path) {
      const res = await this.$store.dispatch("upload/getFile", path)
      this.logo = res.url;
    },
    async getUserFile(path) {
      const res = await this.$store.dispatch("upload/getFile", path)
      this.user.logo = res.url;
    },
    close() {
      this.open = false
    },
    addUser() {
      this.$store.dispatch('admin/user/addUser', {
        fname: this.user.fname,
        lname: this.user.lname,
        info: this.user.info,
        gender: this.user.gender,
        user_group_id: 1,
        organization_id: parseInt(this.$route.params.id),
        tel: this.user.tel,
        nid: this.user.nid,
        birth_date: this.user.birth_date,
        address: this.user.address,
        introducer: this.user.introducer,
        email: this.user.email,
        password: this.user.password,
        file_id: this.user.file_id,
        tel1: this.user.tel1,
        description: this.user.description,
        relation: this.user.relation,
        logo: this.user.logo
      })
        .then(res => {
          this.$snotify.success('کابر با موفقیت ثبت شد', {
            timeout: 2000,
            showProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true
          })
          this.cleanForm()
          this.open = false;
          setTimeout(() => {
            this.getResults()
          }, 200)
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
    cleanForm() {
      this.user.fname = null
      this.user.lname = null
      this.user.info = null
      this.user.gender = null
      this.user.user_group_id = null
      this.user.organization_id = null
      this.user.tel = null
      this.user.nid = null
      this.user.birth_date = ''
      this.user.address = null
      this.user.introducer = null
      this.user.email = null
      this.user.password = null
      this.user.file_id = null
      this.user.tel1 = null
      this.user.description = null
      this.user.relation = null
    },
    setMale() {
      this.user.status = '1';
      this.user.gender = 'male'
    },
    setFemale() {
      this.user.status = '2';
      this.user.gender = 'female'
    },
    menuStatus2() {
      this.menu1 = true
      this.menu2 = false
      this.menu3 = false
    },
    menuStatus3() {
      this.menu1 = false
      this.menu2 = true
      this.menu3 = false
    },
    menuStatus4() {
      this.menu1 = false
      this.menu2 = false
      this.menu3 = true
    },
  },
}
</script>

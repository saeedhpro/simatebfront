<template>
  <div class="container">
    <vue-modaltor :visible="instModal" @hide="instModal=false">
      <template #header>
        <div class="pb-3 flex justify-start border-b border-gray-700" style="align-items: center">
          <div class="flex" style="align-items: center">
            <div class="cursor-pointer w-5 h-5 p-1 border-solid border-gray-901 border rounded">
              <img src="/img/xmark.svg" @click="instModal = false">
            </div>
            <p class="mr-2">افزودن موسسه</p>
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

    <div class="flex flex-wrap justify-between" style="align-items: center">
      <div
        class="w-auto h-12 py-2 px-3 text-sm flex bg-blue-904 text-center text-blue-902 border-solid border-2 border-blue-902 rounded-lg"
        style="align-items: center">
        <img src="/img/institution.png" class="w-8 ml-2"/>
        <span>مطب ها / موسسات /آزمایشگاه ها</span>
      </div>
      <img src="/img/Line%2041-2.svg" class="mx-2 md:flex hidden" width="800px">
      <button class="w-40 h-12 px-2 sm:mt-0 mt-3 text-sm flex bg-blue-902 rounded-lg text-white text-center"
              style="align-items: center" @click="instModal=true">
        <div class="w-8 h-8 p-2 ml-4 bg-blue-903 rounded-lg text-center">
          <img src="/img/user-plus.svg">
        </div>
        <span>افزودن موسسه</span>
      </button>
    </div>
    <div class="py-5 px-10 my-5 bg-white rounded-lg">
      <div class="mb-10 flex flex-wrap justify-between">
        <div class="flex" style="align-items: center">
          <div>
            <input
              v-model="selectAll"
              type="checkbox"
              class="w-5 h-5 mt-2 border-solid border-2 border-gray-901 rounded-xl hover:border-gray-400">
          </div>
          <div class="mx-3">
            <div class="relative inline-flex">
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
          <button
            @click="doAction"
            class="w-24 h-12 py-3 bg-gray-100 text-sm text-center text-black border-gray-901 border-solid border-2 rounded-lg">
            انجام بده
          </button>
        </div>
        <div>
          <Search/>
        </div>
      </div>
      <div>
        <InstitutionTable/>
      </div>
    </div>
    <vue-snotify></vue-snotify>

  </div>

</template>

<script>
import Search from "@/components/Admin/SearchIns";
import InstitutionTable from "@/components/Admin/InstitutionTable";

export default {
  name: "index",
  layout: 'admin',
  middleware: 'admin',
  components: {
    InstitutionTable, Search
  },
  data() {
    return {
      instModal: false,
      open: false,
      act: null,
      name: null,
      info: null,
      logo: null,
      lab_rel_id: null,
      ra_rel_id: null,
      of_rel_id: null,
      orgLabRels: [],
      orgRaRels: [],
      orgOfRels: [],
      institution: {
        case_types: '',
        created_at: '',
        info: '',
        instagram: '',
        known_as: '',
        logo: '',
        name: '',
        phone: '',
        phone1: '',
        profession_id: 1,
        sms_credit: 0,
        sms_price: 0,
        website: '',
      }
    }
  },
  methods: {
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
      // if (this.userLogin.user_group_id !== 2) {
      //   return;
      // }
      if (this.selectedItems.length === 0) {
        return;
      }
      this.$store.dispatch('admin/user/deleteOrganizations', this.selectedItems)
        .then(() => {
          window.location.reload()
        })
        .catch(err => {
          alert('انجام نشد!')
        })
    },
    selectItem(checked, id) {
      this.$store.dispatch('selected/updateSelected', {
        checked: checked,
        id: id,
      })
    },
    saveForm() {
      this.$store.dispatch('admin/Institution/addInstitution', {
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
    close() {
      this.open = false
    },
    cleanForm() {
      this.name = null
      this.info = null
      this.profession_id = null
      this.website = null
      this.phone = null
      this.phone1 = null
      this.instagram = null
      this.sms_price = null
      this.sms_credit = null
      this.rel_laboratories = []
      this.rel_radiologies = []
      this.rel_doctor_offices = []
      this.Known_as = null
      this.lab_rel_id = null
      this.ra_rel_id = null
      this.of_rel_id = null
    }
  },
  computed: {
    InstitutionList() {
      return this.$store.getters['admin/Institution/getInstitutions']
    },
    selectedItems() {
      return this.$store.getters['selected/getSelected']
    },
    selectAll: {
      get() {
        if (this.InstitutionList && this.InstitutionList.data) {
          return this.InstitutionList.data.length > 0 ? this.selectedItems.length == this.InstitutionList.data.length : false;
        } else {
          return false;
        }
      },
      set(val) {
        if (this.InstitutionList) {
          const self = this
          this.InstitutionList.data.forEach(function (user) {
            self.selectItem(val, user.id)
          });
        }
      }
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
  async mounted() {
    await this.$store.dispatch('admin/Institution/getInstitutionsList', this.$route.query.page)
    await this.$store.dispatch('admin/Institution/getAdminAllOrg')
  }
}
</script>

<template>
  <div>
    <div class="overflow-x-auto">
      <div class="flex border-solid border-2 border-gray-901 rounded-t-lg bg-gray-902 minWight">
        <div class="w-10 py-2 border-l-2 border-gray-901"></div>
        <div class="w-64 py-2 border-l-2 border-gray-901 text-center">نام</div>
        <div class="w-32 py-2 border-l-2 border-gray-901 text-center">شماره تماس</div>
        <div class="w-40 py-2 border-l-2 border-gray-901 text-center">تخصص</div>
        <div class="w-32 py-2 border-l-2 border-gray-901 text-center">اعتبار</div>
        <div class="w-64 py-2 border-l-2 border-gray-901 text-center">ثبت در سیستم</div>
        <div class="w-32 py-2 mx-auto text-center">ثبت توسط</div>
      </div>
      <div v-if="InstitutionList">
        <div class="flex border-b-2 border-r-2 border-l-2 border-gray-901 minWight table-link"
             v-for="(i , n) in InstitutionList.data" :key="n">
          <div class="w-10 py-2 text-center border-l-2 border-gray-901">{{ n + 1 }}</div>

          <div class="w-64 px-3 py-2 flex border-l-2 border-gray-901 text-center" style="align-items: center">
            <input @change="selectItem($event, i.id)" type="checkbox" :checked="isSelected(i.id)">
            <nuxt-link :to="`/admin/institution/${i.id}`"
                       style="align-items: center;display: flex;flex-direction: row">
              <img v-if="i.logo" :src="i.logo" class="mx-2 w-8 h-8 rounded-full"/>
              <img v-else src="/img/1601734331278.jpg" class="mx-2 w-8 h-8 rounded-full">
              {{ i.name }}
            </nuxt-link>
          </div>
          <div class="w-32 py-2 border-l-2 border-gray-901 text-center dir-ltr">{{ i.phone | toPersianNumber }}</div>
          <div class="w-40 py-2 border-l-2 border-gray-901 text-center">{{ i.profession.name }}</div>
          <div class="w-32 py-2 border-l-2 border-gray-901 text-center">{{
              i.sms_credit | toPersianCurrency('ریال',0)
            }} {{ `(${i.sms_price})` | toPersianNumber }}
          </div>
          <div class="w-64 py-2 border-l-2 border-gray-901 text-center">
            {{ i.staff ? i.staff.organization : '' }}
          </div>
          <div class="w-32 py-2 mx-auto text-center">{{ i.staff ? i.staff.fname : '' }} {{
              i.staff ? i.staff.lname : ''
            }}
          </div>
        </div>
      </div>
      <div v-if="InstitutionList && InstitutionList.pages_count >= 10">
        <paginate
          v-model="page"
          :page-count="InstitutionList.pages_count / 10"
          :page-range="3"
          :margin-pages="2"
          :click-handler="clickCallback"
          :prev-text="'<'"
          :next-text="'>'"
          :container-class="'pagination'"
          :page-class="'page-item'">
        </paginate>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "InstitutionTable",
  data() {
    return {
      open: false,
      showDelete: false,
      page: 1,
      institution: {
        info: null,
        profession_id: null,
        website: null,
        phone: null,
        phone1: null,
        instagram: null,
        sms_price: null,
        sms_credit: null,
        Known_as: null,
        rel_laboratories: [],
        rel_radiologies: [],
        rel_doctor_offices: [],
        lab_rel_id: null,
        ra_rel_id: null,
        of_rel_id: null,
      }
    }
  },
  mounted() {
    this.page = parseInt(this.$route.query.page) || 1
    setTimeout(() => {
      this.getResults(this.page)
    }, 200)
    this.$store.dispatch('selected/resetSelected')
  },
  computed: {
    InstitutionList() {
      return this.$store.getters['admin/Institution/getInstitutions']
    },
    selectedItems() {
      return this.$store.getters['selected/getSelected']
    },
  },
  methods: {
    isSelected(id){
      const item = this.selectedItems.find(i => i.id == id)
      return !!item;
    },
    getResults(page = 1) {
      this.$store.dispatch('admin/Institution/getInstitutions', {
        page: page,
        q: this.$route.query.q || null,
      })
    },
    addLabRel(e) {
      const data = {
        id: this.lab_rel_id,
        profession_id: 1
      }
      this.rel_laboratories.push(data)
    },
    addLabRa(e) {
      const data = {
        id: this.ra_rel_id,
        profession_id: 2
      }
      this.rel_radiologies.push(data)
    },
    addLabOf(e) {
      const data = {
        id: e.target.value.id,
        profession_id: e.target.value.id
      }
      this.rel_doctor_offices.push(data)
    },
    close() {
      this.open1 = false
    },
    clickCallback(pageNum) {
      const page = pageNum
      const query = {
        page,
        q: this.q || null,
      }
      this.$router.push({
        path: this.$route.path,
        query
      })
      this.getResults(pageNum)
    },
    editInstitution() {
      this.$store.dispatch('admin/Institution/editInstitution', {
        info: null,
        profession_id: null,
        website: null,
        phone: null,
        phone1: null,
        instagram: null,
        sms_price: null,
        sms_credit: null,
        Known_as: null,
        rel_laboratories: [],
        rel_radiologies: [],
        rel_doctor_offices: [],
        lab_rel_id: null,
        ra_rel_id: null,
        of_rel_id: null
      })
        .then(res => {
          this.$snotify.success('ویرایش سازمان با موفقیت انجام شد', {
            timeout: 2000,
            showProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true
          })
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
    },
    async getInstitution(i) {
      this.institution = await this.$store.dispatch('admin/Institution/getInstitution', i.id)
      this.open = true
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

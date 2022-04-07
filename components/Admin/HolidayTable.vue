<template>
  <div>
    <vue-modaltor :visible="openEditModal" @hide="openEditModal=false" v-if="item">
      <template #header>
        <!--    add your custom header     -->
        <div class="pb-3 flex justify-between border-b border-gray-700" style="align-items: center">
          <div class="flex" style="align-items: center">
                       <div class="mr-3 w-5 h-5 p-1 border-solid border-gray-901 border rounded">

              <img src="/img/xmark.svg" @click="openEditModal = false">
            </div>
            <p class="mr-2">تعطیلات رسمی</p>
          </div>
        </div>
      </template>
      <template #body>
        <div class="flex flex-wrap justify-between">
          <div>
            <label>عنوان</label>
            <div class="w-56 h-10 px-2 bg-white border-solid border-gray-901 border rounded-lg">
              <input type="text" class="w-56 h-10 px-2 bg-white border-solid border-gray-901 border rounded-lg"
                     v-model="item.title">
            </div>
          </div>
          <div>
            <label>تاریخ</label>
            <div class="w-56 h-10 px-2 bg-white border-solid border-gray-901 border rounded-lg">
              <date-picker format="YYYY-MM-DD" display-format="jYYYY/jMM/jDD" :value="item.hdate" @input="onChange"
                           placeholder="تاریخ را انتخاب کنید"></date-picker>
            </div>
          </div>
          <div>
            <label>سازمان ها</label>
            <div class="w-56 h-10 px-2 bg-white border-solid border-gray-901 border rounded-lg">
              <tree-select
                v-model="item.organization_id"
                :multiple="false"
                :default-expand-level="1"
                :options="allOrganizations"
                :normalizer="normalizer"
              >
              </tree-select>
            </div>
          </div>
        </div>
        <div class="mt-8 flex flex-wrap ">
          <button class="w-28 h-10 py-2 text-center bg-gray-907 rounded-lg"
                  @click="openEditModal = false; item = null;">بستن
          </button>
          <button class="w-56 h-10 py-2 mr-3 text-center bg-blue-902 rounded-lg text-white" @click="editHoliday">ذخیره
          </button>
        </div>

      </template>
    </vue-modaltor>
    <vue-modaltor :visible="deleteHaliday" @hide="deleteHaliday=false">
      <template #body>
        <!--        <div class="text-right">-->
        <!--          <img src="/img/xmark.svg" @click="close">-->
        <!--        </div>-->
        <div class="my-5 text-lg text-center">حذف تعطیلات</div>
        <div class="text-sm text-blue-907 text-center">آیا از حذف این تعطیلات اطمینان دارید؟</div>
        <div class="-mx-2 mt-8 w-full flex flex-wrap ">
          <div class="md:w-1/2 w-full px-2">
            <button class=" w-full h-10 py-2 text-center bg-gray-907 rounded-lg" @click="close">خیر</button>
          </div>
          <div class="md:w-1/2 w-full px-2">
            <button class="w-full h-10 py-2 mr-3 md:mt-0 mt-3 text-center bg-pink-200 rounded-lg text-white">بله، حذف
              کن
            </button>
          </div>
        </div>
      </template>
    </vue-modaltor>
    <div class="overflow-auto">
      <div class="h-12 flex border-solid border-2 border-gray-901 rounded-t-lg bg-gray-902 minWight">
        <div class="w-10 py-2 border-l-2 border-gray-901"></div>
        <div class="w-24 py-2 border-l-2 border-gray-901 text-center">تاریخ</div>
        <div class="w-2/4 py-2 border-l-2 border-gray-901 text-center">عنوان</div>
        <div class="w-20 py-2 text-center">عملیات</div>
      </div>
      <div v-if="holidayList">
        <div class="h-12 flex border-b-2 border-r-2 border-l-2 border-gray-901 minWight table-link"
             v-for="(i , n) in holidayList" :key="n">
          <div class="w-10 py-2 text-center border-l-2 border-gray-901">{{ n + 1 }}</div>
          <div class="w-24 py-2 border-l-2 border-gray-901 text-center">
            {{ ($moment(i.hdate).format('jYYYY/jM/jDD')) | toPersianNumber }}
          </div>
          <div class="w-2/4 py-2 border-l-2 border-gray-901 text-center">{{ i.title }}</div>
          <div class="px-5 py-2 text-center flex justify-center">
            <button class="px-5 py-3 flex border-solid border border-gray-500 rounded-lg" style="align-items: center"
                    @click="openEditHoliday(i)">
              <img src="/img/pen1.svg" class="ml-2">
              ویرایش
            </button>
            <button class="px-5 py-3 mr-3 flex border-solid border border-gray-500 rounded-lg"
                    style="align-items: center" @click="deleteHoliday(i)">
              <img src="/img/trash-can.svg" class="ml-2">
              حذف
            </button>
          </div>
        </div>
      </div>
      <!--      <pagination v-if="userList && userList.data" :limit="10" :data="userList.data" @pagination-change-page="getResults"></pagination>-->

    </div>
    <vue-snotify class="material"></vue-snotify>
  </div>
</template>
<script>
export default {
  name: "HolidayTable",
  data() {
    return {
      open: false,
      deleteHaliday: false,
      openEditModal: false,
      addHoliday: false,
      close: false,
      start_date: null,
      end_date: null,
      holiday: {
        title: null,
        hdate: null,
        organization_id: null,
      },
      item: null,
      normalizer(node) {
        return {
          id: node.id,
          label: `${node.name}`,
          children: null,
        }
      },
    }
  },
  mounted() {
    this.start_date = this.$route.query.start_date || ''
    this.end_date = this.$route.query.end_date || ''
    this.getAllOrganizations()
  },
  computed: {
    holidayList() {
      return this.$store.getters['admin/holiday/getHolidayList']
    },
    allOrganizations() {
      return this.$store.getters["admin/user/getAllOrganizations"]
    }
  },
  methods: {
    getAllOrganizations() {
      this.$store.dispatch('admin/user/getAllOrganization')
    },
    openEditHoliday(i) {
      this.item = {
        id: i.id,
        title: i.title,
        hdate: i.hdate,
        organization_id: i.organization_id,
      }
      this.openEditModal = true;
    },
    editHoliday() {
      if (!this.item) return;
      this.$store.dispatch('admin/holiday/editHoliday', {
        ...this.item,
        hdate: `${this.item.hdate}T00:00:00Z`,
      })
        .then(res => {
          this.$snotify.success('ویرایش تعطیلات با موفقیت ثبت شد', {
            timeout: 2000,
            showProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true
          })
          this.openEditModal = false;
          this.item = null;
          this.$store.dispatch('admin/holiday/getHolidayList', {
            start_date: this.start_date,
            end_date: this.end_date,
          });
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
    async getHoliday(i) {
      this.holiday = await this.$store.dispatch('admin/holiday/getHoliday', i.id)
      this.open = true
    },
    onChange(val) {
      this.item.hdate = val;
    },
    deleteHoliday({id}) {
      this.$store.dispatch('admin/holiday/deleteHoliday', id)
        .then(res => {
          this.$snotify.success('حذف تعطیلات با موفقیت ثبت شد', {
            timeout: 2000,
            showProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true
          })
          this.$store.dispatch('admin/holiday/getHolidayList', {
            start_date: this.start_date,
            end_date: this.end_date
          });
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
  }
}
</script>


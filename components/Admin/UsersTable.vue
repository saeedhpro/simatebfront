<template>
  <div>
    <vue-modaltor :visible="open1" @hide="open1=false">
      <template #header>
        <!--    add your custom header     -->
        <div class="pb-3 flex justify-between border-b border-gray-700" style="align-items: center">
          <div class="flex" style="align-items: center">
            <div class="w-5 h-5 p-1 border-solid border-gray-901 border rounded">
              <img src="/img/xmark.svg" @click="close1">
            </div>
            <p class="mr-2">افزودن کاربر</p>
          </div>
          <div>
            ویرایش در سیستم توسط: <span v-if="user">{{ user.lname }}{{ user.fname }}</span> (۴ ماه پیش ۱۴۰۰/۴/۲۱ ۱۰:۳۳)
          </div>
        </div>
      </template>
      <template #body>

        <div class="pt-3 flex flex-wrap justify-between" style="align-items: center">

          <div class="flex align-top">
            <div>تصویر کاربری</div>
            <img src="/img/imgUser.svg" class="mr-2 w-36 h-36">
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
                    class="cursor-pointer w-28 h-10 px-2 py-2 flex text-center  rounded-lg border-l-2 bg-gray-902 text-sm click"
                    style="align-items: center"
                    @click="setMale1" :class="{'selectedBlue' : status === '1'}">
                    <img src="/img/man.svg" class="w-8 h-8 ml-2" v-if="user.gender.toLowerCase() === 'male'"/>
                    <img src="/img/manGray.svg" class="w-8 h-8 ml-2" v-else/>
                    <span class="mx-auto">آقا</span>
                  </div>
                  <div
                    class="cursor-pointer w-28 h-10 px-2 py-2 mr-5 flex text-center  rounded-lg border-l-2 bg-gray-902 text-sm click"
                    style="align-items: center"
                    @click="setFemale1" :class="{'selectedBlue' : status === '2'}">
                    <img src="/img/womanBlue.svg" class="w-8 h-8 ml-2"
                         v-if="user.gender.toLocaleLowerCase() === 'female'"/>
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
                    v-model="user.user_group_id">
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
            <select class="w-56 h-10 px-2 bg-white border-solid border-gray-901 border rounded-lg"
                    v-model="user.organization_id">
              <option v-for="i in institutionList" :value="i.id">{{ i.name }}</option>
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
            <date-picker format="YYYY-MM-DD" display-format="jYYYY/jMM/jDD" :value="user.birth_date"
                         @input="onDateChange"
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
                      v-model="user.info"></textarea>
          </div>
        </div>

        <div class="mt-3 flex flex-wrap justify-between" style="align-items: center">
          <div class="mr-5" v-if="user.user_group_id == 1">
            <div class="mb-2">سابقه جراحی</div>
            <div class="flex" style="align-items: center">
              <div class="flex" style="align-items: center">
                <input type="radio" class="w-5 h-5 bg-white border-solid border-gray-901 border rounded-lg"
                       v-model="user.relation" value="'فک'"/>
                <span class="mr-1">فک</span>
              </div>
              <div class="mx-3 flex" style="align-items: center">
                <input type="radio" class="w-5 h-5 bg-white border-solid border-gray-901 border rounded-lg"
                       v-model="user.relation" value="'بینی'"/>
                <span class="mr-1">بینی</span>
              </div>
              <div class="flex" style="align-items: center">
                <input type="radio" class="w-5 h-5 bg-white border-solid border-gray-901 border rounded-lg"
                       v-model="user.relation" value="'غیره'"/>
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
              <input class="w-56 h-10 px-2 bg-white border-solid border-gray-901 border rounded-lg"
                     v-model="user.password"/>
            </div>
          </div>
        </div>

        <div class="mt-8 flex justify-end" style="align-items: center">
          <div class="mx-2 relative">
            <div class="w-10 h-9 text-center border-solid border-2 border-gray-500 text-gray-500 rounded-lg"
                 @click="showDelete =! showDelete ">
              <button>...</button>
            </div>
            <button
              class="py-2 w-28 h-10 -mt-10 -mr-16 text-sm absolute border-solid border-2 border-gray-500 hover:border-pink-200 rounded-lg text-gray-700 hover:text-pink-200 bg-white hover:bg-pink-300 text-center"
              v-if="showDelete"
              @click="deleteUser(user.id)">
              حذف کاربر
            </button>
          </div>
          <button class="w-28 h-10 py-2 text-center bg-gray-907 rounded-lg" @click="close1">انصراف</button>
          <button class="w-56 h-10 py-2 mr-3 text-center bg-blue-902 rounded-lg text-white" @click="editUser">ذخیره
          </button>
        </div>

      </template>
    </vue-modaltor>

    <div class="overflow-x-auto">
      <div class="h-12 flex border-solid border-2 border-gray-901 rounded-t-lg bg-gray-902 minWight">
        <div class="w-10 py-2 border-l-2 border-gray-901"></div>
        <div class="w-64 py-2 border-l-2 border-gray-901 text-center">نام</div>
        <div class="w-32 py-2 border-l-2 border-gray-901 text-center">شماره تماس</div>
        <div class="w-40 py-2 border-l-2 border-gray-901 text-center">گروه</div>
        <div class="w-12 py-2 border-l-2 border-gray-901 text-center">سن</div>
        <div class="w-64 py-2 border-l-2 border-gray-901 text-center">موسسه</div>
        <div class="w-32 py-2 border-l-2 border-gray-901 text-center">ثبت در سیستم</div>
        <div class="w-32 py-2 mx-auto text-center">آخرین ورود</div>
      </div>

      <div v-if="userList">
        <div class="h-10 flex border-b-2 border-r-2 border-l-2 border-gray-901 minWight table-link"
             v-for="(i , n) in userList.data" :key="n">
          <div class="w-10 py-2 text-center border-l-2 border-gray-901">{{ (n + 1) }}</div>
          <div class="w-64 px-3 py-2 flex border-l-2 border-gray-901 text-center" style="align-items: center">
            <input @change="selectItem($event, i.id)" type="checkbox" :checked="isSelected(i.id)">
            <img :src="i.logo" class="mx-2 w-5 h-5 rounded-lg" v-if="i.logo">
            <img src="static/img/1601734331278.jpg" class="mx-2 w-5 h-5 rounded-lg" v-else>
            <!--            <button @click="getUser(i)" v-if="i.fname || i.lname">{{ i.fname }} {{ i.lname }}</button>-->
            <!--            <button @click="getUser(i)" v-else>بدون نام</button>-->
            <nuxt-link :to="`/admin/users/${i.id}`"
                       style="align-items: center;display: flex;flex-direction: row">
              {{ i.fname }} {{ i.lname }}
            </nuxt-link>
          </div>
          <div class="w-32 py-2 border-l-2 border-gray-901 text-center">{{ i.tel | toPersianNumber }}</div>
          <div class="w-40 py-2 border-l-2 border-gray-901 text-center">{{ fun(i.user_group_id) }}</div>
          <div class="w-12 py-2 border-l-2 border-gray-901 text-center">
            <span v-if="i.birth">{{ i.birth | toPersianNumber }}</span>
            <span v-else>-</span>
          </div>
          <div class="w-64 py-2 border-l-2 border-gray-901 text-center">{{ i.organization_name }}</div>
          <div class="w-32 py-2 border-l-2 border-gray-901 text-center">
            {{ i.created ? ($moment(i.created.Time).format('YYYY/M/DD')) : '-' | toRelativeDate }}
          </div>
          <div class="w-32 py-2 text-center">
            <span v-if="i.last_login">
              {{ $moment(i.last_login.Time).format('YYYY/M/DD HH:mm') | toRelativeDate }}
            </span>
            <span v-else>-</span>
          </div>
        </div>
        <div v-if="userList && userList.pages_count >= 10">
          <paginate
            v-model="page"
            :page-count="parseInt(userList.pages_count / 10)"
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
  </div>
</template>
<script>
export default {
  name: "index",
  layout: 'admin',
  middleware: 'admin',
  data() {
    return {
      open1: false,
      status: '1',
      user: {
        status: '1',
        lname: null,
        fname: null,
        info: null,
        gender: 'male',
        user_group_id: 1,
        organization_id: null,
        tel: null,
        nid: null,
        birth: null,
        address: null,
        introducer: null,
        email: null,
        password: null,
        file_id: null,
        tel1: null,
        description: null,
        logo: null,
        relation: null
      },
      showDelete: false,
      page: null
    }
  },
  computed: {
    userList() {
      return this.$store.getters['admin/user/getUsers']
    },
    institutionList() {
      return this.$store.getters['admin/user/getInstitutionList']
    },
    userLogin() {
      return this.$store.getters['login/getUser']
    },
    isAdmin() {
      const profession = this.userLogin.profession;
      return profession.id == 2;
    },
    selectedItems() {
      return this.$store.getters['selected/getSelected']
    },
  },
  methods: {
    isSelected(id) {
      const item = this.selectedItems.find(i => i.id == id)
      return !!item;
    },
    onDateChange(val) {
      this.user.birth_date = val
    },
    getResults(page = 1) {
      const q = this.$route.query.q || ''
      this.$router.push({
        path: this.$route.path,
        query: {
          page,
          q
        }
      })
      this.$store.dispatch('admin/user/getUsers', {
        page,
        q
      })
    },
    fun(i) {
      switch (i) {
        case 1 :
          return "بیمار"
        case 2 :
          return " مدیر سیستم"
        case 3 :
          return "پزشک"
        case 4 :
          return "منشی پزشک"
        case 5 :
          return "مسئول آزمایشگاه"
      }
    },
    close1() {
      this.open1 = false
    },
    setMale1() {
      this.status = '1';
      this.user.gender = 'male'
    },
    setFemale1() {
      this.status = '2';
      this.user.gender = 'female'
    },
    editUser() {
      if (!this.user) return;
      this.$store.dispatch('admin/user/editUser', {
        ...this.user
      })
        .then(res => {
          this.$snotify.success('ویرایش کاربر با موفقیت ثبت شد', {
            timeout: 2000,
            showProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true
          })
          this.getResults()
          this.open1 = false;
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
    async getUser(i) {
      const user = await this.$store.dispatch('admin/user/getUser', i.id)
      this.user = {
        id: user.id,
        fname: user.fname,
        lname: user.lname,
        info: user.info,
        gender: user.gender,
        user_group_id: user.user_group_id,
        organization_id: user.organization_id,
        tel: user.tel,
        nid: user.nid,
        birth: user.birth,
        birth_date: user.birth_date ? user.birth_date.Time : '',
        address: user.address,
        introducer: user.introducer,
        email: user.email,
        password: user.password,
        file_id: user.file_id,
        tel1: user.tel1,
        description: user.description,
        relation: user.relation,
        logo: user.logo
      }
      this.open1 = true
    },
    deleteUser(id) {
      this.$store.dispatch('admin/user/deleteUser', id)
        .then(res => {
          location.reload();
        })
        .catch(err => {
        })
    },
    clickCallback(pageNum) {
      this.getResults(pageNum)
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


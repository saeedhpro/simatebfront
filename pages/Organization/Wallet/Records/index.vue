<template>
  <div class="container -mx-2 flex flex-wrap justify-start">
    <div class="px-2 sm:w-1/5 w-full">
      <div class="w-full p-6 bg-white rounded-lg shadow-md">
        <img src="/img/wallet.png" class="w-12 mx-auto">

        <div class="pb-4 mt-8 border-b text-gray-907">
          <select
            v-if="employees"
            v-model="user_id"
            @change="getWallet"
            class="w-full h-10 px-2 bg-white border-solid border-gray-901 border rounded-lg placeholder-color-black Bold"
            placeholder="کیف پول من">
            <option v-for="(i, n) in employees.data" :key="n" :value="i.id">{{ `${i.fname} ${i.lname}` }}</option>
          </select>
        </div>

        <div class="my-6 text-gray-700">
          <nuxt-link to="/Organization/Wallet/Dashboard" class="flex">
            <img src="/img/grid-2.png" class="img-blue">
            <img src="/img/grid-2Gray.png" class="img-gray">
            <span class="mr-4">داشبورد</span>
          </nuxt-link>
        </div>

        <div class="my-6 text-gray-700">
          <nuxt-link to="/Organization/Wallet/IncreaseCredit" class="flex">
            <img src="/img/grid-2.png" class="img-blue">
            <img src="/img/grid-2Gray.png" class="img-gray">
            <span class="mr-4">افزایش اعتبار</span>
          </nuxt-link>
        </div>

        <div class="mb-6 text-gray-700">
          <nuxt-link to="/Organization/Wallet/Transactions" class="flex">
            <img src="/img/right-left.png" class="img-blue">
            <img src="/img/right-leftGray.png" class="img-gray">
            <span class="mr-4">تراکنش ها</span>
          </nuxt-link>
        </div>

        <div class="mb-6 text-gray-700">
          <nuxt-link to="/Organization/Wallet/Records" class="flex">
            <img src="/img/memo-pad.png" class="img-blue">
            <img src="/img/memo-padGray.png" class="img-gray">
            <span class="mr-4">سوابق تسویه حساب</span>
          </nuxt-link>
        </div>

      </div>
    </div>
    <div class="px-2 sm:w-4/5 w-full">
      <div class="w-full">
        <div class="p-4 bg-white rounded-lg shadow-md">

          <div class="flex flex-wrap justify-between">
            <div>
              <div class="relative">
                <input
                  v-model="q"
                  class="h-12 pl-5 wh pr-10 pb-2 border-2 border-gray-901 rounded-lg placeholder-gray-600 text-gray-600 bg-white focus:outline-none appearance-none wight-search"
                  placeholder="جستجو">
                <img src="/img/magnifying-glass.svg" class="w-4 mr-3 absolute" style="margin-top: -35px">
                <div @click="search"
                     class="absolute cursor-pointer mr-auto text-left w-10 h-10 py-2 px-3 absolute click"
                     style="align-items: center;left: 5px;margin-top: -44px">
                  <img src="/img/magnifying-glass.svg" class="w-3 ml-1 gray1"
                       style="position:absolute; top: 35%; left: 5px"/>
                </div>
              </div>
            </div>

            <div class="flex flex-wrap text-black" style="align-items: center">
              <span class="mx-2">از تاریخ</span>
              <div class="w-56 h-10 px-2 bg-white border-solid border-gray-901 border rounded-lg">

              <date-picker format="YYYY-MM-DD HH:mm:ss" display-format="jYYYY/jMM/jDD HH:mm:ss" :value="start_date"
                           @input="onStartChange"
                           type="datetime"
                           placeholder="تاریخ را انتخاب کنید"></date-picker>
                </div>
              <span class="ml-2 mr-4">تا تاریخ</span>
              <div class="w-56 h-10 px-2 bg-white border-solid border-gray-901 border rounded-lg">
              <date-picker format="YYYY-MM-DD HH:mm:ss" display-format="jYYYY/jMM/jDD HH:mm:ss" :value="end_date"
                           @input="onEndChange"
                           type="datetime"
                           placeholder="تاریخ را انتخاب کنید"></date-picker>
                </div>
            </div>
          </div>

          <!--          table-->

          <div class="mt-5 overflow-x-auto">
            <div class="h-20 flex border-solid border-2 border-gray-901 rounded-t-lg bg-gray-902 minWight ">
              <div class="w-10 py-5 border-l-2 border-gray-901"></div>
              <div class="w-32 py-5 border-l-2 border-gray-901 text-center">شناسه</div>
              <div class="w-32 py-5 border-l-2 border-gray-901 text-center">مبلغ(ریال)</div>
              <div class="w-32 py-5 border-l-2 border-gray-901 text-center">بانک</div>
              <div class="w-32 py-5 border-l-2 border-gray-901 text-center">نام صاحب حساب</div>
              <div class="w-32 py-5 border-l-2 border-gray-901 text-center">شماره شبا</div>
              <div class="w-32 py-5 border-l-2 border-gray-901 text-center">شماره رهگیری</div>
              <div class="w-32 py-5 border-l-2 border-gray-901 text-center">تاریخ</div>
              <div class="w-32 py-5 text-center">وضعیت</div>
            </div>
            <div v-if="userWallerHistories">
              <div
                class="overflow-x-auto flex border-b-2 border-l-2 border-r-2 border-gray-901 minWight table-link"
                v-for="(i , n) in userWallerHistories.data">
                <div class="w-10 py-2 border-l-2 border-gray-901 text-center">{{ n + 1 }}</div>
                <div class="w-32 py-2 pr-2 flex border-l-2 border-gray-901 text-center">{{ '' }}</div>
                <div class="w-32 py-2 border-l-2 border-gray-901 text-center">{{ i.balance }}</div>
                <div class="w-32 py-2 border-l-2 border-gray-901 text-center">{{ '' }}</div>
                <div class="w-32 py-2 border-l-2 border-gray-901 text-center">{{ `${i.fname} ${i.lname}` }}</div>
                <div class="w-32 py-2 border-l-2 border-gray-901 text-center">{{ i.sheba }}</div>
                <div class="w-32 py-2 border-l-2 border-gray-901 text-center">{{ '' }}</div>
                <div class="w-32 py-2 border-l-2 border-gray-901 text-center">{{ '' }}</div>
                <div class="w-32 py-2 text-center">
                  <div v-if="i.status == 2" class="p-1 text-green1 bg-green-400 rounded-lg">پرداخت شده</div>
                  <div v-else class="p-1 text-pink-200 bg-pink-100 rounded-lg">پرداخت نشد</div>
                </div>
              </div>
            </div>
            <paginate
              v-if="userWallerHistories && userWallerHistories.pages_count >= 10"
              v-model="page"
              :page-count="userWallerHistories.pages_count / 10"
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
  </div>
</template>

<script>
export default {
  name: "index",
  data() {
    return {
      start_date: null,
      end_date: null,
      page: 1,
      user_id: null,
      amount: 0,
      sheba: null,
      q: '',
    }
  },
  methods: {
    onStartChange(val) {
      this.start_date = val
      const query = {
        ...this.$route.query,
        start_date: val,
      }
      this.$router.push({
        path: this.$route.path,
        query
      })
      setTimeout(() => {
        this.getResults()
      }, 500)
    },
    onEndChange(val) {
      this.end_date = val
      const query = {
        ...this.$route.query,
        end_date: val,
      }
      this.$router.push({
        path: this.$route.path,
        query
      })
    },
    showOrganizationWallet() {
      const organization_id = this.userLogin.organization_id;
      this.getOrganizationWallet(organization_id);
    },
    getOrganizationWallet(id) {
      this.$store.dispatch('wallet/userWallet/getOrganizationWallet', id)
    },
    search() {
      const query = {
        ...this.$route.query,
        q: this.q || '',
      }
      this.$router.push({
        path: this.$route.path,
        query
      })
      setTimeout(() => {
        this.getResults()
      }, 500)
    },
    clickCallback(pageNum) {
      this.page = pageNum
      const query = {
        page: pageNum,
        ...this.$route.query,
      }
      this.$router.push({
        path: this.$route.path,
        query
      })
      setTimeout(() => {
        this.getResults()
      }, 500)
    },
    getResults() {
      setTimeout(() => {
        this.$store.dispatch('wallet/userWallet/getUserWallerHistories', {
          id: this.userLogin.id,
          page: this.$route.query.page || 1,
          start_date: this.$route.query.start_date || '',
          end_date: this.$route.query.end_date || '',
          q: this.$route.query.q || '',
        })
      }, 500)
    },
    saveRequest() {
      this.$store.dispatch('wallet/userWallet/createWithdraw', {
        id: this.userLogin.id,
        balance: parseFloat(this.amount),
        sheba: this.sheba,
      })
    },
    getUserWallet(id) {
      this.$store.dispatch('wallet/userWallet/getUserWallet', id)
    },
    getOrgEmployees(id) {
      this.$store.dispatch('wallet/userWallet/getOrgEmployees', id)
    },
    getWallet() {
      this.$router.push({
        path: `/Profile/${this.user_id}/Wallet`
      })
    },
    getUserWalletHistories(id) {
      this.$store.dispatch('wallet/userWallet/getOrganizationWallerHistories', {
        id,
        start_date: '',
        end_date: '',
        q: '',
        page: '',
      })
    },
    getUserWalletHistoriesSum(id, start_date, end_date) {
      this.$store.dispatch('wallet/userWallet/getOrganizationWallerHistoriesSum', {
        id,
        start_date,
        end_date
      })
    },
    getUserWalletHistoriesDays(id, start_date, end_date) {
      this.$store.dispatch('wallet/userWallet/getOrganizationWallerHistoriesDays', {
        id,
        start_date,
        end_date
      })
    }
  },
  mounted() {
    this.q = this.$route.query.q || ''
    this.start_date = this.$route.query.start_date || ''
    this.end_date = this.$route.query.end_date || ''
    this.page = this.$route.query.page || ''
    const query = {
      q: this.q,
      start_date: this.start_date,
      end_date: this.end_date,
      page: this.page,
    }
    this.$router.push({
      path: this.$route.path,
      query
    })
    setTimeout(() => {
        this.getResults()
      }, 500)
  },
  computed: {
    recordList() {

    },
    userLogin() {
      return this.$store.getters['login/getUser']
    },
    wallet() {
      return this.$store.getters['wallet/userWallet/getUserWallet']
    },
    employees() {
      return this.$store.getters['wallet/userWallet/getOrgEmployees']
    },
    userWallerHistories() {
      return this.$store.getters['wallet/userWallet/getUserWallerHistories']
    },
    userWallerHistoriesSum() {
      return this.$store.getters['wallet/userWallet/getUserWallerHistoriesSum']
    },
    userWallerHistoriesDays() {
      return this.$store.getters['wallet/userWallet/getUserWallerHistoriesDays']
    }
  },
}
</script>
<style scoped>
.nuxt-link-active {
  width: 100%;
  height: 56px;
  background: #F6F7FF 0% 0% no-repeat padding-box;
  border-radius: 8px;
  opacity: 1;
  color: #5063FF;
  padding-top: 11%;
  padding-right: 5%;
}

.nuxt-link-active .img-blue {
  display: flex;
  width: 20px;
  height: 20px;
}

.nuxt-link-active .img-gray {
  display: none;
}

.img-blue {
  display: none;
  width: 20px;
  height: 20px;
}

.img-gray {
  display: flex;
  width: 20px;
  height: 20px;
}
</style>

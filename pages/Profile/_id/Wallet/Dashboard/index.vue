<template>
  <div class="container -mx-2 flex flex-wrap justify-start">
    <div class="px-2">
      <div class="w-full p-6 bg-white rounded-lg shadow-md" style="min-width: 250px;">
        <img src="/img/wallet.png" class="w-12 mx-auto">

        <div class="my-6 text-gray-700">
          <nuxt-link :to="`/Profile/${userLogin.id}/Wallet/Dashboard`" class="flex">
            <img src="/img/grid-2.png" class="img-blue">
            <img src="/img/grid-2Gray.png" class="img-gray">
            <span class="mr-4 text-sm">داشبورد</span>
          </nuxt-link>
        </div>

        <div class="mb-6 text-gray-700">
          <nuxt-link :to="`/Profile/${userLogin.id}/Wallet/Transactions`" class="flex">
            <img src="/img/right-left.png" class="img-blue">
            <img src="/img/right-leftGray.png" class="img-gray">
            <span class="mr-4 text-sm">تراکنش ها</span>
          </nuxt-link>
        </div>

        <div class="mb-6 text-gray-700">
          <nuxt-link :to="`/Profile/${userLogin.id}/Wallet/Records`" class="flex">
            <img src="/img/memo-pad.png" class="img-blue">
            <img src="/img/memo-padGray.png" class="img-gray">
            <span class="mr-4 text-sm">سوابق تسویه حساب</span>
          </nuxt-link>
        </div>

      </div>
    </div>
    <div class="px-2 sm:w-3/4 w-full">
      <div class="w-full">
        <div class="-mx-2 flex flex-wrap justify-between">

          <div class="sm:w-1/3 w-full px-2">
            <div class="w-full h-40 p-2 bg-white rounded-lg shadow-md">
              <img src="/img/Group%20300.png" class="w-12 mx-auto">
              <div class="my-4 text-center text-sm text-gray-700 light">موجودی حساب</div>
              <div class="text-black text-xs text-center"><span
                class="text-blue-902 text-xl Bold"> {{ wallet ? wallet.balance : 0 | toPersianCurrency }} </span>
              </div>
            </div>
          </div>

          <div class="sm:w-1/3 w-full px-2">
            <div class="w-full h-40 p-2 bg-white rounded-lg shadow-md">
              <img src="/img/Group%20302.png" class="w-12 mx-auto">
              <div class="my-4 text-center text-sm text-gray-700 light">تراکنش های امروز</div>
              <div class="text-orange-100 text-xl text-center Bold">{{ userWallerHistoriesDays.length | toPersianNumber }}</div>
            </div>
          </div>

          <div class="sm:w-1/3 w-full px-2">
            <div class="w-full h-40 p-2 bg-white rounded-lg shadow-md">
              <img src="/img/Group%20304.png" class="w-12 mx-auto">
              <div class="my-4 text-center text-sm text-gray-700 light">درآمدامروز</div>
              <div class="text-black text-xs text-center"><span
                class="text-green1 text-xl Bold">{{ userWallerHistoriesSum | toPersianCurrency }}</span>
              </div>
            </div>
          </div>

        </div>

        <div class="w-full p-4 mt-3 bg-white rounded-lg shadow-md" v-if="canShow">
          <div class="mb-2 flex border-b border-gray-300">
            <div class="pb-6 text-sm text-black Bold border-b-4 border-blue-902">درخواست تسویه حساب</div>
          </div>

          <div class="mt-3 p-2 flex flex-wrap">

            <div class="sm:w-2/3 w-full px-3 sm:border-l border-gray-907">
              <div class="text-gray-700 text-md">مبلغ قابل برداشت: <span
                class="text-black Bold">{{ wallet ? wallet.balance : 0 | toPersianCurrency }}</span>
              </div>

              <div class="my-6">
                <label class="text-gray-900 Bold">مبلغ</label>
                <input v-model="amount" class="w-full h-12 mt-3 px-2 rounded-lg bg-gray-200 placeholder-color-gray-500"
                       placeholder="مبلغ موزد نظر خود را وارد کنید">
              </div>
              <div>
                <label class="text-gray-900 Bold">شماره شبا(بدونIR)</label>
                <input v-model="sheba" class="w-full h-12 mt-3 px-2 rounded-lg bg-gray-200 placeholder-color-gray-500"
                       placeholder="شماره شبای حساب خود را وارد نمایید">
              </div>

              <div class="justify-end">
                <button @click="saveRequest"
                        class="w-64 h-12 mr-auto mt-5  text-center bg-blue-902 text-white rounded-lg">ثبت درخواست
                </button>
              </div>

            </div>

            <div class="sm:w-1/3 w-full px-3">
              <img src="#">
              <div class="my-3 medium text-center text-gray-900 ">لطفا توجه فرمایید</div>
              <div class="text-gray-900 text-md light text-center">
                پس از ثبت درخواست تسویه حساب، واریز وجه به حساب شما ممکن است تا <span class="Bold">۳ روز کاری</span>
                زمان ببرد
              </div>
              <div class="mt-3 text-gray-900 text-md light text-center">لطفا در وارد کردن <span
                class="Bold">شماره شبا</span> دقت لازم را مبذول فرمایید
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "index",
  mounted() {
    this.getUserWallet(this.userLogin.id)
    this.getOrgEmployees(this.userLogin.organization_id)
    let m = this.$moment(Date.now());
    const start_date = m.format("YYYY/MM/DD") + " 00:00:00";
    const end_date = m.format("YYYY/MM/DD") + " 23:59:59";
    this.getUserWallerHistories(this.userLogin.id)
    this.getUserWallerHistoriesSum(this.userLogin.id, start_date, end_date)
    this.getUserWallerHistoriesDays(this.userLogin.id, start_date, end_date)
  },
  data() {
    return {
      user_id: null,
      amount: 0,
      sheba: null,
    }
  },
  computed: {
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
  methods: {
    canShow() {
      return this.userLogin.id == this.$route.params.id
    },
    saveRequest() {
      this.$store.dispatch('wallet/userWallet/createWithdraw', {
        owner_id: this.userLogin.id,
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
      let m = this.$moment(Date.now());
      const start_date = m.format("YYYY/MM/DD") + " 00:00:00";
      const end_date = m.format("YYYY/MM/DD") + " 23:59:59";
      this.getUserWallet(this.user_id)
      this.getUserWallerHistories(this.user_id)
      this.getUserWallerHistoriesSum(this.user_id, start_date, end_date)
      this.getUserWallerHistoriesDays(this.user_id, start_date, end_date)
    },
    showOrganizationWallet() {
      const organization_id = this.userLogin.organization_id;
      this.getOrganizationWallet(organization_id);
    },
    getOrganizationWallet(id) {
      this.$store.dispatch('wallet/userWallet/getOrganizationWallet', id)
    },
    getUserWallerHistories(id) {
      this.$store.dispatch('wallet/userWallet/getUserWallerHistories', {
        id,
        start_date: '',
        end_date: '',
        q: '',
        page: '',
      })
    },
    getUserWallerHistoriesSum(id, start_date, end_date) {
      this.$store.dispatch('wallet/userWallet/getUserWallerHistoriesSum', {
        id,
        start_date,
        end_date
      })
    },
    getUserWallerHistoriesDays(id, start_date, end_date) {
      this.$store.dispatch('wallet/userWallet/getUserWallerHistoriesDays', {
        id,
        start_date,
        end_date
      })
    }
  }
}
</script>

<style scoped>

.nuxt-link-active {
  width: 100%;
  background: #F6F7FF 0% 0% no-repeat padding-box;
  border-radius: 8px;
  opacity: 1;
  color: #5063FF;
  padding: 5% 10%;
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

<template>
  <div class="container -mx-2 flex flex-wrap justify-start">
    <div class="px-2 w-1/5">
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
          <nuxt-link to="/Organization/Wallet" class="flex">
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
    <div class="px-2 w-4/5">
      <div class="w-full">
        <div class="-mx-2 flex flex-wrap justify-between w-full">

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
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "index",
  mounted() {
    this.getOrganizationWallet(this.userLogin.organization_id)
    this.getOrgEmployees(this.userLogin.organization_id)
    let m = this.$moment(Date.now());
    const start_date = m.format("YYYY/MM/DD") + " 00:00:00";
    const end_date = m.format("YYYY/MM/DD") + " 23:59:59";
    this.getUserWalletHistories(this.userLogin.organization_id)
    this.getUserWalletHistoriesSum(this.userLogin.organization_id, start_date, end_date)
    this.getUserWalletHistoriesDays(this.userLogin.organization_id, start_date, end_date)
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
    saveRequest() {
      this.$store.dispatch('wallet/userWallet/createWithdraw', {
        id: this.userLogin.id,
        balance: parseFloat(this.amount),
        sheba: this.sheba,
      })
    },
    getUserWallet(id) {
      this.$store.dispatch('wallet/userWallet/getOrganizationWallet', id)
    },
    getOrgEmployees(id) {
      this.$store.dispatch('wallet/userWallet/getOrgEmployees', id)
    },
    getWallet() {
      this.$router.push({
        path: `/Profile/${this.user_id}/Wallet`
      })
    },
    showOrganizationWallet() {
      const organization_id = this.userLogin.organization_id;
      this.getOrganizationWallet(organization_id);
    },
    getOrganizationWallet(id) {
      this.$store.dispatch('wallet/userWallet/getOrganizationWallet', id)
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
  }
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
}

.img-gray {
  display: flex;
}
</style>

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
    <div class="w-full px-2 sm:w-1/5 w-full">
      <div class="w-full">
        <div class="p-4 bg-white rounded-lg shadow-md">
          <div>موجودی اعتبار : {{ wallet ? wallet.balance : 0 | toPersianCurrency }}</div>

          <div class="mt-5 justify-center">
            <div class="my-2">
              <div class="mb-2 text-sm text-right">انتخاب مبلغ</div>
              <select
                v-model="amount"
                class="w-full h-10 px-2 bg-white border-solid border-gray-901 border rounded-lg">
                <option value="50000">{{ 50000 | toPersianCurrency }}</option>
                <option value="100000">{{ 100000 | toPersianCurrency }}</option>
                <option value="200000">{{ 200000 | toPersianCurrency }}</option>
                <option value="500000">{{ 500000 | toPersianCurrency }}</option>
                <option value="1000000">{{ 1000000 | toPersianCurrency }}</option>
              </select>
              <button @click="pay" class="py-2 px-2 my-5 w-full flex bg-blue-902 rounded-md text-white text-center"
                      style="align-items: center">
                <div class="w-8 h-8 p-2  text-right bg-blue-903 rounded-lg">
                  <img src="/img/arrow-right-to-bracket.svg">
                </div>
                <span class="mx-auto text-sm medium click">پرداخت</span>
              </button>
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
    const id = this.userLogin.organization_id;
    this.getOrganizationWallet(id)
  },
  data() {
    return {
      amount: 0
    }
  },
  methods: {
    pay() {
      const id = this.userLogin.organization_id;
      this.$store.dispatch('wallet/userWallet/increaseOrganizationWallet', {
        id: id,
        amount: parseFloat(this.amount),
      })
        .then(res => {
          this.getOrganizationWallet(id)
        })
        .catch(err => {
          console.log(err, "err")
        })
    },
    getOrganizationWallet(id) {
      this.$store.dispatch('wallet/userWallet/getOrganizationWallet', id)
    },
  },
  computed: {
    userLogin() {
      return this.$store.getters['login/getUser']
    },
    wallet() {
      return this.$store.getters['wallet/userWallet/getUserWallet']
    },
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
  width: 20px;
  height: 20px;
}

.img-gray {
  display: flex;
  width: 20px;
  height: 20px;
}
</style>


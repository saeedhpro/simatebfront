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
        <div class="p-4 bg-white rounded-lg shadow-md">

          <div class="mt-5 overflow-x-auto">
            <div class="flex border-solid border-2 border-gray-901 rounded-t-lg bg-gray-902 minWight ">
              <div class="w-10 py-5 border-l-2 border-gray-901"></div>
              <div class="w-40 py-5 border-l-2 border-gray-901 text-center">نام بیمار</div>
              <div class="w-40 py-5 border-l-2 border-gray-901 text-center">مطب</div>
              <div class="w-40 py-5 border-l-2 border-gray-901 text-center">رادیولوژی/فتوگرافی</div>
              <div class="w-40 py-5 border-l-2 border-gray-901 text-center">موجودی</div>
              <div class="w-40 py-5 text-center">تاریخ</div>
            </div>
            <div v-if="transferList && transferList.data">
              <div class="flex border-b-2 border-l-2 border-r-2 border-gray-901 minWight table-link"
                   v-for="(i , n) in transferList.data">
                <div class="w-10 py-2 border-l-2 border-gray-901 text-center">{{ n + 1 }}</div>
                <div class="w-40 py-2 pr-2 flex border-l-2 border-gray-901 text-center">
                  <img :src="i.staff.logo" class="w-8 h-8 mx-2 rounded-md" v-if="i.staff.logo">
                  <img src="/img/android-chrome-192x19211.png" class="w-8 h-8 mx-2 rounded-md" v-else>
                  {{ i.appointment.user_fname }} {{ i.appointment.user_lname }}
                </div>
                <div class="w-40 py-2 border-l-2 border-gray-901 text-center">{{ i.organization.name }}</div>
                <div class="w-40 py-2 border-l-2 border-gray-901 text-center">{{ i.staff.organization }}</div>
                <div class="w-40 py-2 border-l-2 border-gray-901 text-center">{{ i.amount | toPersianCurrency }}</div>
                <div class="w-40 py-2 text-center">{{ $moment(i.created_at.Time, "YYYY-MM-DDTHH:mm:SS").format("jYYYY/jMM/jDD") | toPersianNumber }}</div>
              </div>
            </div>
            <paginate
              v-if="transferList && transferList.pages_count >= 10"
              v-model="page"
              :page-count="transferList.pages_count / 10"
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
    }
  },
  methods: {
    clickCallback(pageNum) {
      this.$router.push({
        path: this.$route.path,
        query: {
          ...this.$route.query,
          page: pageNum
        }
      })
      this.getResults(pageNum)
    },
    getResults(page = 1) {
      this.$store.dispatch('transfer/getUserTransferList', {
        id: this.userLogin.id,
        page: page
      })
    },
  },
  mounted() {
    this.$router.push({
      path: this.$route.path,
      query: {
        ...this.$route.query,
        page: this.$route.query.page || 1
      }
    })
    this.getResults(1)
  },
  computed: {
    transferList() {
      return this.$store.getters['transfer/getUserTransferList']
    },
    userLogin() {
      return this.$store.getters['login/getUser']
    },
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

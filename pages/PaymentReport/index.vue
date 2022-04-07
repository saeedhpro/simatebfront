<template>
  <div class="container">
    <div class="flex justify-between" style="align-items: center">
      <div
        class="w-44 h-12 py-2 px-3 text-sm flex bg-blue-904 Bold text-center text-blue-902 border-solid border-2 border-blue-902 rounded-lg"
        style="align-items: center">
        <img src="/img/calenderBlue.svg" class="w-8 ml-3"/>
        <span>سوابق پرداخت</span>
      </div>
      <img src="/img/Line%2041-2.svg" class="mx-2 md:flex hidden" width="1000px">
    </div>
    <div class="my-5 bg-white rounded-lg shadow-md">
      <div class="overflow-auto">
        <div class="h-12 flex border-solid border-2 border-gray-901 rounded-t-lg bg-gray-902 minWight">
          <div class="w-10 py-2 border-l-2 border-gray-901"></div>
          <div class="w-24 py-2 border-l-2 border-gray-901 text-center">تاریخ</div>
          <div class="w-80 py-2 border-l-2 border-gray-901 text-center">نام درخواست کننده</div>
          <div class="w-80 py-2 border-l-2 border-gray-901 text-center">مبلغ</div>
          <div class="w-80 py-2 border-l-2 border-gray-901 text-center">وضعیت</div>
          <div class="w-20 py-2 text-center">عملیات</div>
        </div>
        <div v-if="RecordList">
          <div class="flex border-b-2 border-r-2 border-l-2 border-gray-901 minWight table-link"
               v-for="(i , n) in RecordList.data" :key="n">
            <div class="w-10 py-2 text-center border-l-2 border-gray-901">{{ n + 1 }}</div>
            <div class="w-24 py-2 border-l-2 border-gray-901 text-center">
              {{ $moment(i.created_at).locale("fa").format("dddd jDD jMMM") | toPersianNumber }}
            </div>
            <div class="w-80 py-2 border-l-2 border-gray-901 text-center">
              {{ i.owner ? `${i.owner.fname} ${i.owner.lname}` : '' | toPersianNumber }}
            </div>
            <div class="w-80 py-2 border-l-2 border-gray-901 text-center">{{
                i.balance | toPersianCurrency('ریال', 0)
              }}
            </div>
            <div class="w-80 py-2 border-l-2 border-gray-901 text-center">{{
                getStatus(i.status)
              }}
            </div>
            <div class="px-5 py-2 text-center flex justify-center">
              <button class="px-5 py-3 flex border-solid border border-gray-500 rounded-lg" style="align-items: center"
                      @click="accept(true, i.id)">
                <img src="/img/pen1.svg" class="ml-2">
                تایید
              </button>
              <button class="px-5 py-3 mr-3 flex border-solid border border-gray-500 rounded-lg"
                      style="align-items: center" @click="accept(false, i.id)">
                <img src="/img/trash-can.svg" class="ml-2">
                رد
              </button>
            </div>
          </div>
        </div>
        <!--      <pagination v-if="userList && userList.data" :limit="10" :data="userList.data" @pagination-change-page="getResults"></pagination>-->

      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "index",
  layout: 'admin',
  middleware: 'auth',
  mounted() {
    this.$store.dispatch('admin/holiday/getPaymentReport')
  },
  computed: {
    RecordList() {
      return this.$store.getters['admin/holiday/getPaymentReport']
    },
  },
  methods: {
    accept(accepted, id) {
      this.$store.dispatch('admin/holiday/acceptPaymentReport', {
        id: id,
        accepted
      })
        .then(res => {
          this.$snotify.success('پرداخت تایید شد', {
            timeout: 2000,
            showProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true
          })
        })
        .catch(async err => {
          if (err.response.status === 404) {
            this.$snotify.error('رد پرداخت', {
              timeout: 2000,
              showProgressBar: false,
              closeOnClick: false,
              pauseOnHover: true
            })
          }
        })
      this.$store.dispatch('admin/holiday/getPaymentReport')
    },
    getStatus(status) {
      switch (status) {
        case 0:
          return 'رد شده';
        case 1:
          return 'ثبت شده';
        case 2:
          return 'تایید شده';
      }
    }
  }
}
</script>

<style scoped>

</style>

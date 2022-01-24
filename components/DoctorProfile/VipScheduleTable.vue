<template>
  <div>
    <div class="overflow-auto">
      <div class="h-12 flex border-solid border-2 border-gray-901 rounded-t-lg bg-gray-902 minWight">
        <div class="w-10 py-2 border-l-2 border-gray-901"></div>
        <div class="w-64 py-2 border-l-2 border-gray-901 text-center">تاریخ</div>
        <div class="w-32 py-2 border-l-2 border-gray-901 text-center">ساعت</div>
        <div class="w-72 py-2 border-l-2 border-gray-901 text-center">ظرفیت پذیرش دکتر</div>
        <div class="w-72 py-2 border-l-2 border-gray-901 text-center">ظرفیت سایت دکتر</div>
        <div class="w-72 py-2 border-l-2 border-gray-901 text-center">ظرفیت اپ دکتر</div>
      </div>
      <div class="h-auto flex border-b-2 border-r-2 border-l-2 border-gray-901 minWight table-link"
           v-for="(i , n) in vipsList" :key="n">
        <div class="w-10 py-2 text-center border-l-2 border-gray-901">{{ n + 1 }}</div>
        <div class="w-64 px-3 py-2 flex border-l-2 border-gray-901 text-center" style="align-items: center">
          {{ $moment(i.start_at).format("jYYYY/jMM/jDD") }} {{ $moment(i.start_at).format("dddd") }}
        </div>
        <div class="w-32 py-2 border-l-2 border-gray-901 text-center">{{ `${$moment(i.start_at.Time).format("HH:mm")} تا ${ $moment(i.end_at.Time).format("HH:mm")}` }}</div>
        <div class="w-72 py-2 border-l-2 border-gray-901 text-center">{{ i.doctor_count }}</div>
        <div class="w-72 py-2 border-l-2 border-gray-901 text-center">{{ i.site_count }}</div>
        <div class="w-72 py-2 border-l-2 border-gray-901 text-center">{{ i.app_count }}</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "VipScheduleTable",
  data() {
    return {
      page: 1
    }
  },
  mounted() {
    this.$store.dispatch('case_types/userWallet/getVipSchedules', this.user.organization_id)
  },
  computed: {
    vipsList() {
      return this.$store.getters['case_types/userWallet/getVips']
    },
    user() {
      return this.$store.getters['login/getUser']
    }
  },
  methods: {}
}
</script>


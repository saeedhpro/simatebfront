<template>
  <div class="p-4 bg-white shadow-md rounded-lg">
    <div class="mb-2 flex border-b border-gray-300">
      <div class="pb-4 text-sm text-black Bold border-b-4 border-blue-902">آخرین کاربران آنلاین</div>
    </div>
    <div class="mt-6 overflow-x-auto">
      <div class=" flex border-solid border-2 border-gray-901 rounded-t-lg bg-gray-902 minWight ">
        <div class="w-10 py-3 border-l-2 border-gray-901"></div>
        <div class="w-48 py-3 border-l-2 border-gray-901 text-center">نام کاربر</div>
        <div class="w-32 py-3 border-l-2 border-gray-901 text-center">شماره تماس</div>
        <div class="w-40 py-3 border-l-2 border-gray-901 text-center">مطب</div>
        <div class="w-32 py-3 text-center">آخرین ورود</div>
      </div>

      <div class=" flex border-b-2 border-l-2 border-r-2 border-gray-901 minWight table-link"
           v-for="(i , n) in lastUserList">
        <div class="w-10 py-2 border-l-2 border-gray-901 text-center">{{ n + 1 }}</div>
        <div class="w-48 py-2 pr-2 flex border-l-2 border-gray-901 text-center" style="align-items: center">
          <!--        <img :src="i.logo" class="w-8 h-8 mx-2 rounded-md" v-if="i.logo">-->
          <!--        <img src="/img/1601734331278.jpg" class="w-8 h-8 mx-2 rounded-md" v-else>-->
          {{ i.user_fname }} {{ i.user_lname }}
        </div>
        <div class="w-32 py-2 border-l-2 border-gray-901 text-center">{{ i.tel | toPersianNumber}}</div>
        <div class="w-40 py-2 border-l-2 border-gray-901 text-center">{{i.organization_name}}</div>
        <div class="w-32 py-2 text-center">{{$moment(i.last_login).format('YYYY/M/DD') | toRelativeDate }}</div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: "LastUser",
  mounted() {
    this.$store.dispatch('admin/user/getLastPatientLogin')
  },
  computed: {
    lastUserList() {
      return this.$store.getters['admin/user/getLastPatientLogin']
    }
  }

}
</script>

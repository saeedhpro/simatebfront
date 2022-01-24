<template>
  <div class="header-bg">
    <div class="md:h-16 h-auto container flex flex-wrap  align-center bg-blue-901" style="align-items: center">
      <div class="md:flex flex" v-if="user" style="align-items: center">
        <img :src="user.logo" class="w-10 h-10 ml-2 rounded-full" v-if="user.logo">
        <img v-else src="/img/1601734331278.jpg" class="w-10 h-10 ml-2 rounded-full">
        <div class="text-gray-903 text-sm">{{ user.fname }} {{ user.lname }}</div>

        <div class="relative">
          <button @click="show =! show ">
            <img src="/img/sort-down.svg"/>
          </button>
          <div class="p-2 w-44 text-sm absolute rounded-lg text-gray-700 bg-white text-center shadow-md z-50"
               v-if="show">
            <div class="py-3 border-b border-gray-500">
              <nuxt-link :to="`/Profile/${user.id}`" class="bg-white" >پروفایل کاربر</nuxt-link>
            </div>
            <div class="py-3 border-b border-gray-500">
              <nuxt-link :to="`/Organization/Wallet`" class="bg-white">کیف پول سازمان</nuxt-link>
            </div>
            <div class="py-3 border-b border-gray-500">
              <nuxt-link :to="`/Profile/${user.id}/Wallet`" class="bg-white">کیف پول من</nuxt-link>
            </div>
            <div class="py-3 border-b border-gray-500">
              <nuxt-link to="/Organization/Report" class="bg-white" >گزارشات</nuxt-link>
            </div>
            <div class="py-3">
              <button  @click="exitAccount">خروج از حساب کاربری</button>
            </div>
          </div>
        </div>

      </div>
      <div class="mx-auto white-header">
        <nuxt-link to="/Admin/Dashboard" class="mx-3 h-12 justify-center text-sm text-gray-903 text-1 rounded-lg">داشبورد</nuxt-link>
        <nuxt-link to="/Admin/Users" class="mx-3 h-12 justify-center text-sm text-gray-903 text-1 rounded-lg">کاربران</nuxt-link>
        <nuxt-link to="/Admin/Institution" class="mx-3 h-12 justify-center text-sm text-gray-903 text-1 rounded-lg">موسسات</nuxt-link>
        <nuxt-link to="/Admin/Messages" class="mx-3 h-12 justify-center text-sm text-gray-903 text-1 rounded-lg">پیامک ها</nuxt-link>
<!--        <nuxt-link to="/Admin/FileManager" class="mx-3 h-12 justify-center text-sm text-gray-903 text-1 rounded-lg">مدیریت فایل ها</nuxt-link>-->
        <nuxt-link to="/Admin/BankHoliday" class="mx-3 h-12 justify-center text-sm text-gray-903 text-1 rounded-lg">تعطیلات رسمی</nuxt-link>
        <nuxt-link to="/PaymentReport" class="mx-3 h-12 justify-center text-sm text-gray-903 text-1 rounded-lg">سوابق پرداخت</nuxt-link>
      </div>
    </div>
  </div>

</template>

<script>
export default {
  name: "Header",
  data(){
    return{
      show : false
    }
  },
  computed:{
    user(){
      return this.$store.getters['login/getUser']
    }
  },
  methods:{
    async exitAccount(){
      await this.$store.dispatch('login/exit')
      await this.$router.replace('/Login')
    },
  }
}
</script>

<style scoped>
.nuxt-link-active{
  background-color: #26264E;
  padding: 2% 3% 2% 3% ;
  /*height: 64px;*/
}
.nuxt-link-active{
  color: #00E5FF;
}
@media (min-width: 1000px) {
  .white-header{
    width: 700px;
  }
}
</style>

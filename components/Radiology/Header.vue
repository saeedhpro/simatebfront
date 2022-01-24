<template>
  <div class="header-bg">
    <div class="md:h-16 h-auto container flex flex-wrap justify-between align-center" style="align-items: center">
      <div class="md:flex flex" v-if="user" style="align-items: center">
        <img :src="user.logo" class="w-10 h-10 ml-2 rounded-full" v-if="user.logo">
        <img src="/img/1601734331278.jpg" class="w-10 h-10 ml-2 rounded-full">
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
              <nuxt-link to="/Organization/Report" class="bg-white" >گزارشات</nuxt-link>
            </div>
            <div class="py-3">
              <button  @click="exitAccount">خروج از حساب کاربری</button>
            </div>
          </div>
        </div>
      </div>
      <div class="md:flex flex flex-wrap">
        <nuxt-link to="/Radiology/Send" class="mx-2 h-12 justify-center flex rounded-lg"
                   style="align-items: center;width: 160px;">
          <img src="/img/HeaderGray.svg" class="ml-2 w-8 header-tag-first">
          <img src="/img/Header1.svg" class="ml-2 w-8 header-tag">
          <div class="text-white link-text">پذیرش</div>
          <img src="/img/Header6.svg" class="mr-3 w-2 header-tag">
        </nuxt-link>

        <nuxt-link to="/Radiology/PatientsRadiology" class="mx-2 h-12 justify-center flex rounded-lg" style="align-items: center;width: 160px;">
          <img src="/img/Header3.svg" class="ml-2 w-8 header-tag-first">
          <img src="/img/HeaderPurple.svg" class="ml-2 w-8 header-tag">
          <div class="text-white link-text">بیماران</div>
          <img src="/img/Header6.svg" class="mr-3 w-2 header-tag">
        </nuxt-link>
        <nuxt-link to="/Radiology/Messages" class="mx-2 h-12 justify-center flex rounded-lg" style="align-items: center;width: 160px;">
          <img src="/img/Header4.svg" class="ml-2 w-8 header-tag-first">
          <img src="/img/HeaderGreen.svg" class="ml-2 w-8 header-tag">
          <div class="text-white link-text">پیام رسان</div>
          <img src="/img/Header6.svg" class="mr-3 w-2 header-tag">
        </nuxt-link>
      </div>
      <div class="md:flex flex" style="align-items: center">
        <img src="/img/Header5.svg" class="w-8 ml-3">
        <div class="text-white">{{user.organization_name}}</div>
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
.header-bg{
  background-color: #3D3D66;
}
.nuxt-link-active{
  background-color: #26264E;
}
.nuxt-link-active .link-text{
  color: #00E5FF;
}
.nuxt-link-active .link-text1{
  color: #FFBE26;
}
.nuxt-link-active .link-text2{
  color: #E040FB;
}
.nuxt-link-active .link-text3{
  color: #00E676;
}
.nuxt-link-active .header-tag{
  display: flex;
}
.nuxt-link-active .header-tag-first{
  display: none;
}
.header-tag{
  display: none;
}
.header-tag-first{
  display: flex;
}
</style>

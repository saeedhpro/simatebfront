<template>
  <div class="header-bg">
    <div class="md:h-16 h-auto container flex flex-wrap justify-between align-center" style="align-items: center">
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
              <nuxt-link :to="`/Profile/${user.id}`" class="bg-white">پروفایل کاربر</nuxt-link>
            </div>
            <div class="py-3 border-b border-gray-500">
              <nuxt-link :to="`/Organization/Wallet`" class="bg-white">کیف پول سازمان</nuxt-link>
            </div>
            <div class="py-3 border-b border-gray-500">
              <nuxt-link :to="`/Profile/${user.id}/Wallet/Dashboard`" class="bg-white">کیف پول من</nuxt-link>
            </div>
            <div class="py-3 border-b border-gray-500">
              <nuxt-link to="/Organization/Report" class="bg-white">گزارشات</nuxt-link>
            </div>
            <div class="py-3">
              <button @click="exitAccount">خروج از حساب کاربری</button>
            </div>
          </div>
        </div>

      </div>
      <div class="md:flex flex flex-wrap">
        <nuxt-link
          to="/Organization/Admissions" class="mx-2 h-12 justify-center flex rounded-lg"
          style="align-items: center;width: 160px;">
          <img src="/img/HeaderGray.svg" class="ml-2 w-8 header-tag-first">
          <img src="/img/Header1.svg" class="ml-2 w-8 header-tag">
          <div class="text-white link-text">پذیرش</div>
          {{admissions.pages_count}}
          <span v-if="admissions.pages_count > 0">
            <img src="/img/Header6.svg" class="mr-3 w-2 header-tag">
          </span>
        </nuxt-link>
        <nuxt-link
          v-if="canShow('doc')"
          to="/Organization/Appointment" class="mx-2 h-12 justify-center flex rounded-lg"
          style="align-items: center;width: 160px;">
          <img src="/img/Header2.svg" class="ml-2 w-8 header-tag-first">
          <img src="/img/HeaderOrange.svg" class="ml-2 w-8 header-tag">
          <div class="text-white link-text1">رزرو وقت</div>
        </nuxt-link>
        <nuxt-link
          to="/Organization/Patients" class="mx-2 h-12 justify-center flex rounded-lg"
          style="align-items: center;width: 160px;">
          <img src="/img/Header3.svg" class="ml-2 w-8 header-tag-first">
          <img src="/img/HeaderPurple.svg" class="ml-2 w-8 header-tag">
          <div class="text-white link-text2">بیماران</div>
        </nuxt-link>
        <nuxt-link
          to="/Organization/Messages" class="mx-2 h-12 justify-center flex rounded-lg"
          style="align-items: center;width: 160px;">
          <img src="/img/Header4.svg" class="ml-2 w-8 header-tag-first">
          <img src="/img/HeaderGreen.svg" class="ml-2 w-8 header-tag">
          <div class="text-white link-text3">پیام رسان</div>
        </nuxt-link>
        <nuxt-link
          v-if="user && user.user_group_id === 2"
          to="/Admin" class="mx-2 h-12 justify-center flex rounded-lg"
          style="align-items: center;width: 160px;">
          <img src="/img/Header4.svg" class="ml-2 w-8 header-tag-first">
          <img src="/img/HeaderGreen.svg" class="ml-2 w-8 header-tag">
          <div class="text-white link-text3">پنل ادمین</div>
        </nuxt-link>
      </div>
      <div class="md:flex flex" style="align-items: center">
        <img src="/img/Header5.svg" class="w-8 ml-3">
        <div class="text-white">{{ user ? user.organization_name : '' }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Header",
  middleware: 'auth',
  data() {
    return {
      show: false,
      admissions: {
        pages_count: 0
      }
    }
  },
  computed: {
    user() {
      return this.$store.getters['login/getUser']
    }
  },
  methods: {
    async getToday() {
      let today = new Date();
      let start_date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate() + " 00:00:00";
      let end_date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate() + " 23:59:59";
      let {pages_count} = await this.$store.dispatch('doctor/patients/getTodayAdmissions', {
        start_date, end_date, page: 1, q: this.$route.query.q || ''
      })
      this.admissions.pages_count = pages_count
    },
    openPopUp() {
      this.show = !this.show
    },
    async exitAccount() {
      await this.$store.dispatch('login/exit')
      await this.$router.replace('/Login')
    },
    canShow(prof) {
      const p = this.user.profession
      switch (prof) {
        case "radio":
          if (p.id != 1 && p.id != 2) {
            console.log(p.name)
            return true
          }
          break;
        case "photo":
          if (p.id != 2 && p.id != 3) {
            return true
          }
          break;
        case "lab":
          if (p.id != 1 && p.id != 3) {
            return true
          }
          break;
        case "doc":
        case "pay":
          if (p.id != 1 && p.id != 2 && p.id != 3) {
            return true
          }
          break;
      }
      return false;
    },
  }
}
</script>

<style scoped>
.header-bg {
  background-color: #3D3D66;
}

.nuxt-link-active {
  background-color: #26264E;
}

.nuxt-link-active .link-text {
  color: #00E5FF;
}

.nuxt-link-active .link-text1 {
  color: #FFBE26;
}

.nuxt-link-active .link-text2 {
  color: #E040FB;
}

.nuxt-link-active .link-text3 {
  color: #00E676;
}

.nuxt-link-active .header-tag {
  display: flex;
}

.nuxt-link-active .header-tag-first {
  display: none;
}

.header-tag {
  display: none;
}

.header-tag-first {
  display: flex;
}
</style>


<template>
  <div>
    <vue-modaltor :visible="open" @hide="open=false">
      <template #header>
        <!--    add your custom header     -->
        <div class="pb-3" style="align-items: center">
          <div class="w-5 h-5 p-1 border-solid border-gray-901 border rounded">
            <img src="/img/xmark.svg" @click="close">
          </div>
        </div>
      </template>
      <template #body>
        <img src="/img/android-chrome-192x192.png" class="mx-auto">
        <div class="w-32 pb-1 my-5 mx-auto text-center text-black border-b-2 border-black">فراموشی رمز عبور</div>
        <div class="w-60 mx-auto mt-5">در صورت فراموشی رمز عبور خود، لطفا با <span>مدیریت سیماطب</span> ارتباط حاصل
          فرمایید
        </div>
        <div class="my-5 text-center mx-auto">با تشکر</div>
        <button class="w-28 h-10 py-2 mx-auto text-center bg-gray-907 rounded-lg" @click="close">متوجه شدم</button>
      </template>
    </vue-modaltor>
    <div class="w-full mt-20 bg-gray-903 items-center h-full  justify-center">
      <div class="p-2 mx-auto flex justify-between bg-white shadow-lg rounded-sm text-center style-log">
        <div class="p-2" style="width: 330px">
          <img src="/img/android-chrome-192x192.png" class="mx-auto">
          <div class="w-32 pb-1 my-5 mx-auto text-center text-black border-b-2 border-black black">ورود به سایت</div>
          <div class="relative">
            <input class="mt-2 pr-12 w-full h-12 bg-gray-200 rounded-md placeholder-gray-901" v-model="tel"
                   placeholder="شماره همراه"/>
            <img src="/img/phone.svg" class="w-3 -mt-7 mr-5 absolute">
          </div>
          <div class="relative">
            <input type="password" class="my-5 pr-12 w-full h-12 bg-gray-200 rounded-md placeholder-gray-901"
                   v-model="password" placeholder="رمز عبور"/>
            <img src="/img/lock-keyhole.svg" class="w-3 -mt-12 mr-5 absolute">
          </div>
          <button @click="login" class="py-2 px-2 my-5 w-full flex bg-blue-902 rounded-md text-white text-center"
                  style="align-items: center">
            <div class="w-8 h-8 p-2  text-right bg-blue-903 rounded-lg">
              <img src="/img/arrow-right-to-bracket.svg">
            </div>
            <span class="mx-auto text-sm medium click">ورود</span>
          </button>
          <button class="text-black underline text-center click text-sm" @click="open=true">رمز عبورم را فراموش کرده
            ام
          </button>

        </div>
        <div class="sm:flex hidden relative">
          <div>
            <img src="/img/O6UZR60-min.png" style="height: 420px;width: 420px;">
            <img src="/img/login-bottom.svg" class="-mt-12 mx-auto" style="width: 410px;opacity: 0.8;">
          </div>
        </div>
      </div>
    </div>
    <vue-snotify></vue-snotify>
  </div>
</template>

<script>
export default {
  name: "index",
  layout: 'login',
  data() {
    return {
      open: false,
      tel: '',
      password: ''
    }
  },
  methods: {
    close() {
      this.open = false
    },
    login() {
      this.$store.dispatch('login/login', {
        tel: this.tel,
        password: this.password
      })
        .then(res => {
          this.$cookies.set('token', res.access_token)
          this.$snotify.success('با موفقیت وارد شدید', {
            timeout: 2000,
            showProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true
          })
          setTimeout(() => {
            window.location.href = '/Organization'
          }, 200)
        })

        .catch(async err => {
          if (err.response.data.errors.password) {
            this.$snotify.error(err.response.data.errors.password, {
              timeout: 2000,
              showProgressBar: false,
              closeOnClick: false,
              pauseOnHover: true
            })
            return;
          }
          const keys = Object.keys(err.response.data.errors);
          for (let i = 0; i < keys.length; i++) {
            for (let j = 0; j < err.response.data.errors[keys[i]].length; j++) {
              await this.$snotify.error(err.response.data.errors[keys[i]][j], {
                timeout: 2000,
                showProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true
              })
            }
          }
        })
    }
  },
}
</script>

<style scoped>
.style-log {
  width: 800px
}

@media (max-width: 500px) {
  .style-log {
    width: 100%
  }
}
</style>

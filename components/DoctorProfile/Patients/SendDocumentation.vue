<template xmlns="http://www.w3.org/1999/html">
  <div class="p-3 bg-white rounded-lg">
    <div class="flex justify-end">

      <button
        class="w-40 h-12 px-2 ml-2 text-sm flex border-solid border border-blue-902 rounded-lg text-blue-902 text-center click"
        @click="openFileChooser"
        style="align-items: center">
        <img src="/img/Group%20191.svg" class="w-8 h-8 ml-2">
        <span class="mx-auto">افزودن فایل</span>
      </button>

      <button class="w-40 h-12 px-2 text-sm flex bg-blue-902 rounded-lg text-white text-center click"
              @click="openImageChooser"
              style="align-items: center">
        <img src="/img/Group%20191%20(1).svg" class="w-8 h-8 ml-2">
        <span class="mx-auto">افزودن تصویر</span>
      </button>
      <input @change="uploadImage" name="logo" type="file" hidden ref="logo" accept="image/*">
      <input @change="uploadFile" name="file" type="file" hidden ref="file" accept="application/pdf">
      <vue-modaltor :visible="getDesc" @hide="getDesc = false">
        <template #body>
          <div class="pt-3 flex flex-row flex-wrap justify-start" style="align-items: center">
            <div class="flex row" style="margin: 5px">
              <div>سند ارسالی</div>
              <img v-if="type === 'image'" :src="logo" class="mr-2 w-36 h-36">
              <a :href="logo" v-else class="mr-2 w-36 h-36"></a>
            </div>
            <div class="flex flex-row flex-wrap">
              <div class="flex flex-col" style="margin: 5px">
                <label>توضیحات پزشک</label>
                <textarea v-model="doctor_desc" cols="7"
                          style="min-width: 175px; min-height: 150px; padding: 5px"></textarea>
              </div>
            </div>

          </div>

          <div class="mt-8 flex flex-wrap justify-between">
            <div class="flex" style="align-items: center">
              <button class="w-28 h-10 py-2 text-center bg-gray-907 rounded-lg" @click="getDesc = false">انصراف</button>
              <button class="w-56 h-10 py-2 mr-3 text-center bg-blue-902 rounded-lg text-white" @click="sendDoc">
                ارسال
              </button>
            </div>
          </div>

        </template>
      </vue-modaltor>
    </div>
    <div v-for="(i, n) in docs" :key="n"
         class="-mx-2 my-5 flex flex-wrap justify-between md:border-b-0 border-b border-gray-500 relative"
         style="align-items: end">
      <div class="px-2">
        <img v-if="i.type == 'image'" :src="getFilePath(i.path)" class="w-32 h-32"/>
        <a :href="getFilePath(i.path)" v-else class="w-32 h-32">{{ i.name }}</a>
      </div>

      <div class="px-2">
        <label class="mb-2 text-blue-906 text-sm">توضیح پزشک</label>
        <div class="w-80 p-3 h-28 border-solid border border-gray-902 rounded-lg">
          {{ i.doctor_desc }}
        </div>
      </div>

      <div class="px-2">
        <label class="mb-2 text-blue-906 text-sm">نظر بیمار</label>
        <div class="w-80 p-3 h-28 border-solid border border-gray-100 rounded-lg">
          {{ i.user_desc }}
        </div>
      </div>

      <div class="px-2">
        <div
          @click="deleteDoc(i.id)"
          class=" absolute top-1/4 left-10 h-8 w-8 text-center flex flex-col justify-center items-center cursor-pointer border-solid border border-gray-500 hover:border-pink-200 rounded-lg bg-gray-909 hover:bg-pink-400">
          <img src="/img/trash-can.svg" class="h-5 w-5 my-auto"/>
        </div>
      </div>

    </div>
  </div>
</template>

<script>

export default {
  name: "SendDocumentation",
  data() {
    return {
      open: false,
      show: false,
      getDesc: false,
      logoFile: null,
      logo: null,
      image: null,
      user_desc: null,
      doctor_desc: null,
      type: 'image',
      params: {
        token: '123456798',
        name: 'avatar'
      },
      headers: {
        "Authorization": `Bearer ${this.$cookies.get('token')}`
      },
    }
  },
  mounted() {
    this.getDocs()
  },
  computed: {
    docs() {
      return this.$store.getters['docs/userWallet/getDocs']
    },
    user() {
      return this.$store.getters['login/getUser']
    }
  },
  methods: {
    getDocs() {
      this.$store.dispatch('docs/userWallet/getDocs', this.$route.params.id)
    },
    openFileChooser() {
      this.$refs.file.click();
    },
    openImageChooser() {
      this.$refs.logo.click();
    },
    uploadFile(e) {
      const logoFile = e.target.files[0];
      if (!logoFile) {
        return
      }
      this.type = 'file'
      const formData = new FormData();
      formData.set("file", logoFile)
      this.$store.dispatch("upload/logo", formData)
        .then(res => {
          this.getFile(`${res.id}/${res.name}`)
          this.uploaded = res
          this.getDesc = true;
        })
        .catch(err => {
          console.log(err)
        })
    },
    sendDoc() {
      this.$store.dispatch('docs/userWallet/sendDoc', {
        user_id: parseInt(this.$route.params.id),
        name: this.uploaded.name,
        path: this.uploaded.path,
        type: this.type,
        doctor_desc: this.doctor_desc,
        user_desc: this.user_desc,
        profession_id: this.user.profession.id,
      })
        .then(res => {
          this.uploaded = null
          this.getDesc = null
          this.doctor_desc = null
          this.user_desc = null
          setTimeout(() => {
            this.getDocs()
          }, 200)
        })
        .catch(err => {
          console.log(err, "err")
        })
    },
    uploadImage(e) {
      const logoFile = e.target.files[0];
      if (!logoFile) {
        return
      }
      this.type = 'image'
      const formData = new FormData();
      formData.set("file", logoFile)
      this.$store.dispatch("upload/logo", formData)
        .then(res => {
          this.getFile(`${res.id}/${res.name}`)
          this.uploaded = res
          this.getDesc = true;
        })
        .catch(err => {
          console.log(err)
        })
    },
    async getFile(path) {
      const res = await this.$store.dispatch("upload/getFile", path)
      this.logo = res.url;
    },
    getFilePath(path) {
      return 'http://localhost:3000' + path
    },
    setMale() {
      this.status = '1';
      this.gender = 'male'
    },
    setFemale() {
      this.status = '2';
      this.gender = 'female'
    },
    deleteDoc(id) {
      this.$store.dispatch('docs/userWallet/deleteDoc', id)
        .then(() => {
          setTimeout(() => {
            this.getDocs()
          })
        })
    }
  }
}
</script>

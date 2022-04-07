<template>
  <div class="p-5 bg-white rounded-lg">
    <div class="flex flex-wrap items-center text-center justify-start">
      <div class="sm:w-1/4 w-full h-64 p-2 mx-1  upload-box-title-box rounded-lg bg-blue-904 text-center  relative"
           @click="openFileChooser">
        <div class="p-10 h-60 text-center flex flex-col border-2 border-dashed border-blue-902 rounded-lg">
          <div class="my-5 upload-box-title-input">
            <img src="/img/circle-plus.svg" class="w-16 mx-auto">
            <div class="mt-5 text-blue-902">افزودن تصویر</div>
            <input ref="upload" accept="image/jpeg,png" type="file" hidden @change="openFileChooser">
          </div>
          <input @change="uploadLogo" name="logo" type="file" hidden ref="logo" accept="image/*">
        </div>
      </div>
      <div v-for="(l, n) in logos" :key="n" class="sm:w-1/4 w-full h-auto mx-1 rounded-lg">
        <img :src="l" class="mr-2 w-36 h-36">
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: "InstitutionPic",
  data() {
    return {
      logos: [],
    }
  },
  async mounted() {
    const data = await this.$store.dispatch('admin/Institution/getInstitutionsImagesList', this.$route.params.id)
    this.logos = data.logos
  },
  methods: {
    openFileChooser() {
      this.$refs.logo.click();
    },
    uploadLogo(e) {
      const logoFile = e.target.files[0];
      if (!logoFile) {
        return
      }
      const formData = new FormData();
      formData.set("file", logoFile)
      this.$store.dispatch("upload/uploadOrgImage", {
        id: this.$route.params.id,
        data: formData
      })
        .then(res => {
          this.getFile(`${res.id}/${res.name}`)
        })
        .catch(err => {
          console.log(err)
        })
    },
    async getFile(path) {
      const res = await this.$store.dispatch("upload/getOrgImages", path)
      this.logos.push(res.url);
    },
  }
}
</script>

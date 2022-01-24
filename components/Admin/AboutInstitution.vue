<template>
  <div class="py-2 px-3 my-5 bg-white rounded-lg">
    <button class="w-36 h-12 px-2 text-sm flex bg-blue-902 rounded-lg text-white text-center"
            @click="save"
            style="align-items: center">
      <div class="w-8 h-8 p-2 ml-4 bg-blue-903 rounded-lg text-center">
        <img src="/img/user-plus.svg">
      </div>
      <span>ذخیره</span>
    </button>
    <div class="flex flex-row">
      <input @change="uploadLogo" name="logo" type="file" hidden ref="image" accept="image/*">
      <div class="md:w-1/5 w-full mx-1">
        <div>
          <div>
            <label class=" text-sm">متن یک</label>
            <textarea v-model="about.text1" class="h-20 my-2 w-full rounded-lg bg-gray-200"></textarea>
          </div>
          <div>
            <label class=" text-sm">تصویر یک</label>
            <img @click="openFileChooser(1)" v-if="about.image1" :src="about.image1" class="cursor-pointer mr-2 ">
            <div v-else class="w-full h-60 my-2 p-2 mx-1  upload-box-title-box rounded-lg bg-blue-904 text-center  relative"
                 @click="openFileChooser(1)">
              <div class="p-10 h-full text-center flex flex-col border-2 border-dashed border-blue-902 rounded-lg justify-center">
                <div class="my-5 upload-box-title-input">
                  <!--          <img src="/images/upload-icon.png">-->
                  <div class="cursor-pointer text-blue-902">افزودن تصویر</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="md:w-1/5 w-full mx-1">
        <div>
          <div>
            <label class=" text-sm">متن دو</label>
            <textarea v-model="about.text2" class="h-20 my-2 w-full rounded-lg bg-gray-200"></textarea>
          </div>
          <div>
            <label class=" text-sm">تصویر دو</label>
            <img @click="openFileChooser(2)" v-if="about.image2" :src="about.image2" class="cursor-pointer mr-2 ">
            <div v-else class="w-full h-60 my-2 p-2 mx-1  upload-box-title-box rounded-lg bg-blue-904 text-center  relative"
                 @click="openFileChooser(2)">
              <div class="p-10 h-full text-center flex flex-col border-2 border-dashed border-blue-902 rounded-lg justify-center">
                <div class="my-5 upload-box-title-input">
                  <!--          <img src="/images/upload-icon.png">-->
                  <div class="cursor-pointer text-blue-902">افزودن تصویر</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="md:w-1/5 w-full mx-1">
        <div>
          <div>
            <label class=" text-sm">متن سه</label>
            <textarea v-model="about.text3" class="h-20 my-2 w-full rounded-lg bg-gray-200"></textarea>
          </div>
          <div>
            <label class=" text-sm">تصویر سه</label>
            <img @click="openFileChooser(3)" v-if="about.image3" :src="about.image3" class="cursor-pointer mr-2 ">
            <div v-else class="w-full h-60 my-2 p-2 mx-1  upload-box-title-box rounded-lg bg-blue-904 text-center  relative"
                 @click="openFileChooser(3)">
              <div class="p-10 h-full text-center flex flex-col border-2 border-dashed border-blue-902 rounded-lg justify-center">
                <div class="my-5 upload-box-title-input">
                  <!--          <img src="/images/upload-icon.png">-->
                  <div class="cursor-pointer text-blue-902">افزودن تصویر</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="md:w-1/5 w-full mx-1">
        <div>
          <div>
            <label class=" text-sm">متن چهار</label>
            <textarea v-model="about.text4" class="h-20 my-2 w-full rounded-lg bg-gray-200"></textarea>
          </div>
          <div>
            <label class=" text-sm">تصویر چهار</label>
            <img @click="openFileChooser(4)" v-if="about.image4" :src="about.image4" class="cursor-pointer mr-2">
            <div v-else class="w-full h-60 my-2 p-2 mx-1  upload-box-title-box rounded-lg bg-blue-904 text-center  relative"
                 @click="openFileChooser(4)">
              <div class="p-10 h-full text-center flex flex-col border-2 border-dashed border-blue-902 rounded-lg justify-center">
                <div class="my-5 upload-box-title-input">
                  <!--          <img src="/images/upload-icon.png">-->
                  <div class="cursor-pointer text-blue-902">افزودن تصویر</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AboutInstitution",
  data() {
    return {
      about: {
        image1: "",
        image2: "",
        image3: "",
        image4: "",
        text1: "",
        text2: "",
        text3: "",
        text4: "",
      },
      id: null,
    }
  },
  async mounted() {
    this.about = await this.$store.dispatch('admin/Institution/getInstitutionsAbout', this.$route.params.id)
  },
  methods: {
    openFileChooser(id) {
      this.id = id;
      this.$refs.image.click();
    },
    uploadLogo(e) {
      const logoFile = e.target.files[0];
      if (!logoFile) {
        return
      }
      const formData = new FormData();
      formData.set("file", logoFile)
      this.$store.dispatch("upload/logo", formData)
        .then(res => {
          this.getFile(`${res.id}/${res.name}`)
        })
        .catch(err => {
          console.log(err)
        })
    },
    async getFile(path) {
      const res = await this.$store.dispatch("upload/getFile", path)
      if (this.id === 1) {
        this.about.image1 = res.url;
      } else if (this.id === 2) {
        this.about.image2 = res.url;
      } else if (this.id === 3) {
        this.about.image3 = res.url;
      } else if (this.id === 4) {
        this.about.image4 = res.url;
      }
    },
    save() {
      this.$store.dispatch('admin/Institution/updateInstitutionsAbout', {
        id: this.$route.params.id,
        data: this.about
      })
    }
  }
}
</script>

<style scoped>

</style>

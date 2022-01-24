<template>
  <div class="flex md:mt-0 mt-2" style="align-items: center">
    <div class="ml-5 text-gray-700 text-sm">{{ InstitutionList ? InstitutionList.pages_count : 0 }} نتیجه</div>
    <div class="relative">
      <input
        v-model="q"
        class="h-12 pl-5 wh pr-10 pb-2 border-2 border-gray-901 rounded-lg placeholder-gray-600 text-gray-600 bg-white focus:outline-none appearance-none wight-search"
        placeholder="جستجو">
      <img src="/img/magnifying-glass.svg" class="w-4 mr-3 absolute" style="margin-top: -35px">
      <button
        class="mr-auto w-24 h-10 py-2 px-3 absolute flex bg-gray-100 hover:bg-blue-904 text-blue-906 hover:text-blue-902 border-solid border-2 border-gray-901 hover:border-blue-902 rounded-lg hover1 click"
        style="align-items: center;left: 5px;margin-top: -44px">
        <img src="/img/magnifying-glassBlue.svg" class="w-3 ml-1 blue1"/>
        <img src="/img/magnifying-glass.svg" class="w-3 ml-1 gray1"/>
        <span class="mb-1 text-sm click cursor-pointer" @click="search">جستجو</span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "SearchIns",
  data() {
    return {
      q: '',
    }
  },
  computed:{
    InstitutionList() {
      return this.$store.getters['admin/Institution/getInstitutions']
    }
  },
  mounted() {
    this.q = this.$route.query.q || null
  },
  methods: {
    search() {
      const page = this.$route.query.page || 1
      const query = {
        page,
        q: this.q || null,
      }
      this.$router.push({
        path: this.$route.path,
        query
      })
      setTimeout(() => {
        this.getResults()
      }, 200);
    },
    async getResults() {
      const route = this.$route.path
      switch (route) {
        case '/Admin/Institution':
          this.searchAdminOrgs();
          break;
        default:
          this.searchOrganizationMessages();
      }
    },
    searchAdminOrgs() {
      this.$store.dispatch('admin/Institution/getInstitutions', {page: this.$route.query.page || 1, q: this.$route.query.q})
    },
    searchOrganizationMessages() {
      this.$store.dispatch('admin/messages/getOrganizationMessages', {
        page: this.$route.query.page || 1,
        q: this.$route.query.q
      })
    }
  }
}
</script>

<style scoped>
@media (min-width: 720px) {
  .wh {
    width: 436px
  }

  .wight-search {
    width: 536px !important;
  }
}

.wh {
  width: 100%;
}

.wight-search {
  width: 100%;
}

.hover1 .blue1 {
  display: none;
}

.hover1 gray1 {
  display: flex;
}

.hover1:hover .blue1 {
  display: flex;
}

.hover1:hover .gray1 {
  display: none;
}
</style>

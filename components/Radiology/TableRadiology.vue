<template>
<div class="overflow-auto">
  <div class="h-16 flex border-solid border-2 border-gray-901 rounded-t-lg bg-gray-902 minWight">
<div class="w-10 py-5 border-l-2 border-gray-901"></div>
<div class="w-64 py-5 border-l-2 border-gray-901 text-center">بیمار</div>
<div class="w-32 py-5 border-l-2 border-gray-901 text-center">موبایل</div>
<div class="w-32 py-5 border-l-2 border-gray-901 text-center">کد پذیرش</div>
<div class="w-40 py-5 border-l-2 border-gray-901 text-center">تاریخ ویزیت</div>
<div class="w-64 py-5 border-l-2 border-gray-901 text-center">درخواست پزشک</div>
    <div class="w-32 py-5 mx-auto text-center">وضعیت</div>
  </div>
  <div v-if="listUser">
  <div class="h-10 flex border-b-2 border-r-2 border-l-2 border-gray-901 table-link minWight" v-for="(i , n) in listUser.data">
    <div class="w-10 py-2 border-l-2 border-gray-901 text-center">{{ n+1 }}</div>
    <div class="w-64 py-2 pr-2 flex border-l-2 border-gray-901 text-center" style="align-items: center">
      <input type="checkbox">
      <img :src="i.logo" class="w-8 h-8 mx-2 rounded" v-if="i.logo">
      <img src="/img/android-chrome-192x19211.png" class="w-8 h-8 mx-2 rounded" v-else>
      {{ i.user.fname }} {{i.user.lname}}
    </div>
    <div class="w-32 py-2 border-l-2 border-gray-901 text-center">{{ i.user.tel }}</div>
    <div class="w-32 py-2 border-l-2 border-gray-901 text-center">
      <span class="p-1 bg-gray-200 rounded">{{ i.user.file_id }}</span>
    </div>
    <div class="w-40 py-2 border-l-2 border-gray-901 text-center dir-ltr">{{ i.start_at ? $moment(i.start_at).format("jYYYY/jMM/jDD HH:mm:ss") : '' }}</div>
    <div class="w-64 py-2 border-l-2 border-gray-901 text-center dir-ltr">{{ i.start_at ? $moment(i.start_at).format("jYYYY/jMM/jDD HH:mm:ss") : ''}}</div>
    <div class="w-32 py-2 mx-auto justify-center text-center">
      <span class="w-20 px-2  text-blue-905 bg-gray-906 rounded-md" v-if="i.status == 2">پذیرش شده</span>
      <span class="w-20 px-1 py-2 text-gray-900 bg-gray-903 rounded-md" v-else-if="i.status == 4">عدم حضور</span>
      <span class="w-20 px-1 py-2 text-orange-100 rounded-md" v-else-if="i.status == 5">در انتظار</span>
      <span class="w-20 px-1 py-2 text-orange-100 bg-orange-200 rounded-md" v-else-if="i.status == 1">رزرو شده</span>
      <span class="w-20 px-1 py-2 text-pink-200 bg-red-200 rounded-md" v-else-if="i.status == 3">کنسل شده</span>
    </div>
  </div>
  </div>
<!--  <paginate-->
<!--    v-model="page"-->
<!--    :page-count="listUser.page_count"-->
<!--    :page-range="3"-->
<!--    :margin-pages="2"-->
<!--    :click-handler="clickCallback"-->
<!--    :prev-text="'<'"-->
<!--    :next-text="'>'"-->
<!--    :container-class="'pagination'"-->
<!--    :page-class="'page-item'">-->
<!--  </paginate>-->
</div>
</template>

<script>
export default {
  name: "TableRadiology",
  data(){
    return{
      open: false,
      menu :false,
      showDelete:false,
      page: 1,
      page_count : null
    }
  },
  mounted() {
    let today = new Date();
    let start_date = today.getFullYear()+'-'+(today.getMonth())+'-'+today.getDate();
    let end_date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    const status = "1,2,3,4"
    this.$store.dispatch('radiology/patients/getToday' , {
      start_date , end_date , status, page : this.page
    })

  },
  computed:{
    listUser(){
      return this.$store.getters['radiology/patients/getToday']
    }
  },
  methods: {
    close() {
      this.open = false
    },
    menu1(){
      this.menu = true
    },
    clickCallback (pageNum) {
      console.log(pageNum)
    }
  }
}
</script>

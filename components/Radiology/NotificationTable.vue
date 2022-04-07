<template>
  <div>
    <div class="overflow-auto">
      <div class="h-12 flex border-solid border-2 border-gray-901 rounded-t-lg bg-gray-902 minWight">
        <div class="w-10 py-2 border-l-2 border-gray-901"></div>
        <div class="w-64 py-2 border-l-2 border-gray-901 text-center">دریافت کننده</div>
        <div class="w-32 py-2 border-l-2 border-gray-901 text-center">شماره تماس</div>
        <div class="w-72 py-2 border-l-2 border-gray-901 text-center">متن پیامک</div>
        <div class="w-28 py-2 border-l-2 border-gray-901 text-center">توسط</div>
        <div class="w-28 py-2 border-l-2 border-gray-901 text-center">تاریخ</div>
        <div class="w-28 py-2 px-auto text-center">وضعیت</div>
      </div>
      <div v-if="messageList">
        <div class="h-auto flex border-b-2 border-r-2 border-l-2 border-gray-901 minWight table-link"
             v-for="(i , n) in messageList" :key="n">
          <div class="w-10 py-2 text-center border-l-2 border-gray-901">{{n + 1}}</div>
          <div class="w-64 px-3 py-2 flex border-l-2 border-gray-901 text-center" style="align-items: center">
            <input type="checkbox">
            <img :src="i.logo" class="mx-2 w-5 h-5 rounded-lg" v-if="i.logo">
            <img src="static/img/android-chrome-192x19211.png" class="mx-2 w-5 h-5 rounded-lg" v-else>
            {{i.staff_fname}} {{i.staff_lname}}
          </div>
          <div class="w-32 py-2 border-l-2 border-gray-901 text-center">{{ i.number }}</div>
          <div class="w-72 py-2 border-l-2 border-gray-901 text-center">{{ i.msg }}</div>
          <div class="w-28 py-2 border-l-2 border-gray-901 text-center">{{ i.staff_fname }}{{ i.staff_lname }}</div>
          <div class="w-28 py-2 border-l-2 border-gray-901 text-center">{{ ($moment(i.created).format('jYYYY/jM/jDD ')) }}</div>
          <div class="w-28 py-2 px-auto text-center">{{ i.sent == true ? 'ارسال با موفقیت' : 'ارسال ناموفق' }}</div>
        </div>
      </div>
<!--      <pagination v-if="messageList && messageList.data" :data="messageList.data" @pagination-change-page="getResults"></pagination>-->
     <div v-if="messageList && messageList.pages_count >= 10">
      <paginate
        v-model="page"
        :page-count="messageList.pages_count / 10"
        :page-range="3"
        :margin-pages="2"
        :click-handler="clickCallback"
        :prev-text="'<'"
        :next-text="'>'"
        :container-class="'pagination'"
        :page-class="'page-item'">
      </paginate>
       </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "NotificationTable",
  data(){
    return{
      page:10
    }
  },
  mounted() {
    this.$store.dispatch('admin/messages/getMessages' , this.$route.query.page || 1)
  },
  computed:{
    messageList(){
      return this.$store.getters['admin/messages/getMessages']
    },
  },
  methods:{
    clickCallback (pageNum) {
      console.log(pageNum)
    }
  }
}
</script>


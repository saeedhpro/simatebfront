<template>
  <div class="container">
    <div class="w-full pb-0 px-3 pt-3 flex flex-wrap justify-end bg-white rounded-md shadow-xl border-b-4 border-blue-902" style="align-items: center">
      <div class="flex" style="align-items: center">
        <img src="/img/img-doc1.svg" class="w-28 h-28 ml-3">
        <div class="flex flex-col">
          <span style="align-items: center">
            <span class="px-2 border-l-2 border-gray-901">{{ user.fname }} {{user.lname}}</span>
              <span class="px-2 text-sm">پرونده</span>
              <span class="p-2 w-10 h-10 rounded-lg bg-gray-901">{{ user.file_id }}</span>
            </span>
          <span class="my-5">{{ user.tel }}</span>
          <span style="align-items: center">
            <span class="px-2 border-l-2 border-gray-901">{{ user.organization_name }}</span>
              <span class="px-3 p-2 w-10 h-10 text-sm rounded-lg bg-gray-901"> {{ user.user_group_name }} </span>
            </span>
        </div>
      </div>
      <div class="mr-auto">
        <div class="mb-2 text-sm">توضیحات</div>
        <div class="text-sm" style="max-width: 629px">{{user.description}}</div>
        <div class="my-4 flex mr-auto justify-end">
          <div class="relative">
            <div class="w-10 h-9 text-center border-solid border-2 border-gray-500 text-gray-500 rounded-lg" @click="showDelete =! showDelete ">...</div>
            <div class="py-1 w-28 h-10 mt-1 -mr-16 text-sm absolute border-solid border-2 border-gray-500 hover:border-pink-200 rounded-lg text-gray-700 hover:text-pink-200 bg-white hover:bg-pink-300 text-center"
                 v-if="showDelete"
            @click="deleteUser(user.id)">
              حذف کاربر
            </div>
          </div>
          <div class="w-48 h-9 py-3 px-5 mr-4 text-sm text-center click flex bg-white hover:bg-blue-904 text-center text-gray-700 hover:text-blue-902 border-solid border-2 border-gray-500 hover:border-blue-902 rounded-lg"
               style="align-items: center">
            <img src="/img/pen.svg" class="w-4 ml-3 hh"/>
            <img src="/img/pengray.svg" class="w-4 ml-3 hg"/>
            <span class="click">ویرایش اطلاعات</span>
          </div>
        </div>
      </div>
    </div>

    <div class="my-10 flex justify-between">
      <div class="w-40 h-10 px-3 text-sm flex text-blue-902 shadow-md text-center text-md rounded-lg click selectedBlue" style="align-items: center">
        <img src="/img/GroupBag.svg" class="w-7 ml-3" >
        <span>خدمات پزشکی</span>
      </div>
      <img src="/img/Line%2041-2.svg" class="md:flex hidden mx-3" style="width: 900px">
      <div class="w-36 h-10 px-2 text-sm flex bg-blue-902 rounded-lg text-white text-center text-sm"
           style="align-items: center">
        <div class="w-8 h-8 p-2 ml-4 bg-blue-903 rounded-lg text-center">
          <img src="/img/plusWhite.svg">
        </div>
        <span>ثبت خدمات</span>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: "_id",
  layout:'admin',
  // middleware:'admin',
  data(){
    return{
      showDelete:false
    }
  },
  mounted() {
    this.$store.dispatch('admin/user/getUser' , this.$route.params.id)
  },
  computed:{
    user(){
      return this.$store.getters['admin/user/getUser']
    }
  },
  methods:{
    deleteUser(id){
      this.$store.dispatch('admin/user/deleteUser', id)
        .then(res=>{
          location.reload();
        })
        .catch(err=>{})
    },
  }
}
</script>

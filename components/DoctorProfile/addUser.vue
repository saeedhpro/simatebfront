<template>
<div>
  <vue-modaltor :visible="open" @hide="open=false">
    <template #header>
      <!--    add your custom header     -->
      <div class="pb-3 flex justify-between border-b border-gray-700" style="align-items: center">
        <div class="flex" style="align-items: center">
                     <div class="mr-3 w-5 h-5 p-1 border-solid border-gray-901 border rounded">

            <img src="/img/xmark.svg" @click="close">
          </div>
          <p class="mr-2">افزودن کاربر</p>
        </div>
        <div>
          ثبت در سیستم توسط: <span v-if="userLogin">{{ userLogin.lname }}{{ userLogin.fname }}</span> (۴ ماه پیش ۱۴۰۰/۴/۲۱ ۱۰:۳۳)
        </div>
      </div>
    </template>
    <template #body>

      <div class="pt-3 flex flex-wrap justify-between" style="align-items: center">

        <div class="flex align-top">
          <div>تصویر کاربری</div>
          <img src="/img/imgUser.svg" class="mr-2 w-36 h-36">
        </div>
        <div>
          <div class="flex flex-wrap">
            <div>
              <div class="mb-2">نام</div>
              <input class="w-56 h-10 px-2 bg-white border-solid border-gray-901 border rounded-lg" v-model="lname"/>
            </div>
            <div class="mr-5">
              <div class="mb-2">نام خانوادگی</div>
              <input class="w-56 h-10 px-2 bg-white border-solid border-gray-901 border rounded-lg" v-model="fname"/>
            </div>
          </div>
          <div class="mt-5 flex flex-wrap">
            <div>
              <div class="mb-2">توضیحات</div>
              <input class="w-56 h-10 px-2 bg-white border-solid border-gray-901 border rounded-lg" v-model="info"/>
            </div>
            <div class="mr-5">
              <div class="mb-2">جنسیت</div>
              <div class="flex justify-right">
                <div class="w-28 h-10 px-2 py-2  flex text-center  rounded-lg border-l-2 bg-gray-902 text-sm click" style="align-items: center"
                     @click="setFemale" :class="{'selectedBlue' : status === '2'}">
                  <img src="/img/womanBlue.svg" class="w-8 h-8 ml-2" v-if="status === 'female'"/>
                  <img src="/img/woman.svg" class="w-8 h-8 ml-2" v-else/>
                  <span class="mx-auto">خانم</span>
                </div>
                <div class="w-28 h-10 px-2 py-2 mr-5 flex text-center  rounded-lg border-l-2 bg-gray-902 text-sm click" style="align-items: center"
                     @click="setMale" :class="{'selectedBlue' : status === '1'}">
                  <img src="/img/man.svg.svg" class="w-8 h-8 ml-2" v-if="status === 'male'"/>
                  <img src="/img/manGray.svg" class="w-8 h-8 ml-2" v-else/>
                  <span class="mx-auto">آقا</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-3 flex flex-wrap justify-between" style="align-items: center">
        <div>
          <div class="mb-2">گروه</div>
          <select class="w-56 h-10 px-2 bg-white border-solid border-gray-901 border rounded-lg" v-model="user_group_id">
            <option value="1">بیمار</option>
            <option value="2" v-if="isAdmin">مدیر سیستم</option>
            <option value="3" v-if="isAdmin">پزشک</option>
            <option value="4">منشی پزشک</option>
            <option value="5" v-if="isAdmin">مسئول آزمایشگاه</option>
            <option value="100" v-if="isAdmin">پشتیبان فنی سیستم</option>
          </select>
        </div>
        <div>
          <div class="mb-2">موسسه</div>
          <select class="w-56 h-10 px-2 bg-white border-solid border-gray-901 border rounded-lg" v-model="organization_id">
            <option v-for="i in institutionList" :value="i.id" >{{i.name}}</option>
          </select>
        </div>
        <div>
          <div class="mb-2">شماره موبایل</div>
          <input class="w-56 h-10 px-2 bg-white border-solid border-gray-901 border rounded-lg" v-model="tel"/>
        </div>
      </div>

      <div class="mt-3 flex flex-wrap justify-between" style="align-items: center">
        <div>
          <div class="mb-2">شماره تماس</div>
          <input class="w-56 h-10 px-2 bg-white border-solid border-gray-901 border rounded-lg" v-model="tel1"/>
        </div>
        <div class="mr-5">
          <div class="mb-2">کد ملی</div>
          <input class="w-56 h-10 px-2 bg-white border-solid border-gray-901 border rounded-lg" v-model="nid"/>
        </div>
        <div class="mr-5">
          <div class="mb-2">تاریخ تولد</div>
          <!--          <input class="w-56 h-10 px-2 bg-white border-solid border-gray-901 border rounded-lg" v-model="birth_date"/>-->
          <date-picker  format="YYYY-MM-DD" display-format="jYYYY/jMM/jDD" :value="birth_date" @input="onChange" placeholder="تاریخ را انتخاب کنید"></date-picker>

        </div>
      </div>

      <div class="-mx-4 mt-3 flex flex-wrap justify-between" style="align-items: center">
        <div class="md:w-1/3 px-4">
          <div class="mb-2">شماره پرونده</div>
          <input class="w-56 h-10 px-2 bg-white border-solid border-gray-901 border rounded-lg" v-model="file_id"/>
        </div>
        <div class="md:w-2/3 px-4">
          <div class="mb-2">آدرس محل سکونت</div>
          <input class="w-full h-10 bg-white border-solid border-gray-901 border rounded-lg" v-model="address"/>
        </div>
      </div>

      <div class="mt-3 flex flex-wrap justify-between" style="align-items: center" v-if="user_group_id == 1">
        <div class="w-full">
          <div class="mb-2">شرح حال</div>
          <textarea class="w-full h-10 bg-white border-solid border-gray-901 border rounded-lg" v-model="description"></textarea>
        </div>
      </div>

      <div class="mt-3 flex flex-wrap justify-between" style="align-items: center">
        <div class="mr-5" v-if="user_group_id == 1">
          <div class="mb-2">سابقه جراحی</div>
          <div class="flex" style="align-items: center">
            <div class="flex" style="align-items: center">
              <input type="radio" class="w-5 h-5 bg-white border-solid border-gray-901 border rounded-lg" v-model="relation" value="'فک'"/>
              <span class="mr-1">فک</span>
            </div>
            <div class="mx-3 flex" style="align-items: center">
              <input type="radio" class="w-5 h-5 bg-white border-solid border-gray-901 border rounded-lg" v-model="relation" value="'بینی'"/>
              <span class="mr-1">بینی</span>
            </div>
            <div class="flex" style="align-items: center">
              <input type="radio" class="w-5 h-5 bg-white border-solid border-gray-901 border rounded-lg" v-model="relation" value="'غیره'"/>
              <span class="mr-1">غیره</span>
            </div>
          </div>
        </div>
        <div class="flex flex-wrap" style="align-items: center">
          <div>
            <div class="mb-2">معرف</div>
            <input class="w-56 h-10 px-2 bg-white border-solid border-gray-901 border rounded-lg" v-model="introducer"/>
          </div>
          <div class="mr-3">
            <div class="mb-2">رمز ورود</div>
            <input class="w-56 h-10 px-2 bg-white border-solid border-gray-901 border rounded-lg" v-model="password"/>
          </div>
        </div>
      </div>

      <div class="mt-8 flex flex-wrap justify-between">
        <div class="w-28 h-10 py-2 border-solid border border-gray-700 rounded-lg text-gray-700 text-center" @click="cleanForm">پاک کردن فرم</div>
        <div class="flex" style="align-items: center">
          <button class="w-28 h-10 py-2 text-center bg-gray-907 rounded-lg" @click="close">انصراف</button>
          <button class="w-56 h-10 py-2 mr-3 text-center bg-blue-902 rounded-lg text-white" @click="addUser">ذخیره</button>
        </div>
      </div>

    </template>
  </vue-modaltor>
</div>
</template>

<script>
export default {
  name: "addUser",
  props:{
    open :false
  },
  data(){
    return{
      open : false
    }
  },
  computed: {
    userLogin() {
      return this.$store.getters['login/getUser']
    },
    isAdmin() {
      const profession = this.userLogin.profession;
      return profession.id == 2;
    }
  }
}
</script>

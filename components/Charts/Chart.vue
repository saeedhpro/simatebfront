<template>
<div>
  <div class="container flex flex-wrap justify-around">
    <button @click="status1" class="sm:w-64 w-full justify-center py-2 flex  bg-white rounded-lg shadow-md text-sm click" style="align-items: center"  :class="{'selectedBlue' : menu1 === true}">
      <img src="/static/img/123_1.svg" class="ml-2 w-8" v-if="status1">
      <img src="/static/img/calenderGray.png" class="ml-2 w-8" v-else>
      توزیع فراوانی پذیرش ها
    </button>

    <button @click="status2" class="sm:w-64 w-full justify-center px-3 py-2 flex bg-white rounded-lg shadow-md text-sm click" style="align-items: center" :class="{'selectedBlue' : menu2 === true}">
      <img src="/static/img/Search.svg" class="ml-2 w-8" v-if="status2">
      <img src="/static/img/124.svg" class="ml-2 w-8" v-else>
      نسبت معاینه ها
    </button>

    <button @click="status3" class="sm:w-64 w-full justify-center px-3 py-2 flex bg-white rounded-lg shadow-md text-sm click" style="align-items: center" :class="{'selectedBlue' : menu3 === true}">
      <img src="/static/img/Search.svg" class="ml-2 w-8" v-if="status3">
      <img src="/static/img/125.svg" class="ml-2 w-8" v-else>
      پراکندگی جنسیت و علل مراجعه
    </button>

    <button @click="status4" class="sm:w-64 w-full justify-center px-3 py-2 flex bg-white rounded-lg shadow-md text-sm click" style="align-items: center" :class="{'selectedBlue' : menu4 === true}">
      <img src="/static/img/Search.svg" class="ml-2 w-8" v-if="status4">
      <img src="/static/img/126.svg" class="ml-2 w-8" v-else>
      رده سنی و شهر بیماران
    </button>
  </div>

  <div class="container" v-if="menu1">
    <Abundance/>
  </div>
  <div class="container" v-if="menu2">
    <Examinations/>
  </div>
  <div class="container" v-if="menu3">
    <Dispersion/>
  </div>
  <div class="container" v-if="menu4">
    <Ages/>
  </div>

</div>
</template>

<script>
import Abundance from "@/components/Charts/Abundance";
import Examinations from "@/components/Charts/Examinations";
import Dispersion from "@/components/Charts/Dispersion";
import Ages from "@/components/Charts/Ages";
export default {
  name: "Chart",
  middleware: 'auth',
  components:{
    Abundance,Examinations,Dispersion,Ages
  },
  data(){
    return{
      menu1 :true,
      menu2 :false,
      menu3 :false,
      menu4 :false,
    }
  },
  methods:{
    status1(){
      this.menu1 = true
      this.menu2 = false
      this.menu3 = false
      this.menu4 = false
    },
    status2(){
      this.menu1 = false
      this.menu2 = true
      this.menu3 = false
      this.menu4 = false
    },
    status3(){
      this.menu1 = false
      this.menu2 = false
      this.menu3 = true
      this.menu4 = false
    },
    status4(){
      this.menu1 = false
      this.menu2 = false
      this.menu3 = false
      this.menu4 = true
    },
  }
}
</script>

<style scoped>

</style>

<template>
  <div>
    <div>
      <Header/>
    </div>
    <div class="h-screen py-10">
      <nuxt/>
    </div>
    <!--    <Footer/>-->
  </div>
</template>
<script>
import Header from "@/components/Radiology/Header";

export default {
  components: {Header},
  middleware: "admin"
}
</script>

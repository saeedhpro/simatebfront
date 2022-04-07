<template>
  <div>
    <Header/>
    <div class="min-h-screen py-10">
      <nuxt/>
    </div>
  </div>
</template>
<script>
import Header from "../components/DoctorProfile/Header";

export default {
  components: {Header},
  middleware: 'auth'
}
</script>

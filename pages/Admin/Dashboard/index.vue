<template>
  <div class="container">
    <div class="-mx-2 flex flex-wrap justify-between">
      <div class="px-2">
        <LastUser/>
      </div>
      <div class="px-2">
        <LastLogin/>
      </div>
    </div>
  </div>
</template>

<script>
import LastUser from "@/components/Admin/LastUser";
import LastLogin from "@/components/Admin/LastLogin";

export default {
  name: "index",
  layout: 'admin',
  components: {LastUser, LastLogin}
}
</script>

<style scoped>

</style>

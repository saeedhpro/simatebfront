<template>
  <div class="cursor-pointer app-res-item" v-if="item" @click="itemClicked">
    <div class="app-res-item-name">
      {{ `${item.fname} ${item.lname}` }}
    </div>
    <div class="app-res-item-time">
      {{ getTime() }}
    </div>
    <div class="app-res-item-case">
      {{ item.case_type ? item.case_type : 'معاینه' }}
    </div>
  </div>
</template>

<script>

export default {
  props: {
    item: {
      Type: Object,
      required: true,
      default: null
    }
  },
  name: "AppointmentReserveItem",
  methods: {
    getTime() {
      let time = this.$moment(this.item.start_at.Time, "YYYY-MM-DDTHH:mm:SS").format("YYYY/MM/DD HH:mm:ss");
      return this.$moment(time, "YYYY/MM/DD HH:mm:ss").format("HH:mm:ss");
    },
    itemClicked() {
      this.$emit("selected", this.item)
    }
  }
}
</script>

<style scoped>

</style>

<template>
  <div class="dents-list">
    <div class="dent-box">
      <div class="dent-top">
        <img :class="{'selected': inList(i)}" @click="onDentClicked(i)" v-for="(i, n) in 16" :src="`/dents/${i}.png`" :key="n">
      </div>
      <div class="dent-bottom">
        <img :class="{'selected': inList(i + 16)}" @click="onDentClicked(i + 16)" v-for="(i, n) in 16" :src="`/dents/${i+16}.png`" :key="n">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DentalComponent",
  props: {
    dental: {
      Type: String,
      default: '',
      required: true
    },
    type: {
      Type: String,
      default: 'teeth_present',
      required: true
    }
  },
  mounted() {
    this.dents = this.dental.length > 0 ? this.dental.trim().split(',') : []
  },
  data() {
    return {
      dents: [],
    }
  },
  methods: {
    inList(item) {
      return this.dents.find(i => i == item)
    },
    onDentClicked(item) {
      const i = this.dents.find(i => i == item)
      if (i) {
        this.dents = this.dents.filter(i => i != item)
      } else {
        this.dents.push(item)
      }
      this.$emit('dentClicked', this.dents.join(), this.type)
    },
  },
}
</script>

<style scoped>
.dent-bottom img.selected, .dent-top img.selected {
  background: #EBF0FF 0 0 no-repeat padding-box;
  border: 1px solid #5063FF;
  border-radius: 8px;
  opacity: 1;
}
</style>

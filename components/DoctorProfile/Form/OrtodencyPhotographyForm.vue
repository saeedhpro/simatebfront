<template>
  <div class="from-block flex flex-row flex-wrap">
    <div class="form-side w-full">
      <div class="form-side-inside">
        <div class="form-item">
          <input value="قبل از درمان" type="checkbox" @change="addToItems($event)">
          <label>قبل از درمان</label>
        </div>
        <div class="form-item">
          <input value="در حین درمان" type="checkbox" @change="addToItems($event)">
          <label>در حین درمان</label>
        </div>
        <div class="form-item">
          <input value="حین درمان" type="checkbox" @change="addToItems($event)">
          <label>حین درمان</label>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "OrtodencyPhotographyForm",
  computed: {
    items() {
      return this.$store.getters['forms/userWallet/getOrtodencyItems']
    }
  },
  methods: {
    addToItems(e) {
      this.$store.dispatch('forms/userWallet/updateOrtodencyItems', {
        value: e.target.value,
        checked: e.target.checked,
      })
    }
  }
}
</script>

<style scoped>
.from-block {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  flex-wrap: wrap;
}

.from-block .form-side {
  background: #FAFAFA 0 0 no-repeat padding-box;
  border: 1px solid #BDBDBD;
  border-radius: 8px;
  margin: 10px 0 10px 10px;
}

.from-block .form-side .form-side-inside {
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  padding: 10px;
}

.from-block .form-side.one {
  width: calc(25%);

}

.two {
  width: calc(47% - 5px);
}

.from-block .form-side .form-item {
  text-align: right;
  font: normal normal bold 16px/28px IRANYekan;
  letter-spacing: 0;
  color: #212945;
}

.form-side-header {
  background: #AEB9E6 0 0 no-repeat padding-box;
  border: 1px solid #AEB9E6;
  border-radius: 8px;
  padding: 6px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

.bottom-side {
  background: #E1E5F5 0 0 no-repeat padding-box;
  border: 1px solid #8F9BCE;
  border-radius: 8px;
  padding: 24px 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

.bottom-side .bottom-side-item {
  text-align: right;
  font: normal normal bold 16px/28px IRANYekan;
  letter-spacing: 0;
  color: #141432;
  display: flex;
  flex-direction: row;
  align-items: center;
}
</style>

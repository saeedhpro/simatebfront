<template>
  <div class="from-block flex flex-row flex-wrap">
    <div class="form-side one">
      <div class="form-side-inside">
        <div class="form-item">
          <input value="اصلی - بینی" type="checkbox" @change="addToItems($event)">
          <label>بینی</label>
        </div>
        <div class="form-item">
          <input value="اصلی - فک و چانه" type="checkbox" @change="addToItems($event)">
          <label>فک و چانه</label>
        </div>
        <div class="form-item">
          <input value="اصلی - ایمپلنت و پروتز" type="checkbox" @change="addToItems($event)">
          <label>ایمپلنت و پروتز</label>
        </div>
        <div class="form-item">
          <input value="اصلی - صورت" type="checkbox" @change="addToItems($event)">
          <label>صورت</label>
        </div>
        <div class="form-item">
          <input value="اصلی - پلک و ابرو" type="checkbox" @change="addToItems($event)">
          <label>پلک و ابرو</label>
        </div>
        <div class="form-item">
          <input value="اصلی - پیشانی" type="checkbox" @change="addToItems($event)">
          <label>پیشانی</label>
        </div>
        <div class="form-item">
          <input value="اصلی - گوش" type="checkbox" @change="addToItems($event)">
          <label>گوش</label>
        </div>
        <div class="form-item">
          <input value="اصلی - گردن" type="checkbox" @change="addToItems($event)">
          <label>گردن</label>
        </div>
        <div class="form-item">
          <input value="اصلی - لب" type="checkbox" @change="addToItems($event)">
          <label>لب</label>
        </div>
        <div class="form-item">
          <input value="اصلی - بازو" type="checkbox" @change="addToItems($event)">
          <label>بازو</label>
        </div>
        <div class="form-item">
          <input value="اصلی - کاشت مو" type="checkbox" @change="addToItems($event)">
          <label>کاشت مو</label>
        </div>
        <div class="form-item">
          <input value="اصلی - لیپوماتیک" type="checkbox" @change="addToItems($event)">
          <label>لیپوماتیک</label>
        </div>
        <div class="form-item">
          <input value="اصلی - ارتودنسی" type="checkbox" @change="addToItems($event)">
          <label>ارتودنسی</label>
        </div>
      </div>
    </div>
    <div class="two flex flex-col flex-wrap">
      <div class="w-full flex flex-row flex-wrap">
        <div class="form-side flex-row">
          <div class="form-side-header">
            ابرو
          </div>
          <div class="form-side-inside">
            <div class="form-item">
              <input value="ابرو - روبروی کامل" type="checkbox" @change="addToItems($event)">
              <label>روبروی کامل</label>
            </div>
            <div class="form-item">
              <input value="ابرو - روبروی سر بالا" type="checkbox" @change="addToItems($event)">
              <label>روبروی سر بالا</label>
            </div>
            <div class="form-item">
              <input value="ابرو - روبروی سر پایین" type="checkbox" @change="addToItems($event)">
              <label>روبروی سر پایین</label>
            </div>
            <div class="form-item">
              <input value="ابرو - روبروی با خنده" type="checkbox" @change="addToItems($event)">
              <label>روبروی با خنده</label>
            </div>
          </div>
        </div>
        <div class="form-side flex-row">
          <div class="form-side-header">
            نیم‌رخ
          </div>
          <div class="form-side-inside">
            <div class="form-item">
              <input value="نیم‌رخ - راست" type="checkbox" @change="addToItems($event)">
              <label>راست</label>
            </div>
            <div class="form-item">
              <input value="نیم‌رخ - چپ" type="checkbox" @change="addToItems($event)">
              <label>چپ</label>
            </div>
            <div class="form-item">
              <input value="نیم‌رخ - راست در حال خنده" type="checkbox" @change="addToItems($event)">
              <label>راست در حال خنده</label>
            </div>
            <div class="form-item">
              <input value="نیم‌رخ - چپ در حال خنده" type="checkbox" @change="addToItems($event)">
              <label>چپ در حال خنده</label>
            </div>
          </div>
        </div>
      </div>
      <div class="w-full">
        <div>
          <div class="form-side">
            <div class="form-side-header">
              سه‌رخ
            </div>
            <div class="form-side-inside">
              <div class="form-item">
                <input value="سه‌رخ - راست" type="checkbox" @change="addToItems($event)">
                <label>راست</label>
              </div>
              <div class="form-item">
                <input value="سه‌رخ - چپ" type="checkbox" @change="addToItems($event)">
                <label>چپ</label>
              </div>
              <div class="form-item">
                <input value="سه‌رخ - راست در حال خنده" type="checkbox" @change="addToItems($event)">
                <label>راست در حال خنده</label>
              </div>
              <div class="form-item">
                <input value="سه‌رخ - چپ در حال خنده" type="checkbox" @change="addToItems($event)">
                <label>چپ در حال خنده</label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="form-side one">
      <div class="form-side-header">
        INTRA ORAL
      </div>
      <div class="form-side-inside">
        <div class="form-item">
          <input value="INTRA ORAL - Occlusion" type="checkbox" @change="addToItems($event)">
          <label>Occlusion</label>
        </div>
        <div class="form-item">
          <input value="INTRA ORAL - Right Occlusion" type="checkbox" @change="addToItems($event)">
          <label>Right Occlusion</label>
        </div>
        <div class="form-item">
          <input value="INTRA ORAL - Left Occlusion" type="checkbox" @change="addToItems($event)">
          <label>Left Occlusion</label>
        </div>
        <div class="form-item">
          <input value="INTRA ORAL - Upper Occlusal" type="checkbox" @change="addToItems($event)">
          <label>Upper Occlusal</label>
        </div>
        <div class="form-item">
          <input value="Lower Occlusal" type="checkbox" @change="addToItems($event)">
          <label>Lower Occlusal</label>
        </div>
        <div class="form-item">
          <input value="Overjet" type="checkbox" @change="addToItems($event)">
          <label>Overjet</label>
        </div>
        <div class="form-item">
          <input value="Close up smile" type="checkbox" @change="addToItems($event)">
          <label>Close up smile</label>
        </div>
      </div>
    </div>
    <div class="w-full bottom-side">
      <div class="bottom-side-item">
        <input value="پایین - قبل از درمان" type="checkbox" @change="addToItems($event)">
        <label>قبل از درمان</label>
      </div>
      <div class="bottom-side-item">
        <input value="پایین - بعد از درمان" type="checkbox" @change="addToItems($event)">
        <label>بعد از درمان</label>
      </div>
      <div class="bottom-side-item">
        <input value="پایین - رنگی" type="checkbox" @change="addToItems($event)">
        <label>رنگی</label>
      </div>
      <div class="bottom-side-item">
        <input value="پایین - سیاه و سفید" type="checkbox" @change="addToItems($event)">
        <label>سیاه و سفید</label>
      </div>
      <div class="bottom-side-item">
        <input value="پایین - ارسال آرشیو" type="checkbox" @change="addToItems($event)">
        <label>ارسال آرشیو</label>
      </div>
      <div class="bottom-side-item">
        <input value="پایین - CD" type="checkbox" @change="addToItems($event)">
        <label>CD</label>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PhotographyForm",
  computed: {
    items() {
      return this.$store.getters['forms/userWallet/getPhotographyItems']
    }
  },
  methods: {
    addToItems(e) {
      this.$store.dispatch('forms/userWallet/updatePhotographyItems', {
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

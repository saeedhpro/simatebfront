<template>
  <div class="mt-10">
    <div class="flex flex-wrap justify-between">

      <div class="w-full md:w-1/2 p-1">
        <div class="w-full px-5 py-1 h-10 rounded-tr-lg rounded-tl-lg text-white text-md text-right bg-blue-901">رده سنی</div>
        <div class="p-5 bg-white rounded-br-lg rounded-bl-lg shadow-md">
          <div class="flex flex-wrap justify-between">
            <div>
              <label>از تاریخ</label>
              <div class="w-56 mt-2 h-10 px-2 bg-white border-solid border-gray-901 border rounded-lg">
                <date-picker @change="onStartChange" format="YYYY-MM-DD HH:mm:ss" display-format="jYYYY/jMM/jDD"
                             :value="start_date"
                             placeholder="تاریخ را انتخاب کنید"></date-picker>
              </div>
            </div>
            <div>
              <label>تا تاریخ</label>
              <div class="w-56 mt-2 h-10 px-2 bg-white border-solid border-gray-901 border rounded-lg">
                <date-picker @change="onEndChange" format="YYYY-MM-DD HH:mm:ss" display-format="jYYYY/jMM/jDD"
                             :value="end_date"
                             placeholder="تاریخ را انتخاب کنید"></date-picker>
              </div>
            </div>
          </div>
          <div class="mt-2 flex flex-wrap justify-between">
            <div>
              <label>ابتدای سن</label>
              <div class="mt-2">
              <input @input="onChange" v-model="age_start"
                     class="w-56 h-10 px-2 bg-white border-solid border-gray-901 border rounded-lg"/>
                </div>
            </div>
            <div>
              <label>انتهای سن</label>
              <div class="mt-2">
              <input @input="onChange" v-model="age_end"
                     class="w-56 h-10 px-2 bg-white border-solid border-gray-901 border rounded-lg"/>
                </div>
            </div>
          </div>
          <div class="flex flex-col justify-center items-center mt-8">
            تعداد:{{   number | toPersianNumber  }}
          </div>
        </div>
      </div>
      <div class="w-full md:w-1/2 p-1">
        <div class="w-full px-5 py-1 h-10 rounded-tr-lg rounded-tl-lg text-white text-md text-right bg-blue-901">شهر بیماران</div>
        <div class="p-5 bg-white rounded-br-lg rounded-bl-lg shadow-md">
          <table class="table-fixed w-full border-collapse border border-gray-400 dark:border-gray-600 font-semibold p-4 text-gray-900 dark:text-gray-200">
            <thead>
            <tr>
              <th class="border border-gray-300 h-10">استان</th>
              <th class="border border-gray-300 h-10">تعداد</th>
              <th class="border border-gray-300 h-10">شهرستان</th>
            </tr>
            </thead>

          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Ages",
  data() {
    return {
      start_date: '',
      end_date: '',
      age_start: 5,
      age_end: 35,
      number: 0,
    }
  },
  methods: {
    onStartChange(val) {
      this.start_date = val
      this.createNumber()
    },
    onEndChange(val) {
      this.end_date = val
      this.createNumber()
    },
    onChange() {
      this.createNumber()
    },
    createNumber() {
      this.number = parseInt(Math.random() * 120) + 150
    }
  }
}
</script>

<style scoped>

</style>

<template>
  <div class="p-5 mt-10 bg-white rounded-lg shadow-md">
    <div id="chart">
      <apexchart type="line" height="350" :options="chartOptions" :series="series"></apexchart>
    </div>
  </div>
</template>

<script>
export default {
  name: "Examinations",
  mounted() {
    this.setMonths()
  },
  data() {
    return {
      series: [
        {
          name: "فقط معاینه",
          data: [28, 29, 33, 36, 32, 32, 33]
        },
        {
          name: "پذیرش شده",
          data: [12, 11, 14, 18, 17, 13, 13]
        }
      ],
      chartOptions: {
        chart: {
          height: 350,
          type: 'line',
          dropShadow: {
            enabled: true,
            color: '#000',
            top: 18,
            left: 7,
            blur: 10,
            opacity: 0.2
          },
          toolbar: {
            show: false
          }
        },
        colors: ['#77B6EA', '#545454'],
        dataLabels: {
          enabled: true,
        },
        stroke: {
          curve: 'smooth'
        },
        title: {
          text: '',
          align: 'left'
        },
        grid: {
          borderColor: '#e7e7e7',
          row: {
            colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
            opacity: 0.5
          },
        },
        markers: {
          size: 1
        },
        xaxis: {
          categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
          title: {
            text: 'ماه'
          }
        },
        yaxis: {
          title: {
            text: 'Temperature'
          },
          min: 5,
          max: 40
        },
        legend: {
          position: 'top',
          horizontalAlign: 'right',
          floating: true,
          offsetY: -25,
          offsetX: -5
        }
      },


    }
  },
  methods: {
    setMonths() {
      const date = this.$moment(Date.now()).locale('fa')
      for (let i = 0; i < 6; i++) {
        const m = this.$moment(date).subtract(i, 'months')
        this.chartOptions.xaxis.categories.push(m.format("jMMMM"))
      }
    }
  }
}
</script>

<style scoped>

</style>

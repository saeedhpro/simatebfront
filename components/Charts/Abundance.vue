<template>
  <div class="p-5 mt-10 bg-white rounded-lg shadow-md">
    <div id="chart">
      <apexchart v-if="show" type="line" height="350" :options="chartOptions" :series="series"></apexchart>
    </div>
  </div>
</template>

<script>
export default {
  name: "Abundance",
  mounted() {
    this.show = false
    this.setMonths()
    this.getReports()
    this.show = true
  },
  methods: {
    async getReports() {
      const id = this.user.organization_id
      const reports = await this.$store.dispatch('reports/getAbundanceReport', id)
      this.series = [
        {
          name: "پذیرش های 6 ماهه",
          data: reports.abundance,
        }
      ]
    },
    setMonths() {
      const date = this.$moment(Date.now()).locale('fa')
      for (let i = 0; i < 6; i++) {
        const m = this.$moment(date).subtract(i, 'months')
        this.chartOptions.xaxis.categories.push(m.format("jMMMM"))
      }
    }
  },
  data() {
    return {
      show: false,
      series: [],
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
          categories: [],
          title: {
            text: 'ماه'
          }
        },
        yaxis: {
          title: {
            text: ''
          },
          // min: 5,
          // max: 40
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
  computed: {
    user() {
      return this.$store.getters['login/getUser']
    }
  }
}
</script>

<style scoped>

</style>

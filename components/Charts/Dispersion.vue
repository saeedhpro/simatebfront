<template>
  <div class="mt-10">
    <div class="flex flex-wrap justify-between">

      <div class="p-5 bg-white rounded-lg shadow-md">
        <div id="chart">
          <apexchart type="donut" :options="chartOptions" :series="series"></apexchart>
        </div>
      </div>

      <div class="p-5 bg-white rounded-lg shadow-md">
        <div id="chart2">
          <apexchart type="donut" :options="chartOptions1" :series="series1"></apexchart>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: "Dispersion",
  mounted() {
    this.getReports()
  },
  methods: {
    async getReports() {
      const id = this.user.organization_id
      const reports = await this.$store.dispatch('reports/getAbundanceReport', id)
      this.series1 = [reports.gender.male, reports.gender.female]
    }
  },
  computed: {
    user() {
      return this.$store.getters['login/getUser']
    }
  },
  data() {
    return {
      series: [44, 55, 41, 17, 15],
      chartOptions: {
        chart: {
          type: 'donut',
        },
        responsive: [{
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: 'bottom'
            }
          }
        }]
      },
      series1: [0, 0],
      chartOptions1: {
        chart: {
          type: 'donut',
        },
        labels: ['آقا', 'خانم'],
        responsive: [{
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: 'bottom'
            }
          }
        }]
      },
    }
  }
}
</script>

<style scoped>

</style>

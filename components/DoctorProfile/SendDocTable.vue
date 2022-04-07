<template>
  <div>
    <SendDocListTable @paginated="paginated" :list="getPhotos" :prof="prof" v-if="prof==1"/>
    <SendDocListTable @paginated="paginated" :list="getRadios" :prof="prof" v-else-if="prof==3"/>
    <SendDocListTable @paginated="paginated" :list="getOffs" :prof="prof" v-else/>
  </div>
</template>

<script>

import SendDocListTable from "./SendDocListTable";

export default {
  name: "SendDocTable",
  components: {SendDocListTable},
  props: ['prof'],
  data() {
    return {
      open: false,
      menu2: false,
      menu: false,
      user: null,
      showDelete: false,
      item: null,
      page: 1,
      edit: false,
      biography: false,
      addBiography: false
    }
  },
  mounted() {
    this.getResults()
  },
  computed: {
    listUser() {
      return this.$store.getters['doctor/patients/getToday']
    },
    getAppointments() {
      return this.$store.getters['case_types/userWallet/getAppointments']
    },
    userLogin() {
      return this.$store.getters['login/getUser']
    },
    getRadios() {
      return this.$store.getters['doctor/patients/getRadios']
    },
    getPhotos() {
      return this.$store.getters['doctor/patients/getPhotos']
    },
    getOffs() {
      return this.$store.getters['doctor/patients/getOffs']
    },
  },
  methods: {
    getResults() {
      if (this.prof == 1) {
        this.getPhotoList()
      } else if (this.prof == 3) {
        this.getRadList()
      } else if (this.prof != 2) {
        this.getOfficeList()
      }
    },
    getRadList() {
      this.$store.dispatch('doctor/patients/getRadiosList', {
        id: this.userLogin.organization_id,
        page: this.page,
      })
    },
    getPhotoList() {
      this.$store.dispatch('doctor/patients/getPhotosList', {
        id: this.userLogin.organization_id,
        page: this.page,
      })
    },
    getOfficeList() {
      this.$store.dispatch('doctor/patients/getOfficesList', {
        id: this.userLogin.organization_id,
        page: this.page,
      })
    },
    paginated(page) {
      this.page = page;
      this.getResults()
    },
    close() {
      this.open = false
    },
    menu1() {
      this.menu = true
    },
    clickCallback(pageNum) {
      console.log(pageNum)
    },
    async getUser(i) {
      this.user = await this.$store.dispatch('admin/user/getUser', i.id)
      this.open = true
    },
    save() {

    }
  }
}
</script>
<style>


.day-col {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  width: 128px;
  margin-left: 5px;
}

.case-item {
  display: flex;
  flex-direction: row;
  text-align: center;
  font: normal normal 14px/25px IRANYekan;
  font-weight: bold;
  letter-spacing: 0;
  color: #141432;
  border-radius: 4px;
  width: 100%;
  background: #FAFAFA 0% 0% no-repeat padding-box;
  border: 1px solid #EBEBEB;
  margin-bottom: 5px;
  margin-left: 2px;
}

.case-item .right {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
}

.case-item .left {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  background: #EBEBEB 0 0 no-repeat padding-box;
  border: 1px solid #EBEBEB;
  border-radius: 4px;
}

.appt-day-col {
  text-align: center;
  font: normal normal bold 14px/25px IRANYekan;
  letter-spacing: 0;
  color: #141432;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  min-width: 120px;
}

.appt-day-col-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #F0F0F0 0 0 no-repeat padding-box;
  border: 1px solid #EBEBEB;
  text-align: center;
  font: normal normal bold 14px/25px IRANYekan;
  letter-spacing: 0;
  color: #141432;
  padding: 5px 10px;
}

.is-friday {
  background: #FFFDFA 0 0 no-repeat padding-box !important;
  border: 1px solid #F5AC00 !important;
  border-radius: 4px !important;
}

.appt-day-col-content-item {
  background: #F5F5FF 0 0 no-repeat padding-box;
  border: 1px solid #5063FF;
  border-radius: 4px;
  width: 120px;
  min-height: 91px;
  margin-top: 5px;
  text-align: center;
  font: normal normal bold 14px/25px IRANYekan;
  letter-spacing: 0;
  color: #141432;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
}

.doctor-do-content {
  display: flex;
  flex-direction: row;
  text-align: left;
  font: normal normal bold 12px/20px IRANYekan;
  letter-spacing: 0;
  color: #212945;
  border: 1px solid #BDBDBD;
  border-radius: 8px;
}

.doctor-do-items-list {
  border: 1px solid #BDBDBD;
}

.doctor-do-item {
  display: flex;
  flex-direction: column;
}

.doctor-do-item-header {
  background: #EBF0FF 0 0 no-repeat padding-box;
  border: 1px solid #EBF0FF;
  border-radius: 8px 8px 0 0;
  padding: 7px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

}

.doctor-do-list-item {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  padding: 8px;
  border-bottom: 2px solid #EBF0FF;
}

.doctor-do-list-item:last-child {
  border-radius: 0 0 8px 8px;
}

.wire-table {

}

.wire-table thead {
  background: #EBF0FF 0 0 no-repeat padding-box;
  border: 1px solid #DBDBDB;
  border-radius: 8px 8px 0 0;
}

.wire-head {
  text-align: center;
  font: normal normal bold 12px/20px IRANYekan;
  letter-spacing: 0;
  color: #212945;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border: 1px solid #BDBDBD;
}

.dent-top {
  display: flex;
  flex-direction: row-reverse;
}

.dent-top img {
  width: 50px;
  height: 105px;
}

.dent-bottom {
  display: flex;
  flex-direction: row-reverse;
}

.dent-bottom img {
  width: 50px;
  height: 105px;
}

.dent-bottom img:hover, .dent-top img:hover {
  background: #EBF0FF 0 0 no-repeat padding-box;
  border: 1px solid #5063FF;
  border-radius: 8px;
  opacity: 1;
}

.dent-bottom img.is-selected, .dent-top img.is-selected {
  background: #EBF0FF 0 0 no-repeat padding-box;
  border: 1px solid #5063FF;
  border-radius: 8px;
  opacity: 1;
}
</style>

<template>
  <div class="my-4 py-2 px-3 bg-white rounded-lg">
    <div class="mb-10 flex flex-wrap justify-between">
      <div class="flex" style="align-items: center">
        <div>
          <input type="checkbox"
                 v-model="selectAll"
                 class="w-5 h-5 mt-2 border-solid border-2 border-gray-901 rounded-xl hover:border-gray-400">
        </div>
        <div class="mx-3">
          <div class="relative inline-flex" style="direction: ltr">
            <svg class="w-2 h-2 absolute top-0 right-0 m-4 pointer-events-none" xmlns="http://www.w3.org/2000/svg"
                 viewBox="0 0 412 232">
              <path
                d="M206 171.144L42.678 7.822c-9.763-9.763-25.592-9.763-35.355 0-9.763 9.764-9.763 25.592 0 35.355l181 181c4.88 4.882 11.279 7.323 17.677 7.323s12.796-2.441 17.678-7.322l181-181c9.763-9.764 9.763-25.592 0-35.355-9.763-9.763-25.592-9.763-35.355 0L206 171.144z"
                fill="#648299" fill-rule="nonzero"/>
            </svg>
            <select
              v-model="act"
              class="border border-gray-500 rounded-lg text-gray-600 h-12 w-40 pl-5 pr-2 bg-white hover:border-gray-400 focus:outline-none appearance-none">
              <option value="1">حذف</option>
            </select>
          </div>
        </div>
        <div @click="doAction"
             class="cursor-pointer w-24 h-12 py-3 bg-gray-100 text-sm text-center text-black border-gray-901 border-solid border-2 rounded-lg">
          انجام بده
        </div>
      </div>
      <div>
        <SearchDoctor/>
      </div>
    </div>
    <TableSearch/>
  </div>
</template>

<script>
import TableSearch from "@/components/DoctorProfile/TableSearch";
import SearchDoctor from "@/components/DoctorProfile/SearchDoctor";

export default {
  name: "AdmissionsSearch",
  components: {TableSearch, SearchDoctor},
  data() {
    return {
      act: null,
    }
  },
  computed: {
    listUser() {
      return this.$store.getters['doctor/patients/getToday']
    },
    selectedItems() {
      return this.$store.getters['selected/getSelected']
    },
    selectAll: {
      get() {
        if (this.listUser) {
          return this.listUser.length > 0 ? this.selectedItems.length == this.listUser.length : false;
        } else {
          return false;
        }
      },
      set(val) {
        if (this.listUser) {
          const self = this
          this.listUser.forEach(function (user) {
            self.selectItem(val, user.id)
          });
        }
      }
    },
  },
  methods: {
    selectItem(checked, id) {
      this.$store.dispatch('selected/updateSelected', {
        checked: checked,
        id: id,
      })
    },
    doAction() {
      switch (this.act) {
        case 1:
          this.search();
          break;
      }
    },
    search() {

    }
  }
}
</script>

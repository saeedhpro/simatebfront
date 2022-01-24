<template>
  <div class="p-3 bg-white rounded-lg shadow-md">

    <div>

      <div class="my-2 flex flex-wrap justify-end" style="align-items: center">

        <div class="px-3 py-2 ml-2 my-1 flex bg-white border-gray-901 border-solid rounded-lg border"
             :class="{'selectedBlue' : status1 === '1'}">
          <div style="align-items: center">
            <span>Heart Problem</span>
            <input v-model="selected" value="Heart Problem" type="checkbox" class="w-5 bg-gray-907 rounded-full">
          </div>
        </div>

        <div class="px-3 py-2 ml-2 my-1 flex bg-white border-gray-901 border-solid rounded-lg border"
             :class="{'selectedBlue' : status1 === '1'}" style="align-items: center">
          <span>Hepatitis</span>
          <input v-model="selected" value="Hepatitis" type="checkbox" class="w-5 bg-gray-907 rounded-full">
        </div>


        <div class="px-3 py-2 ml-2 my-1 flex bg-white border-gray-901 border-solid rounded-lg border"
             :class="{'selectedBlue' : status1 === '1'}" style="align-items: center">
          <span>Thyroid</span>
          <input v-model="selected" value="Thyroid" type="checkbox" class="w-5 bg-gray-907">
        </div>


        <div class="px-3 py-2 ml-2 my-1 flex bg-white border-gray-901 border-solid rounded-lg border"
             :class="{'selectedBlue' : status1 === '1'}" style="align-items: center">
          <span>Diabetes</span>
          <input v-model="selected" value="Diabetes" type="checkbox" class="w-5 bg-gray-907">
        </div>

        <div class="px-3 py-2 ml-2 my-1 flex bg-white border-gray-901 border-solid rounded-lg border"
             :class="{'selectedBlue' : status1 === '1'}" style="align-items: center">
          <span>Hemophilia</span>
          <input v-model="selected" value="Hemophilia" type="checkbox" class="w-5 bg-gray-907">
        </div>

        <div class="px-3 py-2 ml-2 my-1 flex bg-white border-gray-901 border-solid rounded-lg border"
             :class="{'selectedBlue' : status1 === '1'}" style="align-items: center">
          <span>Allergy</span>
          <input v-model="selected" value="Allergy" type="checkbox" class="w-5 bg-gray-907">
        </div>

        <div class="px-3 py-2 ml-2 my-1 flex bg-white border-gray-901 border-solid rounded-lg border"
             :class="{'selectedBlue' : status1 === '1'}" style="align-items: center">
          <span>Asthma</span>
          <input v-model="selected" value="Asthma" type="checkbox" class="w-5 bg-gray-907">
        </div>

        <div class="px-3 py-2 ml-2 my-1 flex bg-white border-gray-901 border-solid rounded-lg border"
             :class="{'selectedBlue' : status1 === '1'}" style="align-items: center">
          <span>Kidney</span>
          <input v-model="selected" value="Kidney" type="checkbox" class="w-5 bg-gray-907">
        </div>

        <div class="px-3 py-2 ml-2 my-1 flex bg-white border-gray-901 border-solid rounded-lg border"
             :class="{'selectedBlue' : status1 === '1'}" style="align-items: center">
          <span>Epilepsy</span>
          <input v-model="selected" value="Epilepsy" type="checkbox" class="w-5 bg-gray-907">
        </div>
      </div>
    </div>
    <div class="flex flex-wrap justify-between">
      <div class="my-2">
        <div class="mb-2 text-sm text-left">Adenoid & Tonsile Reduction</div>
        <input @input="onChanged" v-model="h.adenoid_tonsile_reduction"
               class="w-56 h-10 px-2 bg-white border-solid border-gray-901 border rounded-lg"/>
      </div>
      <div class="my-2">
        <div class="mb-2 text-sm text-left">Consumable Medicine</div>
        <input @input="onChanged" v-model="h.consumable_medicine"
               class="w-56 h-10 px-2 bg-white border-solid border-gray-901 border rounded-lg"/>
      </div>
      <div class="my-2">
        <div class="mb-2 text-sm text-left">General Health</div>
        <input @input="onChanged" v-model="h.general_health"
               class="w-56 h-10 px-2 bg-white border-solid border-gray-901 border rounded-lg"/>
      </div>
      <div class="my-2">
        <div class="mb-2 text-sm text-left">Under Physician Care</div>
        <input @input="onChanged" v-model="h.under_physician_care"
               class="w-56 h-10 px-2 bg-white border-solid border-gray-901 border rounded-lg"/>
      </div>
      <div class="my-2">
        <div class="mb-2 text-sm text-left">Accident to Head and Neck Area</div>
        <input @input="onChanged" v-model="h.accident_to_Head"
               class="w-56 h-10 px-2 bg-white border-solid border-gray-901 border rounded-lg"/>
      </div>
      <div class="my-2">
        <div class="mb-2 text-sm text-left">Operations</div>
        <input @input="onChanged" v-model="h.operations"
               class="w-56 h-10 px-2 bg-white border-solid border-gray-901 border rounded-lg"/>
      </div>

    </div>
    <div class="my-2">
      <div class="mb-2 text-sm text-left">Others</div>
      <input @input="onChanged" v-model="h.others"
             class="w-full h-10 px-2 bg-white border-solid border-gray-901 border rounded-lg"/>
    </div>


  </div>

</template>

<script>
export default {
  name: "MedicalCondition",
  props: {
    histories: {
      type: Object,
      default: null
    }
  },
  mounted() {
    setTimeout(() => {
      const histories = this.histories;
      if (histories) {
        this.h = {
          medical_condition: histories.medical_condition,
          adenoid_tonsile_reduction: histories.adenoid_tonsile_reduction,
          consumable_medicine: histories.consumable_medicine,
          general_health: histories.general_health,
          under_physician_care: histories.under_physician_care,
          accident_to_Head: histories.accident_to_Head,
          operations: histories.operations,
          others: histories.others,
        }
        this.selected = histories.medical_condition.length > 0 ? histories.medical_condition.split(',') : []
      }
    }, 200)
  },
  data() {
    return {
      h: {
        medical_condition: '',
        adenoid_tonsile_reduction: '',
        consumable_medicine: '',
        general_health: '',
        under_physician_care: '',
        accident_to_Head: '',
        operations: '',
        others: '',
      },
      status1: '0',
      selected: [],
    }
  },
  methods: {
    onChanged() {
      this.$emit('changed', this.h)
    }
  },
  watch: {
    selected(val) {
      this.h.medical_condition = this.selected.join(',')
      this.onChanged()
    }
  }
}
</script>

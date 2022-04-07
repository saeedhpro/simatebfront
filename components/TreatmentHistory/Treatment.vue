<template>
  <div class="p-3 bg-white rounded-lg shadow-md" v-if="h">

    <div>
      <div class="my-2">
        <div class="mb-2 text-sm text-left">Treatment plan</div>
        <textarea @input="onChanged" v-model="h.treatment_plan"
                  class="w-full h-12 px-2 bg-white border-solid border-gray-901 border rounded-lg"></textarea>
      </div>
    </div>
    <div class="flex flex-wrap justify-between">
      <div>
        <div class="mb-2 text-sm text-left Bold">Fixed ortho surgery treatment</div>
        <div class="flex flex-col border-solid border border-gray-400 rounded-lg">
          <button @click="addToTreatmentPlan('Surgical Cl I Extraction')" class="py-3 px-4 border-b border-gray-400">
            Surgical Cl I Extraction
          </button>
          <button @click="addToTreatmentPlan('Surgical Cl I Nonextraction')" class="py-3 px-4 border-b border-gray-400">
            Surgical Cl I Nonextraction
          </button>
          <button @click="addToTreatmentPlan('Surgical Cl II Extraction')" class="py-3 px-4 border-b border-gray-400">
            Surgical Cl II Extraction
          </button>
          <button @click="addToTreatmentPlan('Surgical Cl II Nonextraction')"
                  class="py-3 px-4 border-b border-gray-400">Surgical Cl II Nonextraction
          </button>
          <button @click="addToTreatmentPlan('Surgical Cl III Extraction')" class="py-3 px-4 border-b border-gray-400">
            Surgical Cl III Extraction
          </button>
          <button @click="addToTreatmentPlan('Surgical Cl III Nonextraction')"
                  class="py-3 px-4 border-b border-gray-400">Surgical Cl III Nonextraction
          </button>
          <button @click="addToTreatmentPlan('Maxillary Expansion SARPE')" class="py-3 px-4 border-b border-gray-400">
            Maxillary Expansion SARPE
          </button>
        </div>
      </div>

      <div>
        <div class="mb-2 text-sm text-left Bold">Fixed orthodontic treatment</div>
        <div class="flex flex-col border-solid border border-gray-400 rounded-lg">
          <button @click="addToTreatmentPlan('Nonsurgical Cl I Extraction')" class="py-3 px-4 border-b border-gray-400">
            Nonsurgical Cl I Extraction
          </button>
          <button @click="addToTreatmentPlan('Nonsurgical Cl I Nonextraction')"
                  class="py-3 px-4 border-b border-gray-400">Nonsurgical Cl I Nonextraction
          </button>
          <button @click="addToTreatmentPlan('Nonsurgical Cl II Extraction')"
                  class="py-3 px-4 border-b border-gray-400">Nonsurgical Cl II Extraction
          </button>
          <button @click="addToTreatmentPlan('Nonsurgical Cl II Nonextraction')"
                  class="py-3 px-4 border-b border-gray-400">Nonsurgical Cl II Nonextraction
          </button>
          <button @click="addToTreatmentPlan('Nonsurgical CI III Nonextraction')"
                  class="py-3 px-4 border-b border-gray-400">Nonsurgical CI III Nonextraction
          </button>
          <button @click="addToTreatmentPlan('Maxillary Expansion Hyrax')" class="py-3 px-4 border-b border-gray-400">
            Maxillary Expansion Hyrax
          </button>
          <button @click="addToTreatmentPlan('Adjunctive')" class="py-3 px-4 border-b border-gray-400">Adjunctive
          </button>
        </div>
      </div>


      <div>
        <div class="mb-2 text-sm text-left Bold">Preadolescent treatment plan</div>
        <div class="flex flex-col border-solid border border-gray-400 rounded-lg">
          <button @click="addToTreatmentPlan('Serial Extraction')" class="py-3 px-4 border-b border-gray-400">Serial
            Extraction
          </button>
          <button @click="addToTreatmentPlan('Space Regaining')" class="py-3 px-4 border-b border-gray-400">Space
            Regaining
          </button>
          <button @click="addToTreatmentPlan('space supervision')" class="py-3 px-4 border-b border-gray-400">space
            supervision
          </button>
          <button @click="addToTreatmentPlan('maxillary expansion')" class="py-3 px-4 border-b border-gray-400">
            maxillary expansion
          </button>
          <button @click="addToTreatmentPlan('Growth Modification Cl II Headgear')"
                  class="py-3 px-4 border-b border-gray-400">Growth Modification Cl II Headgear
          </button>
          <button @click="addToTreatmentPlan('Growth Modification Cl II Functional')"
                  class="py-3 px-4 border-b border-gray-400">Growth Modification Cl II Functional
          </button>
          <button @click="addToTreatmentPlan('Growth Modification Cl III')" class="py-3 px-4 border-b border-gray-400">
            Growth Modification Cl III
          </button>
        </div>
      </div>

    </div>

    <div class="my-2">
      <div class="mb-2 text-sm text-left">Length of active treatment</div>
      <textarea @input="onChanged" v-model="h.length_active_treatment"
                class="w-full h-12 px-2 bg-white border-solid border-gray-901 border rounded-lg"></textarea>
    </div>

    <div class="pb-5 my-2 flex flex-wrap justify-between" style="align-items: center">
      <div class="my-2">
        <div class="mb-2 text-sm text-left">Retention</div>
        <input @input="onChanged" v-model="h.retention"
               class="w-64 h-10 px-2 bg-white border-solid border-gray-901 border rounded-lg"/>
      </div>
      <div class="my-2">
        <div class="mb-2 text-sm text-left">Prognosis</div>
        <input @input="onChanged" v-model="h.prognosis"
               class="w-64 h-10 px-2 bg-white border-solid border-gray-901 border rounded-lg"/>
      </div>
    </div>

    <div class="pb-5 my-2 flex flex-wrap justify-between" style="align-items: center">
      <div class="my-2">
        <div class="mb-2 text-sm text-left">Consultation</div>
        <input @input="onChanged" v-model="h.consultation"
               class="w-64 h-10 px-2 bg-white border-solid border-gray-901 border rounded-lg"/>
      </div>
      <div class="my-2">
        <div class="mb-2 text-sm text-left">Charging</div>
        <input @input="onChanged" v-model="h.charging"
               class="w-64 h-10 px-2 bg-white border-solid border-gray-901 border rounded-lg"/>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Treatment",
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
          treatment_plan: histories.treatment_plan || '',
          retention: histories.retention,
          length_active_treatment: histories.length_active_treatment,
          prognosis: histories.prognosis,
          consultation: histories.consultation,
          charging: histories.charging,
        }
      }
    }, 200)
  },
  data() {
    return {
      h: {
        treatment_plan: '',
        retention: '',
        length_active_treatment: '',
        prognosis: '',
        consultation: '',
        charging: '',
      }
    }
  },
  methods: {
    addToTreatmentPlan(item) {
      let treatment_plan = this.h.treatment_plan && this.h.treatment_plan.length > 0 ? this.h.treatment_plan.split(' - ') : []
      treatment_plan.push(item)
      this.h.treatment_plan = treatment_plan.join(' - ')
      this.onChanged()
    },
    onChanged() {
      this.$emit('changed', this.h)
    }
  },
}
</script>

<style scoped>

</style>

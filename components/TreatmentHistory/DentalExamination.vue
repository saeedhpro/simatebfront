<template>
  <div class="p-3 bg-white rounded-lg shadow-md">

    <div class="pb-5 my-2 flex flex-wrap justify-between border-b-2 border-gray-500" style="align-items: center">
      <div class="my-2">
        <div class="mb-2 text-sm text-left">Chief Complaint</div>
        <input @input="onChanged" v-model="h.chief_complaint"
               class="w-56 h-10 px-2 bg-white border-solid border-gray-901 border rounded-lg"/>
      </div>
      <div class="my-2">
        <div class="mb-2 text-sm text-left">Previous Orthodontic Ttreatment</div>
        <input v-model="h.previous_orthodontic"
               class="w-56 h-10 px-2 bg-white border-solid border-gray-901 border rounded-lg"/>
      </div>
      <div class="my-2">
        <div class="mb-2 text-sm text-left">Oral Hygiene</div>
        <select @change="onChanged" v-model="h.oral_hygiene"
                class="w-56 h-10 px-2 bg-white border-solid border-gray-901 border rounded-lg">
          <option value="good">Good</option>
          <option value="fair">Fair</option>
          <option value="poor">Poor</option>
        </select>
      </div>
    </div>


    <div class="pb-5 border-b-2 border-gray-500">
      <div class="my-3 Bold text-left">Extraoral Evaluation</div>
      <div class="my-2 flex flex-wrap justify-between" style="align-items: center">
        <div class="my-2">
          <div class="mb-2 text-sm text-left">Frontal</div>
          <select @change="onChanged" v-model="h.frontal"
                  class="w-56 h-10 px-2 bg-white border-solid border-gray-901 border rounded-lg">
            <option value="dolichofacials" selected="selected">dolichofacials</option>
            <option value="mesofacial">mesofacial</option>
            <option value="brachyfacial">brachyfacial</option>
            <option value="symmetrical">symmetrical</option>
            <option value="asymmetrical_skeletal">asymmetrical - skeletal</option>
            <option value="asymmetrical_functional">asymmetrical - functional</option>
          </select>
        </div>
        <div class="my-2">
          <div class="mb-2 text-sm text-left">Profile</div>
          <select @change="onChanged" v-model="h.profile"
                  class="w-56 h-10 px-2 bg-white border-solid border-gray-901 border rounded-lg">
            <option value="convex - Mx prognathic" selected="selected">convex - Mx prognathic</option>
            <option value="convex - Md retrognathic">convex - Md retrognathic</option>
            <option value="convex - bimax peognathic">convex - bimax peognathic</option>
            <option value="straight">straight</option>
            <option value="concave - Mx retrognathic">concave - Mx retrognathic</option>
            <option value="concave - Md prognathic">concave - Md prognathic</option>
            <option value="concave - bimax retrognathic">concave - bimax retrognathic</option>
          </select>
        </div>
      </div>
    </div>

    <div class="pb-5 border-b-2 border-gray-500">
      <div class="my-3 Bold text-left">Intraoral Evaluation</div>
      <div class=" my-5 flex flex-wrap justify-between" style="align-items: center">

        <button v-for="(i,k) in items"
                :key="k"
                @click="openItem(i)"
                class="h-12 px-4 mx-5 flex text-sm bg-white shadow-md text-center text-md rounded-lg click"
                style="align-items: center"
                :class="{'selectedBlue' : selectedItem === i}">
          <span>{{ itemsName[i] }}</span>
        </button>
      </div>
      <div class=" my-5 flex">
        <dental-component v-for="(i, n) in items" :key="n" v-if="selectedItem == i" :dental="h[selectedItem]"
                          :type="selectedItem"
                          @dentClicked="dentClicked"/>
      </div>
    </div>
  </div>
</template>

<script>
import DentalComponent from "../DoctorProfile/DentalComponent";

export default {
  name: "DentalExamination",
  components: {DentalComponent},
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
          oral_hygiene: histories.oral_hygiene,
          previous_orthodontic: histories.previous_orthodontic,
          chief_complaint: histories.chief_complaint,
          frontal: histories.frontal,
          profile: histories.profile,
          teeth_present: histories.teeth_present,
          un_erupted: histories.un_erupted,
          ie_missing: histories.ie_missing,
          ie_extracted: histories.ie_extracted,
          ie_impacted: histories.ie_impacted,
          ie_supernumerary: histories.ie_supernumerary,
          ie_caries: histories.ie_caries,
          ie_rct: histories.ie_rct,
          ie_anomalies: histories.ie_anomalies,
        }
      }
    }, 200)
  },
  data() {
    return {
      h: {
        oral_hygiene: '',
        previous_orthodontic: '',
        chief_complaint: '',
        frontal: '',
        profile: '',
        teeth_present: '',
        un_erupted: '',
        ie_missing: '',
        ie_extracted: '',
        ie_impacted: '',
        ie_supernumerary: '',
        ie_caries: '',
        ie_rct: '',
        ie_anomalies: '',
      },
      items: [
        'teeth_present',
        'un_erupted',
        'ie_missing',
        'ie_extracted',
        'ie_impacted',
        'ie_supernumerary',
        'ie_caries',
        'ie_rct',
        'ie_anomalies',
      ],
      itemsName: {
        teeth_present: 'Teeth Present',
        un_erupted: 'un erupted',
        ie_missing: 'missing',
        ie_extracted: 'extracted',
        ie_impacted: 'impacted',
        ie_supernumerary: 'supernumerary',
        ie_caries: 'caries',
        ie_rct: 'R.C.T',
        ie_anomalies: 'anomalies',
      },
      selectedItem: 'teeth_present',
    }
  },
  methods: {
    dentClicked(item, type) {
      this.h[type] = item
      this.onChanged()
    },
    openItem(item) {
      this.selectedItem = item
    },
    onChanged() {
      this.$emit('changed', this.h)
    }
  }
}
</script>

<style scoped>

</style>

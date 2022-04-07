<template>
  <div class="p-3 bg-white rounded-lg shadow-md">

    <div class="border-b border-gray-500">
      <div class="pb-5 border-b-2 border-gray-500">
        <div class="my-3 Bold text-left">Occlusion</div>
        <div class="my-2 flex flex-wrap justify-between" style="align-items: center">
          <div class="my-2">
            <div class="mb-2 text-sm text-left">Left Molar</div>
            <select @change="onChanged" v-model="h.left_molar"
                    class="w-32 h-10 px-2 bg-white border-solid border-gray-901 border rounded-lg">
              <option value="class II">class II</option>
              <option value="end on">end on</option>
              <option value="class I">class I</option>
              <option value="class III">class III</option>
            </select>
          </div>
          <div class="my-2">
            <div class="mb-2 text-sm text-left">Right Molar</div>
            <select @change="onChanged" v-model="h.right_molar"
                    class="w-32 h-10 px-2 bg-white border-solid border-gray-901 border rounded-lg">
              <option value="class II">class II</option>
              <option value="end on">end on</option>
              <option value="class I">class I</option>
              <option value="class III">class III</option>
            </select>
          </div>
          <div class="my-2">
            <div class="mb-2 text-sm text-left">Left Canine</div>
            <select @change="onChanged" v-model="h.left_canine"
                    class="w-32 h-10 px-2 bg-white border-solid border-gray-901 border rounded-lg">
              <option value="class II">class II</option>
              <option value="end on">end on</option>
              <option value="class I">class I</option>
              <option value="class III">class III</option>
            </select>
          </div>
          <div class="my-2">
            <div class="mb-2 text-sm text-left">Right Canine</div>
            <select @change="onChanged" v-model="h.right_canine"
                    class="w-32 h-10 px-2 bg-white border-solid border-gray-901 border rounded-lg">
              <option value="class II">class II</option>
              <option value="end on">end on</option>
              <option value="class I">class I</option>
              <option value="class III">class III</option>
            </select>
          </div>
        </div>
      </div>
    </div>
    <div>
      <div class="flex flex-wrap justify-between">
        <div class="my-2">
          <div class="mb-2 text-sm text-left">Overjet</div>
          <select @change="onChanged" v-model="h.overjet"
                  class="w-56 h-10 px-2 bg-white border-solid border-gray-901 border rounded-lg">
            <option value="class II">deep</option>
            <option value="end on">WNL</option>
            <option value="class I">open</option>
          </select>
        </div>
        <div class="my-2">
          <div class="mb-2 text-sm text-left">Overbite</div>
          <select @change="onChanged" v-model="h.overbite"
                  class="w-56 h-10 px-2 bg-white border-solid border-gray-901 border rounded-lg">
            <option value="Excessive">Excessive</option>
            <option value="WNL">WNL</option>
            <option value="Negative">Negative</option>
          </select>
        </div>
        <div class="my-2">
          <div class="mb-2 text-sm text-left">Crossbite (x-bite)</div>
          <select @change="onChanged" v-model="h.crossbite"
                  class="w-56 h-10 px-2 bg-white border-solid border-gray-901 border rounded-lg">
            <option value="anterior - w/shift">anterior - w/shift</option>
            <option value="anterior - w/o shift">anterior - w/o shift</option>
            <option value="posterior - w/shift - bilateral">posterior - w/shift - bilateral</option>
            <option value="posterior - w/shift - unilateral">posterior - w/shift - unilateral</option>
            <option value="posterior - w/o shift - bilateral">posterior - w/o shift - bilateral</option>
            <option value="posterior - w/o shift - unilateral">posterior - w/o shift - unilateral</option>
          </select>
        </div>
        <div class="my-2">
          <div class="mb-2 text-sm text-left">Midlines</div>
          <select @change="onChanged" v-model="h.midlines"
                  class="w-56 h-10 px-2 bg-white border-solid border-gray-901 border rounded-lg">
            <option value="mx">Mx &amp; md coincident w/face</option>
            <option value="mxoff">Mx off</option>
            <option value="mdoff_skeletal">Md off - skeletal asymm</option>
            <option value="posterior - w/shift - unilateral">Md off - funct asymm</option>
            <option value="posterior - w/o shift - bilateral">Md off - dental asymm</option>
          </select>
        </div>
        <div class="my-2">
          <div class="mb-2 text-sm text-left">Crowding - Mx</div>
          <select @change="onChanged" v-model="h.crowding_mx"
                  class="w-56 h-10 px-2 bg-white border-solid border-gray-901 border rounded-lg">
            <option value="none">none</option>
            <option value="mild">mild</option>
            <option value="moderate">moderate</option>
            <option value="severe">severe</option>
          </select>
        </div>
        <div class="my-2">
          <div class="mb-2 text-sm text-left">Crowding - Md</div>
          <select @change="onChanged" v-model="h.crowding_md"
                  class="w-56 h-10 px-2 bg-white border-solid border-gray-901 border rounded-lg">
            <option value="none">none</option>
            <option value="mild">mild</option>
            <option value="moderate">moderate</option>
            <option value="severe">severe</option>
          </select>
        </div>
        <div class="my-2">
          <div class="mb-2 text-sm text-left">Spacing - Mx</div>
          <select @change="onChanged" v-model="h.spacing_mx"
                  class="w-56 h-10 px-2 bg-white border-solid border-gray-901 border rounded-lg">
            <option value="none">none</option>
            <option value="mild">mild</option>
            <option value="moderate">moderate</option>
            <option value="severe">severe</option>
          </select>
        </div>
        <div class="my-2">
          <div class="mb-2 text-sm text-left">Spacing - Md</div>
          <select @change="onChanged" v-model="h.spacing_md"
                  class="w-56 h-10 px-2 bg-white border-solid border-gray-901 border rounded-lg">
            <option value="none">none</option>
            <option value="mild">mild</option>
            <option value="moderate">moderate</option>
            <option value="severe">severe</option>
          </select>
        </div>

      </div>
      <div class="my-2">
        <div class="mb-2 text-sm text-left">Summary diagnosis</div>
        <textarea @input="onChanged" v-model="h.diagnosis"
                  class="w-full h-12 px-2 bg-white border-solid border-gray-901 border rounded-lg"></textarea>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: "OcclusalExamination",
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
          left_molar: histories.left_molar,
          right_molar: histories.right_molar,
          left_canine: histories.left_canine,
          right_canine: histories.right_canine,
          overjet: histories.overjet,
          overbite: histories.overbite,
          crossbite: histories.crossbite,
          midlines: histories.midlines,
          crowding_mx: histories.crowding_mx,
          crowding_md: histories.crowding_md,
          spacing_mx: histories.spacing_mx,
          spacing_md: histories.spacing_md,
          diagnosis: histories.diagnosis,
        }
      }
    }, 200)
  },
  data() {
    return {
      h: {
        left_molar: '',
        right_molar: '',
        left_canine: '',
        right_canine: '',
        overjet: '',
        overbite: '',
        crossbite: '',
        midlines: '',
        crowding_md: '',
        spacing_mx: '',
        spacing_md: '',
        diagnosis: '',
      }
    }
  },
  methods: {
    onChanged() {
      this.$emit('changed', this.h)
    }
  }
}
</script>

<style scoped>

</style>

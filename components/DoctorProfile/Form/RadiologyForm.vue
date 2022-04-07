<template>
  <div class="from-block flex flex-row flex-wrap">
    <div class="row">
      <div class="col-6 form-items">
        <div class="form-item-header">
          INTRA ORAL
        </div>
        <div class="form-item-content">
          <div class="form-item">
            <div class="row">
              <input type="checkbox" value="INTRA ORAL - Periapical (Parallel)" @change="addToItems($event)"/>
              <label>Periapical (Parallel)</label>
            </div>
            <div class="row">
              <button @click="openDentModal">انتخاب</button>
            </div>
          </div>
          <div class="form-item">
            <div class="row">
              <input type="checkbox" value="INTRA ORAL - P.A Full mouth" @change="addToItems($event)"/>
              <label>P.A Full mouth</label>
            </div>
          </div>
          <div class="form-item">
            <div class="row">
              <input type="checkbox" value="INTRA ORAL - Occlusal" @change="addToItems($event)"/>
              <label>Occlusal:</label>
              <div class="form-item in">
                <div class="row">
                  <input type="checkbox" value="INTRA ORAL - Maxilla" @change="addToItems($event)"/>
                  <label>Maxilla:</label>
                </div>
              </div>
              <div class="form-item in">
                <div class="row">
                  <input type="checkbox" value="INTRA ORAL - Mandible" @change="addToItems($event)"/>
                  <label>Mandible:</label>
                </div>
              </div>
            </div>
          </div>
          <div class="form-item">
            <div class="row">
              <div class="col-12">
                <div class="row">
                  <input type="checkbox" value="INTRA ORAL - BiteWing" @change="addToItems($event)"/>
                  <label>BiteWing:</label>
                </div>
                <div class="col-12 in">
                  <div class="form-item">
                    <div class="row">
                      <input type="checkbox" value="INTRA ORAL - Left premolars" @change="addToItems($event)"/>
                      <label>Left premolars</label>
                    </div>
                  </div>
                  <div class="form-item">
                    <div class="row">
                      <input type="checkbox" value="INTRA ORAL - Right premolars" @change="addToItems($event)"/>
                      <label>Right premolars</label>
                    </div>
                  </div>
                  <div class="form-item">
                    <div class="row">
                      <input type="checkbox" value="INTRA ORAL - Left molars" @change="addToItems($event)"/>
                      <label>Left molars</label>
                    </div>
                  </div>
                  <div class="form-item">
                    <div class="row">
                      <input type="checkbox" value="INTRA ORAL - Right molars" @change="addToItems($event)"/>
                      <label>Right molars</label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-6 form-items">
        <div class="form-item-header">
          EXTRA ORAL
        </div>
        <div class="form-item-content">
          <div class="form-item">
            <div class="row">
              <input type="checkbox" value="EXTRA ORAL - Panoramic (OPG)" @change="addToItems($event)"/>
              <label>Panoramic (OPG)</label>
            </div>
          </div>
          <div class="form-item">
            <div class="row">
              <div class="col-12">
                <div class="row">
                  <input type="checkbox" value="EXTRA ORAL - Lateral Ceph" @change="addToItems($event)"/>
                  <label>Lateral Ceph. :</label>
                </div>
                <div class="col-12 in">
                  <div class="form-item">
                    <div class="row">
                      <input type="checkbox" value="EXTRA ORAL - Standard" @change="addToItems($event)"/>
                      <label>Standard</label>
                    </div>
                  </div>
                  <div class="form-item">
                    <div class="row">
                      <input type="checkbox" value="EXTRA ORAL - NHP" @change="addToItems($event)"/>
                      <label>NHP</label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="form-item">
            <div class="row">
              <input type="checkbox" value="EXTRA ORAL - P.A Ceph" @change="addToItems($event)"/>
              <label>P.A Ceph.</label>
            </div>
          </div>
          <div class="form-item">
            <div class="row">
              <input type="checkbox" value="EXTRA ORAL - Water's" @change="addToItems($event)"/>
              <label>Water's</label>
            </div>
          </div>
          <div class="form-item">
            <div class="row">
              <input type="checkbox" value="EXTRA ORAL - TMJ" @change="addToItems($event)"/>
              <label>TMJ</label>
            </div>
          </div>
          <div class="form-item">
            <div class="row">
              <input type="checkbox" value="EXTRA ORAL - Reverse Towne" @change="addToItems($event)"/>
              <label>Reverse Towne</label>
            </div>
          </div>
          <div class="form-item">
            <div class="row">
              <input type="checkbox" value="EXTRA ORAL - SMV" @change="addToItems($event)"/>
              <label>SMV</label>
            </div>
          </div>
          <div class="form-item">
            <div class="row">
              <div class="col-12">
                <div class="row">
                  <input type="checkbox" value="EXTRA ORAL - Lateral Oblique" @change="addToItems($event)"/>
                  <label>Lateral Oblique:</label>
                </div>
                <div class="col-12 in">
                  <div class="form-item">
                    <div class="row">
                      <input type="checkbox" value="EXTRA ORAL - Lateral Oblique - L" @change="addToItems($event)"/>
                      <label>L</label>
                    </div>
                  </div>
                  <div class="form-item">
                    <div class="row">
                      <input type="checkbox" value="EXTRA ORAL - Lateral Oblique - R" @change="addToItems($event)"/>
                      <label>R</label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <div class="row">
          <div class="col-6">
            <div class="form-item">
              <div class="row">
                <div class="col-12">
                  <div class="row">
                    <input type="checkbox" value="CBCT - CBCT" @change="addToItems($event)"/>
                    <label>CBCT:</label>
                  </div>
                  <div class="col-12 in">
                    <div class="form-item">
                      <div class="row">
                        <input type="checkbox" value="CBCT - Maxilla" @change="addToItems($event)"/>
                        <label>Maxilla</label>
                      </div>
                    </div>
                    <div class="form-item">
                      <div class="row">
                        <input type="checkbox" value="CBCT - Mandible" @change="addToItems($event)"/>
                        <label>Mandible</label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="form-item">
              <div class="row">
                <input type="checkbox"value="CBCT - Implant" @change="addToItems($event)"/>
                <label>Implant</label>
              </div>
              <div class="row">
                <button @click="openDentModal2">انتخاب</button>
              </div>
            </div>
          </div>
          <div class="col-6">
            <div class="form-item">
              <div class="row">
                <input type="checkbox" value="CBCT - Impacted tooth" @change="addToItems($event)"/>
                <label>Impacted tooth</label>
              </div>
            </div>
            <div class="form-item">
              <div class="row">
                <input type="checkbox" value="CBCT - Paranasal sinus and nasal fossa" @change="addToItems($event)"/>
                <label>Paranasal sinus and nasal fossa</label>
              </div>
            </div>
            <div class="form-item">
              <div class="row">
                <div class="col-12">
                  <div class="row">
                    <input type="checkbox" value="CBCT - TMJ" @change="addToItems($event)"/>
                    <label>TMJ:</label>
                  </div>
                  <div class="col-12 in">
                    <div class="form-item">
                      <div class="row">
                        <input type="checkbox" value="CBCT - TMJ - L" @change="addToItems($event)"/>
                        <label>L</label>
                      </div>
                    </div>
                    <div class="form-item">
                      <div class="row">
                        <input type="checkbox" value="CBCT -  TMJ - R" @change="addToItems($event)"/>
                        <label>R</label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="form-item">
              <div class="row">
                <input type="checkbox" value="CBCT - Lesion" @change="addToItems($event)"/>
                <label>Lesion</label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "RadiologyForm",
  computed: {
    items() {
      return this.$store.getters['forms/userWallet/getRadiologyItems']
    },
    openDent1() {
      return this.$store.getters['doctor/patients/getOpenDent1']
    },
    openDent2() {
      return this.$store.getters['doctor/patients/getOpenDent2']
    },
  },
  data() {
    return {
    }
  },
  methods: {
    addToItems(e) {
      this.$store.dispatch('forms/userWallet/updateRadiologyItems', {
        value: e.target.value,
        checked: e.target.checked,
      })
    },
    openDentModal() {
      this.$store.dispatch('doctor/patients/toggleOpenDent1')
    },
    openDentModal2() {
      this.$store.dispatch('doctor/patients/toggleOpenDent2')
    }
  }
}
</script>

<style scoped>
.from-block {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  flex-wrap: wrap;
}

.row {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;
  padding: 5px;
}

.row .col {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;
  margin: 5px;
}
.row {
  direction: ltr;
}
.row .col-6 {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  margin: 5px;
  max-width: 50%;
}

button {
  background: #F5F5F5 0 0 no-repeat padding-box;
  border: 1px solid #CCCCCC;
  border-radius: 8px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 7px 12px;
}
.form-item-content {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  direction: ltr;
  text-align: left;
  font: normal normal bold 16px/28px IRANYekan;
  letter-spacing: 0;
  color: #212945;
  width: 100%;
  background: #F7F7F7 0 0 no-repeat padding-box;
  border: 1px solid #BDBDBD;
  border-radius: 8px;
  padding: 15px;
}
.form-item-header {
  margin: auto;
  text-align: center;
  font: normal normal 800 24px/41px IRANYekan;
  letter-spacing: 0;
  color: #8F9BCE;
}
.row label {
  margin-left: 5px;
}
.form-item input {
  width: 18px;
  height: 26px;
}
.row .col-12 {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  direction: ltr;
}
.in {
  margin-left: 10px;
}
</style>

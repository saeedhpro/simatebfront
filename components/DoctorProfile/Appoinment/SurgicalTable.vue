<template>
  <div class="container">
    <vue-modaltor :visible="openApp" @hide="openApp=false">
      <template #header>
        <!--    add your custom header     -->
        <div class="pb-3 flex justify-between border-b border-gray-700" style="align-items: center">
          <div class="flex" style="align-items: center">
                       <div class="mr-3 w-5 h-5 p-1 border-solid border-gray-901 border rounded">

              <img src="/img/xmark.svg" @click="openApp = false">
            </div>
            <p class="mr-2">فرم پذیرش</p>
          </div>
        </div>
      </template>
      <template #body>

        <div v-if="item && user" class="py-4 flex flex-wrap justify-between border-b border-gray-500"
             style="align-items: center">
          <div class="flex flex-wrap" style="align-items: center">
            <div>
              <img src="/img/img-doc1.svg" class="ml-3">
            </div>
            <div>
              <nuxt-link :to="`/Doctor/Patients/${item.id}`" class="mb-4 Bold text-black underline text-lg">( سال
                {{ user.birth }}) {{ user.fname }} {{ user.lname }}
              </nuxt-link>
              <div class="mb-4 Bold text-black text-lg">{{ user.tel }}</div>
              <div class="mb-4">پرونده : <span class="p-1 rounded-lg bg-gray-902 text-black Bold">{{
                  user.file_id
                }}</span></div>
              <div>کد پذیرش : <span class="text-black Bold text-lg">{{ user.code }}</span></div>
            </div>
          </div>
          <div>
            <div class="mb-4 text-black">تاریخ:<span
              class="Bold text-lg"> {{
                ($moment(item.start_at.Time, "YYYY-MM-DDTHH:mm:SS").format('jYYYY/jMM/jDD'))
              }} </span></div>
            <div class="mb-4 text-black">ساعت:<span
              class="Bold text-lg">{{ ($moment(item.start_at.Time, "YYYY-MM-DDTHH:mm:SS").format('HH:mm')) }}</span>
            </div>
            <div class="mb-4 text-black">علت مراجعه :
              <span class="p-1 rounded-lg bg-gray-902 text-black Bold">{{
                  item.case_type ? item.case_type : 'معاینه'
                }}</span>
            </div>
            <div>وضعیت فعلی :
              <span class="p-1 rounded-lg bg-orange-200 text-orange-100 Bold" v-if="item.status === 1">رزرو شده</span>
              <span class="p-1 rounded-lg bg-orange-200 text-orange-100 Bold"
                    v-else-if="item.status === 2">پذیرش شده</span>
              <span class="p-1 rounded-lg bg-orange-200 text-orange-100 Bold"
                    v-else-if="item.status === 4">عدم حضور</span>
              <span class="p-1 rounded-lg bg-orange-200 text-orange-100 Bold"
                    v-else-if="item.status === 5">در انتظار</span>
              <span class="p-1 rounded-lg bg-orange-200 text-orange-100 Bold"
                    v-else-if="item.status === 3">کنسل شده</span>
            </div>
          </div>
        </div>

        <div v-if="item && user" class="py-4 border-b border-gray-500">
          <div>اقدامات پذیرش قبل : <span class="text-black Bold">{{ item.last ? item.last.future_prescription : '' }}</span></div>
        </div>

        <div v-if="item && user" class="py-4 border-b border-gray-500">
          <div>اقدامات فعلی :
            <span class="text-black Bold">
            {{ item.future_prescription }}
          </span>
          </div>
        </div>

        <div v-if="item && user" class="-mx-2 py-4 flex flex-wrap justify-between">
          <div class="md:w-1/2 px-2 w-full">
            <div class="flex flex-wrap justify-between">
              <div>شرح اقدامات و دستور پزشک</div>
              <button @click="doctorModal = true; addToPrescription = true;"
                      class="py-1 px-3 flex border-gray-901 border border-solid rounded-lg">
                <img src="/img/plusGray.svg" class="ml-2 w-3">
                اضافه کردن
              </button>
            </div>
            <textarea v-model="prescription"
                      class="h-20 w-full mt-3 bg-white border-solid border border-gray-901 rounded-lg"></textarea>
          </div>
          <div class="md:w-1/2 px-2 w-full md:border-r md:border-gray-500">
            <div class="flex flex-wrap justify-between">
              <div>اقدامات در ویزیت بعدی</div>
              <button @click="doctorModal = true; addToPrescription = true;"
                      class="py-1 px-3 flex border-gray-901 border border-solid rounded-lg">
                <img src="/img/plusGray.svg" class="ml-2 w-3">
                اضافه کردن
              </button>
            </div>
            <textarea v-model="future_prescription"
                      class="h-20 w-full mt-3 bg-white border-solid border border-gray-901 rounded-lg"></textarea>
          </div>
        </div>

        <div
          class="cursor-pointer w-full h-10 py-2 border border-solid border-gray-700 text-black text-center rounded-lg"
          @click="menu2 = !menu2">ارجاعیات
        </div>
        <div>
          <div class="mt-3 flex flex-wrap justify-between" v-if="menu2=== true" style="align-items: center">
            <div>
              <div class="py-2 text-center bg-gray-902 border-solid border border-gray-902 rounded-t-lg">رادیولوژی</div>
              <div class="p-2 border-solid border border-gray-902 rounded-b-lg">
                <select v-model="radiology_id"
                        class="w-56 h-10 px-3 bg-white border-solid border-gray-901 border rounded-lg">
                  <option v-for="(i,n) in getRadiologyList" :key="n" :value="i.id">
                    {{ i.name }}
                  </option>
                </select>

                <div @click="openRadiologyForm = true; open = true;"
                     class="cursor-pointer py-2 my-2 text-center bg-blue-902 rounded-lg text-white">
                  فرم رادیولوژی
                </div>
                <textarea class="h-20 w-full mt-2 p-2 border border-solid border-gray-901 bg-white rounded-lg"
                          placeholder="توضیحات رادیولوژی"></textarea>
              </div>
            </div>
            <div>
              <div class="py-2 text-center bg-gray-902 border-solid border border-gray-902 rounded-t-lg">فوتوگرافی</div>
              <div class="p-2 border-solid border border-gray-902 rounded-b-lg">
                <select v-model="photography_id"
                        class="w-56 h-10 px-2 bg-white border-solid border-gray-901 border rounded-lg">
                  <option v-for="(i, n) in getPhotographyList" :key="n" :value="i.id">
                    {{ i.name }}
                  </option>
                </select>
                <div @click="openPhotographyForm = true; open = true;"
                     class="cursor-pointer py-2 my-2 text-center bg-blue-902 rounded-lg text-white">
                  فرم فوتوگرافی
                </div>
                <textarea class="h-20 w-full mt-2 p-2 border border-solid border-gray-901 bg-white rounded-lg"
                          placeholder="توضیحات فتوگرافی"></textarea>
              </div>
            </div>
          </div>
        </div>

        <div class="mt-8 flex flex-wrap justify-between">
          <div class="w-28 h-10 py-2 border-solid border border-gray-700 rounded-lg text-gray-700 text-center">پاک کردن
            فرم
          </div>
          <div class="flex" style="align-items: center">
            <div class="w-28 h-10 py-2 text-center bg-gray-907 rounded-lg" @click="openApp = !openApp">بستن</div>
            <div
              @click="updateApp"
              class="w-56 h-10 py-2 mr-3 text-center bg-blue-902 rounded-lg text-white">
              <!--              <span class="w-10 h-10 bg-blue-905"><img src="/img/caret-down.svg"></span>-->
              پذیرش شده
            </div>
          </div>
        </div>

      </template>
    </vue-modaltor>
    <vue-modaltor :visible="open" @hide="open=false">
      <template #header>
        <!--    add your custom header     -->
        <div class="pb-3 flex justify-between border-b border-gray-700" style="align-items: center">
          <div class="flex" style="align-items: center">
                       <button class="mr-3 w-5 h-5 p-1 border-solid border-gray-901 border rounded">

              <img src="/img/xmark.svg" @click="close">
            </button>
            <p class="mr-2">فرم {{ getFormName() }}</p>
          </div>
        </div>
      </template>
      <template #body>
        <div>
          <photography-form :items="photographyItems" v-if="openPhotographyForm"/>
          <radiology-form :items="radiologyItems" v-if="openRadiologyForm"/>
          <ortodency-photography-form :items="ortodencyItems" v-if="openOrtodencyForm"/>
        </div>
        <div class="mt-8 flex flex-wrap justify-end">
          <button class="w-28 h-10 py-2 text-center bg-gray-907 rounded-lg" @click="open = false">بستن</button>
          <button class="w-56 h-10 py-2 mr-3 text-center bg-blue-902 rounded-lg text-white" @click="create">
            تایید
          </button>
        </div>

      </template>
    </vue-modaltor>
    <vue-modaltor :visible="doctorModal" @hide="doctorModal=false">
      <template #header>
        <!--    add your custom header     -->
        <div class="pb-3 flex justify-between border-b border-gray-700" style="align-items: center">
          <div class="flex" style="align-items: center">
                       <div class="mr-3 w-5 h-5 p-1 border-solid border-gray-901 border rounded">

              <img src="/img/xmark.svg" @click="doctorModal = !doctorModal">
            </div>
          </div>
        </div>
      </template>
      <template #body>
        <div>
          <div class="doctor-do-content">
            <div class="w-full md:w-1/3 flex flex-col">
              <div class="w-full flex flex-col doctor-do-item">
                <div class="w-full doctor-do-item-header">
                  Retraction & protraction
                </div>
                <div class="w-full flex flex-col doctor-do-items-list">
                  <div @click="addToDoctorDo('Anterior Retraction')" class="w-full doctor-do-list-item">
                    Anterior Retraction Loop 14
                  </div>
                  <div @click="addToDoctorDo('Canin Retraction')" class="w-full doctor-do-list-item">
                    Canin Retraction
                  </div>
                  <div @click="addToDoctorDo('posterior protraction')" class="w-full doctor-do-list-item">
                    posterior protraction
                  </div>
                </div>
              </div>
              <div class="w-full flex flex-col doctor-do-item">
                <div class="w-full doctor-do-item-header">
                  Elastic Therapy
                </div>
                <div class="w-full flex flex-col doctor-do-items-list">
                  <div @click="addToDoctorDo('CII')" class="w-full doctor-do-list-item">
                    CII
                  </div>
                  <div @click="addToDoctorDo('CIII')" class="w-full doctor-do-list-item">
                    CIII
                  </div>
                  <div @click="addToDoctorDo('Box')" class="w-full doctor-do-list-item">
                    Box
                  </div>
                  <div @click="addToDoctorDo('Criss Cross')" class="w-full doctor-do-list-item">
                    Criss Cross
                  </div>
                </div>
              </div>
              <div class="w-full flex flex-col doctor-do-item">
                <div class="w-full doctor-do-item-header">
                  Final evaluation
                </div>
                <div class="w-full flex flex-col doctor-do-items-list">
                  <div @click="addToDoctorDo('Debond')" class="w-full doctor-do-list-item">
                    Debond
                  </div>
                  <div @click="addToDoctorDo('Retainer Delivery')" class="w-full doctor-do-list-item">
                    Retainer Delivery
                  </div>
                </div>
              </div>
            </div>
            <div class="w-full md:w-1/3 flex flex-col">
              <div class="w-full flex flex-col doctor-do-item">
                <div class="w-full doctor-do-item-header">
                  Appliance adjustment
                </div>
                <div class="w-full flex flex-col doctor-do-items-list">
                  <div @click="addToDoctorDo('Band & Bond')" class="w-full doctor-do-list-item">
                    Band & Bond
                  </div>
                  <div @click="addToDoctorDo('Midline Screw Expansion')" class="w-full doctor-do-list-item">
                    Midline Screw Expansion
                  </div>
                  <div @click="addToDoctorDo('Appliance Delivery')" class="w-full doctor-do-list-item">
                    Appliance Delivery
                  </div>
                  <div @click="addToDoctorDo('Appliance Adjustment')" class="w-full doctor-do-list-item">
                    Appliance Adjustment
                  </div>
                  <div @click="addToDoctorDo('Hawley Z Spring')" class="w-full doctor-do-list-item">
                    Hawley Z Spring
                  </div>
                  <div @click="addToDoctorDo('Lingual Arch')" class="w-full doctor-do-list-item">
                    Lingual Arch
                  </div>
                  <div @click="addToDoctorDo('Quad Helix')" class="w-full doctor-do-list-item">
                    Quad Helix
                  </div>
                  <div @click="addToDoctorDo('W Arch')" class="w-full doctor-do-list-item">
                    W Arch
                  </div>
                  <div @click="addToDoctorDo('TPT')" class="w-full doctor-do-list-item">
                    TPT
                  </div>
                  <div @click="addToDoctorDo('Spring Activation')" class="w-full doctor-do-list-item">
                    Spring Activation
                  </div>
                  <div @click="addToDoctorDo('Rapid Palatal Expansion')" class="w-full doctor-do-list-item">
                    Rapid Palatal Expansion
                  </div>
                </div>
              </div>
            </div>
            <div class="w-full md:w-1/3 flex flex-col">
              <div class="w-full flex flex-col doctor-do-item">
                <div class="w-full doctor-do-item-header">
                  primary evaluation
                </div>
                <div class="w-full flex flex-col doctor-do-items-list">
                  <div @click="addToDoctorDo('Clinical Examination')" class="w-full doctor-do-list-item">
                    Clinical Examination
                  </div>
                  <div @click="addToDoctorDo('Doucumentation')" class="w-full doctor-do-list-item">
                    Doucumentation
                  </div>
                  <div @click="addToDoctorDo('Consultation')" class="w-full doctor-do-list-item">
                    Consultation
                  </div>
                  <div @click="addToDoctorDo('Radiography')" class="w-full doctor-do-list-item">
                    Radiography
                  </div>
                  <div @click="addToDoctorDo('Photography')" class="w-full doctor-do-list-item">
                    Photography
                  </div>
                  <div @click="addToDoctorDo('Impression')" class="w-full doctor-do-list-item">
                    Impression
                  </div>
                </div>
              </div>
              <div class="w-full flex flex-col doctor-do-item">
                <div class="w-full doctor-do-item-header">
                  Multi loop wire
                </div>
                <div class="w-full flex flex-col doctor-do-items-list">
                  <div @click="addToDoctorDo('Multil Loop 14')" class="w-full doctor-do-list-item">
                    Multil Loop 14
                  </div>
                  <div @click="addToDoctorDo('Multil Loop 16')" class="w-full doctor-do-list-item">
                    Multil Loop 16
                  </div>
                  <div @click="addToDoctorDo('Multil Loop 18')" class="w-full doctor-do-list-item">
                    Multil Loop 18
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            class="cursor-pointer w-full h-10 py-2 border border-solid border-gray-700 text-black text-center rounded-lg"
            @click="wire = !wire">
            Wire Replacement
          </div>
          <div>
            <div class="mt-3 flex flex-wrap justify-between" v-if="wire" style="align-items: center">
              <table class="wire-table">
                <tr>
                  <th class="wire-head">Ss(round)</th>
                  <th class="wire-head">Ss(rectangular)</th>
                  <th class="wire-head">nt(round)</th>
                  <th class="wire-head">nt(rectangular)</th>
                  <th class="wire-head">Wire overlay</th>
                  <th class="wire-head">ligature wire</th>
                  <th class="wire-head">coaxial</th>
                </tr>
                <tr>
                  <td>
                    <div class="wire-add" @click="addToDoctorDo('Ss(rond) 12')">12</div>
                  </td>
                  <td>
                    <div class="wire-add" @click="addToDoctorDo('ss(rectangular) 16*22')">16*22</div>
                  </td>
                  <td>
                    <div class="wire-add" @click="addToDoctorDo('nt(rond) 12')">12</div>
                  </td>
                  <td>
                    <div class="wire-add" @click="addToDoctorDo('nt(rectangular) 16*25')">16*25</div>
                  </td>
                  <td>
                    <div class="wire-add" @click="addToDoctorDo('nt(rectangular) 12')">12</div>
                  </td>
                  <td>
                    <div class="wire-add"></div>
                  </td>
                  <td>
                    <div class="wire-add" @click="addToDoctorDo('coaxial 0155')">0155</div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div class="wire-add" @click="addToDoctorDo('Ss(rond) 14')">14</div>
                  </td>
                  <td>
                    <div class="wire-add" @click="addToDoctorDo('ss(rectangular) 16*22')">17*22</div>
                  </td>
                  <td>
                    <div class="wire-add" @click="addToDoctorDo('nt(rond) 14')">14</div>
                  </td>
                  <td>
                    <div class="wire-add" @click="addToDoctorDo('nt(rectangular) 17*25')">17*25</div>
                  </td>
                  <td>
                    <div class="wire-add" @click="addToDoctorDo('nt(rectangular) 14')">14</div>
                  </td>
                  <td>
                    <div class="wire-add"></div>
                  </td>
                  <td>
                    <div class="wire-add" @click="addToDoctorDo('coaxial 0175')">0175</div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div class="wire-add" @click="addToDoctorDo('Ss(rond) 16')">16</div>
                  </td>
                  <td>
                    <div class="wire-add" @click="addToDoctorDo('ss(rectangular) 18*22')">18*22</div>
                  </td>
                  <td>
                    <div class="wire-add" @click="addToDoctorDo('nt(rond) 16')">16</div>
                  </td>
                  <td>
                    <div class="wire-add" @click="addToDoctorDo('nt(rectangular) 18*25')">18*25</div>
                  </td>
                  <td>
                    <div class="wire-add" @click="addToDoctorDo('nt(rectangular) 16')">16</div>
                  </td>
                  <td>
                    <div class="wire-add"></div>
                  </td>
                  <td>
                    <div class="wire-add" @click="addToDoctorDo('coaxial 0185')">0185</div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div class="wire-add" @click="addToDoctorDo('Ss(rond) 18')">18</div>
                  </td>
                  <td>
                    <div class="wire-add" @click="addToDoctorDo('ss(rectangular) 18*22')">19*22</div>
                  </td>
                  <td>
                    <div class="wire-add" @click="addToDoctorDo('nt(rond) 18')">18</div>
                  </td>
                  <td>
                    <div class="wire-add" @click="addToDoctorDo('nt(rectangular) 18*25')">19*25</div>
                  </td>
                  <td>
                    <div class="wire-add" @click="addToDoctorDo('nt(rectangular) 18')">18</div>
                  </td>
                  <td>
                    <div class="wire-add"></div>
                  </td>
                  <td>
                    <div class="wire-add" @click="addToDoctorDo('coaxial 0185')">0195</div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div class="wire-add" @click="addToDoctorDo('Ss(rond) 20')">20</div>
                  </td>
                  <td>
                    <div class="wire-add"></div>
                  </td>
                  <td>
                    <div class="wire-add" @click="addToDoctorDo('nt(rond) 20')">20</div>
                  </td>
                  <td>
                    <div class="wire-add"></div>
                  </td>
                  <td>
                    <div class="wire-add" @click="addToDoctorDo('nt(rectangular) 20')">20</div>
                  </td>
                  <td>
                    <div class="wire-add"></div>
                  </td>
                  <td>
                    <div class="wire-add"></div>
                  </td>
                </tr>
              </table>
            </div>
          </div>

        </div>
        <div class="mt-8 flex flex-wrap justify-end">
          <button class="w-28 h-10 py-2 text-center bg-gray-907 rounded-lg" @click="doctorModal = false">بستن</button>
          <button class="w-56 h-10 py-2 mr-3 text-center bg-blue-902 rounded-lg text-white" @click="create">
            تایید
          </button>
        </div>

      </template>
    </vue-modaltor>
    <vue-modaltor :visible="openDent1" @hide="openDent1=false">
      <template #header>
        <div class="pb-3 flex justify-between border-b border-gray-700" style="align-items: center">
          <div class="flex" style="align-items: center">
                       <div class="mr-3 w-5 h-5 p-1 border-solid border-gray-901 border rounded">

              <img src="/img/xmark.svg" @click="closeDent(1)">
            </div>
          </div>
        </div>
      </template>
      <template #body>
        <div class="dent-box">
          <div class="dent-top">
            <img @click="setDent(1, i)" v-for="(i, n) in 16" :src="`/dents/${i}.png`" :key="n">
          </div>
          <div class="dent-bottom">
            <img @click="setDent(1, i + 16)" v-for="(i, n) in 16" :src="`/dents/${i+16}.png`" :key="n">
          </div>
        </div>
      </template>
    </vue-modaltor>
    <vue-modaltor :visible="openDent2" @hide="openDent2=false">
      <template #header>
        <div class="pb-3 flex justify-between border-b border-gray-700" style="align-items: center">
          <div class="flex" style="align-items: center">
                       <div class="mr-3 w-5 h-5 p-1 border-solid border-gray-901 border rounded">

              <img src="/img/xmark.svg" @click="closeDent(2)">
            </div>
          </div>
        </div>
      </template>
      <template #body>
        <div class="dent-box">
          <div class="dent-top">
            <img @click="setDent(2, i)" v-for="(i, n) in 16" :src="`/dents/${i}.png`" :key="n">
          </div>
          <div class="dent-bottom">
            <img @click="setDent(2, i + 16)" v-for="(i, n) in 16" :src="`/dents/${i+16}.png`" :key="n">
          </div>
        </div>
      </template>
    </vue-modaltor>
    <vue-modaltor :visible="timeModal" @hide="timeModal=false">
      <template #header>
        <!--    add your custom header     -->
        <div class="pb-3 flex justify-between border-b border-gray-700" style="align-items: center">
          <div class="flex" style="align-items: center">
                       <div class="mr-3 w-5 h-5 p-1 border-solid border-gray-901 border rounded">

              <img src="/img/xmark.svg" @click="openEditModal = false">
            </div>
            <p class="mr-2">ساعت کاری</p>
          </div>
        </div>
      </template>
      <template #body>
        <div class="flex flex-wrap justify-between">
          <div>
            <label>ساعت شروع</label>
            <div class="w-56 h-10 px-2 bg-white border-solid border-gray-901 border rounded-lg">
              <date-picker
                type="time"
                format="HH:mm:ss" display-format="HH:mm:ss" :value="startTime"
                @input="onStartTimeChange"
                placeholder="ساعت شروع را انتخاب کنید"></date-picker>
            </div>
          </div>
          <div>
            <label>ساعت پایان</label>
            <div class="w-56 h-10 px-2 bg-white border-solid border-gray-901 border rounded-lg">
              <date-picker
                type="time"
                format="HH:mm:ss" display-format="HH:mm:ss" :value="endTime" @input="onEndTimeChange"
                placeholder="ساعت پایان را انتخاب کنید"></date-picker>
            </div>
          </div>
        </div>
        <div class="mt-8 flex flex-wrap ">
          <button class="w-28 h-10 py-2 text-center bg-gray-907 rounded-lg"
                  @click="timeModal = false;">بستن
          </button>
          <button class="w-56 h-10 py-2 mr-3 text-center bg-blue-902 rounded-lg text-white" @click="saveWorkHour">ذخیره
          </button>
        </div>

      </template>
    </vue-modaltor>

    <div class="py-5 px-10 my-5 bg-white rounded-lg">
      <div class="mb-10 flex flex-wrap justify-between">
        <div class="flex" style="align-items: center">
          <div class="mx-3">
            <div class="relative inline-flex" style="direction: ltr">
              <svg class="w-2 h-2 absolute top-0 right-0 m-4 pointer-events-none" xmlns="http://www.w3.org/2000/svg"
                   viewBox="0 0 412 232">
                <path
                  d="M206 171.144L42.678 7.822c-9.763-9.763-25.592-9.763-35.355 0-9.763 9.764-9.763 25.592 0 35.355l181 181c4.88 4.882 11.279 7.323 17.677 7.323s12.796-2.441 17.678-7.322l181-181c9.763-9.764 9.763-25.592 0-35.355-9.763-9.763-25.592-9.763-35.355 0L206 171.144z"
                  fill="#648299" fill-rule="nonzero"/>
              </svg>
              <select
                v-model="month"
                @change="changed"
                class="border border-gray-500 rounded-lg text-gray-600 h-12 w-40 pl-5 pr-2 bg-white hover:border-gray-400 focus:outline-none appearance-none">
                <option v-for="(i, n) in months" :key="n" :value="i.id">{{ i.name }}</option>
              </select>
            </div>
          </div>

        </div>
        <div class="flex" style="align-items: center">
          <div class="mx-3">
            <div class="relative inline-flex" style="direction: ltr">
              <svg class="w-2 h-2 absolute top-0 right-0 m-4 pointer-events-none" xmlns="http://www.w3.org/2000/svg"
                   viewBox="0 0 412 232">
                <path
                  d="M206 171.144L42.678 7.822c-9.763-9.763-25.592-9.763-35.355 0-9.763 9.764-9.763 25.592 0 35.355l181 181c4.88 4.882 11.279 7.323 17.677 7.323s12.796-2.441 17.678-7.322l181-181c9.763-9.764 9.763-25.592 0-35.355-9.763-9.763-25.592-9.763-35.355 0L206 171.144z"
                  fill="#648299" fill-rule="nonzero"/>
              </svg>
              <select
                v-model="year"
                @change="changed"
                class="border border-gray-500 rounded-lg text-gray-600 h-12 w-40 pl-5 pr-2 bg-white hover:border-gray-400 focus:outline-none appearance-none">
                <option v-for="(i, n) in years" :key="n" :value="i">{{ i }}</option>
              </select>
            </div>
          </div>
        </div>
        <div class="flex flex-wrap justify-start">
          <div class="flex" style="align-items: center">
            <div class="mx-3">
              نمایش به تفکیک:
            </div>
          </div>
          <button
            @click="toggleShowTime"
            class="px-3 py-2 flex bg-white rounded-lg shadow-md text-sm click ml-0.5"
            style="align-items: center;">
            <img
              src="/img/calenderGray.png" class="ml-2 w-8">
            ساعت
          </button>
          <button
            @click="toggleCases"
            class="px-3 py-2 flex bg-white rounded-lg shadow-md text-sm click"
            style="align-items: center;">
            <img
              src="/img/list-check.svg" class="ml-2 w-8">
            علل مراجعه
          </button>
        </div>
        <div class="flex" style="align-items: center">
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
                @change="selectAction"
                class="border border-gray-500 rounded-lg text-gray-600 h-12 w-40 pl-5 pr-2 bg-white hover:border-gray-400 focus:outline-none appearance-none">
                <option value="0" disabled selected>تنظیمات</option>
                <option value="1">ساعت کاری</option>
                <option value="2">روزهای تعطیل</option>
                <option value="3">علل مراجعه</option>
                <option value="4">برنامه نوبت دهی vip</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <div class="table-wrapper">
        <div class="table-content">
          <div v-for="(i,n) in (daysInMonth)" class="day-col">
            <div v-if="showCases" v-for="(j,s) in cases" class="case-item">
              <div class="right">
                {{ j.name }}
              </div>
              <div class="left">
                {{ j.limitation }}
              </div>
            </div>
            <div class="appt-day-col">
              <div class="appt-day-col-header"
                   :class="{'is-friday' : isFriday(i)}">
                <span>{{ $moment(`${year}/${month}/${i}`, "jYYYY/jMM/jDD").locale("fa").format("dddd") }}</span>
                <span>{{ $moment(`${year}/${month}/${i}`, "jYYYY/jMM/jDD").locale("fa").format("jDD jMMMM") }}</span>
              </div>
              <div class="appt-day-col-content">
                <div v-for="(k,l) in workTimeItemCount" class="appt-day-col-content-item"
                     :class="{'is-friday' : isFriday(i)}">
                  <div class="appt-day-col-content-time">
                    <div v-if="showTime">
                      <div v-if="getAppointmentObject(n, l)">
                        <AppointmentReserveItem @selected="itemClicked" :item="getAppointmentObject(n, l)"/>
                      </div>
                      <div v-else>{{ getTimeString(l) }}</div>
                    </div>
                    <div v-else>
                      <AppointmentReserveItem v-if="apps[n] && apps[n][l]" @selected="itemClicked" :item="apps[n][l]"/>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PhotographyForm from "../Form/PhotographyForm";
import AppointmentForm from "../Form/AppointmentForm";
import RadiologyForm from "../Form/RadiologyForm";
import AppointmentReserveItem from "../Appoinment/AppointmentReserveItem";
import Table from "../Table";
import OrtodencyPhotographyForm from "../Form/OrtodencyPhotographyForm";

export default {
  name: "SurgicalTable",
  components: {
    OrtodencyPhotographyForm,
    Table,
    RadiologyForm,
    AppointmentForm,
    PhotographyForm,
    AppointmentReserveItem
  },
  mounted() {
    this.month = this.$route.query.month || parseInt(this.$moment(new Date()).format("jMM"));
    this.year = this.$route.query.year || parseInt(this.$moment(new Date()).format("jYYYY"));
    this.daysInMonth = this.$moment.jDaysInMonth(this.year, this.month) || 30
    for (let i = 1398; i < this.year + 10; i++) {
      this.years.push(i)
    }
    this.$router.push({
      path: this.$route.path,
      query: {
        ...this.$route.query,
        month: this.month,
        year: this.year,
      }
    })
    this.$store.dispatch('case_types/userWallet/getCaseTypes')
    this.$store.dispatch('case_types/userWallet/orgWorkTime', this.userLogin.organization_id)
      .then(res => {
        this.getWorkTimeItemCount()
      })
    this.getApps()
    this.getOrgRadiologyList()
    this.getOrgPhotographyList()
  },
  data() {
    return {
      months: [
        {
          id: 1,
          name: 'فروردین'
        },
        {
          id: 2,
          name: 'اردیبهشت'
        },
        {
          id: 3,
          name: 'خرداد'
        },
        {
          id: 4,
          name: 'تیر'
        },
        {
          id: 5,
          name: 'مرداد'
        },
        {
          id: 6,
          name: 'شهریور'
        },
        {
          id: 7,
          name: 'مهر'
        },
        {
          id: 8,
          name: 'آبان'
        },
        {
          id: 9,
          name: 'آذر'
        },
        {
          id: 10,
          name: 'دی'
        },
        {
          id: 11,
          name: 'بهمن'
        },
        {
          id: 12,
          name: 'اسفند'
        },
      ],
      timeModal: false,
      month: null,
      year: null,
      years: [],
      apps: [],
      ortodencyItems: [],
      radiologyItems: [],
      photographyItems: [],
      act: 0,
      openOrtodencyForm: false,
      openRadiologyForm: false,
      openPhotographyForm: false,
      open: false,
      appOpen: false,
      showCases: false,
      showTime: false,
      openApp: false,
      menu2: false,
      doctorModal: false,
      addToPrescription: false,
      nextVisitModal: false,
      wire: false,
      doctor: false,
      user: null,
      radios: [],
      photos: [],
      doctors: [],
      item: null,
      photography_id: null,
      radiology_id: null,
      photoCases: [],
      prescription: '',
      future_prescription: '',
      daysInMonth: 30,
      workTimeItemCount: 0,
      startTime: "15:00:00",
      endTime: "21:00:00",
    }
  },
  methods: {
    isInList(f, index) {
      if (f == 1) {
        return this.firstDents.find(i => i == index);
      } else if (f == 2) {
        return this.secondDents.find(i => i == index);
      }
    },
    setDent(f, index) {
      if (f == 1) {
        if (this.firstDents.find(i => i == index)) {
          this.firstDents = this.firstDents.filter(i => i != index)
        } else {
          this.firstDents.push(index)
        }
      } else if (f == 2) {
        if (this.secondDents.find(i => i == index)) {
          this.secondDents = this.secondDents.filter(i => i != index)
        } else {
          this.secondDents.push(index)
        }
      }
    },
    getOrgRadiologyList() {
      this.$store.dispatch('organization/userWallet/getOrgRels', {
        id: this.userLogin.organization_id,
        prof: 3
      })
    },
    getOrgPhotographyList() {
      this.$store.dispatch('organization/userWallet/getOrgRels', {
        id: this.userLogin.organization_id,
        prof: 1
      })
    },
    addToDoctorDo(item) {
      if (this.addToPrescription) {
        const array = this.prescription.trim().split(' - ')
        array.push(item)
        this.prescription = array.length == 1 ? array.join('') : array.join(' - ')
      } else {
        const array = this.future_prescription.trim().split(' - ')
        array.push(item)
        this.future_prescription = array.length == 1 ? array.join('') : array.join(' - ')
      }
      this.doctorModal = false
    },
    getApps() {
      this.$store.dispatch('case_types/userWallet/getOrgAppointments', {
        id: this.userLogin.organization_id,
        case: 'جراحی',
        start_at: this.$moment(`${this.year}/${this.month}/01 00:00:00`, 'jYYYY/jMM/jDD HH:mm:ss').format("YYYY/MM/DD HH:mm:ss"),
        end_at: this.$moment(`${this.year}/${this.month}/${this.daysInMonth} 23:59:59`, 'jYYYY/jMM/jDD HH:mm:ss').format("YYYY/MM/DD HH:mm:ss"),
      })
    },
    getTimeString(index = 0) {
      const f = this.$moment(this.startTime, "HH:mm:ss")
      f.add(index * this.getWorkTimeDistance(), "minutes")
      return this.$moment(f.toDate()).format("HH:mm:ss")
    },
    getAppointmentObject(day = 0, index = 0) {
      let f = this.$moment(`${this.year}/${this.month}/${day + 1} ${this.startTime}`, "jYYYY/jMM/jDD HH:mm:ss")
      f = f.add((index + 1) * this.getWorkTimeDistance(), "minute")
      let s = this.$moment(`${this.year}/${this.month}/${day + 1} ${this.startTime}`, "jYYYY/jMM/jDD HH:mm:ss")
      s = s.add((index) * this.getWorkTimeDistance(), "minute")
      return this.hasAppointmentInDuration(
        this.$moment(s.toDate()),
        this.$moment(f.toDate())
      )
    },
    updateApp() {
      const rads = [
        ...this.getRadiologyList
      ];
      for (const k in this.firstDents) {
        rads.push(k)
      }
      for (const k in this.secondDents) {
        rads.push(k)
      }
      const data = {
        radiology_msg: this.radiology_msg,
        photography_msg: this.photography_msg,
        radiology_id: this.radiology_id,
        photography_id: this.photography_id,
        prescription: this.prescription,
        future_prescription: this.future_prescription,
        radiology_cases: rads,
        photography_cases: this.getPhotographyList,
      }
      console.log(data, "Data")
      this.$store.dispatch('doctor/patients/acceptAppointment', {
        id: this.item.id,
        data: data,
      })
    },
    hasAppointmentInDuration(startTime, endTime) {
      let appointments = this.getAppointments
      for (let i = 0; i < appointments.length; i++) {
        if (!appointments[i].start_at) continue
        let time = this.$moment(appointments[i].start_at.Time, "YYYY-MM-DDTHH:mm:SS").format("YYYY/MM/DD HH:mm:ss");
        time = this.$moment(time);
        time = this.$moment(time.toDate());
        if (time.isBetween(startTime, endTime)) {
          const app = appointments[i]
          appointments = appointments.filter(item => item.id === app.id)
          return app
        }
      }
      return null
    },
    async itemClicked(item) {
      this.item = item
      this.radiology_id = item.radiology_id
      this.photography_id = item.photography_id
      this.user = await this.$store.dispatch('doctor/patients/getPatient', item.user_id)
      this.openApp = true
    },
    onStartTimeChange(val) {
      this.startTime = val
    },
    onEndTimeChange(val) {
      this.endTime = val
    },
    changed() {
      this.$router.push({
        path: this.$route.path,
        query: {
          ...this.$route.query,
          month: this.month,
          year: this.year,
        }
      })
    },
    saveWorkHour() {
      console.log(this.userLogin.organization_id, "oeg")
      this.$store.dispatch('case_types/userWallet/setWorkTime', {
        id: this.userLogin.organization_id,
        work_hour_start: this.startTime,
        work_hour_end: this.endTime,
      })
      this.timeModal = false;
    },
    toggleShowTime() {
      this.showTime = !this.showTime
      this.getWorkTimeItemCount()
    },
    toggleCases() {
      this.showCases = !this.showCases
    },
    getFormName() {
      const profession = this.userLogin.profession;
      switch (profession.id) {
        case 1:
          return 'فتوگرافی'
        case 2:
          return 'آزمایشگاه'
        case 3:
          return 'رادیولوژی'
        case 4:
          return 'جراح و فک و صورت'
        case 5:
          return 'ارتودنسی'
        case 6:
          return 'متخصص گوش و حلق و بینی'
        case 7:
          return 'دندان پزشک'
      }
    },
    close() {
      this.open = false
      this.openOrtodencyForm = false
      this.openRadiologyForm = false
      this.openPhotographyForm = false
      this.ortodencyItems = []
      this.radiologyItems = []
      this.photographyItems = []
    },
    create() {
      this.open = false
      this.openOrtodencyForm = false
      this.openRadiologyForm = false
      this.openPhotographyForm = false
    },
    toggleTimeModal() {
      this.timeModal = !this.timeModal
    },
    selectAction(e) {
      switch (this.act) {
        case "0":
          return;
        case "1":
          this.toggleTimeModal()
          break;
        case "2":
          this.$router.push({
            path: '/Organization/Holiday'
          })
          break;
        case "3":
          break;
        case "4":
          this.$router.push({
            path: '/Organization/VipSchedule'
          })
          break;
        default:
          break;
      }
    },
    getWorkTimeDistance() {
      if (this.cases.length > 0) {
        return this.cases[0].duration > 0 ? this.cases[0].duration : 15
      }
      return 15
    },
    getWorkTimeItemCount() {
      let count = 5
      if (this.showTime) {
        if (this.getWorkTime) {
          this.startTime = this.getWorkTime.work_hour_start
          this.endTime = this.getWorkTime.work_hour_end
        }
        const f = this.$moment(this.startTime, "HH:mm:ss")
        const e = this.$moment(this.endTime, "HH:mm:ss")
        let difInMin = e.diff(f, "minutes")
        const distance = this.getWorkTimeDistance();
        count = Math.ceil(difInMin / distance)
      } else {
        count = this.getMostDayAppCount()
      }
      this.workTimeItemCount = count
    },
    getMostDayAppCount() {
      let count = Array(this.daysInMonth).fill(0);
      let apps = [];
      let most = 5
      if (this.getAppointments.length === 0) return most;
      let appointments = this.getAppointments
      for (let i = 0; i < this.daysInMonth; i++) {
        const founded = [];
        for (let j = 0; j < appointments.length; j++) {
          let time = this.$moment(appointments[j].start_at.Time, "YYYY-MM-DDTHH:mm:SS").format("YYYY/MM/DD HH:mm:ss")
          time = this.$moment(time);
          let startTime = this.$moment(this.$moment(`${this.year}/${this.month}/${i + 1} 00:00:00`, 'jYYYY/jMM/jDD HH:mm:ss').toDate()).format("YYYY/MM/DD HH:mm:ss")
          let endTime = this.$moment(this.$moment(`${this.year}/${this.month}/${i + 1} 23:59:59`, 'jYYYY/jMM/jDD HH:mm:ss').toDate()).format("YYYY/MM/DD HH:mm:ss")
          startTime = this.$moment(startTime);
          endTime = this.$moment(endTime);
          if (time.isBetween(startTime, endTime)) {
            count[i] += 1
            founded.push(appointments[j])
          }
        }
        apps.push(founded)
      }
      for (let i = 1; i < count.length; i++) {
        if (count[i] > count[i - 1]) {
          most = count[i]
        }
      }
      this.apps = apps;
      return most > 4 ? most : 5
    },
    isFriday(i) {
      return this.$moment(`${this.year}/${this.month}/${i}`, 'jYYYY/jMM/jDD').locale('fa').format('dddd') === 'جمعه';
    },
    isInHolyDay(date) {

    },
    closeDent(i) {
      if (i == 1) {
        this.$store.dispatch('doctor/patients/toggleOpenDent1')
      }
      if (i == 2) {
        this.$store.dispatch('doctor/patients/toggleOpenDent2')
      }
    },
  },
  computed: {
    openDent1() {
      return this.$store.getters['doctor/patients/getOpenDent1']
    },
    openDent2() {
      return this.$store.getters['doctor/patients/getOpenDent2']
    },
    list() {

    },
    getRadiologyList() {
      return this.$store.getters['organization/userWallet/getRadiologyList']
    },
    getPhotographyList() {
      return this.$store.getters['organization/userWallet/getPhotographyList']
    },
    getAppointments() {
      return this.$store.getters['case_types/userWallet/getAppointments']
    },
    userLogin() {
      return this.$store.getters['login/getUser']
    },
    cases() {
      return this.$store.getters['case_types/userWallet/getCases']
    },
    getWorkTime() {
      return this.$store.getters['case_types/userWallet/getWorkTime']
    }
  },
  watch: {
    getAppointments() {
      this.getWorkTimeItemCount()
    }
  }
}
</script>

<style scoped>
.disabled-bg {
  background: #EBEBEB 0 0 no-repeat padding-box;
  border-radius: 8px;
}

.table-wrapper {
  width: 100%;
}

.table-content {
  display: flex;
  overflow-x: scroll;
}

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

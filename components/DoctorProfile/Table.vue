<template>
  <div>
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
          <button @click=" edit=true "
                  class="px-5 py-2 flex text-black border border-solid border-gray-700 rounded-lg text-gray-700">
            <img src="/img/pengray.svg" class="ml-3">
            ویرایش
          </button>
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
                {{ user.birth | toPersianNumber }}) {{ user.fname }} {{ user.lname }}
              </nuxt-link>
              <div class="mb-4 Bold text-black text-lg">{{ user.tel | toPersianNumber }}</div>
              <div class="mb-4">پرونده : <span class="p-1 rounded-lg bg-gray-902 text-black Bold">{{
                  user.file_id | toPersianNumber
                }}</span></div>
              <div>کد پذیرش : <span class="text-black Bold text-lg">{{ user.code | toPersianNumber }}</span></div>
            </div>
          </div>
          <div>
            <div class="mb-4 text-black">تاریخ:<span
              v-if="item.start_at"
              class="Bold text-lg"> {{
                ($moment(item.start_at.Time, "YYYY-MM-DDTHH:mm:SS").format('jYYYY/jMM/jDD') | toPersianNumber)
              }} </span></div>
            <div class="mb-4 text-black">ساعت:<span
              v-if="item.start_at"
              class="Bold text-lg">{{
                ($moment(item.start_at.Time, "YYYY-MM-DDTHH:mm:SS").format('HH:mm')) | toPersianNumber
              }}</span>
            </div>
            <div class="mb-4 text-black">علت مراجعه :
              <span class="p-1 rounded-lg bg-gray-902 text-black Bold">{{
                  item.case_type ? item.case_type : 'معاینه'
                }}</span>
            </div>
            <div>وضعیت فعلی :
              <span class="p-1 rounded-lg bg-orange-200 text-orange-100 Bold" v-if="item.status == 1">رزرو شده</span>
              <span class="p-1 rounded-lg bg-orange-200 text-orange-100 Bold"
                    v-else-if="item.status == 2">پذیرش شده</span>
              <span class="p-1 rounded-lg bg-orange-200 text-orange-100 Bold"
                    v-else-if="item.status == 4">عدم حضور</span>
              <span class="p-1 rounded-lg bg-orange-200 text-orange-100 Bold"
                    v-else-if="item.status == 5">در انتظار</span>
              <span class="p-1 rounded-lg bg-orange-200 text-orange-100 Bold"
                    v-else-if="item.status == 3">کنسل شده</span>
            </div>
          </div>
        </div>

        <div v-if="item && user" class="py-4 border-b border-gray-500">
          <div>اقدامات پذیرش قبل : <span class="text-black Bold">{{
              item.last ? item.last.future_prescription : ''
            }}</span></div>
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
              <button @click="doctorModal = true; addToPrescription = false;"
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
                <textarea v-model="radiology_msg"
                          class="h-20 w-full mt-2 p-2 border border-solid border-gray-901 bg-white rounded-lg"
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
                <textarea v-model="photography_msg"
                          class="h-20 w-full mt-2 p-2 border border-solid border-gray-901 bg-white rounded-lg"
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
            <div class="w-28 h-10 py-2 text-center bg-gray-907 rounded-lg" @click="openApp = false">بستن</div>
            <div @click="saveApp"
                 class="cursor-pointer w-56 h-10 py-2 mr-3 text-center bg-blue-902 rounded-lg text-white">
              <!--              <span class="w-10 h-10 bg-blue-905"><img src="/img/caret-down.svg"></span>-->
              پذیرش
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
            <p class="mr-2">فرم پذیرش</p>
          </div>
        </div>
      </template>
      <template #body>
        <div>
          <photography-form :items="ortodencyItems" v-if="openPhotographyForm"/>
          <radiology-form :items="radiologyItems" v-if="openRadiologyForm"/>
          <ortodency-photography-form :items="photographyItems" v-if="openOrtodencyForm"/>
        </div>
        <div class="mt-8 flex flex-wrap justify-end">
          <button class="w-28 h-10 py-2 text-center bg-gray-907 rounded-lg" @click="close">بستن</button>
          <button class="w-56 h-10 py-2 mr-3 text-center bg-blue-902 rounded-lg text-white" @click="save">
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
            <img class="cursor-pointer" :class="{'is-selected' : isInList(1, i)}" @click="setDent(1, i)"
                 v-for="(i, n) in 16" :src="`/dents/${i}.png`" :key="n">
          </div>
          <div class="dent-bottom">
            <img class="cursor-pointer" :class="{'is-selected' : isInList(1, i + 16)}" @click="setDent(1, i + 16)"
                 v-for="(i, n) in 16" :src="`/dents/${i+16}.png`" :key="n">
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
            <img class="cursor-pointer" :class="{'is-selected' : isInList(2, i)}" @click="setDent(2, i)"
                 v-for="(i, n) in 16" :src="`/dents/${i}.png`" :key="n">
          </div>
          <div class="dent-bottom">
            <img class="cursor-pointer" :class="{'is-selected' : isInList(2, i + 16)}" @click="setDent(2, i + 16)"
                 v-for="(i, n) in 16" :src="`/dents/${i+16}.png`" :key="n">
          </div>
        </div>
      </template>
    </vue-modaltor>

    <div class="overflow-x-auto">
      <div class="h-20 flex border-solid border-2 border-gray-901 rounded-t-lg bg-gray-902 minWight ">
        <div class="w-10 py-5 border-l-2 border-gray-901"></div>
        <div class="w-64 py-5 border-l-2 border-gray-901 text-center">بیمار</div>
        <div class="w-32 py-5 border-l-2 border-gray-901 text-center">موبایل</div>
        <div class="w-32 py-5 border-l-2 border-gray-901 text-center">پرونده</div>
        <div class="w-40 py-5 border-l-2 border-gray-901 text-center">تاریخ</div>
        <div class="w-32 py-5 border-l-2 border-gray-901 text-center">ساعت</div>
        <div class="w-64  border-l-2 border-gray-901 text-center">
          <div class="py-2 border-b-2 border-gray-901">ارجاعیات</div>
          <div class="flex justify-center">
            <div class="py-2 w-32 flex border-l-2 border-gray-901 justify-center" style="align-items: center">
              <img src="/img/circle-radiation.svg" class="ml-2">
              رادیولوژی
            </div>
            <div class="py-2 w-32 mx-auto flex justify-center">
              <img src="/img/camera.svg" class="ml-2" style="align-items: center">
              فتوگرافی
            </div>
          </div>
        </div>
        <div class="w-32 py-5 mx-auto text-center">وضعیت</div>
      </div>

      <div v-if="listUser">
      <div class="h-10 flex border-b-2 border-l-2 border-r-2 border-gray-901 minWight table-link"
           v-for="(i , n) in listUser">
        <div class="w-10 py-2 border-l-2 border-gray-901 text-center">{{ n + 1 | toPersianNumber }}</div>

        <button class="w-64 py-2 pr-2 flex border-l-2 border-gray-901 text-center" style="align-items: center"
                @click="itemClicked(i)"
        >
          <input type="checkbox">
          <img :src="i.logo" class="w-8 h-8 mx-2 rounded-md" v-if="i.logo">
          <img src="/img/android-chrome-192x19211.png" class="w-8 h-8 mx-2 rounded-md" v-else>
          {{ i.fname }} {{ i.lname }}
        </button>

        <div v-if="i.tel" class="w-32 py-2 border-l-2 border-gray-901 text-center">{{ i.tel | toPersianNumber }}</div>
        <div v-else class="w-32 py-2 border-l-2 border-gray-901 text-center">-</div>
        <div class="w-32 py-2 border-l-2 border-gray-901 text-center">
          <span v-if="i.file_id" class="p-1 bg-gray-200 rounded">{{ i.file_id | toPersianNumber }}</span>
          <span v-else class="p-1 bg-gray-200 rounded">-</span>
        </div>
        <div class="w-40 py-2 border-l-2 border-gray-901 text-center" v-if="i.start_at">
          {{ $moment(i.start_at.Time, "YYYY-MM-DDTHH:mm:SS").format("jYYYY/jMM/jDD") | toPersianNumber }}
        </div>
        <div class="w-32 py-2 border-l-2 border-gray-901 text-center" v-if="i.start_at">{{
            $moment(i.start_at.Time, "YYYY-MM-DDTHH:mm:SS").format("HH:mm:ss") | toPersianNumber
          }}
        </div>
        <div class="w-64 flex justify-center border-l-2 border-gray-901 text-center">
          <div class="py-2 w-32 flex border-l-2 border-gray-901 justify-center" style="align-items: center">
            <span class="p-2 bg-gray-904 rounded-md" v-if="i.radiology_status == 1 "><img src="/img/blueTik.svg"
                                                                                          class="w-4"/></span>
            <span class="p-2 bg-gray-905 rounded-md" v-else-if="i.radiology_status == 2"><img src="/img/blackTik.svg"
                                                                                              class="w-4"></span>
            <span class="p-2 bg-green-300 rounded-md" v-else-if="i.radiology_status == 3"><img src="/img/greenTik.svg"
                                                                                               class="w-4"></span>
          </div>
          <div class="py-1 w-32 mx-auto flex justify-center">
            <span class="p-2 bg-gray-904 rounded-md" v-if="i.photography_status == 1"><img src="/img/blueTik.svg"
                                                                                           class="w-4"/></span>
            <span class="p-2 bg-gray-905 rounded-md" v-else-if="i.photography_status == 2"><img src="/img/blackTik.svg"
                                                                                                class="w-4"></span>
            <span class="p-2 bg-green-300 rounded-md" v-else-if="i.photography_status == 3"><img src="/img/greenTik.svg"
                                                                                                 class="w-4"></span>
          </div>
        </div>
        <div class="w-32 py-2 mx-auto text-center">
          <span class="w-20 px-4 text-blue-905 bg-gray-906 rounded-md" v-if="i.status == 2">پذیرش شده</span>
          <span class="w-20 px-4 text-gray-900 bg-gray-903 rounded-md" v-else-if="i.status == 4">عدم حضور</span>
          <span class="w-20 px-4 text-orange-100 rounded-md" v-else-if="i.status == 5">در انتظار</span>
          <span class="w-20 px-4 text-orange-100 bg-orange-200 rounded-md" v-else-if="i.status == 1">رزرو شده</span>
          <span class="w-20 px-4 text-pink-200 bg-red-200 rounded-md" v-else-if="i.status == 3">کنسل شده</span>
        </div>
      </div>
        </div>
      <paginate
        v-if="false"
        v-model="page"
        :page-count="listUser"
        :page-range="3"
        :margin-pages="2"
        :click-handler="clickCallback"
        :prev-text="'<'"
        :next-text="'>'"
        :container-class="'pagination'"
        :page-class="'page-item'">
      </paginate>

    </div>
  </div>
</template>

<script>
import PhotographyForm from "./Form/PhotographyForm";
import RadiologyForm from "./Form/RadiologyForm";
import OrtodencyPhotographyForm from "./Form/OrtodencyPhotographyForm";

export default {
  name: "Table",
  components: {OrtodencyPhotographyForm, RadiologyForm, PhotographyForm},
  data() {
    return {
      open: false,
      openApp: false,
      doctorModal: false,
      openOrtodencyForm: false,
      openRadiologyForm: false,
      openPhotographyForm: false,
      menu2: false,
      wire: false,
      menu: false,
      firstDents: [],
      secondDents: [],
      radios: [],
      photos: [],
      doctors: [],
      ortodencyItems: [],
      radiologyItems: [],
      photographyItems: [],
      user: null,
      photography_id: null,
      photography_msg: null,
      radiology_msg: null,
      radiology_id: null,
      photoCases: [],
      prescription: '',
      future_prescription: '',
      addToPrescription: false,
      showDelete: false,
      item: null,
      page: 1,
      edit: false,
      biography: false,
      addBiography: false
    }
  },
  mounted() {
    this.getToday()
    this.getOrgRadiologyItems()
    this.getOrgPhotographyItems()
  },
  computed: {
    openDent1() {
      return this.$store.getters['doctor/patients/getOpenDent1']
    },
    openDent2() {
      return this.$store.getters['doctor/patients/getOpenDent2']
    },
    listUser() {
      return this.$store.getters['doctor/patients/getToday']
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
  },
  methods: {
    saveApp() {
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
      this.$store.dispatch('doctor/patients/acceptAppointment', {
        id: this.item.id,
        data: data,
      })
      console.log(data)
    },
    create() {

    },
    save() {
      this.saveApp()
    },
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
    getOrgRadiologyItems() {
      this.$store.dispatch('organization/userWallet/getOrgRels', {
        id: this.userLogin.organization_id,
        prof: 3
      })
    },
    getOrgPhotographyItems() {
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
    async itemClicked(item) {
      this.item = item
      this.radiology_id = item.radiology_id
      this.photography_id = item.photography_id
      this.user = await this.$store.dispatch('doctor/patients/getPatient', item.user_id)
      this.openApp = true
    },
    getToday() {
      let today = new Date();
      let start_date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate() + " 00:00:00";
      let end_date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate() + " 23:59:59";
      this.$store.dispatch('doctor/patients/getToday', {
        start_date, end_date, page: this.page, q: this.$route.query.q || null
      })
    },
    close() {
      this.open = false
    },
    menu1() {
      this.menu = true
    },
    closeDent(i) {
      if (i == 1) {
        this.$store.dispatch('doctor/patients/toggleOpenDent1')
      }
      if (i == 2) {
        this.$store.dispatch('doctor/patients/toggleOpenDent2')
      }
    },
    clickCallback(pageNum) {
      console.log(pageNum)
    },
    async getUser(i) {
      this.user = await this.$store.dispatch('admin/user/getUser', i.id)
      this.open = true
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

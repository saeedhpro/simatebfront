<template>
  <div>
    <vue-modaltor :visible="open" @hide="open=false">
      <template #header>
        <!--    add your custom header     -->
        <div class="pb-3 flex justify-between border-b border-gray-700" style="align-items: center">
          <div class="flex" style="align-items: center">
                       <button class="mr-3 w-5 h-5 p-1 border-solid border-gray-901 border rounded">

              <img src="/img/xmark.svg" @click="close">
            </button>
            <p class="mr-2">فرم پرداخت</p>
          </div>
        </div>
      </template>
      <template #body>

        <div class="pt-3 flex flex-wrap justify-between" style="align-items: center">
          <div>
            <div class="flex flex-wrap">
              <div>
                <div class="mb-2">نام بیمار</div>
                <div class="w-56 h-10 px-2 bg-white border-solid border-gray-901 border rounded-lg">{{ user.fname }}
                  {{ user.lname }}
                </div>
              </div>
              <div class="mr-5">
                <div class="mb-2">تاریخ و ساعت پرداخت</div>
                <div class="w-56 h-10 px-2 bg-white border-solid border-gray-901 border rounded-lg">
                  <date-picker type="datetime" format="YYYY-MM-DD HH:mm" display-format="jYYYY/jMM/jDD HH:mm"
                               :value="check_date" @input="onChange" placeholder="تاریخ را انتخاب کنید"></date-picker>
                </div>
              </div>
              <div class="mr-5">
                <div class="mb-2">مبلغ</div>
                <input class="w-56 h-10 px-2 bg-white border-solid border-gray-901 border rounded-lg" v-model="amount"/>
              </div>
            </div>
            <div class="mt-5 flex flex-wrap">
              <div>
                <div class="mb-2">شکل پرداخت</div>
                <select class="w-56 h-10 px-2 bg-white border-solid border-gray-901 border rounded-lg"
                        v-model="paytype">
                  <option value="1">نقدی</option>
                  <option value="2">چک</option>
                  <option value="3">کارت به کارت</option>
                </select>
              </div>
              <div class="mr-5">
                <div class="mb-2">پرداخت برای</div>
                <select class="w-56 h-10 px-2 bg-white border-solid border-gray-901 border rounded-lg"
                        v-model="paid_for">
                  <option value="1">قسط درمان</option>
                  <option value="2">هزینه های جانبی</option>
                </select>
              </div>
              <div class="mr-5">
                <div class="mb-2">کد پیگیری</div>
                <input class="w-56 h-10 px-2 bg-white border-solid border-gray-901 border rounded-lg"
                       v-model="trace_code"/>
              </div>
            </div>
          </div>
        </div>

        <div class="mt-3 flex flex-wrap justify-between" style="align-items: center">
          <div>
            <div class="mb-2">واریز به</div>
            <input class="w-56 h-10 px-2 bg-white border-solid border-gray-901 border rounded-lg" v-model="paid_to"/>
          </div>
        </div>

        <div class="mt-3" style="align-items: center">
          <div>
            <div class="mb-2">توضیحات</div>
            <textarea class="p-2 w-full h-32 bg-white border-solid border-gray-901 border rounded-lg"
                      v-model="info"></textarea>
          </div>
        </div>

        <div class="mt-8 flex flex-wrap justify-between">
          <button class="w-28 h-10 py-2 border-solid border border-gray-700 rounded-lg text-gray-700 text-center"
                  @click="close">بستن
          </button>
          <button class="w-56 h-10 py-2 mr-3 text-center bg-blue-902 rounded-lg text-white" @click="savePayment">ذخیره
          </button>
        </div>

      </template>
    </vue-modaltor>

    <div class="p-3 bg-white rounded-lg">
      <div class="flex justify-between">
        <div class="text-blue-901">
          <span>مجموعه هزینه درمان : {{ paymentsList ? paymentsList.total_payment : 0 | toPersianCurrency }}</span>
          <span class="mx-5">مجموعه پرداخت ها : {{ paymentsList ? paymentsList.total_payment : 0 | toPersianCurrency }}</span>
          <span class="py-2 px-2 text-center border-solid border border-gray-901 rounded-lg">باقیمانده : <span
            class="text-blue-902">{{
              paymentsList ? parseFloat(paymentsList.total_payment) - parseFloat(paymentsList.total) : 0 | toPersianCurrency
            }}
          </span>
          </span>
        </div>
        <button class="w-36 h-12 px-2 text-sm flex bg-blue-902 rounded-lg text-white text-center click"
                @click="open=true"
                style="align-items: center">
          <div class="w-8 h-8 p-2 ml-4 bg-blue-903 rounded-lg text-center">
            <img src="/img/user-plus.svg">
          </div>
          <span>ثبت پرداخت</span>
        </button>
      </div>

      <div class="mb-3 flex" style="align-items: center">
        <div>
          <input type="checkbox" class="w-5 h-5 border-solid border-2 border-gray-500 rounded-lg hover:border-gray-400">
        </div>
        <div class="mx-3">
          <div class="relative inline-flex">
            <svg class="w-2 h-2 absolute top-0 right-0 m-4 pointer-events-none" xmlns="http://www.w3.org/2000/svg"
                 viewBox="0 0 412 232">
              <path
                d="M206 171.144L42.678 7.822c-9.763-9.763-25.592-9.763-35.355 0-9.763 9.764-9.763 25.592 0 35.355l181 181c4.88 4.882 11.279 7.323 17.677 7.323s12.796-2.441 17.678-7.322l181-181c9.763-9.764 9.763-25.592 0-35.355-9.763-9.763-25.592-9.763-35.355 0L206 171.144z"
                fill="#648299" fill-rule="nonzero"/>
            </svg>
            <select
              v-model="act"
              class="border border-gray-500 rounded-lg text-gray-600 h-10 pl-5 pr-2 bg-white hover:border-gray-400 focus:outline-none appearance-none">
              <option value="1">حذف</option>
            </select>
          </div>
        </div>
        <div
          @click="doAction"
          class="cursor-pointer w-24 py-2 bg-gray-100 text-sm text-center text-black border-gray-500 border-solid border-2 rounded-lg">
          انجام بده
        </div>
      </div>


      <div class="overflow-x-auto">
        <div class="flex border-solid border-2 border-gray-901 rounded-t-lg bg-gray-902 minWight">
          <div class="w-10 py-2 border-l-2 border-gray-901"></div>
          <div class="w-64 py-2 border-l-2 border-gray-901 text-center">بیمار</div>
          <div class="w-32 py-2 border-l-2 border-gray-901 text-center">تاریخ</div>
          <div class="w-32 py-2 border-l-2 border-gray-901 text-center">مبلغ <span class="text-sm">(ریال)</span></div>
          <div class="w-32 py-2 border-l-2 border-gray-901 text-center">کد پیگیری</div>
          <div class="w-32 py-2 border-l-2 border-gray-901 text-center">شکل پرداخت</div>
          <div class="w-32 py-2 mx-auto text-center">پرداخت برای</div>
        </div>
        <div v-if="paymentsList">
          <div class="flex border-b-2 border-r-2 border-l-2 border-gray-901 minWight table-link"
               v-for="(i , n) in paymentsList.payments" :key="n">
            <div class="w-10 py-2 text-center border-l-2 border-gray-901">{{ n + 1  | toPersianNumber }}</div>
            <div class="w-64 px-3 py-2 flex border-l-2 border-gray-901 text-center" style="align-items: center">
              <input @change="selectItem($event, i.id)" type="checkbox" :checked="isSelected(i.id)">
              <img :src="i.logo" class="mx-2 w-5 h-5 rounded-lg" v-if="i.logo">
              <img src="/img/android-chrome-192x19211.png" class="mx-2 w-5 h-5 rounded-lg" v-else>
              {{ i.user_fname  | toPersianNumber }}{{ i.user_lname  | toPersianNumber }}
            </div>
            <div class="dir-ltr w-32 py-2 border-l-2 border-gray-901 text-center">
              {{ i.created ? ($moment(i.created.Time).format('jYYYY/jM/jDD hh:mm')) : '' | toPersianNumber }}
            </div>
            <div class="w-32 py-2 border-l-2 border-gray-901 text-center">{{ i.amount | toPersianCurrency }}</div>
            <div class="w-32 py-2 border-l-2 border-gray-901 text-center">{{ i.trace_code | toPersianNumber }}</div>
            <div class="w-32 py-2 border-l-2 border-gray-901 text-center">
              <span class="p-1 bg-gray-906 rounded-lg text-blue-905">{{ getPayType(i.paytype) }}</span>
            </div>
            <div class="w-32 py-2 text-center">{{ getPaidFor(i.paid_for) }}</div>
          </div>
        </div>
        <!--        <pagination v-if="userList && userList.data" :limit="10" :data="userList.data" @pagination-change-page="getResults"></pagination>-->

      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: "Payments",
  data() {
    return {
      open: false,
      amount: 0.0,
      paytype: [],
      paid_for: [],
      trace_code: null,
      paid_to: null,
      info: null,
      check_date: null,
      act: null
    }
  },
  mounted() {
    this.getResults()
    this.$store.dispatch('admin/user/getUser', this.$route.params.id)
  },
  computed: {
    paymentsList() {
      return this.$store.getters['doctor/patients/getPatientPayments']
    },
    user() {
      return this.$store.getters['admin/user/getUser']
    },
    selectedItems() {
      return this.$store.getters['selected/getSelected']
    }
  },
  methods: {
    isSelected(id){
      const item = this.selectedItems.find(i => i.id == id)
      return !!item;
    },
    doAction() {
      switch (this.act) {
        case 1:
        case '1':
          this.deleteItems();
          break;
        default:
          return;
      }
    },
    selectItem(e, id) {
      this.$store.dispatch('selected/updateSelected', {
        checked: e.target.checked,
        id: id,
      })
    },
    deleteItems() {
      if (this.selectedItems.length === 0) {
        return;
      }
      this.$store.dispatch('doctor/patients/deletePayments', this.selectedItems)
        .then(() => {
          this.$store.dispatch('doctor/patients/getPatientPayments', this.$route.params.id)
          this.$store.dispatch('admin/user/getUser', this.$route.params.id)
        })
        .catch(err => {
          alert('انجام نشد!')
        })
    },
    getResults() {
      this.$store.dispatch('doctor/patients/getPatientPayments', this.$route.params.id)
    },
    savePayment() {
      this.$store.dispatch('doctor/patients/addPayment', {
        amount: parseFloat(this.amount),
        paytype: parseInt(this.paytype),
        paid_for: parseInt(this.paid_for),
        trace_code: this.trace_code,
        paid_to: this.paid_to,
        info: this.info,
        check_date: this.check_date,
        user_id: parseInt(this.user.id)
      })
        .then(res => {
          this.$snotify.success('پرداخت با موفقیت ایجاد شد', {
            timeout: 2000,
            showProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true
          })
          this.close()
          this.getResults()
        })
        .catch(async err => {
          if (err.response.status === 400) {
            this.$snotify.error('خطا در ثبت اطلاعات', {
              timeout: 2000,
              showProgressBar: false,
              closeOnClick: false,
              pauseOnHover: true
            })
          } else {
            if (err.response.data.errors.password) {
              this.$snotify.error(err.response.data.errors.password, {
                timeout: 2000,
                showProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true
              })
              return;
            }
            const keys = Object.keys(err.response.data.errors);
            for (let i = 0; i < keys.length; i++) {
              for (let j = 0; j < err.response.data.errors[keys[i]].length; j++) {
                await this.$snotify.error(err.response.data.errors[keys[i]][j], {
                  timeout: 2000,
                  showProgressBar: false,
                  closeOnClick: false,
                  pauseOnHover: true
                })
              }
            }
          }
        })
    },
    close() {
      this.open = false
      this.amount = 0.0
      this.paytype = []
      this.paid_for = []
      this.trace_code = null
      this.paid_to = null
      this.info = null
      this.check_date = null
    },
    onChange(val) {
      this.$emit('onChange', val)
    },
    getPayType(type) {
      switch (type) {
        case 2:
          return 'نقدی'
        case 3:
          return 'چک'
        case 4:
          return 'کارت به کارت'
      }
    },
    getPaidFor(type) {
      switch (type) {
        case 1:
          return 'قسط درمان'
        case 2:
          return 'هزینه های جانبی'
      }
    }
  }
}
</script>

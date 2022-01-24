<template>
  <div class="container">
    <vue-modaltor :visible="open" @hide="open=false">
      <template #header>
        <!--    add your custom header     -->
        <div class="pb-3 flex justify-between border-b border-gray-700" style="align-items: center">
          <div class="flex" style="align-items: center">
            <div class="w-5 h-5 p-1 border-solid border-gray-901 border rounded">
              <img src="/img/xmark.svg" @click="close">
            </div>
            <p class="mr-2">پیامک جدید</p>
          </div>
        </div>
      </template>
      <template #body>
        <div class="mt-5" dir="rtl">
          <label>کاربر</label>
          <tree-select
            v-model="selectedUsers"
            :multiple="false"
            :show-count="true"
            :default-expand-level="1"
            :options="allUsers"
            :normalizer="normalizer"
          >
          </tree-select>
        </div>

        <label>متن پیامک</label>
        <textarea v-model="message.body"
                  class="mt-2 w-full h-32 border-solid border border-gray-901 rounded-lg bg-white"></textarea>
        <div class="mt-5">تعداد پیامک <span class="p-1 w-10 h-10 text-black bg-gray-902 rounded-lg">1 </span></div>

        <div class="mt-8 flex flex-wrap justify-end">
          <div class="w-28 h-10 py-2 text-center bg-gray-907 rounded-lg" @click="close">بستن</div>
          <div class="w-56 h-10 py-2 mr-3 text-center bg-blue-902 rounded-lg text-white" @click="sendMessage">ارسال
            پیامک
          </div>
        </div>


      </template>
    </vue-modaltor>
    <vue-modaltor :visible="openMessage" @hide="openMessage=false">
      <template #body>
        <!--        <div class="text-right">-->
        <!--          <img src="/img/xmark.svg" @click="close">-->
        <!--        </div>-->
        <div class="my-5 text-lg text-center">ارسال پیامک</div>
        <div class="text-sm text-blue-907 text-center">آیا از ارسال پیامک اطمینان دارید؟</div>
        <div class="-mx-2 mt-8 w-full flex flex-wrap ">
          <div class="md:w-1/2 w-full px-2">
            <div class=" w-full h-10 py-2 text-center bg-gray-907 rounded-lg" @click="close">خیر</div>
          </div>
          <div class="md:w-1/2 w-full px-2">
            <div class="w-full h-10 py-2 mr-3 md:mt-0 mt-3 text-center bg-blue-902 rounded-lg text-white">بله ارسال کن
            </div>
          </div>
        </div>

      </template>
    </vue-modaltor>
    <div class="flex justify-between" style="align-items: center">
      <div
        class="w-32 h-12 py-2 px-3 text-sm flex bg-blue-904 Bold text-center text-blue-902 border-solid border-2 border-blue-902 rounded-lg"
        style="align-items: center">
        <img src="/img/messageBlue.svg" class="w-8 ml-3"/>
        <span>پیامک ها</span>
      </div>
      <img src="/img/Line%2041-2.svg" class="mx-2 md:flex hidden" width="1000px">
      <button class="w-40 h-12 px-2 text-sm flex bg-blue-902 rounded-lg text-white text-center click"
              style="align-items: center" @click="open=true">
        <div class="p-2 ml-4 bg-blue-903 rounded-lg text-center">
          <img src="/img/user-plus.svg">
        </div>
        <span class="click">پیامک جدید</span>
      </button>
    </div>
    <div class="py-5 px-10 my-5 bg-white rounded-lg">
      <div class="mb-10 flex flex-wrap justify-between">
        <div class="flex" style="align-items: center">
          <div>
            <input type="checkbox"
                   v-model="selectAll"
                   class="w-5 h-5 mt-2 border-solid border-2 border-gray-901 rounded-xl hover:border-gray-400">
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
                class="border border-gray-500 rounded-lg text-gray-600 h-12 w-40 pl-5 pr-2 bg-white hover:border-gray-400 focus:outline-none appearance-none">
                <option value="1">حذف</option>
              </select>
            </div>
          </div>
          <div
            @click="doAction"
            class="cursor-pointer w-24 h-12 py-3 bg-gray-100 text-sm text-center text-black border-gray-901 border-solid border-2 rounded-lg">
            انجام بده
          </div>
        </div>
        <div>
          <Search :count="messageList ? messageList.pages_count : 0"/>
        </div>
      </div>
      <MessageTable/>
    </div>
    <vue-snotify></vue-snotify>
  </div>
</template>

<script>
import Search from "@/components/Admin/Search";
import MessageTable from "@/components/Admin/MessageTable";

export default {
  name: "index",
  layout: 'admin',
  middleware: 'auth',
  components: {Search, MessageTable},
  mounted() {
    this.$store.dispatch('admin/user/getAllUsers')
  },
  data() {
    return {
      open: false,
      act: null,
      openMessage: false,
      message: {
        user: null,
        body: null
      },
      selectedUsers: null,
      normalizer(node) {
        return {
          id: node.id,
          label: `${node.fname} ${node.lname}`,
          children: null,
        }
      },
    }
  },
  computed: {
    selectedItems() {
      return this.$store.getters['selected/getSelected']
    },
    allUsers() {
      return this.$store.getters['admin/user/getUsers']
    },
    userLogin() {
      return this.$store.getters['login/getUser']
    },
    messageList() {
      return this.$store.getters['admin/messages/getMessages']
    },
    selectAll: {
      get() {
        if (this.messageList && this.messageList.data) {
          return this.messageList.data.length > 0 ? this.selectedItems.length == this.messageList.data.length : false;
        } else {
          return false;
        }
      },
      set(val) {
        if (this.messageList) {
          const self = this
          this.messageList.data.forEach(function (user) {
            self.selectItem(val, user.id)
          });
        }
      }
    },
  },
  methods: {
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
    deleteItems() {
      if (this.selectedItems.length === 0) {
        return;
      }
      this.$store.dispatch('admin/messages/deleteMessages', this.selectedItems)
        .then(() => {
          this.$store.dispatch('selected/resetSelected')
          this.getResults()
        })
        .catch(err => {
          alert('انجام نشد!')
        })
    },
    selectItem(checked, id) {
      this.$store.dispatch('selected/updateSelected', {
        checked: checked,
        id: id,
      })
    },
    close() {
      this.open = false
    },
    sendMessage() {
      const user = this.allUsers.find(i => i.id == this.selectedUsers)
      this.$store.dispatch('admin/messages/sendMessage', {
        user_id: user.id,
        number: user.tel,
        msg: this.message.body,
        organization_id: parseInt(this.userLogin.organization_id),
      })
      this.message = {
        user: null,
        body: null
      }
      this.selectedUsers = null
      this.open = false
      setTimeout(() => {
        window.location.reload()
      }, 200)
    },
    getResults(page = 1) {
      this.$store.dispatch('admin/messages/getMessages', {page, q: this.$route.query.q || null})
    },
  }
}
</script>

<template>
  <div>
    <MUSiteSetting>
      <template #sidebar>
        <button
          class="sidebar-item"
          @click="$router.push(`/profile/${store.walletInfo.address}`)"
        >
          Dashboard
        </button>
        <button class="sidebar-item active">Edit Profile</button>
      </template>
      <template #content>
        <div class="flex flex-col items-end gap-8">
          <form class="flex flex-col gap-4 w-[30rem] text-sm">
            <MUInput
              id="username"
              name="username"
              label="Username"
              placeholder="Please input your username"
              :required="false"
              :validator="validators.username"
            />
            <MUMultiInput
              name="domain"
              label="Domain Name"
              placeholder="Please input your domain name"
              :required="false"
              :validator="validators.domain"
              :component="'MUInput'"
            />
            <MUMultiInput
              name="address"
              label="Address"
              placeholder="Please input your address"
              :required="false"
              :validator="validators.address"
              :component="'MUWalletAddressInput'"
            />
          </form>
          <MUButton @click="handleSave">Save</MUButton>
        </div>
      </template>
    </MUSiteSetting>
    <BillModal
      v-if="state.billModal"
      :gas-fee="state.gasFee"
      :service-fee="contract.updateServiceFee"
      :total-fee="state.totalFee"
      @cancel="state.billModal = false"
      @confirm="handleConfirm"
    />
    <!-- Dialog Modal (Success / Failed) -->
    <MUPayResult
      v-if="state.dialogModal"
      :title="payResultConfig[state.resultModalType].title"
      :description="payResultConfig[state.resultModalType].description"
      :type="payResultConfig[state.resultModalType].type"
      :button-text="payResultConfig[state.resultModalType].buttonText"
      :close-callback="payResultConfig[state.resultModalType].closeCallback"
      :button-callback="payResultConfig[state.resultModalType].buttonCallback"
    />
  </div>
</template>

<script setup>
  import MUSiteSetting from '@/components/site/MUSiteSetting.vue'
  import MUButton from '@/components/common/MUButton.vue'
  import MUInput from '@/components/data-input/MUInput.vue'
  import MUMultiInput from '@/components/data-input/MUMultiInput.vue'
  import { useForm, configure } from 'vee-validate'
  import { useStore } from '@/store'
  import { reactive } from 'vue'
  import BillModal from '../../mint-process/components/BillModal.vue'
  import MUPayResult from '@/components/feedback/MUPayResult.vue'
  import { useRouter } from 'vue-router'
  import contractServices from '@/services/contract'
  import contract from '@/utils/Contract.json'
  import { useMessage } from 'naive-ui'
  import { MSG_DURATION } from '@/utils/constant'

  const message = useMessage()
  const store = useStore()
  const state = reactive({
    billModal: false,
    gasFee: '0',
    totalFee: '0',
    resultModalType: 'success',
    dialogModal: false
  })
  const router = useRouter()

  const { handleSubmit, resetForm } = useForm()

  configure({
    validateOnBlur: true, // controls if `blur` events should trigger validation with `handleChange` handler
    validateOnChange: true, // controls if `change` events should trigger validation with `handleChange` handler
    validateOnInput: true, // controls if `input` events should trigger validation with `handleChange` handler
    validateOnModelUpdate: true // controls if `update:modelValue` events should trigger validation with `handleChange` handler
  })

  const handleSave = () => {
    if (store.userInfo.connected) {
      onSubmit()
    }
  }
  // eslint-disable-next-line no-unused-vars
  const onInvalidSubmit = ({ values, errors, results }) => {
    const newValue = {
      username: '',
      domains: [],
      addresses: []
    }
    for (const key in values) {
      const element = values[key]
      if (key === 'username') {
        newValue[key] = element
      } else if (
        key.indexOf('address') !== -1 &&
        key.indexOf('coinType') === -1
      ) {
        if (element) {
          newValue.addresses.push({
            address: element,
            coinType: values[key + '-coinType']
          })
        }
      } else if (key.indexOf('domain') !== -1) {
        if (element) {
          newValue.domains.push(element)
        }
      }
    }
  }
  const onSubmit = handleSubmit((values) => {
    const newValue = {
      username: '',
      domains: [],
      addresses: []
    }
    for (const key in values) {
      const element = values[key]
      if (key === 'username') {
        newValue[key] = element
      } else if (
        key.indexOf('address') !== -1 &&
        key.indexOf('coinType') === -1
      ) {
        if (element) {
          newValue.addresses.push({
            address: element,
            coinType: values[key + '-coinType']
          })
        }
      } else if (key.indexOf('domain') !== -1) {
        if (element) {
          newValue.domains.push(element)
        }
      }
    }
    store.mintInfo = { ...store.mintInfo, ...newValue }
    openBillModal()
  }, onInvalidSubmit)

  const validators = {
    username: (value) => {
      if (value && !/^[a-zA-Z0-9]{6,12}$/.test(value)) {
        return 'a-z, A-Z, 0-9, length 6-12'
      }
      return true
    },
    domain: (value) => {
      if (
        value &&
        !/^(((ht|f)tps?):\/\/)?([^!@#$%^&*?.\s-]([^!@#$%^&*?.\s]{0,63}[^!@#$%^&*?.\s])?\.)+[a-z]{2,6}\/?/.test(
          value
        )
      ) {
        return 'please input a valid url'
      }
      return true
    },
    address: (value) => {
      if (value && !/^(0x)?[0-9a-fA-F]{40}$/.test(value)) {
        return 'please input a valid wallet address'
      }
      return true
    }
  }

  const openBillModal = async () => {
    try {
      const { username, domains, addresses } = store.mintInfo
      const res = await contractServices.estimateUpdateRecordGas(
        username,
        domains,
        addresses
      )
      state.gasFee = res[0]
      state.totalFee = res[1]
      state.billModal = true
    } catch (e) {
      message.error(e.message)
    }
  }

  const handleConfirm = async () => {
    const { username, domains, addresses } = store.mintInfo
    try {
      const res = await contractServices.updateRecord(username, domains, addresses)
      if (res) {
        resetForm()
        state.resultModalType = 'success'
      } else {
        state.resultModalType = 'failed'
      }
      state.dialogModal = true
    } catch (e) {
      message.error(e.message, { duration: MSG_DURATION })
    }
    state.billModal = false
  }

  const payResultConfig = {
    success: {
      title: 'Success',
      description: 'Transaction completed successfully',
      type: 'success',
      buttonText: 'View my profile',
      closeCallback: () => {
        state.dialogModal = false
        router.push(`/profile/${store.walletInfo.address}`)
      },
      buttonCallback: () => {
        state.dialogModal = false
        router.push(`/profile/${store.walletInfo.address}`)
      }
    },
    failed: {
      title: 'Failed',
      description: 'Sorry, your transaction failed',
      type: 'failed',
      buttonText: 'Close',
      closeCallback: () => {
        state.dialogModal = false
      },
      buttonCallback: () => {
        state.dialogModal = false
      }
    }
  }
</script>

<style scoped>
  .sidebar-item {
    @apply w-full font-bold text-sm py-4 px-8 rounded-xl text-left  hover:bg-[#EEEEEE] transition;
  }

  .active {
    @apply bg-[#EEEEEE];
  }
</style>

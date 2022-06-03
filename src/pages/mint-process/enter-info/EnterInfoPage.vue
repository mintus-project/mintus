<template>
  <ProcessCard>
    <template #title>Edit Your Profile</template>
    <template #subtitle>
      These information will display on your profile page.
    </template>
    <template #content>
      <form
        class="px-12 py-8 flex flex-col gap-4 w-[30rem] text-sm"
        @submit.prevent=""
      >
        <MUWalletInput
          label="Wallet"
          required
          :show-error-message="firstClicked && !store.userInfo.connected"
        ></MUWalletInput>
        <MUInput
          name="username"
          label="Username"
          placeholder="Please input your username"
          required
          :validator="validators.username"
        ></MUInput>
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
    </template>
    <template #footer>
      <MUButton btn-type="ghost" @click="$router.back()">Back</MUButton>
      <MUButton @click="handleNext">Next</MUButton>
    </template>
  </ProcessCard>
</template>

<script setup>
  import ProcessCard from '../components/ProcessCard.vue'
  import MUButton from '@/components/common/MUButton.vue'
  import MUInput from '@/components/data-input/MUInput.vue'
  import MUMultiInput from '@/components/data-input/MUMultiInput.vue'
  import { useForm, configure } from 'vee-validate'
  import { useRouter } from 'vue-router'
  import MUWalletInput from '@/components/data-input/MUWalletInput.vue'
  import { useStore } from '@/store'
  import { ref } from 'vue'

  const store = useStore()

  const router = useRouter()

  const { handleSubmit, resetForm } = useForm()

  configure({
    validateOnBlur: true, // controls if `blur` events should trigger validation with `handleChange` handler
    validateOnChange: true, // controls if `change` events should trigger validation with `handleChange` handler
    validateOnInput: true, // controls if `input` events should trigger validation with `handleChange` handler
    validateOnModelUpdate: true // controls if `update:modelValue` events should trigger validation with `handleChange` handler
  })

  //
  const firstClicked = ref(false)

  // methods
  const handleNext = () => {
    firstClicked.value = true
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
    router.push('mint')
  }, onInvalidSubmit)

  // validator
  const validators = {
    username: (value) => {
      if (!/^[a-zA-Z0-9]{6,12}$/.test(value)) {
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
</script>

<style scoped></style>

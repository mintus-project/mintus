<template>
  <div>
    <MUSiteSetting>
      <template #sidebar>
        <button class="sidebar-item" @click="$router.push('profile')">
          Dashboard
        </button>
        <button class="sidebar-item active">Edit Profile</button>
      </template>
      <template #content>
        <div class="flex flex-col items-end gap-8">
          <form class="flex flex-col gap-4 w-[30rem] text-sm">
            <MUInput
              name="username"
              label="Username"
              placeholder="Please input your username"
              required
              :validator="validators.username"
            ></MUInput>
            <MUMultiInput
              name="domain"
              label="Domain"
              placeholder="Please input your domain"
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
  </div>
</template>

<script setup>
  import MUSiteSetting from '@/components/site/MUSiteSetting.vue'
  import MUButton from '@/components/common/MUButton.vue'
  import MUInput from '@/components/data-input/MUInput.vue'
  import MUMultiInput from '@/components/data-input/MUMultiInput.vue'
  import { useForm, configure } from 'vee-validate'
  const { handleSubmit, resetForm } = useForm()

  configure({
    validateOnBlur: true, // controls if `blur` events should trigger validation with `handleChange` handler
    validateOnChange: true, // controls if `change` events should trigger validation with `handleChange` handler
    validateOnInput: true, // controls if `input` events should trigger validation with `handleChange` handler
    validateOnModelUpdate: true // controls if `update:modelValue` events should trigger validation with `handleChange` handler
  })

  // methods
  const handleSave = () => {
    onSubmit()
  }
  const onInvalidSubmit = ({ values, errors, results }) => {
    console.log('value: ', values)
    console.log('errors: ', errors)
    console.log('results: ', results)
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
    console.log('parse value: ', newValue)
  }
  const onSubmit = handleSubmit((values) => {
    console.log(values)
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
    console.log('parse value: ', newValue)
    resetForm()
  }, onInvalidSubmit)

  // validator
  const validators = {
    username: (value) => {
      if (value?.length < 5) {
        return 'value should >= 5'
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
      if (value?.length < 10) {
        return 'value should >= 5'
      }
      return true
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

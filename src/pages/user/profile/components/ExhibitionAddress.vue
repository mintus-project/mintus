<template>
  <div class="overflow-x-auto shadow rounded-xl">
    <table class="table w-[40rem] text-sm">
      <tbody>
        <tr v-for="(item, index) in addresses" :key="index">
          <th>{{ item.coinType }}</th>
          <td>
            <MUWalletAddr show-copy :addr="item.address" show-full-addr />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
  import { ref } from 'vue'
  import MUWalletAddr from '@/components/common/MUWalletAddr.vue'

  const addresses = ref([
    {
      coinType: 'ETH',
      address: '0x3a8195422dea3339c14b1b888629b3393bd02f44'
    },
    {
      coinType: 'ETH',
      address: '0x3a8195422dea3339c14b1b888629b3393bd02f44'
    },
    {
      coinType: 'ETH',
      address: '0x3a8195422dea3339c14b1b888629b3393bd02f44'
    },
    {
      coinType: 'ETH',
      address: '0x3a8195422dea3339c14b1b888629b3393bd02f44'
    },
    {
      coinType: 'ETH',
      address: '0x3a8195422dea3339c14b1b888629b3393bd02f44'
    },
    {
      coinType: 'ETH',
      address: '0x3a8195422dea3339c14b1b888629b3393bd02f44'
    }
  ])
</script>

<style lang="scss" scoped></style>

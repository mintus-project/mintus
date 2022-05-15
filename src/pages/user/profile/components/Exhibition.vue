<template>
  <div class="my-24 flex flex-col items-center">
    <div class="flex gap-2" @click="handleChooseAnExhibition">
      <MUTag :active="exhibitionOption === 'NFT'">NFT</MUTag>
      <MUTag :active="exhibitionOption === 'Domain'">Domain</MUTag>
      <MUTag :active="exhibitionOption === 'Address'">Address</MUTag>
    </div>
    <div class="mt-8">
      <keep-alive>
        <component :is="chosenExhibition"></component>
      </keep-alive>
    </div>
  </div>
</template>

<script setup>
  import MUTag from '../../../../components/common/MUTag.vue'
  import ExhibitionNFT from './ExhibitionNFT.vue'
  import ExhibitionDomain from './ExhibitionDomain.vue'
  import ExhibitionAddress from './ExhibitionAddress.vue'
  import { ref, shallowRef } from 'vue'

  const exhibitionOption = ref('NFT')
  const chosenExhibition = shallowRef(ExhibitionNFT)

  const handleChooseAnExhibition = (e) => {
    const target = e.target
    const innerText = target.innerText
    exhibitionOption.value = innerText
    switch (innerText) {
      case 'NFT':
        chosenExhibition.value = ExhibitionNFT
        break
      case 'Domain':
        chosenExhibition.value = ExhibitionDomain
        break
      case 'Address':
        chosenExhibition.value = ExhibitionAddress
        break
      default:
        break
    }
  }
</script>

<style lang="scss" scoped></style>

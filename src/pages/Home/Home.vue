<template>
  <MUSiteDynamicBackground class="relative">
    <div class="mt-[20vh] flex flex-col gap-16">
      <MUTitle>
        <template #title> Build your future identity via NFT. </template>
        <template #subtitle>
          <span class="w-[48rem] inline-block text-justify">
            Users can customize and mint unique Avatar NFTs and set their Web3 profile on MintUs. The minted NFT has a mapping relationship with user's profile. Using the image recognition algorithm, when a user scans/uploads an nft avatar, the system will retrieve and display the profile corresponding to the avatar. MintUs has a broad application scenario in the filed of web3 profile creation, online and offline payment, NFT trading platform.
          </span>
        </template>
      </MUTitle>
      <div class="flex justify-center gap-2">
        <MUButton
          btn-type="outline"
          @click="$router.push('/mint-process/choose-avatar')"
        >
          Create an avatar
        </MUButton>
        <MUButton @click="$router.push('/upload-avatar')">
          Identify an avatar
        </MUButton>
      </div>
    </div>
    <img class="absolute bottom-0 h-[40vh]" :src="HomePageBackground" alt="" />
  </MUSiteDynamicBackground>
</template>

<script setup>
  import MUSiteDynamicBackground from '@/components/site/MUSiteDynamicBackground.vue'
  import MUButton from '@/components/common/MUButton.vue'
  import MUTitle from '@/components/typography/MUTitle.vue'
  import HomePageBackground from '@/assets/homePageBackground.png'
</script>

<style lang="scss" scoped></style>

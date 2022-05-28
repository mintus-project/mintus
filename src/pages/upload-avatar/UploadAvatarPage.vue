<template>
  <div>
    <MUSiteMintProcess>
      <div class="flex flex-col items-center gap-8">
        <div class="flex flex-col items-center gap-4">
          <h1 class="text-[2.5rem] font-extrabold leading-10 text-black">
            Upload the Avatar
          </h1>
          <h2 class="text-[#727272] leading-6">
            And then, you can view one's profile page
          </h2>
        </div>

        <div class="w-[35rem] h-[20.25rem] overflow-auto rounded-xl my-shadow">
          <!-- upload -->
          <n-spin
            v-if="state.content === 'upload'"
            class="backdrop-blur-100"
            :stroke="'#5D5FEF'"
            :show="state.loading"
          >
            <template #icon>
              <Icon icon="gg:spinner" />
            </template>
            <template #description>Uploading</template>
            <n-upload
              :show-file-list="true"
              :on-before-upload="onBeforeUpload"
              :on-error="onError"
              :on-finish="onFinish"
              action="http://localhost:3000"
              @change="handleChange"
            >
              <n-upload-dragger
                class="w-[35rem] h-[20.25rem] rounded-xl flex flex-col items-center justify-evenly"
                
              >
                <Icon
                  icon="ion:upload"
                  class="text-[#EEEEEE] text-[6rem] leading-[6rem]"
                />
                <div style="font-size: 16px">
                  Drag or drop the avatar to upload or
                </div>
                <n-upload-trigger #="{ handleClick }" abstract>
                  <MUButton class="my-[1.3125rem]" @click.stop="handleClick">
                    Browse files
                  </MUButton>
                </n-upload-trigger>
              </n-upload-dragger>
            </n-upload>
          </n-spin>
          <!-- failed -->
          <div
            v-if="state.content === 'failed'"
            class="w-full h-full bg-white rounded-xl border-red-400 border border-dashed flex flex-col justify-evenly items-center"
          >
            <svg
              width="55"
              height="54"
              viewBox="0 0 55 54"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M54.1667 27.0006C54.1667 41.7286 42.228 53.6673 27.5 53.6673C12.772 53.6673 0.833328 41.7286 0.833328 27.0006C0.833328 12.2727 12.772 0.333984 27.5 0.333984C42.228 0.333984 54.1667 12.2727 54.1667 27.0006ZM17.1293 37.3713C16.8794 37.1213 16.7389 36.7822 16.7389 36.4286C16.7389 36.0751 16.8794 35.736 17.1293 35.486L25.6147 27.0006L17.1293 18.5153C16.8864 18.2638 16.7521 17.927 16.7551 17.5774C16.7581 17.2279 16.8984 16.8934 17.1456 16.6462C17.3928 16.399 17.7272 16.2588 18.0768 16.2558C18.4264 16.2527 18.7632 16.3871 19.0147 16.63L27.5 25.1153L35.9853 16.63C36.2368 16.3871 36.5736 16.2527 36.9232 16.2558C37.2728 16.2588 37.6072 16.399 37.8544 16.6462C38.1016 16.8934 38.2419 17.2279 38.2449 17.5774C38.2479 17.927 38.1135 18.2638 37.8707 18.5153L29.3853 27.0006L37.8707 35.486C38.1135 35.7375 38.2479 36.0743 38.2449 36.4239C38.2419 36.7734 38.1016 37.1079 37.8544 37.3551C37.6072 37.6023 37.2728 37.7425 36.9232 37.7455C36.5736 37.7486 36.2368 37.6142 35.9853 37.3713L27.5 28.886L19.0147 37.3713C18.7646 37.6213 18.4255 37.7617 18.072 37.7617C17.7184 37.7617 17.3794 37.6213 17.1293 37.3713Z"
                fill="#FF3333"
              />
            </svg>
            <p>Failed, please try it later</p>
            <MUButton
              @click="
                () => {
                  state.content = 'upload'
                }
              "
              >Try again</MUButton
            >
          </div>
        </div>
      </div>
    </MUSiteMintProcess>
  </div>
</template>

<script setup>
  import MUSiteMintProcess from '../../components/site/MUSiteMintProcess.vue'
  import MUButton from '@/components/common/MUButton.vue'
  import { Icon } from '@iconify/vue'
  import { reactive } from 'vue'
  import { useRouter } from 'vue-router'

  const router = useRouter()
  const state = reactive({
    loading: false,
    content: 'upload',
    dragCoverLayers: 0
  })
  const onBeforeUpload = () => {
    state.loading = true
  }
  const onError = () => {
    state.loading = false
    state.content = 'failed'
  }
  const onFinish = () => {
    state.loading = false
    router.push('/profile/0xd83039Ff4B0D7022281769eDb509b32F6c390867')
  }
  const handleChange = (options) => {
    console.log(1111, options)
  }
  const handleDragEnter = (e) => {
    state.dragCoverLayers++
    console.log('++', state.dragCoverLayers, e, e.target)
  }
  const handleDragLeave = (e) => {
    state.dragCoverLayers--
    console.log('--', e, e.target)
  }
</script>

<style scoped>
  .drag-enter {
    @apply bg-[#F3F3FE]/50;
  }
  .drag-leave {
    @apply bg-white;
  }
</style>

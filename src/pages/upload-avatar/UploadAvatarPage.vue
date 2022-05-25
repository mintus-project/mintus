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

        <div class="w-[560px] h-[324px] overflow-auto rounded-xl my-shadow">
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
              accept=".png"
              :show-file-list="false"
              :on-before-upload="onBeforeUpload"
              :on-error="onError"
              :on-finish="onFinish"
              @change="handleChange"
              action="http://localhost:3000"
            >
              <n-upload-dragger
                class="w-[560px] h-[324px] bg-[#F3F3FE]/50 rounded-xl flex flex-col items-center justify-evenly"
              >
                <svg
                  width="65"
                  height="46"
                  viewBox="0 0 65 46"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M37.3 0.599614C39.264 0.599103 41.2073 1.00043 43.0104 1.77891C44.8135 2.5574 46.4382 3.69656 47.7847 5.12634C49.1311 6.55611 50.1708 8.24626 50.8397 10.0928C51.5086 11.9393 51.7927 13.9032 51.6744 15.8636H51.7L51.6968 19.79C54.9808 19.7891 58.1395 21.0505 60.5196 23.3133C62.8996 25.576 64.319 28.667 64.484 31.9468L64.5 32.5868C64.4975 35.8691 63.2343 39.0251 60.9712 41.4025C58.7081 43.7799 55.6182 45.1971 52.34 45.3612L51.7 45.3772H51.6968L51.7 45.3996H35.6968V32.846H43.5816L32.5 19.8092L21.4472 32.8492H29.3L29.2968 45.3996H13.3C9.90506 45.3911 6.65182 44.0377 4.25273 41.6356C1.85364 39.2335 0.504223 35.9786 0.5 32.5836C0.500571 29.6348 1.51926 26.7767 3.38388 24.4922C5.2485 22.2078 7.84468 20.6372 10.7336 20.046C10.0232 18.1901 9.90627 16.1596 10.3989 14.2344C10.8915 12.3093 11.9694 10.5844 13.4838 9.29785C14.9983 8.01128 16.8747 7.22639 18.8541 7.05146C20.8336 6.87653 22.8186 7.32018 24.5352 8.32121C25.7544 5.99075 27.5887 4.03887 29.8391 2.67758C32.0895 1.31628 34.6699 0.597609 37.3 0.599614Z"
                    fill="white"
                  />
                </svg>
                <div style="font-size: 16px">
                  Drag or drop the avatar to upload or
                </div>
                <n-upload-trigger
                  #="{ handleClick, handleDragOver, handleDragLeave }"
                  abstract
                >
                  <div>
                    <MUButton @click.stop="handleClick">
                      Browse files
                    </MUButton>
                  </div>
                </n-upload-trigger>
              </n-upload-dragger>
            </n-upload>
          </n-spin>
          <!-- failed -->
          <div
            v-if="state.content === 'failed'"
            class="w-full h-full bg-[#F3F3FE]/50 rounded-xl border-red-400 border border-dashed flex flex-col justify-evenly items-center"
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
  const state = reactive({ loading: false, content: 'upload' })
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
  const handleDragOver = (e) => {
    console.log(2222, e)
  }
  // const uploadTriggerOptions = {
  //   handleDragOver: (e) => {
  //     console.log(2222, e)
  //   }
  // }
</script>

<style lang="scss" scoped></style>

import materials from './materials'
import randomFromTo from '@/utils/randomFromTo'

export const createImages = (avatarConfig) => {
  const orderArr = [
    'background',
    'cloth',
    'body',
    'mouth',
    'nose',
    'eyes',
    'hair'
  ]
  const arr = []
  orderArr.forEach((e, i) => {
    const img = new Image()
    img.src = materials[e].matPathArr320[avatarConfig[i]]
    arr.push(img)
  })
  return arr
}

export const contextDraw = (canvas, images, size) => {
  const ctx = canvas.value.getContext('2d')
  canvas.value.width = size
  canvas.value.height = size

  images.forEach((img) => {
    ctx.drawImage(img, 0, 0, size, size)
  })
}

export const imagesSetOnLoad = (canvas, images, size) => {
  images.forEach((img) => {
    img.onload = () => {
      contextDraw(canvas, images, size)
    }
  })
}

export const drawAvatar = (canvas, avatarConfig, size = 224) => {
  const images = createImages(avatarConfig)
  imagesSetOnLoad(canvas, images, size)
}

export const generateRandomAvatarConfig = () => {
  return [
    randomFromTo(0, materials.background.matPathArr320.length - 1),
    randomFromTo(0, materials.cloth.matPathArr320.length - 1),
    randomFromTo(0, materials.body.matPathArr320.length - 1),
    randomFromTo(0, materials.mouth.matPathArr320.length - 1),
    randomFromTo(0, materials.nose.matPathArr320.length - 1),
    randomFromTo(0, materials.eyes.matPathArr320.length - 1),
    randomFromTo(0, materials.hair.matPathArr320.length - 1)
  ]
}

export const fromAvatarConfigToAvatarString = ([...avatarConfig]) => {
  // avatar config 顺序为：background, cloth, body, mouth, nose, eyes, hair
  // avatar string 顺序为：hair, body, eyes, nose, mouth, cloth, background
  const avatarStringArr = []
  // 改顺序
  avatarConfig.reverse()
  avatarConfig = [
    avatarConfig[0],
    avatarConfig[4],
    avatarConfig[1],
    avatarConfig[2],
    avatarConfig[3],
    avatarConfig[5],
    avatarConfig[6]
  ]

  avatarConfig.forEach((e) => {
    avatarStringArr.push(String.fromCharCode(e + 65))
  })
  const avatarString = avatarStringArr.join('_')
  return avatarString
}

export const fromAvatarStringToAvatarConfig = (avatarString) => {
  let avatarStringArr = avatarString.split('_')
  // 改顺序
  avatarStringArr.reverse()
  avatarStringArr = [
    avatarStringArr[0],
    avatarStringArr[1],
    avatarStringArr[5],
    avatarStringArr[2],
    avatarStringArr[3],
    avatarStringArr[4],
    avatarStringArr[6]
  ]
  const avatarConfig = []
  avatarStringArr.forEach((e) => {
    avatarConfig.push(e.charCodeAt() - 65)
  })
  return avatarConfig
}

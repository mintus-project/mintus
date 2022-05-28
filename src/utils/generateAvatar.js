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
    img.src = materials[e].matPathArr[avatarConfig[i]]
    arr.push(img)
  })
  return arr
}

export const contextDraw = (canvas, images) => {
  const ctx = canvas.value.getContext('2d')
  canvas.value.width = 224
  canvas.value.height = 224

  images.forEach((img) => {
    ctx.drawImage(img, 0, 0, 224, 224)
  })
}

export const imagesSetOnLoad = (canvas, images) => {
  images.forEach((img) => {
    img.onload = () => {
      contextDraw(canvas, images)
    }
  })
}

export const drawAvatar = (canvas, avatarConfig) => {
  const images = createImages(avatarConfig)
  imagesSetOnLoad(canvas, images)
}

export const generateRandomAvatarConfig = () => {
  return [
    randomFromTo(0, materials.background.matPathArr.length - 1),
    randomFromTo(0, materials.cloth.matPathArr.length - 1),
    randomFromTo(0, materials.body.matPathArr.length - 1),
    randomFromTo(0, materials.mouth.matPathArr.length - 1),
    randomFromTo(0, materials.nose.matPathArr.length - 1),
    randomFromTo(0, materials.eyes.matPathArr.length - 1),
    randomFromTo(0, materials.hair.matPathArr.length - 1)
  ]
}

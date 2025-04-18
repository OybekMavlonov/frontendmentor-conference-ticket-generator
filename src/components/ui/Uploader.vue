<script setup lang="ts">
import {useField} from 'vee-validate'
import {ref} from 'vue'
import * as yup from 'yup';
import InfoIcon from "../InfoIcon.vue"

const props = defineProps<{
  label?: string
  name: string
  modelValue?: string | null
}>()

const emit = defineEmits(['update:modelValue'])

const imageUrl = ref<string | null>(null)

const { value: avatar, errorMessage, setErrors, setValue } = useField(() => props.name);

function handleFileChange(file: File | null) {
  if (!file) {
    imageUrl.value = null
    emit('update:modelValue', null)
    return
  }
  const isValidType = ['image/jpeg','image/png'].includes(file.type);
  const isValidSize = file.size <= 500 * 1024;

  if (!isValidType) return setErrorAndClear('Only JPG or PNG allowed');
  if (!isValidSize) return setErrorAndClear('Image must be under 500KB');

  setValue(file);
  emit('update:modelValue', file);

  avatar.value = file
  emit('update:modelValue', avatar.value)
  const reader = new FileReader()
  reader.onload = (e) => {
    imageUrl.value = e.target?.result as string
  }
  reader.readAsDataURL(file)
}

function setErrorAndClear(message: string) {
  setErrors(message);
  emit('update:modelValue', null);
}

const removeImage = () => {
  imageUrl.value = null
  avatar.value = null
  emit('update:modelValue', null)
}

const fileInputRef = ref<HTMLInputElement | null>(null)

const triggerFileInput = () => {
  removeImage()
  setTimeout(() => {
    fileInputRef.value?.click()
  }, 0)
}
</script>

<template>
  <div>
    <label class="block mb-2 text-md font-medium text-neutral-0">{{
        label
      }}</label>
      <div class="space-y-2" v-if="!avatar">
        <label
            class="relative w-full h-44 flex flex-col items-center justify-center border-2 border-neutral-500 border-dashed
             rounded-xl cursor-pointer
               transition hover:border-blue-500 bg-neutral-700 text-neutral-300 text-center"
        >
          <input
              ref="fileInputRef"
              type="file"
              accept="image/*"
              class="hidden"
              :name="name"
              @input="(e) => handleFileChange(e.target.files?.[0])"
          />

          <div v-if="!avatar" class="flex flex-col items-center">
            <div class="rounded-lg border border-neutral-500 bg-neutral-700 p-2 mb-3">
              <img src="../../assets/images/icon-upload.svg" alt="upload-icon">
            </div>
            <p class="text-sm text-neutral-300">Drag and Drop or Click to upload</p>
          </div>
        </label>

        <div v-if="errorMessage" class="flex gap-x-2 items-center text-neutral-300 text-sm">
          <InfoIcon class="text-red-500 size-5"/>
          <span class="text-sm text-red-500">{{ errorMessage }}</span>
        </div>
        <div v-else class="flex gap-x-2 items-center text-neutral-300 text-sm">
          <img src="../../assets/images/icon-info.svg" alt="icon-info" class="size-5">
          <span>Upload your photo (JPG or PNG, max size: 500KB)</span>
        </div>
      </div>

      <div class="space-y-2" v-else>
        <div
            class="relative w-full h-44 flex flex-col items-center justify-center border-2 border-neutral-500 border-dashed
             rounded-xl cursor-pointer
               transition hover:border-blue-500 bg-neutral-700 text-neutral-300 text-center"
        >
          <!-- Preview Image -->
          <div class="flex flex-col items-center">
            <img :src="imageUrl" alt="Preview" class="border border-neutral-500 object-contain h-12 w-12 rounded-lg"/>
            <div class="flex items-center gap-x-4 mt-4">
              <button class="text-neutral-300 p-1 text-sm bg-neutral-900 rounded-lg z-10" @click="removeImage">Remove
                Image
              </button>
              <button class="text-neutral-300 p-1 text-sm bg-neutral-900 rounded-lg" @click="triggerFileInput">Change
                Image
              </button>
            </div>
          </div>
        </div>

        <div class="flex gap-x-2 items-center text-neutral-300 text-sm">
          <img src="../../assets/images/icon-info.svg" alt="icon-info" class="size-5">
          <span>Upload your photo (JPG or PNG, max size: 500KB)</span>
        </div>
      </div>
  </div>
</template>

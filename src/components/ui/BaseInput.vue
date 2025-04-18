<script setup>
import {useField} from 'vee-validate'

const props = defineProps({
  label: String,
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    default: "text",
  },
  modelValue: String,
  labelClass: String,
  disabled: Boolean,
  clearable: Boolean,
});

const {value, errorMessage} = useField(() => props.name);
</script>

<template>
  <div>
    <label class="block mb-2 text-md font-medium text-neutral-0">{{
        label
      }}</label>
    <div class="relative w-full mb-1">
      <input
          v-model="value"
          :type="type"
          :clearable="clearable"
          :disabled="disabled"
          :class="{'border-red-700': errorMessage}"
          class="bg-neutral-700 border border-neutral-300 text-neutral-300 text-sm rounded-lg
           block w-full pr-10 p-2.5 pl-3
            focus:outline-none focus:ring-2 focus:ring-neutral-300 transition duration-300"
      />
      <div v-if="clearable && value"
           class="flex absolute inset-y-0 right-0 items-center pr-3 cursor-pointer"
           @click="() => {value = '';}"
      >
        <svg
            class="w-5 h-5 text-neutral-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
        >
          <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>
    </div>
    <div class="h-3 mb-2">
      <transition name="fade">
          <span v-if="errorMessage" class="text-red-600 block text-sm">{{
              errorMessage
            }}</span>
      </transition>
    </div>
  </div>
</template>


<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>

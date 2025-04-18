<script setup lang="ts">
import {computed, ref} from "vue"
import TicketForm from "./components/TicketForm.vue"
import type {USER_DATA} from "./types.ts"

const userData = ref<USER_DATA>()

const generateTicket = (values: USER_DATA) => {
  userData.value = values
}

const avatarPreview = computed(() => {
  return userData.value?.avatar ? URL.createObjectURL(userData.value?.avatar as File) : ''
});
</script>

<template>
  <div class="bg-[url('./assets/images/background-desktop.png')] bg-cover bg-center h-full w-screen relative">
    <img src="./assets/images/pattern-lines.svg" alt="lines"
         class="z-0 absolute top-0 left-0 h-screen w-screen pointer-events-none">
    <img src="./assets/images/pattern-circle.svg" alt="circle"
         class="z-0 absolute top-[-80px] left-12 pointer-events-none">
    <img src="./assets/images/pattern-circle.svg" alt="circle"
         class="z-0 absolute top-1/2 right-1/3 pointer-events-none">
    <img src="./assets/images/pattern-squiggly-line-bottom-desktop.svg" alt="squiggly-line-bottom"
         class="z-0 absolute bottom-0 left-0 pointer-events-none">
    <img src="./assets/images/pattern-squiggly-line-top.svg" alt="squiggly-line-top"
         class="z-0 absolute top-0 right-0 pointer-events-none">
    <div class="container mx-auto py-10 px-5">
      <div class="flex items-center justify-center gap-x-4 mb-16">
        <img src="./assets/images/logo-mark.svg" alt="logo">
        <h2 class="text-neutral-0 font-bold text-2xl">Coding Conf</h2>
      </div>
      <div v-if="!userData">
        <div class="flex items-center justify-center">
          <h1 class="max-w-3xl text-neutral-0 font-bold text-3xl sm:text-5xl text-center leading-snug">Your Journey to Coding Conf
            2025 Starts Here</h1>
        </div>
        <p class="text-neutral-300 text-center text-lg sm:text-xl mt-6">Secure your spot at next year's biggest coding
          conference.</p>
        <TicketForm @onGenerateTicket="generateTicket"/>
      </div>
      <div v-else>
        <div class="flex items-center justify-center">
          <h1 class="max-w-3xl text-neutral-0 font-bold text-3xl sm:text-5xl text-center leading-snug">Congrats,
            <span class="bg-gradient-text bg-clip-text text-transparent">{{ userData.name }}!</span>
            Your ticket is ready.</h1>
        </div>
        <p class="text-neutral-300 text-center text-lg sm:text-xl mt-6"> We've emailed your ticket to
          <span class="text-red-500">{{ userData.email }}!</span>
          and will send updates in the run up to the event.</p>
        <div class="mt-10 flex justify-center">
          <div class="relative">
            <img src="./assets/images/pattern-ticket.svg" alt="pattern-ticket" class="">
            <div class="absolute top-0 w-full h-full flex flex-col justify-between p-2 sm:p-5">
              <div class="flex items-start gap-x-4">
                <img src="./assets/images/logo-mark.svg" alt="logo" class="mt-3">
                <div>
                  <h2 class="text-neutral-0 font-bold text-xl sm:text-4xl">Coding Conf</h2>
                  <div class="text-neutral-300 text-sm md:text-md mt-0 sm:mt-4">Jan 31, 2025 / Austin, TX</div>
                </div>
              </div>

              <div class="flex items-start gap-x-4">
                <img :src="avatarPreview" alt="avatar" class="mt-3 rounded-xl size-12 sm:size-24">
                <div class="flex flex-col justify-center h-full">
                  <h2 class="text-neutral-0 font-semibold text-xl sm:text-4xl">{{ userData.name }}</h2>
                  <div class="flex items-center gap-x-2 text-neutral-300 text-sm sm:text-md mt-1">
                    <img src="./assets/images/icon-github.svg" alt="icon-github">
                    {{ userData.github }}
                  </div>
                </div>
              </div>
            </div>
            <div class="absolute top-1/2 right-0 sm:right-[20px] text-neutral-300 font-semibold
            -translate-y-1/2 rotate-90 tracking-widest text-lg">#01609</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
body {
  font-family: "inconsolate, sans-serif";
}
</style>

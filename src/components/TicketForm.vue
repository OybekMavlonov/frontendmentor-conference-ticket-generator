<script setup lang="ts">
import {ref} from "vue";
import {useForm, configure} from "vee-validate";
import {toTypedSchema} from "@vee-validate/yup";
import {mixed, string, object} from "yup";
import BaseInput from "../components/ui/BaseInput.vue"
import Uploader from "../components/ui/Uploader.vue"

const formRef = ref()

configure({
  validateOnModelUpdate: false,
  validateOnBlur: false,
  validateOnChange: true,
  bails: true,
});

const emit = defineEmits(["onGenerateTicket"])

const {handleSubmit, resetForm} = useForm({
  validationSchema: toTypedSchema(
      object({
        avatar: mixed<File>().required("Upload Avatar")
            .test(
                'fileType',
                'Only JPG or PNG files allowed',
                (file) => !!file && ['image/jpeg', 'image/png'].includes(file.type)
            )
            .test(
                'fileSize',
                'Image must be under 500KB',
                (file) => !!file && file.size <= 500 * 1024
            ),
        name: string().required().label("Full Name"),
        email: string().required().email("Please enter a valid email address").label("Email Address"),
        github: string().required().label("Github Username")
      }),
  ),
});

const generateTicket = handleSubmit((values: any) => {
  emit("onGenerateTicket", values)
  resetForm();
});

</script>

<template>
  <div class="max-w-xl mx-auto justify-center mt-8 z-10">
    <form @submit="generateTicket" ref="formRef" class="flex flex-col gap-y-4">
      <Uploader label="Upload Avatar"
                name="avatar"
      />
      <BaseInput
          label="Full Name"
          name="name"
          type="text"
          clearable
      ></BaseInput>
      <BaseInput
          label="Email Address"
          name="email"
          type="email"
          clearable
      ></BaseInput>
      <BaseInput
          label="Github Username"
          name="github"
          type="text"
          clearable
      ></BaseInput>
      <button type="submit" class="cursor-pointer w-full bg-orange-700 font-bold p-2 rounded
    text-neutral-900">Generate My Ticket
      </button>
    </form>
  </div>
</template>
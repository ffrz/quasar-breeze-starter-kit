<script setup>
import DeleteUserForm from './Partials/DeleteUserForm.vue';
import UpdatePasswordForm from './Partials/UpdatePasswordForm.vue';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm.vue';

defineProps({
  mustVerifyEmail: {
    type: Boolean,
  },
  status: {
    type: String,
  },
});
</script>

<template>
  <authenticated-layout>
    <q-page class="row">
      <i-head title="Profile" />
      <UpdateProfileInformationForm :must-verify-email="mustVerifyEmail" :status="status" />
      <UpdatePasswordForm />
      <DeleteUserForm />
    </q-page>
  </authenticated-layout>
</template>

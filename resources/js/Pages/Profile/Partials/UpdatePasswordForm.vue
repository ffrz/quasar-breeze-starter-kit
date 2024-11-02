<script setup>

import { useForm } from '@inertiajs/vue3';
import { ref } from 'vue';

const passwordInput = ref(null);
const currentPasswordInput = ref(null);

const form = useForm({
  current_password: '',
  password: '',
  password_confirmation: '',
});

const updatePassword = () => {
  form.put(route('password.update'), {
    preserveScroll: true,
    onSuccess: () => form.reset(),
    onError: () => {
      if (form.errors.password) {
        form.reset('password', 'password_confirmation');
        passwordInput.value.focus();
      }
      if (form.errors.current_password) {
        form.reset('current_password');
        currentPasswordInput.value.focus();
      }
    },
  });
};
</script>

<template>
  <q-form class="col-lg-4" @submit.prevent="updatePassword">
    <q-card class="q-pa-lg full-width bg-grey-1">
      <div class="row">
        <div class="col">
          <h5 class="text-h5 q-my-md q-mt-0"> Update Password</h5>
          <p>Ensure your account is using a long, random password to stay
            secure.</p>
          <q-input square v-model="form.current_password" label="Current Password" type="password" lazy-rules
            :error="!!form.errors.current_password" :error-message="form.errors.current_password"
            :rules="[(val) => (val && val.length > 0) || 'Current password is required.']" />
          <q-input square v-model="form.password" label="New Password" type="password" lazy-rules
            :error="!!form.errors.password" :error-message="form.errors.password"
            :rules="[(val) => (val && val.length > 0) || 'Current password is required.']" />
          <q-input square v-model="form.password_confirmation" label="Confirm your Password" type="password" lazy-rules
            :error="!!form.errors.password_confirmation" :error-message="form.errors.password_confirmation"
            :rules="[(val) => (val && val.length > 0) || 'Current password is required.']" />
          <q-btn type="submit" color="grey-8"  label="Save" :disabled="form.processing" />
        </div>
      </div>
    </q-card>
  </q-form>
</template>

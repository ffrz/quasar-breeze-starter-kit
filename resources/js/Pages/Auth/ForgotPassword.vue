<script setup>
import { useForm, usePage } from "@inertiajs/vue3";
import { ref, onMounted, watch } from "vue";
import { useQuasar } from 'quasar';
import validateEmail from '@/helpers.js';

const $q = useQuasar();

defineProps({
  status: {
    type: String,
  },
});

const form = useForm({
  email: '',
});

const submit = () => {
  form.post(route('password.email'));
};

watch(
  () => usePage().props.status,
  (newValue, oldValue) => {
    if (newValue) {
      $q.notify(newValue);
    }
  }
);
</script>

<template>


  <q-page class="row justify-center items-center">

    <Head title="Forgot Password" />
    <div class="column">
      <div class="row justify-center">
        <h5 class="text-h5 q-my-md">Forgot Password</h5>
      </div>
      <q-form @submit.prevent="submit">
        <q-card square bordered class="q-pa-lg shadow-1">
          <q-card-section class="text-grey-8">
            Forgot your password? No problem. Just let us know your email
            address and we will email you a password reset link that will allow
            you to choose a new one.
          </q-card-section>
          <q-card-section v-if="status" class="text-green-9 text-weight-bold border">
            {{ status }}
          </q-card-section>
          <q-card-section>
            <q-input ref="emailInput" autofocus square v-model.trim="form.email" label="Email" lazy-rules
              :error="!!form.errors.email" :error-message="form.errors.email"
              :rules="[(val) => validateEmail(val) || 'Must be a valid email.']" />
          </q-card-section>
          <q-card-actions>
            <q-btn type="submit" color="primary" class="full-width" label="Email Password Reset Link"
              :disabled="form.processing" :class="{ 'opacity-25': form.processing }" />
          </q-card-actions>
          <q-card-section class="text-center q-pa-none q-mt-md">
            <p class="q-my-xs text-grey-7">
              <Link :href="route('login')">Back to login page</Link>
            </p>
          </q-card-section>
        </q-card>

      </q-form>
    </div>
  </q-page>
</template>

<style>
.q-card {
  width: 360px;
}
</style>

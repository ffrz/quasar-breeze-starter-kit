<script setup>
import { useForm } from '@inertiajs/vue3';

const form = useForm({
  password: '',
});

const submit = () => {
  form.post(route('password.confirm'), {
    onFinish: () => form.reset(),
  });
};
</script>

<template>
  <guest-layout>
    <i-head title="Confirm Password" />
    <q-page class="row justify-center items-center">
      <div class="column">
        <div class="row justify-center">
          <h5 class="text-h5 q-my-md">Confirm Password</h5>
        </div>
        <q-form @submit.prevent="submit">
          <q-card square bordered class="q-pa-lg shadow-1">
            <q-card-section class="text-grey-8">
              This is a secure area of the application. Please confirm your
              password before continuing.
            </q-card-section>
            <q-card-section v-if="status" class="text-green-9 text-weight-bold border">
              {{ status }}
            </q-card-section>
            <q-card-section>
              <q-input autofocus square v-model.trim="form.password" label="Password"
                type="password" lazy-rules
                :error="!!form.errors.password" :error-message="form.errors.password"
                :rules="[(val) => val && val.length > 0 || 'Password field is required.']" />
            </q-card-section>
            <q-card-actions>
              <q-btn type="submit" color="primary" class="full-width" label="Confirm"
                :disabled="form.processing" :class="{ 'opacity-25': form.processing }" />
            </q-card-actions>
          </q-card>
        </q-form>
      </div>
    </q-page>
  </guest-layout>
</template>

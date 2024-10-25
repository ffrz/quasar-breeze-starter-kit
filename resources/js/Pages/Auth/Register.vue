<script setup>
import { useForm } from "@inertiajs/vue3";
import { validateEmail } from "@/helpers/validations";

let form = useForm({
  name: '',
  email: '',
  password: '',
  password_confirmation: '',
});

const submit = () => {
  form.clearErrors();
  form.post(route('register'), {
    preserveScroll: true,
    onFinish: () => form.reset('password', 'password_confirmation'),
  });
};

</script>

<template>
  <guest-layout>

    <i-head title="Login" />
    <q-page class="row justify-center items-center">
      <div class="column">
        <div class="row justify-center">
          <h5 class="text-h5 q-my-md">Register to My App</h5>
        </div>
        <div class="row">
          <q-form class="q-gutter-md" @submit.prevent="submit">
            <q-card square bordered class="q-pa-lg shadow-1">
              <q-card-section>
                <q-input autofocus square v-model.trim="form.name" label="Name" lazy-rules :error="!!form.errors.name"
                  :error-message="form.errors.name"
                  :rules="[(val) => (val && val.length > 0) || 'Please enter name']" />
                <q-input square v-model.trim="form.email" label="Email" lazy-rules :error="!!form.errors.email"
                  :error-message="form.errors.email"
                  :rules="[(val) => validateEmail(val) || 'Must be a valid email']" />
                <q-input square v-model="form.password" type="password" label="Password" :error="!!form.errors.password"
                  :error-message="form.errors.password" lazy-rules
                  :rules="[(val) => (val && val.length > 0) || 'Please enter password']" />
                <q-input square v-model="form.password_confirmation" type="password" label="Password"
                  :error="!!form.errors.password_confirmation" :error-message="form.errors.password_confirmation"
                  lazy-rules :rules="[
                    (val) => (val && val.length > 0) || 'Please confirm your password.',
                    () => (form.password == form.password_confirmation) || 'Password confirmation did not match.'
                  ]" />
              </q-card-section>
              <q-card-actions>
                <q-btn type="submit" color="primary" class="full-width" label="Register" />
              </q-card-actions>
              <q-card-section class="text-center q-pa-none q-mt-md">
                <p class="q-my-xs text-grey-7">
                  Already reigistered?
                  <i-link :href="route('login')">Login</i-link>
                </p>
              </q-card-section>
            </q-card>
          </q-form>
        </div>
      </div>
    </q-page>
  </guest-layout>
</template>

<style>
.q-card {
  width: 360px;
}
</style>

<script setup>

import { router, useForm, usePage } from '@inertiajs/vue3';
import { onMounted, ref } from 'vue';

defineProps({
  mustVerifyEmail: {
    type: Boolean,
  },
  status: {
    type: String,
  },
});

const nameRef = ref();
const page = usePage();
const user = page.props.auth.user;
const form = useForm({
  name: user.name,
  email: user.email,
});

const submit = () => {
  form.clearErrors();
  form.patch(route('profile.update'), {
    preserveScroll: true,
    onError: () => {
      nameRef.value.focus();
    }
  });
};

</script>

<template>
  <q-page class="row q-pa-md">
    <div class="col col-lg-4 col-md-12">
      <q-form class="q-gutter-xs" @submit.prevent="submit">
        <h5 class="text-h5 q-my-md q-mt-0">Profile Information</h5>
        <p>Update your account's profile information and email address.</p>
        <q-input readonly square v-model.trim="form.email" label="Email" />
        <div v-if="mustVerifyEmail && user.email_verified_at === null">
          <p class="text-grey-7">
            Your email address is unverified.
          </p>
          <p>
            <q-btn color="secondary" @click.prevent="router.post(route('verification.send'))">
              Click here to re-send the verification email.
            </q-btn>
          </p>
          <p v-show="status === 'verification-link-sent'">
            A new verification link has been sent to your email address.
          </p>
        </div>
        <q-input ref="nameRef" square v-model.trim="form.name" label="Name" lazy-rules :error="!!form.errors.name"
          :error-message="form.errors.name" :rules="[(val) => (val && val.length > 0) || 'Name is required.']" />
        <q-btn type="submit" color="primary" label="Save" :disabled="form.processing" />
      </q-form>
    </div>
  </q-page>
</template>

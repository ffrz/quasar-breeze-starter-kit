<script setup>
import { validateEmail } from "@/helpers/validations";
import { useForm } from "@inertiajs/vue3";

defineProps({
  editorMode: {
    type: String,
  },
  form: {
    type: Object,
  }
});

const form = useForm({
});


const submitForm = () => {
  form.clearErrors();
  form.submit(
    editorMode.value == "add" ? "post" : "put",
    "users" + (editorMode.value == "add" ? "" : "/" + form.id),
    {
      preserveScroll: true,
      onSuccess: (response) => {
        showUserEditor.value = false;
        form.reset();
        $q.notify({
          message: response.message,
          icon: "info",
          color: "green",
          actions: [
            { icon: "close", color: "white", round: true, dense: true },
          ],
        });
        fetchUsers();
      },
    }
  );
};

</script>

<template>
  <authenticated-layout>
    <q-page class="row">
      <i-head title="Add User" />
      <div class="col col-lg-6 q-pa-md">
        <q-form class="row" @submit.prevent="submitForm">
          <q-card square flat bordered class="col q-pa-sm">
            <q-card-section>
              <div class="text-h6">
                <template v-if="editorMode == 'add'"> Add User </template>
                <template v-else> Edit User </template>
              </div>
            </q-card-section>
            <q-card-section class="q-pt-none">
              <input type="hidden" name="id" v-model="form.id" />
              <q-input autofocus v-model.trim="form.name" label="Name" lazy-rules :error="!!form.errors.name"
                :disable="form.processing" :error-message="form.errors.name" :rules="[
                  (val) => (val && val.length > 0) || 'Please enter name.',
                ]" />
              <q-input v-model.trim="form.email" type="email" label="Email Address" lazy-rules
                :disable="form.processing" :error="!!form.errors.email" :error-message="form.errors.email"
                :rules="[(val) => validateEmail(val) || 'Must be a valid email.']" />
              <q-input v-model="form.password" type="password" label="Password" lazy-rules :disable="form.processing"
                :error="!!form.errors.password" :error-message="form.errors.password" />
              <q-checkbox class="full-width q-pl-none" v-model="form.admin" :disable="form.processing"
                label="Administrator" />
              <q-checkbox class="full-width q-pl-none" v-model="form.active" :disable="form.processing"
                label="Active" />
            </q-card-section>
            <q-card-actions align="right">
              <q-btn type="submit" label="Save" color="primary" icon="check" :disable="form.processing" />
              <q-btn label="Cancel" v-close-popup color="grey-7" icon="close" :disable="form.processing" />
            </q-card-actions>
          </q-card>
        </q-form>
      </div>
    </q-page>
  </authenticated-layout>
</template>

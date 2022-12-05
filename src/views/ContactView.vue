<template>
  <h2>Please leave your message/suggestion bellow</h2>
  <v-form id="form" @submit.prevent="submit" v-model="valid">
    <v-container>
      <v-row justify="center" align-content="center" class="w-50">
        <v-col align-self="center">
          <v-text-field
            v-model="name"
            label="First name"
            required
          ></v-text-field>
          <v-text-field v-model="email" label="E-mail" required></v-text-field>
          <v-textarea label="Your Message" v-model="inputMessage"> </v-textarea>
          <v-btn type="submit">submit</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";

let url: string;
if (import.meta.env.DEV) {
  url = "api/contact";
} else {
  url = "https://geo-backend-production.up.railway.app/contact";
}

const valid = ref(true); // this on purpose is set to true, but latter should change again to false
const name = ref("");
const inputMessage = ref("");
const email = ref("");

function submit() {
  // const form: HTMLFormElement | any = document.getElementById("form");
  const formData = new FormData();
  formData.append("name", name.value);
  formData.append("inputMessage", inputMessage.value);
  formData.append("email", email.value);

  // formData.forEach((value, key) => {
  //   alert(value + ":" + key);
  // });
  // fetch(url, {
  //   body: formData,
  //   method: "post",
  // });
  alert("Form Submitted");
}
</script>
<style scoped></style>

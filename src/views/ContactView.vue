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

const url = import.meta.env.VITE_API_URL;

const valid = ref(true); // this on purpose is set to true, but latter should change again to false
const name = ref("");
const inputMessage = ref("");
const email = ref("");

// document.getElementById('contact-form').addEventListener('submit', function(e) {
//   e.preventDefault();

//   // Get the form data
//   let name = document.getElementById('name').value;
//   let email = document.getElementById('email').value;
//   let message = document.getElementById('message').value;

//   // Send the form data using an AJAX request
//   let xhr = new XMLHttpRequest();
//   xhr.open('POST', '/send-message');
//   xhr.setRequestHeader('Content-Type', 'application/json');
//   xhr.send(JSON.stringify({name: name, email: email, message: message}));
// });

function submit() {
  // const form: HTMLFormElement | any = document.getElementById("form");
  const formData = new FormData();
  formData.append("name", name.value);
  formData.append("inputMessage", inputMessage.value);
  formData.append("email", email.value);

  formData.forEach((value, key) => {
    alert(value + ":" + key);
  });
  // fetch(url + "/form", {
  //   body: formData,
  //   method: "post",
  // });
  alert("Form Submitted");
}
</script>
<style scoped></style>

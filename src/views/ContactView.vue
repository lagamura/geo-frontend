<template>
  <h2>Please leave your message/suggestion bellow</h2>
  <v-form v-model="valid">
    <v-container>
      <v-row>
        <v-col>
          <v-text-field
            v-model="name"
            label="First name"
            required
          ></v-text-field>
          <v-text-field v-model="email" label="E-mail" required></v-text-field>
          <v-textarea label="Your Message" v-model="inputMessage"> </v-textarea>
          <v-btn>submit</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
const valid = ref(true); // this on purpose is set to true, but latter should change again to false
const name = ref("");
const inputMessage = ref("");
const email = ref("");
// const nameRules: [
//   (v:any) => !!v || "Name is required",
//   (v) => v.length <= 20 || "Name must be less than 20 characters",
// ],
// const emailRules = computed(() => {
//   [
//     (v) => !!v || "E-mail is required",
//     (v) => /.+@.+/.test(v) || "E-mail must be valid",
//   ],
// })
// computed(() => {
//   return author.books.length > 0 ? 'Yes' : 'No'
// })
</script>
<style scoped></style>

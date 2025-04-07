<template>
  <div>
    <h1>POC - Login com Google</h1>
    <div style="width: 300px;" id="google-btn"></div>
    <hr />
    <h2>Token ID</h2>
    <p>Esse é o token ID que você vai enviar pro backend:</p>
    <textarea v-model="idToken" style="width: 300px; height: 400px;"></textarea>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const idToken = ref('')

const handleCredentialResponse = (response) => {
  idToken.value = response.credential
  console.log('ID Token:', idToken.value)
}

onMounted(() => {
  if (window.google) {
    window.google.accounts.id.initialize({
      client_id: '673818371066-vpl8inqrqub1pnn8abe9q6el4vcbh1cs.apps.googleusercontent.com',
      callback: handleCredentialResponse
    })

    window.google.accounts.id.renderButton(
      document.getElementById("google-btn"),
      { theme: "outline", size: "large" }
    )
  }
})
</script>
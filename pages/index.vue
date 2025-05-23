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

function injectGoogleScript() {
  return new Promise((resolve, reject) => {
    if (window.google && window.google.accounts) return resolve()

    const existingScript = document.querySelector('script[src="https://accounts.google.com/gsi/client"]')
    if (existingScript) {
      existingScript.addEventListener('load', resolve)
      existingScript.addEventListener('error', reject)
      return
    }

    const script = document.createElement('script')
    script.src = 'https://accounts.google.com/gsi/client'
    script.async = true
    script.defer = true
    script.onload = resolve
    script.onerror = reject
    document.head.appendChild(script)
  })
}

onMounted(async () => {
  try {
    await injectGoogleScript()

    console.log('Google ID loaded')

    window.google.accounts.id.initialize({
      client_id: '673818371066-vpl8inqrqub1pnn8abe9q6el4vcbh1cs.apps.googleusercontent.com',
      callback: handleCredentialResponse
    })

    console.log('Google ID initialized')

    window.google.accounts.id.renderButton(
      document.getElementById("google-btn"),
      { theme: "outline", size: "large" }
    )
  } catch (err) {
    console.error('Erro ao carregar o script do Google:', err)
  }
})
</script>

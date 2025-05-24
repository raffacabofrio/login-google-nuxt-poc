<template>
  <div>
    <h1>POC - Login com Google</h1>
    <div style="width: 300px;" id="google-btn"></div>

    <button @click="requestAccessToken" style="margin-top: 20px;">Obter Access Token</button>

    <hr />
    <h2>ID Token</h2>
    <textarea v-model="idToken" style="width: 300px; height: 150px;"></textarea>
    <h2>Access Token</h2>
    <textarea v-model="accessToken" style="width: 300px; height: 150px;"></textarea>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const idToken = ref('')
const accessToken = ref('')
let tokenClient = null

const CLIENT_ID = '859015868383-c1a17ah602teo7buescso3l1ojj2aat9.apps.googleusercontent.com'

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

function requestAccessToken() {
  if (tokenClient) {
    tokenClient.requestAccessToken()
  } else {
    console.warn('TokenClient não está pronto')
  }
}

onMounted(async () => {
  await injectGoogleScript()

  window.google.accounts.id.initialize({
    client_id: CLIENT_ID,
    callback: (response) => {
      idToken.value = response.credential
      console.log('ID Token:', response.credential)
    }
  })

  window.google.accounts.id.renderButton(
    document.getElementById("google-btn"),
    { theme: "outline", size: "large" }
  )

  tokenClient = window.google.accounts.oauth2.initTokenClient({
    client_id: CLIENT_ID,
    scope: 'openid email profile https://www.googleapis.com/auth/userinfo.profile',
    callback: (tokenResponse) => {
      accessToken.value = tokenResponse.access_token
      console.log('Access Token:', tokenResponse.access_token)
    }
  })
})
</script>

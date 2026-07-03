<script setup lang="ts">
import { ref } from 'vue'

const form = ref({
  name: '',
  email: '',
  message: ''
})

const submitted = ref(false)

function submitForm() {
  if (form.value.name && form.value.email) {
    submitted.value = true
    // Simulate API call
    setTimeout(() => {
      form.value = { name: '', email: '', message: '' }
      submitted.value = false
      alert('Message sent! We will catch up with you soon.')
    }, 1500)
  }
}
</script>

<template>
  <div class="va-card va-card--info">
    <h2 class="va-card__title">Contact Us</h2>
    <p class="va-card__desc">Have questions about our shirts? Send us a message!</p>
    
    <form style="display: flex; flex-direction: column; gap: 1rem; margin-top: 1.5rem;" @submit.prevent="submitForm">
      <div style="display: flex; flex-direction: column; gap: 0.5rem;">
        <label style="font-size: 0.875rem; color: var(--va-text-muted);">Name</label>
        <input v-model="form.name" class="va-input" placeholder="Your name" required />
      </div>
      
      <div style="display: flex; flex-direction: column; gap: 0.5rem;">
        <label style="font-size: 0.875rem; color: var(--va-text-muted);">Email</label>
        <input v-model="form.email" type="email" class="va-input" placeholder="your@email.com" required />
      </div>
      
      <div style="display: flex; flex-direction: column; gap: 0.5rem;">
        <label style="font-size: 0.875rem; color: var(--va-text-muted);">Message</label>
        <textarea v-model="form.message" class="va-input" style="min-height: 100px; resize: vertical;" placeholder="How can we help?"></textarea>
      </div>
      
      <button class="va-btn va-btn--primary" type="submit" :disabled="submitted" style="align-self: flex-start;">
        {{ submitted ? 'Sending...' : 'Send Message' }}
      </button>
    </form>
  </div>
</template>

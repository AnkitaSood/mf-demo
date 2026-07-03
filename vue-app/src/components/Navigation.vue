<script setup lang="ts">
import { computed } from 'vue'
import { navigate } from '../location'

const props = defineProps<{
  path: string
}>()

const currentPath = computed(() => props.path)
</script>

<template>
  <nav style="display: flex; gap: 1.5rem; align-items: center; margin-bottom: 2rem; padding: 1rem 1.5rem; background: var(--va-surface); border: 1px solid var(--va-border); border-radius: 8px;">
    <a 
      class="va-link" 
      :class="{ 'va-link--active': currentPath.includes('/products') || currentPath === '/vue' }"
      href="/vue/products"
      @click.prevent="navigate('/vue/products')"
    >
      Products
    </a>
    <a 
      class="va-link" 
      :class="{ 'va-link--active': currentPath.includes('/contact-us') }"
      href="/vue/contact-us"
      @click.prevent="navigate('/vue/contact-us')"
    >
      Contact Us
    </a>
  </nav>
</template>

<style scoped>
.va-link {
  color: var(--va-accent);
  text-decoration: underline;
  cursor: pointer;
  transition: color 0.15s ease;
}

.va-link:hover {
  color: var(--va-accent-bright);
  text-decoration: none;
}

.va-link--active {
  font-weight: bold;
  text-decoration: none;
  pointer-events: none;
}
</style>

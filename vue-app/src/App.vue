<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { getGlobalCounter } from './shared-counter'
import Products from './components/Products.vue'
import ProductDetails from './components/ProductDetails.vue'
import ContactUs from './components/ContactUs.vue'
import Navigation from './components/Navigation.vue'
import { subscribeToLocationChange } from './location'

const count = ref(getGlobalCounter().get())
const path = ref(window.location.pathname)
let unsubscribe: (() => void) | null = null
let unsubscribeLocation: (() => void) | null = null

function handleLocationChange() {
  path.value = window.location.pathname
}

onMounted(() => {
  unsubscribe = getGlobalCounter().subscribe(val => {
    count.value = val
  })
  unsubscribeLocation = subscribeToLocationChange(handleLocationChange)
})

onUnmounted(() => {
  if (unsubscribe) unsubscribe()
  if (unsubscribeLocation) unsubscribeLocation()
})

const currentComponent = computed(() => {
  if (path.value.includes('/product-details/')) return ProductDetails
  if (path.value.includes('/contact-us')) return ContactUs
  return Products
})

const productId = computed(() => {
  if (path.value.includes('/product-details/')) {
    return path.value.split('/').pop() || ''
  }
  return ''
})
</script>

<template>
  <div class="va-root">
    <header class="va-header">
      <div class="va-logo">💚</div>
      <div>
        <h1 class="va-title">Pokemon Shirt Store</h1>
        <p class="va-subtitle">Stylish apparel for trainers</p>
      </div>
    </header>

    <Navigation :path="path" />

    <div class="va-content">
      <component :is="currentComponent" :id="productId" />
    </div>
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Inter+Tight:wght@700;800&display=swap');

*,
*::before,
*::after {
  box-sizing: border-box;
}

.va-root {
  /* ── Botanical Dark tokens ────────────────────── */
  --va-bg:            #050d08;
  --va-surface:       #0d1f13;
  --va-surface-2:     #142a19;
  --va-border:        #1e3d27;
  --va-border-hover:  #2d5a3a;
  --va-text:          #e8f5ed;
  --va-text-muted:    #7aab8a;
  --va-accent:        #41b883;
  --va-accent-glow:   rgba(65, 184, 131, 0.2);
  --va-accent-bright: #5de8a0;
  /* ────────────────────────────────────────────── */

  background: var(--va-bg);
  min-height: 100%;
  padding: 2rem;
  color: var(--va-text);
  font-family: 'Inter', system-ui, sans-serif;
  -webkit-font-smoothing: antialiased;
}

/* Header */
.va-header {
  display: flex;
  align-items: center;
  gap: 1.25rem;
  margin-bottom: 2.5rem;
}

.va-logo {
  font-size: 3rem;
  line-height: 1;
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { filter: drop-shadow(0 0 12px var(--va-accent-glow)); }
  50%       { filter: drop-shadow(0 0 24px var(--va-accent)); }
}

.va-title {
  font-family: 'Inter Tight', sans-serif;
  font-size: 1.75rem;
  font-weight: 800;
  letter-spacing: -0.03em;
  color: var(--va-accent);
  margin-bottom: 0.25rem;
}

.va-subtitle {
  font-size: 0.875rem;
  color: var(--va-text-muted);
}

.va-subtitle code {
  background: var(--va-surface-2);
  border: 1px solid var(--va-border);
  border-radius: 4px;
  padding: 0.1em 0.4em;
  font-size: 0.8125rem;
  color: var(--va-accent);
}

/* Grid */
.va-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

@media (max-width: 600px) {
  .va-grid { grid-template-columns: 1fr; }
}

.va-card--info {
  grid-column: 1 / -1;
}

/* Card */
.va-card {
  background: var(--va-surface);
  border: 1px solid var(--va-border);
  border-radius: 10px;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.va-card__title {
  font-family: 'Inter Tight', sans-serif;
  font-size: 1rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: var(--va-text);
}

.va-card__desc {
  font-size: 0.875rem;
  color: var(--va-text-muted);
}

.va-card__actions {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-top: auto;
}

.va-card__buttons {
  display: flex;
  gap: 0.75rem;
}

/* Counter */
.va-counter {
  display: flex;
  align-items: center;
  gap: 1.25rem;
  margin: 0.5rem 0;
}

.va-counter__value {
  font-family: 'Inter Tight', sans-serif;
  font-size: 4rem;
  font-weight: 800;
  color: var(--va-accent);
  min-width: 3ch;
  text-align: center;
  text-shadow: 0 0 24px var(--va-accent-glow);
}

/* Buttons */
.va-link {
  color: var(--va-accent);
  text-decoration: underline;
  cursor: pointer;
  background: none;
  border: none;
  padding: 0;
  font-family: inherit;
  font-size: inherit;
}

.va-link:hover {
  color: var(--va-accent-bright);
}

.va-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  min-height: 2.75rem;
  padding: 0.65rem 1.25rem;
  border-radius: 999px;
  font-size: 0.9375rem;
  font-weight: 700;
  line-height: 1;
  letter-spacing: 0.01em;
  cursor: pointer;
  border: 1px solid var(--va-border);
  background: var(--va-surface-2);
  color: var(--va-text);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.04);
  transition:
    transform 0.15s ease,
    border-color 0.15s ease,
    background 0.15s ease,
    color 0.15s ease,
    box-shadow 0.15s ease;
  font-family: inherit;
}

.va-btn--block {
  flex: 1;
}

.va-btn:hover {
  transform: translateY(-1px);
  border-color: var(--va-border-hover);
}

.va-btn:active {
  transform: translateY(0);
}

.va-btn:focus-visible {
  outline: none;
  box-shadow:
    0 0 0 3px rgba(5, 13, 8, 0.9),
    0 0 0 5px var(--va-accent-glow);
}

.va-btn:disabled {
  cursor: not-allowed;
  opacity: 0.6;
  transform: none;
  box-shadow: none;
}

.va-btn--ghost {
  background: var(--va-surface-2);
  color: var(--va-text);
  border-color: var(--va-border);
}

.va-btn--ghost:hover {
  background: var(--va-accent-glow);
  border-color: var(--va-accent);
  color: var(--va-accent-bright);
}

.va-btn--sm {
  min-height: 2.2rem;
  background: rgba(20, 42, 25, 0.82);
  color: var(--va-text-muted);
  border-color: rgba(65, 184, 131, 0.22);
  font-size: 0.8125rem;
  font-weight: 600;
  padding: 0.45rem 0.9rem;
}

.va-btn--sm:hover {
  background: rgba(65, 184, 131, 0.12);
  color: var(--va-accent-bright);
  border-color: rgba(93, 232, 160, 0.35);
}

.va-btn--primary {
  background: linear-gradient(135deg, rgba(65, 184, 131, 0.24), rgba(93, 232, 160, 0.12));
  color: #effcf4;
  border-color: rgba(93, 232, 160, 0.45);
  text-shadow: 0 0 12px rgba(93, 232, 160, 0.18);
}

.va-btn--primary:hover {
  background: linear-gradient(135deg, rgba(65, 184, 131, 0.34), rgba(93, 232, 160, 0.18));
  border-color: var(--va-accent);
  box-shadow: 0 10px 24px rgba(65, 184, 131, 0.16), 0 0 12px var(--va-accent-glow);
}

/* Input */
.va-input-row {
  display: flex;
  gap: 0.5rem;
}

.va-input {
  flex: 1;
  background: var(--va-surface-2);
  border: 1px solid var(--va-border);
  border-radius: 6px;
  padding: 0.5rem 0.875rem;
  color: var(--va-text);
  font-size: 0.9375rem;
  font-family: inherit;
  outline: none;
  transition: border-color 0.15s;
}

.va-input:focus {
  border-color: var(--va-accent);
  box-shadow: 0 0 0 3px var(--va-accent-glow);
}

.va-input::placeholder {
  color: var(--va-text-muted);
}

@media (max-width: 480px) {
  .va-card__buttons {
    flex-direction: column;
  }
}

/* Todos */
.va-todos {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
}

.va-todo {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: var(--va-surface-2);
  border: 1px solid var(--va-border);
  border-radius: 6px;
  padding: 0.5rem 0.875rem;
  font-size: 0.875rem;
}

.va-todo--empty {
  color: var(--va-text-muted);
  justify-content: center;
}

.va-todo__remove {
  background: none;
  border: none;
  color: var(--va-text-muted);
  cursor: pointer;
  font-size: 0.75rem;
  padding: 0.125rem 0.25rem;
  border-radius: 4px;
  transition: color 0.15s, background 0.15s;
}

.va-todo__remove:hover {
  color: #f87171;
  background: rgba(248, 113, 113, 0.15);
}

/* DL info table */
.va-dl {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 0.5rem 1.5rem;
  font-size: 0.875rem;
}

.va-dl dt {
  color: var(--va-text-muted);
  font-weight: 500;
}

.va-dl dd {
  color: var(--va-text);
  font-family: 'JetBrains Mono', 'Fira Code', monospace;
  font-size: 0.8125rem;
  word-break: break-all;
}
</style>

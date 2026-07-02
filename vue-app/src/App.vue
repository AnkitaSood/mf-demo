<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { getGlobalCounter } from './shared-counter'

const count = ref(getGlobalCounter().get())
let unsubscribe: (() => void) | null = null

onMounted(() => {
  unsubscribe = getGlobalCounter().subscribe(val => {
    count.value = val
  })
})

onUnmounted(() => {
  if (unsubscribe) unsubscribe()
})

const updateCount = (newCount: number) => {
  getGlobalCounter().set(newCount)
}

const todos = ref<string[]>([])
const input = ref('')

function addTodo() {
  if (input.value.trim()) {
    todos.value.push(input.value.trim())
    input.value = ''
  }
}

function removeTodo(i: number) {
  todos.value.splice(i, 1)
}
</script>

<template>
  <div class="va-root">
    <header class="va-header">
      <div class="va-logo">💚</div>
      <div>
        <h1 class="va-title">Vue Micro-Frontend</h1>
        <p class="va-subtitle">Loaded via <code>loadRemote('vue_app/App')</code></p>
      </div>
    </header>

    <div class="va-grid">
      <!-- Counter card -->
      <div class="va-card">
        <h2 class="va-card__title">Reactive Counter</h2>
        <p class="va-card__desc">Vue's reactivity running inside the Angular shell</p>
        <div class="va-counter">
          <button id="vue-decrement" class="va-btn va-btn--ghost" @click="updateCount(count - 1)">−</button>
          <span class="va-counter__value">{{ count }}</span>
          <button id="vue-increment" class="va-btn va-btn--ghost" @click="updateCount(count + 1)">+</button>
        </div>
        <button id="vue-reset" class="va-btn va-btn--sm" @click="updateCount(0)">Reset</button>
      </div>

      <!-- Todo card -->
      <div class="va-card">
        <h2 class="va-card__title">Mini To-Do List</h2>
        <p class="va-card__desc">Stateful Vue list — isolated from the shell</p>
        <div class="va-input-row">
          <input
            id="vue-todo-input"
            v-model="input"
            class="va-input"
            placeholder="Add a task…"
            @keydown.enter="addTodo"
          />
          <button id="vue-todo-add" class="va-btn va-btn--primary" @click="addTodo">Add</button>
        </div>
        <ul class="va-todos">
          <li
            v-for="(todo, i) in todos"
            :key="i"
            class="va-todo"
          >
            <span>{{ todo }}</span>
            <button class="va-todo__remove" @click="removeTodo(i)">✕</button>
          </li>
          <li v-if="todos.length === 0" class="va-todo va-todo--empty">
            No tasks yet
          </li>
        </ul>
      </div>

      <!-- Info card -->
      <div class="va-card va-card--info">
        <h2 class="va-card__title">Remote Info</h2>
        <dl class="va-dl">
          <dt>Name</dt><dd>vue_app</dd>
          <dt>Exposed</dt><dd>./App → mfe-entry.ts</dd>
          <dt>Manifest</dt><dd>http://localhost:3001/mf-manifest.json</dd>
          <dt>Shared</dt><dd>vue (singleton)</dd>
          <dt>Plugin</dt><dd>@module-federation/vite</dd>
        </dl>
      </div>
    </div>
  </div>
</template>

<style scoped>
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
  position: relative;
  overflow: hidden;
}

.va-card::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse at top left, var(--va-accent-glow), transparent 60%);
  opacity: 0;
  transition: opacity 0.2s;
  pointer-events: none;
}

.va-card:hover {
  border-color: var(--va-accent);
  box-shadow: 0 4px 24px var(--va-accent-glow);
}

.va-card:hover::before {
  opacity: 1;
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
.va-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 1.25rem;
  border-radius: 6px;
  font-size: 0.9375rem;
  font-weight: 500;
  cursor: pointer;
  border: 1px solid transparent;
  transition: all 0.15s ease;
  font-family: inherit;
}

.va-btn--ghost {
  background: var(--va-surface-2);
  color: var(--va-text);
  border-color: var(--va-border);
  width: 2.5rem;
  height: 2.5rem;
  padding: 0;
  font-size: 1.25rem;
}

.va-btn--ghost:hover {
  background: var(--va-accent-glow);
  border-color: var(--va-accent);
  color: var(--va-accent);
}

.va-btn--sm {
  background: var(--va-surface-2);
  color: var(--va-text-muted);
  border-color: var(--va-border);
  font-size: 0.8125rem;
  padding: 0.375rem 0.875rem;
  align-self: flex-start;
}

.va-btn--primary {
  background: var(--va-accent-glow);
  color: var(--va-accent);
  border-color: var(--va-accent);
}

.va-btn--primary:hover {
  background: var(--va-accent-glow);
  box-shadow: 0 0 12px var(--va-accent-glow);
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

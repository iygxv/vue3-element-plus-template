// src/store/index.ts

import { createPinia } from 'pinia'
import piniaPluginPersistedState from 'pinia-plugin-persistedstate'
const store = createPinia()
store.use(piniaPluginPersistedState)
export default store

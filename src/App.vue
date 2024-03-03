<script setup>
import { onMounted } from 'vue'
import { useProductStore } from './stores/store'

import DeleteModal from './components/Modal/DeleteModal.vue'
import ProductModal from './components/Modal/ProductModal.vue'
import ProductTable from './components/ProductTable/ProductTable.vue'

const store = useProductStore()

onMounted(() => {
  store.getAllAction()
})
</script>

<template>
  <ProductTable />
  <DeleteModal />
  <ProductModal />
</template>

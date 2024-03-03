<template>
  <div class="flex justify-center">
    <Dialog v-model:visible="store.deleteModalVisible" modal header="Confirm Delete" :style="{ width: '25rem' }"
      :closable=false>
      <span class="p-text-secondary block mb-5">Are you sure want to delete this product ?</span>
      <div class="flex justify-end gap-5">
        <Button type="button" label="Cancel" severity="secondary"
          @click="store.handleDeleteModalVisible(false)"></Button>
        <Button type="button" label="Delete" @click="handleDeleteProduct()"></Button>
      </div>
    </Dialog>
  </div>
</template>


<script setup>
import { useProductStore } from '@/stores/store';
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';

defineEmits(['onClick'])

const store = useProductStore()

const handleDeleteProduct = async () => {
  store.deleteProductAction()
  store.handleDeleteModalVisible(false)
}
</script>

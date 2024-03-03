<template>
  <DataTable :value="filteredList" v-on:page="scrollTop" paginator :rows="10" tableStyle="min-width: 80rem"
    :row-class="() => 'border-b-[1px]'">
    <template #header>
      <div class="flex flex-wrap items-center justify-between gap-2 border-t-2 border-b-2 py-3 bg-gray-200 px-3">
        <span class="text-xl text-900 font-bold">Products</span>
        <div class="flex flex-row items-center gap-4">
          <IconField iconPosition="left">
            <InputIcon class="pi pi-search top-2"> </InputIcon>
            <InputText v-model="searchText" type="search" placeholder="Search" class="py-1 pl-[30px]" />
          </IconField>
          <Button label="Add" class="text-black !font-semibold py-2 px-4 bg-white" rounded raised
            @click="store.updateProductId(null); store.updateIsEdit(false); store.handleUpdateModalVisible(true);" />
        </div>

      </div>
    </template>
    <Column field="title" header="Title" header-class="text-lg !font-bold border-b-[1px]"></Column>
    <Column header="Thumbnail" header-class="text-lg !font-bold border-b-[1px]">

      <template #body="slotProps">
        <img :src="`${slotProps.data.thumbnail}`" :alt="slotProps.data.image" class="w-40 border-round" />
      </template>
    </Column>
    <Column header="Images" header-class="text-lg !font-bold border-b-[1px]">

      <template #body="slotProps">
        <div class="!grid !grid-cols-2 !gap-4">
          <div v-for="image in slotProps.data.images" :key="image">
            <img :src="`${image}`" :alt="slotProps.data.image" class="w-24 border-round" />
          </div>
        </div>

      </template>
    </Column>
    <Column field="price" header="Price" header-class="text-lg !font-bold border-b-[1px]">

      <template #body="slotProps">
        {{ formatCurrency(slotProps.data.price) }}
      </template>
    </Column>
    <Column field="category" header="Category" header-class="text-lg !font-bold border-b-[1px]">

      <template #body="slotProps">
        <p class="capitalize">{{ slotProps.data.category }}</p>
      </template>
    </Column>
    <Column field="rating" header="Reviews" header-class="text-lg !font-bold border-b-[1px]">

      <template #body="slotProps">
        <Rating :modelValue="slotProps.data.rating" readonly :cancel="false" />
      </template>
    </Column>
    <Column header="Status" header-class="text-lg !font-bold border-b-[1px]">

      <template #body="slotProps">
        <Tag :value="checkInstock(slotProps.data.stock)" :severity="getSeverity(slotProps.data.stock)" />
      </template>
    </Column>
    <Column header="Action" header-class="text-lg !font-bold border-b-[1px]">

      <template #body="slotProps">
        <div class="flex gap-3">
          <Button label="Edit" class="!text-black px-3 py-2 text-s" raised
            @click="store.updateProductId(slotProps.data.id); store.updateIsEdit(true); store.handleUpdateModalVisible(true);" />
          <Button label="Delete" class="text-white px-3 py-2 text-sm bg-red-500" raised
            @click="store.handleDeleteModalVisible(true); store.updateProductId(slotProps.data.id)" />
        </div>
      </template>
    </Column>

    <template #footer> In total there are {{ filteredList ? (filteredList ?? []).length ?? 0 : 0 }} products.
    </template>
  </DataTable>
</template>

<script setup>
import { useProductStore } from '@/stores/store';
import DataTable from 'primevue/datatable';
import Button from 'primevue/button'
import { computed, ref } from 'vue'
import Column from 'primevue/column'
import Rating from 'primevue/rating'
import Tag from 'primevue/tag'
import IconField from 'primevue/iconfield';
import InputIcon from 'primevue/inputicon';
import InputText from 'primevue/inputtext';

const store = useProductStore()
const searchText = ref('')

const formatCurrency = (value) => {
  return (value ?? 0).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD'
  })
}

const scrollTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const getSeverity = (stock) => {
  if (stock > 0) return 'success'
  else return 'warning'
}

const checkInstock = (stock) => {
  if (stock > 0) return 'INSTOCK'
  else return 'LOWSTOCK'
}

const filteredList = computed(() => {
  const cloneArr = store.products.products ?? []
  return cloneArr.filter(e => e.title.toLowerCase().includes(searchText.value.toLowerCase()) || e.category.toLowerCase().includes(searchText.value.toLowerCase()))
})

</script>

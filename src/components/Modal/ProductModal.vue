<template>
  <div class="flex justify-center">
    <Dialog v-model:visible="store.updateModalVisible" modal :header="!store.isEdit ? 'Add Product' : 'Edit Product'"
      :style="{ width: '50rem' }">
      <div class="!grid !grid-cols-2 !gap-4 pt-3">
        <div class="flex flex-column gap-2">
          <label for="title">Title</label>
          <InputText class="p-2 border" id="title" v-model="form_data.title" />
        </div>
        <div class="flex flex-column gap-2">
          <label for="title">Category</label>
          <InputText class="p-2 border" id="title" v-model="form_data.category" />
        </div>
        <div class="flex flex-column gap-2">
          <label for="title">Price</label>
          <InputText class="p-2 border" id="title" type="number" v-model="form_data.price" />
        </div>
        <div class="flex flex-column gap-2">
          <label for="title">Rating</label>
          <InputText class="p-2 border" id="title" type="number" v-model="form_data.rating" />
        </div>

      </div>
      <div class="flex flex-column gap-2 pt-3">
        <label for="title">Thumbnail</label>
        <InputText class="p-2 border" id="title" type="text" v-model="form_data.thumbnail" />
      </div>

      <div class="flex flex-column gap-2 pt-3">
        <label for="title">Images</label>
        <div class="flex flex-row items-center w-full" :key="idx" v-for="(img, idx) in form_data.images">
          <InputText class="p-2 border w-full" v-model="form_data.images[idx]" />
          <p v-show="form_data.images.length > 0" class="cursor-pointer pl-3 text-red-400 font-bold"
            @click="form_data.images.splice(idx, 1)">x</p>
        </div>

        <Button class="self-start py-2 border px-2 rounded-lg bg-blue-300 text-white" @click="form_data.images.push('')"
          :disabled="form_data.images.some(e => e === '')">+ Add more image</Button>
      </div>

      <p v-show="isError" class="text-red-400 font-semibold pt-3">Please fill all the form</p>

      <div class="flex justify-end gap-3 pt-5">
        <Button type="button" label="Cancel" severity="secondary"
          class="self-start py-2 border px-4 rounded-lg text-black"
          @click="store.handleUpdateModalVisible(false)"></Button>
        <Button type="button" class="self-start py-2 border px-4 rounded-lg bg-blue-300 text-white"
          :label="!store.isEdit ? 'Save' : 'Update'" @click="checkValidate()"></Button>
      </div>
    </Dialog>
  </div>
</template>

<script setup>
import { useProductStore } from '@/stores/store';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Dialog from 'primevue/dialog';
import { ref, watch } from 'vue';

const store = useProductStore()

const form_data = ref({
  title: '',
  thumbnail: '',
  images: [''],
  price: 0,
  category: '',
  rating: 0,
})

const isError = ref(false)

watch(() => store.productId, () => {
  if (store.productId) {
    const product = store.products.products.find(e => e.id === store.productId)
    form_data.value.title = product?.title
    form_data.value.thumbnail = product?.thumbnail
    form_data.value.images = product?.images
    form_data.value.price = product?.price
    form_data.value.category = product?.category
    form_data.value.rating = product?.rating
  } else {
    form_data.value = {
      title: '',
      thumbnail: '',
      images: [''],
      price: 0,
      cagetory: '',
      rating: 0,
    }
  }
})

const checkValidate = () => {
  const keys = Object.keys(form_data.value)
  if (keys.every(e => form_data.value[e] !== '')) {
    isError.value = false;
    handleUpdateProduct();
  } else {
    isError.value = true;
  }
}

const handleUpdateProduct = async () => {
  if (store.isEdit) {
    store.updateProductAction(form_data.value)
  } else {
    store.addNewProductAction((form_data.value))
  }
}
</script>
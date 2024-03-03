import { ref } from 'vue'
import { defineStore } from 'pinia'
import { addProduct, deleteProduct, editProduct, getAllProducts } from '@/api'

export const useProductStore = defineStore('product', () => {
  const products = ref([])
  const productId = ref(null)
  const isEdit = ref(false)
  const deleteModalVisible = ref(false)
  const updateModalVisible = ref(false)

  async function getAllAction() {
    await getAllProducts().then((res) => {
      products.value = res
    })
  }

  async function deleteProductAction() {
    await deleteProduct(productId.value).then((res) => {
      // tuy vao response se call lai getall hoac replace state products nhe a
      console.log('res', res)
      handleDeleteModalVisible(false)
    })
  }

  async function updateProductAction(body) {
    await editProduct(productId.value, body).then((res) => {
      // tuy vao response se call lai getall hoac replace state products nhe a
      console.log('res', res)
      handleUpdateModalVisible(false)
    })
  }

  async function addNewProductAction(body) {
    await addProduct(body).then((res) => {
      // tuy vao response se call lai getall hoac replace state products nhe a
      console.log('res', res)
      handleUpdateModalVisible(false)
    })
  }

  function handleDeleteModalVisible(bool) {
    deleteModalVisible.value = bool ?? !deleteModalVisible.value
  }

  function handleUpdateModalVisible(bool) {
    updateModalVisible.value = bool ?? !updateModalVisible.value
  }

  function updateProductId(id) {
    productId.value = id ?? null
  }

  function updateIsEdit(bool) {
    isEdit.value = bool ?? false
  }

  return {
    getAllAction,
    deleteProductAction,
    addNewProductAction,
    updateProductAction,
    handleDeleteModalVisible,
    handleUpdateModalVisible,
    updateProductId,
    updateIsEdit,
    products,
    updateModalVisible,
    deleteModalVisible,
    isEdit,
    productId
  }
})
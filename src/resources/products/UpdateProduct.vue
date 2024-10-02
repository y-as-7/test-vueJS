<script lang="ts" setup>
import {
  FormControl,
  FormField,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Create from "../base/create.vue";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toTypedSchema } from "@vee-validate/zod";
import { z } from "zod";
import { toast } from "@/components/ui/toast";
import { useForm } from "vee-validate";
import { PRODUCT_ENDPOINTS } from "@/api/endpoints";
import axios from "axios";
import { onMounted, ref, watch } from "vue";
import { Product } from "@/types/global";
import { useRoute } from "vue-router";


const route = useRoute();
const productId = route.params.id;

const loading = ref(false);

const product = ref<Product | null>(null);

async function fetchProduct() {
  try {
    loading.value = true;
    const response = await axios.get(
      PRODUCT_ENDPOINTS.GET_PRODUCT(String(productId))
    );
    product.value = response.data;
  } catch (error: any) {
    console.error("Error fetching product:", error); // Log the error
    toast({
      title: "An error occurred",
      description: error.message,
      variant: "destructive",
      duration: 5000,
    });
  } finally {
    loading.value = false;
  }
}

onMounted(async () => {
  await fetchProduct();
});

// Define the validation schema
const formSchema = toTypedSchema(
  z.object({
    title: z.string().min(2).max(50),
    description: z.string().min(2).max(500),
    price: z.number().min(0.01).max(9999.99),
  })
);

// Initialize the form with empty initial values
const { handleSubmit, setValues } = useForm({
  validationSchema: formSchema,
  initialValues: {
    title: "",
    description: "",
    price: 0,
  },
});

// Watch for changes in the product and update the form values
watch(product, (newProduct) => {
  if (newProduct) {
    setValues({
      title: newProduct.title,
      description: newProduct.description,
      price: Number(newProduct.price),
    });
  }
});

// Define the submit action
const onSubmit = handleSubmit((values) => {
  try {

    // Send the form data to the server
    axios.put(
      PRODUCT_ENDPOINTS.UPDATE_PRODUCT(String(productId)),

      {
        title: values.title,
        description: values.description,
        price: values.price,
      },

      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    toast({
      title: "You submitted the following values:",
      description: "your product has been created",
      duration: 5000,
    });
  } catch (error: any) {
    toast({
      title: "An error occurred",
      description: error.message,
      variant: "destructive",
      duration: 5000,
    });
  }
});

const props = defineProps<{
  submitAction: () => void;
  loading: boolean;
}>();
</script>

<template>
  <Create
    :title="'Update Product'"
    :BreadCrumb="[
      { text: 'Home', href: '/' },
      { text: 'Products', href: '/products' },
      { text: 'edit', href: '/products/edit' },
    ]"
    :submitAction="onSubmit"
    :loading="props.loading"
  >
    <template v-slot:form>
      <!-- Title field -->
      <FormField v-slot="{ componentField }" name="title">
        <FormItem v-auto-animate>
          <FormLabel>Title</FormLabel>
          <FormControl>
            <Input type="text" placeholder="title" v-bind="componentField" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <!-- Description field -->
      <FormField v-slot="{ componentField }" name="description">
        <FormItem v-auto-animate>
          <FormLabel>Description</FormLabel>
          <FormControl>
            <Textarea placeholder="description" v-bind="componentField" />
          </FormControl>

          <FormMessage />
        </FormItem>
      </FormField>

      <!-- price field -->
      <FormField v-slot="{ componentField }" name="price">
        <FormItem v-auto-animate>
          <FormLabel>Price</FormLabel>
          <FormControl>
            <Input type="number" placeholder="price" v-bind="componentField" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
    </template>
  </Create>
</template>

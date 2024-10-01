<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import { PRODUCT_ENDPOINTS } from "@/api/endpoints";
import { toTypedSchema } from "@vee-validate/zod";
import { z } from "zod";
import { toast } from "../ui/toast";
import { useForm } from "vee-validate";
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Textarea from "../ui/textarea/Textarea.vue";
import Card from "../ui/card/Card.vue";
import axios from "@/api/axios";

const route = useRoute();
const productId = route.params.id;

const product = ref<Product | null>(null);

async function fetchProduct() {
  try {
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
  }
}

onMounted(async () => {
  await fetchProduct();
});

// Define the validation schema
const formSchema = toTypedSchema(
  z.object({
    title: z.string().min(2).max(50),
    description: z.string().min(2).max(225),
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
      title: newProduct.name_en,
      description: newProduct.description_en,
      price: Number(newProduct.price),
    });
  }
});

// Define the submit action
const onSubmit = handleSubmit((values) => {
  try {
    console.log(values);

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
</script>

<template>
  <div v-if="product">
    <!-- Render product form here -->
    <Card class="p-8">
      <CardContent class="">
        <form class="w-2/3 space-y-6" @submit.prevent="onSubmit">
          <!-- Title field -->
          <FormField v-slot="{ componentField }" name="title">
            <FormItem v-auto-animate>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="title"
                  v-bind="componentField"
                />
              </FormControl>
              <FormDescription>
                Enter the title of the product
              </FormDescription>
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
              <FormDescription>
                Enter the description of the product
              </FormDescription>
              <FormMessage />
            </FormItem>
          </FormField>

          <!-- price field -->
          <FormField v-slot="{ componentField }" name="price">
            <FormItem v-auto-animate>
              <FormLabel>Price</FormLabel>
              <FormControl>
                <Input
                  accept="number"
                  type="number"
                  step="0.01"
                  placeholder="price"
                  v-bind="componentField"
                />
              </FormControl>
              <FormDescription>
                Enter the price of the product
              </FormDescription>
              <FormMessage />
            </FormItem>
          </FormField>

          <!-- Submit button -->
          <Button type="submit"> Submit </Button>
        </form>
      </CardContent>
    </Card>
  </div>
  <div v-else>Loading...</div>
</template>

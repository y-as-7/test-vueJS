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
import router from "@/router";

const formSchema = toTypedSchema(
  z.object({
    title: z.string().min(2).max(50),
    description: z.string().min(2).max(50),
    price: z.number().min(1),
  })
);

const { handleSubmit } = useForm({
  validationSchema: formSchema,
});

const onSubmit = handleSubmit(async (values) => {
  try {
    const newProduct = await axios.post(PRODUCT_ENDPOINTS.CREATE_PRODUCT, {
      title: values.title,
      description: values.description,
      categoryId: 1,
      images: ["https://placeimg.com/640/480/any"],
      price: values.price,
    });

    toast({
      title: "You submitted the following values:",
      description: "your product has been created",
      duration: 5000,
    });

    router.push(`/products/${newProduct.data.id}/edit`);
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
    :title="'Create Product'"
    :BreadCrumb="[
      { text: 'Home', href: '/' },
      { text: 'Products', href: '/products' },
      { text: 'Create', href: '/products/create' },
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

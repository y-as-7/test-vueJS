<script setup lang="ts">
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";
import { vAutoAnimate } from "@formkit/auto-animate/vue";

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
import { toast } from "@/components/ui/toast";
import Textarea from "../ui/textarea/Textarea.vue";
import Card from "../ui/card/Card.vue";
import axios from "@/api/axios";
import { PRODUCT_ENDPOINTS } from "@/api/endpoints";

// Define the validation schema
const formSchema = toTypedSchema(
  z.object({
    title: z.string().min(2).max(50),
    description: z.string().min(2).max(50),
    price: z.number().min(1),
  })
);

// Initialize the form
const { handleSubmit } = useForm({
  validationSchema: formSchema,
});

// Define the submit action
const onSubmit = handleSubmit((values) => {
  try {
    // Send the form data to the server
    axios.post(PRODUCT_ENDPOINTS.CREATE_PRODUCT, {
      title: values.title,
      description: values.description,
      price: values.price,
    });

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
  <!-- Prevent default form submission with @submit.prevent -->
  <Card class="p-8">
    <CardContent class="">
      <form class="w-2/3 space-y-6" @submit.prevent="onSubmit">
        <!-- Title field -->
        <FormField v-slot="{ componentField }" name="title">
          <FormItem v-auto-animate>
            <FormLabel>Title</FormLabel>
            <FormControl>
              <Input type="text" placeholder="title" v-bind="componentField" />
            </FormControl>
            <FormDescription> Enter the title of the product </FormDescription>
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
                type="number"
                placeholder="price"
                v-bind="componentField"
              />
            </FormControl>
            <FormDescription> Enter the price of the product </FormDescription>
            <FormMessage />
          </FormItem>
        </FormField>

        <!-- Submit button -->
        <Button type="submit"> Submit </Button>
      </form>
    </CardContent>
  </Card>
</template>

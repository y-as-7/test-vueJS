<script lang="ts" setup>
import {
  FormControl,
  FormField,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toTypedSchema } from "@vee-validate/zod";
import { z } from "zod";
import { toast } from "@/components/ui/toast";
import { useForm } from "vee-validate";
import { CATEGORY_ENDPOINTS } from "@/api/endpoints";
import axios from "axios";
import { onMounted, ref, toRaw, watch } from "vue";
import router from "@/router";
import { ICategory } from "@/types/global";
import Edit from "../base/edit.vue";
import ProductRelationManger from "./RelationMangers/ProductRelationManger.vue";

// Reactive references
const paramId = ref(router.currentRoute.value.params.id);
const formLoading = ref(false);
const relationMangerLoading = ref(false);
const submitLoading = ref(false);
const category = ref<ICategory | null>(null);

// make the relationMangers 2d array
const relationMangers = ref<any>([]);

onMounted(async () => {
  try {
    relationMangerLoading.value = true;
    const response = paramId.value
      ? await axios.get(
          `${CATEGORY_ENDPOINTS.UPDATE_CATEGORY(
            String(paramId.value)
          )}/products?offset=10&limit=10`
        )
      : {
          data: {
            title: "",
            description: "",
            price: 0,
          },
        };


    relationMangers.value.push({
      title: "Products",
      data: response.data,
    });

  } catch (error: any) {
    console.error("Error fetching category:", error);
    toast({
      title: "An error occurred",
      description: error.message,
      variant: "destructive",
      duration: 5000,
    });
  } finally {
    relationMangerLoading.value = false;
  }
});

// Fetch the category data when the component is mounted
onMounted(async () => {
  try {
    // refresh the page
    formLoading.value = true;
    const response = paramId.value
      ? await axios.get(
          CATEGORY_ENDPOINTS.UPDATE_CATEGORY(String(paramId.value))
        )
      : {
          data: {
            title: "",
            description: "",
            price: 0,
          },
        };
    category.value = response.data;
  } catch (error: any) {
    console.error("Error fetching category:", error); // Log the error
    toast({
      title: "An error occurred",
      description: error.message,
      variant: "destructive",
      duration: 5000,
    });
  } finally {
    formLoading.value = false;
  }
});

// Define the validation schema
const formSchema = toTypedSchema(
  z.object({
    title: z.string().min(2).max(50),
  })
);

// Initialize the form with vee-validate
const { handleSubmit, setValues } = useForm({
  validationSchema: formSchema,
  initialValues: {
    title: "",
  },
});

// Watch the category ref and update form values when the category is fetched
watch(category, (newcategory) => {
  if (newcategory) {
    setValues({
      title: newcategory.name,
    });
  }
});

// Define the submit action for the form
const onSubmit = handleSubmit(async (values) => {
  try {
    submitLoading.value = true;
    await axios.put(
      CATEGORY_ENDPOINTS.UPDATE_CATEGORY(String(paramId.value)),
      {
        name: values.title,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    toast({
      title: "Success",
      description: "Your category has been updated.",
      duration: 5000,
    });
  } catch (error: any) {
    toast({
      title: "An error occurred",
      description: error.message,
      variant: "destructive",
      duration: 5000,
    });
  } finally {
    submitLoading.value = false;
  }
});

// Props passed from parent component
const props = defineProps<{
  submitAction: () => void;
  loading: boolean;
}>();
</script>

<template>
  <Edit
    :title="'Update category'"
    :BreadCrumb="[
      { text: 'Home', href: '/' },
      { text: 'categorys', href: '/categorys' },
      { text: 'edit', href: '/categorys/edit' },
    ]"
    :submitAction="onSubmit"
    :relationMagers="relationMangers"
    :relationMangerLoading="relationMangerLoading"
    :submitLoading="submitLoading"
    :fromLoading="formLoading"
  >
    <template v-if="!formLoading" v-slot:form>
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
    </template>

    <template v-slot:relationMangers>

      <ul class="w-full flex justify-center items-center gap-x-4">
        <li>
          <Button
            v-for="relation in relationMangers"
            :class="
              true
                ? 'font-bold rounded-md bg-primary py-1 px-3 text-white'
                : 'bg-slate-500'
            "
            class="font-bold rounded-md py-1 px-3 text-white"
            type="button"
          >
            {{ relation.title }}
          </Button>
        </li>
      </ul>


    <ProductRelationManger
      :items="toRaw(relationMangers[0]?.data)"
      :tableAction="[]"
   />

   </template>

  </Edit>
</template>

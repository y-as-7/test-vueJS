<script setup lang="ts">
import BreadCrumb from "@/components/BreadCrumb.vue";
import Navbar from "@/components/dashbord/Navbar.vue";
import Button from "@/components/ui/button/Button.vue";
import { Card, CardContent } from "@/components/ui/card";
import { IBreadCrumb } from "@/types/global";
import { defineProps } from "vue";

const props = defineProps<{
  submitAction: () => void;
  title: string;
  BreadCrumb: IBreadCrumb[];
  relationMagers: any;
  relationMangerLoading: boolean;
  submitLoading: boolean;
  fromLoading: boolean;
}>();
</script>

<template>
  <div class="p-8">
    <div class="pt-4">
      <BreadCrumb :breadcrumbItems="props.BreadCrumb" />
    </div>

    <div class="py-2">
      <Navbar :title="title" :headerActions="[]" />
    </div>

    <div class="py-12">
      <Card class="p-8">
        <CardContent class="">
          <form
            class="flex flex-col gap-y-8 md:w-2/3 w-full"
            @submit.prevent="submitAction"
          >
            <slot name="form" />
            <!-- Submit button -->
            <Button
              :text="props.submitLoading ? 'Loading...' : 'Update'"
              type="submit"
            >
              Update
            </Button>
          </form>
        </CardContent>
      </Card>

      <!-- relation manger if existed  -->
      <div class="py-12">
        <slot name="relationMangers" />
      </div>
    </div>
  </div>
</template>

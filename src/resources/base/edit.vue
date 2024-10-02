<script setup lang="ts">
import BreadCrumb from "@/components/BreadCrumb.vue";
import Navbar from "@/components/dashbord/Navbar.vue";
import Button from "@/components/ui/button/Button.vue";
import { Card, CardContent } from "@/components/ui/card";
import { IBreadCrumb } from "@/types/global";
import { defineProps } from "vue";

const props = defineProps<{
  submitAction: () => void;
  loading: boolean;
  title: string;
  BreadCrumb: IBreadCrumb[];
}>();
</script>

<template>
  <div class="p-8">
    <div class="pt-4">
      <BreadCrumb :breadcrumbItems="props.BreadCrumb" />
    </div>

    <div class="py-2">
      <Navbar :title="title" :actions="[]" />
    </div>

    <div class="py-12">
      <Card class="p-8">
        <CardContent class="">
          <form class="flex flex-col gap-y-8 md:w-2/3 w-full" @submit.prevent="submitAction">
            <slot name="form" />
            <!-- Submit button -->
            <Button
            disabled="props.loading"
            :text="props.loading ? 'Loading...' : 'Create'"
            type="submit"> Create </Button>
          </form>
        </CardContent>
      </Card>

      <div v-if="props.loading">Loading...</div>
    </div>
  </div>
</template>

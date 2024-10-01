<script lang="ts" setup>
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

interface BreadcrumbItem {
  text: string;
  href: string;
}

const { breadcrumbItems } = defineProps<{
  breadcrumbItems: BreadcrumbItem[];
}>();
</script>

<template>
  <Breadcrumb>
    <BreadcrumbList>
      <template v-for="(item, index) in breadcrumbItems" :key="index">
        <BreadcrumbItem>
          <template v-if="index === breadcrumbItems.length - 1">
            <BreadcrumbPage>{{ item.text }}</BreadcrumbPage>
          </template>
          <template v-else>
            <BreadcrumbLink v-if="item.href" :href="item.href">{{
              item.text
            }}</BreadcrumbLink>
          </template>
        </BreadcrumbItem>

        <BreadcrumbSeparator v-if="index < breadcrumbItems.length - 1" />
      </template>
    </BreadcrumbList>
  </Breadcrumb>
</template>

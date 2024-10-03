<script setup lang="ts">
import Card from "@/components/ui/card/Card.vue";
import CardContent from "@/components/ui/card/CardContent.vue";
import {
  Table,
  TableBody,
  TableCaption,
  TableHeader,
} from "@/components/ui/table";


</script>

<template>
  <div class="py-12">
    <Card>
      <CardContent>
        <Table>
          <TableCaption>A list of your recent products.</TableCaption>
          <TableHeader>
              <slot name="header" />
          </TableHeader>
          <TableBody>
            <slot name="body" />
          </TableBody>
        </Table>
      </CardContent>
      <
    </Card>
  </div>
</template>

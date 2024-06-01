<template>
  <!-- @TODO: Check why description comes with an array instead of string -->
  <BlogsHeader :data="content" />
</template>

<script setup lang="ts">
import type { BlogsAttributes } from '@/types/Blogs';
import type { Strapi4ResponseMany } from '@nuxtjs/strapi';

const route = useRoute();
const { fullPath } = route;
const { slug } = route.params;

const { data } = await useAsyncData(fullPath, async () => {
  const { find } = useStrapi();
  try {
    const response = await find<BlogsAttributes>('blogs', {
      populate: {
        author: {
          populate: '*',
        },
        hero_image: {
          populate: '*',
        },
      },
      filters: { title: { $eqi: (slug as string).split('-').join(' ') } },
    });
    return response;
  } catch (e: any) {
    return showError(e);
  }
});

const content = computed(
  () => (data.value as Strapi4ResponseMany<BlogsAttributes>).data[0].attributes,
);
</script>

<style scoped lang="postcss"></style>

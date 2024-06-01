<template>
  <UBlogList orientation="horizontal">
    <UBlogPost
      v-for="post in content"
      :title="post.attributes.title ?? undefined"
      :image="{
        src: post.attributes.hero_image?.data.attributes.url,
        alt: post.attributes.hero_image
          ? (post.attributes.hero_image?.data.attributes.alternativeText as string)
          : undefined,
      }"
      :to="`/blogs/${post.attributes.title?.split(' ').join('-').toLowerCase()}`"
    />
  </UBlogList>
</template>

<script setup lang="ts">
import type { BlogsAttributes } from '@/types/Blogs';
import type { Strapi4ResponseMany } from '@nuxtjs/strapi';

const route = useRoute();
const { fullPath } = route;

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
    });
    return response;
  } catch (e: any) {
    return showError(e);
  }
});

const content = computed(() => (data.value as Strapi4ResponseMany<BlogsAttributes>).data);
</script>

<style scoped></style>

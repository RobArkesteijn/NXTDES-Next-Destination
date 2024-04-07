<template>
  <UBlogList orientation="horizontal">
    <UBlogPost
      v-for="post in content"
      :title="post.attributes.title"
      :image="{
        src: post.attributes.hero_image.data?.attributes?.url,
        alt: post.attributes.hero_image.data?.attributes?.alternativeText,
      }"
      :to="`/blogs/${post.attributes.title.split(' ').join('-').toLowerCase()}`"
    />
  </UBlogList>
</template>

<script setup lang="ts">
const route = useRoute();
const { fullPath } = route;

const { data } = await useAsyncData(fullPath, async () => {
  const { find } = useStrapi();
  try {
    const response = await find('blogs', {
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
  } catch (e) {
    return showError('Unknown error');
  }
});

const content = computed(() => data.value?.data);
</script>

<style scoped></style>

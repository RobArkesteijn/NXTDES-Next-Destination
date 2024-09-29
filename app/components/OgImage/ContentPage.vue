<script setup lang="ts">
withDefaults(defineProps<{
  title?: string
  description?: string
  imageUrl?: string
  icon?: string
}>(), {
  title: 'title',
  description: 'description',
  imageUrl: 'https://helpful-creativity-ec1955a0dd.media.strapiapp.com/DSC_00650_c766c5d0a3.JPG',
  icon: '',
})
</script>

<template>
  <div
    class="h-full w-full flex flex-row"
  >
    <div class="w-2/5 p-20 bg-copper-50">
      <span class=" text-8xl font-thermite flex flex-col gap-6">
        <UIcon
          v-if="icon"
          :name="icon"
          dynamic
        />
        {{ title }}
      </span>
      <p class="text-2xl font-brixton">
        {{ description }}
      </p>
    </div>
    <NuxtImg
      :src="imageUrl"
      width="600px"
      height="600px"
      alt=""
      class="w-3/5 h-full object-cover"
    />
  </div>
</template>

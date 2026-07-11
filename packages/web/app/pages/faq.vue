<script setup lang="ts">
import type { FaqAttributes } from '@/types/Faq'

const route = useRoute()
const { t } = useI18n()
const { fullPath } = route

const { data } = await useAsyncData(fullPath, async () => {
  const { find } = useStrapi()

  const response = await find<FaqAttributes>('faqs', {
    populate: '*',
  })
  return response
})

if (!data.value) {
  throw createError({
    statusCode: 500,
    statusMessage: t('error.500.statusMessage'),
    message: t('error.500.message'),
  })
}

const items = data.value.data.map(item => (
  {
    label: item.attributes.question,
    content: item.attributes.answer,
  }
))

const faqSchema = items.map(item => (
  defineQuestion({
    name: item.label,
    acceptedAnswer: item.content,
  })),
)

useSchemaOrg(faqSchema)
</script>

<template>
  <div>
    <ULandingSection
      headline="FAQ"
      title="Frequently Asked Questions"
      description="Discover the answers to common questions."
      :ui="{
        wrapper: 'py-12 sm:py-16',
      }"
    />
    <ULandingFAQ
      :items="items"
      multiple
    />
  </div>
</template>

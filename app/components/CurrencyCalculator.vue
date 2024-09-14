<script setup lang="ts">
import { object, string, type InferType } from 'yup'
import type { FormSubmitEvent } from '#ui/types'
import type { Calculator } from '@/types/Calculator'
import formatNumber from '@/utils'

const props = defineProps({
  currency: {
    type: String as PropType<string>,
    required: true,
  },
})

const config = useRuntimeConfig()
const i18n = useI18n()

const calculatedAmount = ref<string>()

interface Currency {
  currency: string
  format: string
  icon: string
}

const schema = object({
  amount: string().required('Please enter an amount'),
})

type Schema = InferType<typeof schema>

const currencies: Currency[] = [
  { currency: 'Euro', format: 'EUR', icon: 'i-tabler-currency-euro' },
  { currency: 'US Dollar', format: 'USD', icon: 'i-tabler-currency-pound' },
]

const currencyOfReader = i18n.locale.value === 'nl' ? currencies[0] : currencies[1]

const state = reactive({
  amount: 1.0,
})

// @TODO: Add limit to amount of calls (no more than 500)
const calculateCurrencyAmount = async (event: FormSubmitEvent<Schema>) => {
  console.log(currencyOfReader?.format, props.currency)
  const data: Calculator = await $fetch(`${config.public.currencyApiUrl}/convert`, {
    method: 'GET',
    params: {
      from: currencyOfReader?.format,
      to: props.currency,
      amount: event.data.amount,
    },
    headers: {
      'X-RapidAPI-Key': config.public.xRapidApiKey,
      'X-RapidAPI-Host': config.public.xRapidCurrencyApiHost,
    },
  })

  calculatedAmount.value = formatNumber(data.result.convertedAmount, 2, props.currency)
}
</script>

<template>
  <div class="currency-calculator">
    <div class="currency-calculator__wrapper">
      <h2 class="currency-calculator__title">
        Check the valuta of this country
      </h2>
      <UForm
        :schema="schema"
        :state="state"
        class="currency-calculator__group"
        @submit="calculateCurrencyAmount"
      >
        <div class="currency-calculator__fields">
          <UFormGroup
            label="Amount"
            name="amount"
          >
            <UInput
              v-model="state.amount"
              class="currency-calculator__input-menu"
              placeholder="Amount"
              :step="0.01"
              type="number"
              size="lg"
            >
              <template #trailing>
                <UIcon
                  v-if="currencyOfReader && currencyOfReader.icon"
                  :name="currencyOfReader.icon"
                />
              </template>
            </UInput>
          </UFormGroup>
        </div>
        <UButton
          class="currency-calculator__button"
          label="Calculate"
          size="lg"
          type="submit"
        />
      </UForm>
      <span class="currency-calculator__result">
        {{ calculatedAmount ? calculatedAmount : `${currency} ........` }}
      </span>
    </div>
  </div>
</template>

<style scoped lang="postcss">
.currency-calculator {
  height: 28rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  @apply bg-boston-blue-100 dark:bg-boston-blue-900;

  &__wrapper {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
    padding-block: 2rem;
    padding-inline: 1rem;;

    @media screen(sm) {
      padding-block: 3rem;
      padding-inline: 1.5rem;
    }

    @media screen(lg) {
      padding-inline: 2rem;
    }
  }

  &__title {
    @apply text-2xl;
  }

  &__group {
    display: flex;
    gap: 0.5rem;
  }

  &__fields {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  &__button {
    display: flex;
    justify-content: center;
  }

  &__result {
    padding: 2rem;
    margin-top: 1rem;
    position: relative;
    z-index: 1;

    @apply font-thermite text-4xl text-gray-950 dark:text-gray-50;

    &:before {
      position: absolute;
      content: '';
      inset: 0;
      width: 100%;
      height: 100%;
      background-image: url('/patterns/chalk-stroke.png');
      background-size: cover;
      z-index: -1;

      @apply dark:opacity-40;
    }
  }
}
</style>

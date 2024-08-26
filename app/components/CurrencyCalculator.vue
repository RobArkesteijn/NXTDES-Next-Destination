<template>
  <div class="currency-calculator">
    <div class="currency-calculator__wrapper">
      <h2 class="currency-calculator__title">
        Check the valuta of this country
      </h2>
      <!-- @TODO: add state and schema props and add form validation -->
      <UForm
        class="currency-calculator__group"
        @submit="
          calculateCurrencyAmount(selectedCurrency?.format!, currency, currencyAmountInputValue)
        "
      >
        <div class="currency-calculator__fields">
          <UFormGroup
            label="Currency"
            name="currency"
          >
            <USelectMenu
              v-model="selectedCurrencyValue"
              class="currency-calculator__select-menu"
              value-attribute="format"
              option-attribute="currency"
              trailing
              :options="currencies"
              size="lg"
            />
          </UFormGroup>
          <UFormGroup
            label="Amount"
            name="amount"
          >
            <UInput
              v-model="currencyAmountInputValue"
              class="currency-calculator__input-menu"
              placeholder="Amount"
              :step="0.01"
              type="number"
              size="lg"
            >
              <template #trailing>
                <UIcon
                  v-if="selectedCurrency && selectedCurrency.icon"
                  :name="selectedCurrency?.icon"
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
        {{ calculatedAmount ? calculatedAmount : '........' }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Calculator } from '@/types/Calculator'
import formatNumber from '@/utils'

const props = defineProps({
  currency: {
    type: String as PropType<string>,
    required: true,
  },
})

const config = useRuntimeConfig()

const currencyAmountInputValue = ref(1.0)
const calculatedAmount = ref<string>()

interface Currency {
  currency: string
  format: string
  icon: string
}

const currencies: Currency[] = [
  { currency: 'Euro', format: 'EUR', icon: 'i-tabler-currency-euro' },
  { currency: 'Turkey Lira', format: 'TRY', icon: 'i-tabler-currency-lira' },
  { currency: 'US Dollar', format: 'USD', icon: 'i-tabler-currency-dollar' },
  { currency: 'Viet Nam Dong', format: 'VND', icon: 'i-tabler-currency-dong' },
]

const selectedCurrencyValue = ref(
  props.currency === 'EUR' ? currencies[2]?.format : currencies[0]?.format,
)

const selectedCurrency = computed(() =>
  currencies.find(currency => currency.format === selectedCurrencyValue.value),
)

const resultCurrencyFormat = computed(
  () => currencies.find(currency => currency.format === props.currency)?.format,
)

// @TODO: Add limit to amount of calls (no more than 500)
const calculateCurrencyAmount = async (
  currencyFrom: string,
  currencyTo: string,
  currencyAmount: number,
) => {
  const data: Calculator = await $fetch(`${config.public.currencyApiUrl}/convert`, {
    method: 'GET',
    params: {
      from: currencyFrom,
      to: currencyTo,
      amount: currencyAmount,
    },
    headers: {
      'X-RapidAPI-Key': config.public.xRapidApiKey,
      'X-RapidAPI-Host': config.public.xRapidCurrencyApiHost,
    },
  })

  calculatedAmount.value = formatNumber(data.result.convertedAmount, 2, resultCurrencyFormat.value)
}
</script>

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

<template>
  <ClientOnly>
    <div class="currency-calculator">
      <div class="currency-calculator__wrapper">
        <h2 class="currency-calculator__title">Check the valuta of this country</h2>
        <UForm class="currency-calculator__group">
          <div class="currency-calculator__fields">
            <USelectMenu
              class="currency-calculator__select-menu"
              v-model="selectedCurrencyValue"
              value-attribute="abbreviation"
              option-attribute="currency"
              trailing
              :options="currencies"
              size="lg"
            />
            <UInput
              class="currency-calculator__input-menu"
              placeholder="Amount"
              v-model="currencyAmountInputValue"
              :step="0.01"
              type="number"
              size="lg"
            >
              <template #trailing>
                <UIcon :name="selectedCurrency?.icon" />
              </template>
            </UInput>
          </div>
          <UButton
            class="currency-calculator__button"
            label="Calculate"
            size="lg"
            type="submit"
            @click="
              calculateCurrencyAmount(
                selectedCurrency?.abbreviation!,
                props.currency,
                currencyAmountInputValue,
              )
            "
          />
        </UForm>
        <span class="currency-calculator__result">
          {{ calculatedAmount ? calculatedAmount : '........' }}
          <UIcon :name="resultCurrency?.icon" />
        </span>
      </div>
    </div>
  </ClientOnly>
</template>

<script setup lang="ts">
const props = defineProps({
  currency: {
    type: String,
    required: true,
  },
});

const config = useRuntimeConfig();

const currencyAmountInputValue = ref(1.0);
const calculatedAmount = ref<string>();

// @TODO: Add limit to amount of calls (no more than 500)
const calculateCurrencyAmount = async (
  currencyFrom: string,
  currencyTo: string,
  currencyAmount: number,
) => {
  const data = await $fetch(`${config.public.currencyApiUrl}/convert`, {
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
  });

  calculatedAmount.value = (Math.round(data.result.convertedAmount * 100) / 100).toFixed(2);
};

const currencies = [
  { currency: 'Euro', abbreviation: 'EUR', icon: 'i-tabler-currency-euro' },
  { currency: 'Turkey Lira', abbreviation: 'TRY', icon: 'i-tabler-currency-lira' },
  { currency: 'US Dollar', abbreviation: 'USD', icon: 'i-tabler-currency-dollar' },
  { currency: 'Viet Nam Dong', abbreviation: 'VND', icon: 'i-tabler-currency-dong' },
];

const selectedCurrencyValue = ref(
  props.currency === 'EUR' ? currencies[2].abbreviation : currencies[0].abbreviation,
);

const selectedCurrency = computed(() =>
  currencies.find((currency: any) => currency.abbreviation === selectedCurrencyValue.value),
);

const resultCurrency = computed(() =>
  currencies.find((currency: any) => currency.abbreviation === props.currency),
);
</script>

<style scoped lang="postcss">
.currency-calculator {
  @apply shapedivider shapedivider--top bg-boston-blue-100 dark:bg-boston-blue-900 h-[28rem] flex flex-col gap-2;

  &__wrapper {
    @apply flex flex-col gap-2 text-center items-center justify-center shapedivider h-full w-full shapedivider shapedivider--bottom;
  }

  &__title {
    @apply text-2xl;
  }

  &__group {
    @apply flex gap-2;
  }

  &__fields {
    @apply flex flex-col gap-2;
  }

  &__button {
    @apply flex justify-center;
  }

  &__result {
    @apply font-thermite text-4xl p-8 mt-4 relative z-[1] text-shark-950 dark:text-shark-50;

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

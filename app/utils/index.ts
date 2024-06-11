const formatNumber = (value: number, decimals: number, currencyFormat: string | undefined) =>
  Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: currencyFormat,
    minimumFractionDigits: decimals,
  }).format(value)

export default formatNumber

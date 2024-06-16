const formatNumber = (value: number | string, decimals: number, currencyFormat: string | undefined) =>
  Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: currencyFormat,
    minimumFractionDigits: decimals,
  }).format(Number(value))

export default formatNumber

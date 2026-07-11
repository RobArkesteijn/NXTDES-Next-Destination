export interface Calculator {
  result: CalculatorResult
  succes: boolean
  validationMessage: Array<string>
}

export interface CalculatorResult {
  amountToConvert: number
  convertedAmount: number
  from: string
  to: string
}

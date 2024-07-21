import React , {useId} from 'react'

function InputBox({
    label,
    amount,
    onAmountChange,
    onCurrencyChange,
    currencyOptions = [],
    selectCurrency = "usd",
    amountDisable = false,
    currencyDisable = false
}) {

    let amountInputId = useId();
  return (
    <div className='bg-white p-3 rounded-lg text-sm flex'>
        <div className="w-1/2">
            <label htmlFor={amountInputId} className="text-black/40 mb-2 inline-block">{label}</label>
            <input type="number"
            id= {amountInputId}
            disabled = {amountDisable}
            value={amount}
            className="outline-none w-full bg-transparent py-1.5"
            onChange={(e) => onAmountChange(Number(e.target.value))}
            placeholder='0'
            />
        </div>
        <div className="w-1/2 flex flex-wrap justify-end text-right">
            <p className="text-black/40 mb-2 w-full">Currency Type</p>
            <select 
            className="rounded-lg px-1 py-1 bg-gray-100 cursor-pointer outline-none" 
            id="currencyList"
            value={selectCurrency}
            disabled = {currencyDisable}
            onChange={(e) => onCurrencyChange(e.target.value)}
            >
                {
                    currencyOptions.map((currency) => (
                        <option value={currency}
                        key={currency}
                        >{currency}</option>
                    ))
                }

            </select>
        </div>


    </div>
  )
}

export default InputBox
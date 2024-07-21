import React, { useEffect } from "react";
import { InputBox } from "./components";
import { useState } from "react";
// import useCurrencyInfo from "./CustomHooks/useCurrencyInfo";

function App() {
  function useCurrencyInfo(currency) {
    let [data, setData] = useState({});

    useEffect(() => {
      fetch(
        `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${currency}.json`
      )
        .then((res) => res.json())
        .then((res) => setData(res[currency]));
    }, [currency]);

    return data;
  }

  let [amount, setAmount] = useState();
  let [convertedAmount, setConvertedAmount] = useState(0);
  let [from, setFrom] = useState("usd");
  let [to, setTo] = useState("inr");

  const swap = () => {
    setFrom(to);
    setTo(from);
    setConvertedAmount(amount);
    setAmount(convertedAmount);
  };

  let currencyInfo = useCurrencyInfo(from);
  let options = Object.keys(currencyInfo);

  let convert = () => {
    setConvertedAmount((amount * currencyInfo[to]).toFixed(4));
  };

  // useEffect(() => {
  //   convert();
  // }, [amount, from, to]);

  return (
    <div
      className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat"
      style={{
        backgroundImage: `url('https://images.pexels.com/photos/3532540/pexels-photo-3532540.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')`,
      }}
    >
      <div className="w-full max-w-md mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            convert();
            console.log(`${from} to ${to} = ${convertedAmount}`);
          }}
        >
          <div className="w-full mb-1">
            <InputBox
              label="From"
              amount={amount}
              currencyOptions={options}
              onAmountChange={(amount) => setAmount(amount)}
              onCurrencyChange={(currency) => setFrom(currency)}
              selectCurrency={from}
            />
          </div>
          <div className="relative w-full h-0.5">
            <button
              type="button"
              className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-white px-2 py-0.5"
              onClick={swap}
            >
              Swap
            </button>
          </div>
          <div className="w-full mt-1 mb-4">
            <InputBox
              label="To"
              amount={convertedAmount}
              currencyOptions={options}
              onAmountChange={(amount) => setAmount(amount)}
              onCurrencyChange={(currency) => setTo(currency)}
              selectCurrency={to}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg"
          >
            Convert {from.toUpperCase()} to {to.toUpperCase()}
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;

// import React from 'react'
// import { InputBox } from './components'
// import { useState } from 'react'
// import useCurrencyInfo from './CustomHooks/useCurrencyInfo'

// function App() {
//   let [fromAmount, setFromAmount] = useState(1); // Separate state for "From" amount
//   let [toAmount, setToAmount] = useState(0); // Separate state for "To" amount
//   let [from, setFrom] = useState("usd")
//   let [to, setTo] = useState("inr")

//   let currencyInfo = useCurrencyInfo(from);
//   let options = currencyInfo ? Object.keys(currencyInfo) : []; // Add a check here

//   let convert = () => {
//     setToAmount(fromAmount * currencyInfo[to]);
//   }

//   return (
//     <div>
//       <div>
//         <form
//           onSubmit={(e) => {
//             e.preventDefault();
//             convert();
//             console.log(`${from} to ${to} = ${toAmount}`)
//           }}
//         >
//           <div>
//             <InputBox
//               label= "From"
//               amount={fromAmount}
//               currencyOptions={options}
//               onAmountChange={(amount) => setFromAmount(amount)}
//               onCurrencyChange={(currency) => setFrom(currency)}
//               selectCurrency={from}
//             />
//           </div>
//           <div>
//             <button
//               onClick={() => {
//                 // Swap "From" and "To" currencies
//                 setFrom(to);
//                 setTo(from);
//                 // Swap amounts
//                 setFromAmount(toAmount);
//                 setToAmount(fromAmount);
//               }}
//             >
//               Swap
//             </button>
//           </div>
//           <div>
//             <InputBox
//               label="To"
//               amount={toAmount}
//               currencyOptions={options}
//               onAmountChange={(amount) => setToAmount(amount)}
//               onCurrencyChange={(currency) => setTo(currency)}
//               selectCurrency={to}
//             />
//           </div>
//           <button type="submit">Convert {from.toUpperCase()} to {to.toUpperCase()}</button>
//         </form>
//       </div>
//     </div>
//   )
// }

// export default App

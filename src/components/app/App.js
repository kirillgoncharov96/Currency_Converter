import Block from '../block/Block';
import { useEffect, useState } from 'react';

import useCurrencyService from '../../service/CurrencyService';

import './app.scss';

function App() {
  const [fromCurrency, setFromCurrency] = useState('RUB');
  const [toCurrency, setToCurrency] = useState('USD');
  const [fromPrice, setFromPrice] = useState('');
  const [toPrice, setToPrice] = useState('');


  const [data, setData] = useState([]);
  
  const {getAllCurrency} = useCurrencyService();

  const onLoadedCurrency = (cur) => {
    setData(cur)
  }

  useEffect(() => {
    getAllCurrency()
      .then(onLoadedCurrency)
      .catch(error => console.log(error))
      // eslint-disable-next-line
  }, [])

  useEffect(() => {
    onChangeFromPrice(fromPrice);
      // eslint-disable-next-line
  }, [fromCurrency])

  useEffect(() => {
    onChangeToPrice(toPrice);
      // eslint-disable-next-line
  }, [toCurrency])

  const onChangeFromPrice = (value) => {
    const price = value / ((!data[fromCurrency]) ? 1 : data[fromCurrency]);
    const result = price * ((!data[toCurrency]) ? 1 : data[toCurrency]);
    setToPrice(result.toFixed(2))
    setFromPrice(value);
  }

  const onChangeToPrice = (value) => {
    const result = ((!data[fromCurrency] ? 1 : data[fromCurrency]) / (!data[toCurrency] ? 1 : data[toCurrency])) * value;
    setFromPrice(result.toFixed(2));
    setToPrice(value);
  }


  return (
    <>
      
      <div className="App">
        <Block value={fromPrice} currency={fromCurrency} onChangeCurrency={setFromCurrency} onChangeValue={onChangeFromPrice}/>
        <Block value={toPrice} currency={toCurrency} onChangeCurrency={setToCurrency} onChangeValue={onChangeToPrice}/>
      </div>
    </>
    
  );
}

export default App;

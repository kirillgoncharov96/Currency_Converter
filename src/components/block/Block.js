import './block.scss';
import { useState } from 'react';

const Block = ({ value, currency, onChangeValue, onChangeCurrency }) => {
    const [display, setDisplay] = useState(false);
    const [cur, setCur] = useState(null);

    const defaultCurrencies = ['RUB', 'USD', 'EUR', 'GBP'];
    const hiddenCurrencies = ["AUD", "AZN", "AMD", "BYN", "BGN", "BRL", "HUF", "VND", "HKD", "GEL", "DKK", "AED", 
    "EGP", "INR", "IDR", "KZT", "CAD", "QAR", "KGS", "CNY", "MDL", "NZD", "NOK", "PLN", "RON", "XDR", "SGD", "TJS", "THB", 
    "TRY", "TMT", "UZS", "UAH", "CZK", "SEK", "CHF", "RSD", "ZAR", "KRW", "JPY"];

    const onCurrencyLoaded = (cur) => { 
        if ((cur !== "RUB") && (cur !== "USD") && (cur !== "EUR") && (cur !== "GBP") ) {
            setCur(cur)
        } else {
            setCur(null)
            setDisplay(false)
        }
        onChangeCurrency(cur)    
    }

    const delCurrencyLoaded = () => {
        if (display) {
            setDisplay(false)    
        } else {
            setDisplay(true)
        }
            
    }

    const renderCurrency = hiddenCurrencies.map((cur, i) => (
            <li 
                tabIndex={0}
                onClick={() => onCurrencyLoaded(cur)}
                onKeyDown={() => onCurrencyLoaded(cur)}
                className={currency === cur ? 'active' : ''}
                key={i}>
                {cur}
            </li>
        ))
    
    const noDisplay = display ? 'block' : 'none';

    console.log(cur)
    return (
        <div className="block">
            <ul className="currencies">
            {defaultCurrencies.map((cur, i) => (
                <li 
                tabIndex={0}
                onClick={() => onCurrencyLoaded(cur)}
                onKeyDown={() => onCurrencyLoaded(cur)}
                className={currency === cur ? 'active' : ''}
                key={i}>
                {cur}
                </li>
            ))}
                { cur ? <li className='active'>
                                {cur}
                        </li> : null }
                <li 
                    onClick={() => delCurrencyLoaded()}
                    tabIndex={0}
                    onKeyDown={() => delCurrencyLoaded()}
                    className={display ? 'active__hidden' : ''}>
                    <svg height="50px" viewBox="0 0 50 50" width="50px">
                        <rect fill="none" height="50" width="50" />
                        <polygon points="47.25,15 45.164,12.914 25,33.078 4.836,12.914 2.75,15 25,37.25 " />
                    </svg>
                </li>
            </ul>
            {display ?
                <div className='currencies__hidden' style={{display: noDisplay}}>
                    {renderCurrency}
                </div> : null}
            <input
                onChange={(e) => onChangeValue(e.target.value)}
                onFocus={() => setDisplay(false)}
                value={value}
                type="number"
                min = "0"
                placeholder={0}
            />
        </div>       
    )
}

export default Block;
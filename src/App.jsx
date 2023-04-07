import React from 'react';
import { getYear, isMatch, differenceInDays } from 'date-fns';
import Divider from './components/Divider';
import Input from './components/Input';
import Result from './components/Result';
import './styles/App.css';

const initialDate = [
  {
    id: 'day',
    placeholder: 'DD',
    value: '',
    msg: '',
    isValid: true,
    result: ''
  },
  {
    id: 'month',
    placeholder: 'MM',
    value: '',
    msg: '',
    isValid: true,
    result: ''
  },
  {
    id: 'year',
    placeholder: 'YYYY',
    value: '',
    msg: '',
    isValid: true,
    result: ''
  }
]; 

const validCheckMsg = (item, msg = '') => {
  item.msg = msg;
  msg === '' ? item.isValid = true : item.isValid = false;
}

const validCheck = (date) => {
  const newDate = date.map(dateItem => {
    if(!dateItem.value) 
      validCheckMsg(dateItem, 'This field is required');
    else if (dateItem.id === 'day' && (dateItem.value < 1 || dateItem.value > 31)) 
      validCheckMsg(dateItem, 'Must be a valid day');
    else if (dateItem.id === 'month' && (dateItem.value < 1 || dateItem.value > 12)) 
      validCheckMsg(dateItem, 'Must be a valid month');
    else if (dateItem.id === 'year' && (dateItem.value > getYear(new Date()))) 
      validCheckMsg(dateItem, 'Must be in the past');
    else 
      validCheckMsg(dateItem);
    
    return dateItem;
  })

  return newDate;
}

const calcResult = (newDate) => {
  const today = new Date();
  const stdDate = new Date(newDate[2].value, newDate[1].value - 1, newDate[0].value);
  const diffInDays = differenceInDays(today, stdDate);
  
  newDate[2].result = Math.floor(diffInDays / 365) > 0 ? Math.floor(diffInDays / 365) : '';
  newDate[1].result = Math.floor(diffInDays % 365 / 30) > 0 ? Math.floor(diffInDays % 365 / 30) : '';
  newDate[0].result = Math.floor(diffInDays % 365 % 30) > 0 ? Math.floor(diffInDays % 365 % 30) : '';
}

const App = () => {
  const [ date, setDate ] = React.useState(initialDate);

  const handleChange = (item, event) => {
    if(!(+event.target.value >= 0)) event.target.value = '';  

    const newDate = date.map(dateItem => {
      if(dateItem.id === item.id) {
        const updatedDateItem = {
          ...dateItem,
          value: event.target.value
        }
        return updatedDateItem;
      }
      return dateItem;
    })

    setDate(newDate);
  }

  const handleBtnClick = () => {
    const newDate = validCheck(date);
    const isValid = newDate[0].isValid && newDate[1].isValid && newDate[2].isValid;

    if(isValid && !isMatch(`${newDate[0].value}/${newDate[1].value}/${newDate[2].value}`, 'dd/MM/yyyy')) {
      newDate.forEach(dateItem => {
        if(dateItem.id === 'day') dateItem.msg = 'Must be a valid date';
        dateItem.isValid = false;

        return dateItem;
      });
    } else if(isValid && isMatch(`${newDate[0].value}/${newDate[1].value}/${newDate[2].value}`, 'dd/MM/yyyy')) {
      calcResult(newDate);
    }

    setDate(newDate);
  }

  return (
    <div className='container'>
      <div className='input-container'>
        {
          date.map(item => 
            <Input 
              key={item.id}
              item={item}
              onChange={handleChange}
            />
          )
        }
      </div>
      <Divider>
        <button className='btn' onClick={handleBtnClick}></button>
      </Divider>
      <div className='result-container'>
        {
          date.slice(0).reverse().map(item => 
            <Result 
              key={item.id}
              item={item}
            />  
          )
        }
      </div>
    </div>
  );
}

export default App;

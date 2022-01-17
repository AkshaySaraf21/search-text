
import axios from 'axios';
import { debounce } from 'lodash';
import { useEffect, useRef, useState } from 'react';
import DropdownItem from '../component/dropdown-item/dropdown-item';
import UserDetail from '../component/user-details/user-details';
import styles from '../styles/Home.module.scss'

const Home = () => {

  const [matchingOptions, setMatchingOptions] = useState();
  const [currFocus, setCurrFocus] = useState(-1);
  const [val, setVal] = useState();
  const [user, setUser] = useState();
  const listRef = useRef(null);


  // function to fetch details from backend
  const search = debounce((val) => {
    axios.get(`/api/users/${val}`)
      .then(response => {
        console.log(response);
        setMatchingOptions(response.data);
      });
  }, 600);


  //function to select the user
  const showDetails = (index) => {
    setUser(matchingOptions[index]);
  }



  //Invoked onChange of input to fetch details
  const onChangeHandler = (value) => {
    setVal(value);
    setUser(null);
    setCurrFocus(-1);
    if (!value || value === '') {
      setMatchingOptions([]);
      return;
    }
    search(value);

  }


//function to handle keyboard navigation
  const onKeyDownHandler = (code) => {

    if (!matchingOptions || matchingOptions.length <= 0) return;

    switch (code) {
      case 13: showDetails(currFocus); break;
      case 38: currFocus > 0 && setCurrFocus(val => val - 1); break;
      case 40: currFocus < matchingOptions.length - 1 && setCurrFocus(val => val + 1); break;
      default: break;
    }

  }


  //useeffect to make sure scroll works properly
  useEffect(() => {
    if (currFocus !== -1) {
      listRef.current?.scrollTo({
        top: 120 * (currFocus - 1)
      })
    }
  }, [currFocus]);

  return (
    <div className={styles.container} onSubmit={(e) => e.preventDefault()}>
      <form autoComplete="off" >
        <div className={styles.autocomplete} onKeyDown={(e) => onKeyDownHandler(e.keyCode)}>
          <input id="myInput" type="text" name="search" onChange={(e) => onChangeHandler(e.target.value)} />
        </div>


        <div className={styles['autocomplete-items']} ref={listRef}>
          {
            !user && matchingOptions && matchingOptions.length > 0 &&
            matchingOptions.map((el, index) =>
              <div
                key={index}
                className={`${styles['autocomplete-item']} ${currFocus === index ? styles[`autocomplete-active`] : ''}`}
                onClick={() => showDetails(index)}
              >
                <DropdownItem {...el} />
              </div>
            )
          }
          {
            val && val !== '' && (!matchingOptions || matchingOptions.length === 0) && <div className={`${styles['autocomplete-item']} ${styles['no-record']}`}>
              <span>No Record Found</span>
            </div>
          }
        </div>


      </form>
      {
        user && <div className={styles['user-details']}>
          <UserDetail {...user} />
        </div>
      }


    </div>
  )
}

export default Home

// Problem 2 - Implementing the field level validation for the Credit Card fields
import React, { useState } from "react";
import "./PaymentValidation.css";

const PaymentValidation = () => {
 const [cardNumber, setCardNumber] = useState("");
  const [cardHolderName, setCardHolderName] = useState("");
  const [cardMonth, setCardMonth] = useState("");
  const currentYear = new Date().getFullYear();
  const [cardYear, setCardYear] = useState("");
  const [cvv, setCVV] = useState("");
  const [isFormTouched, setIsFormTouched] = useState(false);
  const [error, setError] = useState({
    cardNumber: "",
    cardMonth: "",
    cardName: "",
    cardYear: "",
    cvv: ""
  });

  const onCardNumberInput = (e) => {
    setIsFormTouched(true);
    if (/^\d{16}$/.test(e.target.value) && e.target.value !== null) {
      setCardNumber(e.target.value);
      setError({ ...error, cardNumber: false });
    } else {
      setError({ ...error, cardNumber: true });
    }
  };

  const onCardVVInput = (e) => {
    setIsFormTouched(true);
    if (/^\d{3}$/.test(e.target.value) && e.target.value !== null) {
      setCVV(e.target.value);
      setError({ ...error, cvv: false });
    } else {
      setError({ ...error, cvv: true });
    }
  };

  const onCardYearInput = (e) => {
    setIsFormTouched(true);
    const minYear = currentYear;
    const maxYear = currentYear + 3;
    if (/^\d{4}$/.test(e.target.value) && e.target.value !== null) {
      const year = parseInt(e.target.value, 10);
      if (year >= minYear && year <= maxYear) {
        setCardYear(e.target.value);
        setError({ ...error, cardYear: false });
      } else {
        setError({ ...error, cardYear: true });
      }
    } else {
      setError({ ...error, cardYear: true });
    }
  };

  const onCardMonthInput = (e) => {
    setIsFormTouched(true);
    if (/^(0[1-9]|1[0-2])$/.test(e.target.value) && e.target.value !== null) {
      setCardMonth(e.target.value);
      setError({ ...error, cardMonth: false });
    } else {
      setError({ ...error, cardMonth: true });
    }
  };

  const onCardHolderNameInput = (e) => {
    setIsFormTouched(true);
    if (/^[A-Za-z]+$/.test(e.target.value) && e.target.value !== null) {
      setCardHolderName(e.target.value);
      setError({ ...error, cardName: false });
    } else {
      setError({ ...error, cardName: true });
    }
  };

  const isFormValid = () => {
    return (
      error.cardMonth !== '' && error.cardName !== '' && error.cardNumber !== '' && error.cardYear !==  '' && error.cvv !== ''
    );
  }

  console.log(error, isFormValid);
  return (
    <div className="mt-30 layout-column justify-content-center align-items-center">
    <div className="card outlined" style={{ width: "650px" }}>
      <div data-testid="debit-card">
        <h3 style={{ textAlign: "center" }}>Card Details</h3>
        <br />
        <div className="debit-card-body">
          <p className="debit-card-bank">Bank Name</p>
          <p className="debit-card-no">{cardNumber}</p>
          <br />
          <div
            style={{ height: "45px", backgroundColor: "black" }}
            className="debit-card-stripe"
          ></div>
          <p>
            <span className="debit-card-holder-name">{cardHolderName}</span>
            <span className="debit-card-date">
              {cardMonth}/{cardYear}
            </span>
            <span className="debit-card-cvv">{cvv}</span>
          </p>
        </div>
      </div>
      <section>
        <div className="pa-50">
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="layout-column mb-15">
              <input
                placeholder="Card Number"
                data-testid="cardNumberInput"
                required
                type="number"
                maxLength={16}
                onChange={(e) => onCardNumberInput(e)}
                onBlur={(e) => {
                  setIsFormTouched(true);
                  if (e.target.value.trim() === "") {
                    setError({ ...error, cardNumber: true });
                  }
                }}
              />
              {error.cardNumber && isFormTouched && (
                <p className="invalid-text" data-testid="numberInputError">
                  Invalid Card Number
                </p>
              )}
            </div>
            <div className="layout-column mb-15">
              <input
                placeholder="Name On Card"
                data-testid="nameInput"
                type="text"
                required
                onChange={(e) => onCardHolderNameInput(e)}
                onBlur={(e) => {
                  setIsFormTouched(true);
                  if (e.target.value.trim() === "") {
                    setError({ ...error, cardName: true });
                  }
                }}
              />
              {error.cardName && isFormTouched && (
                <p className="invalid-text" data-testid="nameInputError">
                  Invalid Card Name
                </p>
              )}
            </div>
            <div className="flex justify-content-around align-items-center">
              <div className="layout-column mb-30">
                <input
                  placeholder="Expiry Month"
                  type="number"
                  data-testid="monthInput"
                  required
                  onChange={(e) => onCardMonthInput(e)}
                  onBlur={(e) => {
                    setIsFormTouched(true);
                    if (e.target.value.trim() === "") {
                      setError({ ...error, cardMonth: true });
                    }
                  }}
                />
                {error.cardMonth && isFormTouched && (
                  <p className="invalid-text" data-testid="monthInputError">
                    Invalid Month
                  </p>
                )}
              </div>
              <div className="layout-column mb-30">
                <input
                  placeholder="Expiry Year"
                  type="number"
                  data-testid="yearInput"
                  required
                  onChange={(e) => onCardYearInput(e)}
                  onBlur={(e) => {
                    setIsFormTouched(true);
                    if (e.target.value.trim() === "") {
                      setError({ ...error, cardYear: true });
                    }
                  }}
                />
                {error.cardYear && isFormTouched && (
                  <p className="invalid-text" data-testid="yearInputError">
                    Invalid Year
                  </p>
                )}
              </div>
              <div className="layout-column mb-30">
                <input
                  placeholder="CVV"
                  data-testid="cvvInput"
                  type="number"
                  required
                  onChange={(e) => onCardVVInput(e)}
                  onBlur={(e) => {
                    setIsFormTouched(true);
                    if (e.target.value.trim() === "") {
                      setError({ ...error, cvv: true });
                    }
                  }}
                />
                {error.cvv && isFormTouched && (
                  <p className="invalid-text" data-testid="cvvInputError">
                    Invalid CVV
                  </p>
                )}
              </div>
            </div>
            <div className="layout-column mb-30">
              <button
                type="submit"
                className="mx-0"
                data-testid="submitButton"
                disabled={Object.values(error).some(
                  (value) => value === true
                ) || !isFormValid()}
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  </div>
  );
};

export default PaymentValidation;

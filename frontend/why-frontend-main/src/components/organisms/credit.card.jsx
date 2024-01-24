import './organisms.css'
import {RiVisaLine} from 'react-icons/ri'

const CreditCard = ({cardNumber, name, date, cvv}) => {
  return (
    <>
      <div className="card">
        <div className="card__front card__part">
          <RiVisaLine color='#FFFFFF' size={30} style={{float: 'right'}}/>
          <p className="card__numer">{cardNumber}</p>
          <div className="card__space-75">
            <span className="card__label">Card holder</span>
            <p className="card__info">{name}</p>
          </div>
          <div className="card__space-25">
            <span className="card__label">Expires</span>
            <p className="card__info">{date}</p>
          </div>
        </div>

        <div className="card__back card__part">
          <div className="card__black-line"></div>
          <div className="card__back-content">
            <div className="card__secret">
              <p className="card__secret--last">{cvv}</p>
            </div>
            <RiVisaLine className="card__back-square card__square"
              color='#FFFFFF' size={30}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default CreditCard
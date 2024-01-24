import { Dna } from 'react-loader-spinner'

const Load = () => {
  return (
    <div className='loading-container'>
      <Dna
        visible={true}
        height="80"
        width="80"
        ariaLabel="dna-loading"
        wrapperStyle={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          width: '100%'
        }}
        wrapperClass="dna-wrapper"
      />
    </div>
  )
}

export default Load
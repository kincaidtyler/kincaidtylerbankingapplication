function Deposit() {
  const [show, setShow]     = React.useState(true);
  const [status, setStatus] = React.useState('');  

  return (<>
    <Card
      txtcolor="black"
      header="Deposit Funds"
      status={status}
      body={show ? 
        <DepositForm setShow={setShow} setStatus={setStatus}/> :
        <DepositMsg setShow={setShow} setStatus={setStatus}/>}
    />
  </>
  )
}

function DepositMsg(props) {
  return (<>
    <h5>Success</h5>
    <button type="submit" 
      className="btn btn-light" 
      onClick={() => {
          props.setShow(true);
          props.setStatus('');
      }}>
        Make Another Deposit
    </button>
  </>);
} 

function DepositForm(props) {
  const ctx = React.useContext(UserContext);  
  const email = ctx.user.email;
  const [deposit, setDeposit] = React.useState('');
  const [balance, setBalance] = React.useState(0); 

  fetch(`/users/findOne/${email}`)
  .then(response => response.text())
  .then(text => {
      try {
          const data = JSON.parse(text);
          setBalance(data.balance);
          console.log('JSON:', data);
      } catch(err) {
          props.setStatus(text)
          console.log('err:', text);
      }
  });

  function handle() {
    fetch(`/users/update/${email}/${deposit}`)
    .then(response => response.text())
    .then(text => {
        try {
            const data = JSON.parse(text);
            props.setStatus(JSON.stringify(data.value));
            props.setShow(false);
            console.log('JSON:', data);
        } catch(err) {
            props.setStatus('Deposit failed')
            console.log('err:', text);
        }
    });
  }

  return(<>
    <h5>Current balance: ${parseFloat(balance).toFixed(2)}</h5>
      
    Deposit Amount<br/>
    <input type="number" 
      className="form-control" 
      placeholder="Enter Amount to Deposit" 
      value={deposit} onChange={e => setDeposit(e.currentTarget.value)}/><br/>

    <button type="submit" 
      className="btn btn-light" 
      onClick={handle}>Deposit</button>
  </>);
}
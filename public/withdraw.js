function Withdraw() {
  const [show, setShow]     = React.useState(true);
  const [status, setStatus] = React.useState('');  

  return (
    <Card
      txtcolor="black"
      header="Withdraw Funds"
      status={status}
      body={show ? 
        <WithdrawForm setShow={setShow} setStatus={setStatus}/> :
        <WithdrawMsg setShow={setShow} setStatus={setStatus}/>}
    />
  )
}

function WithdrawMsg(props) {
  return(<>
    <h5>Successfully Withdrawn!</h5>
    <button type="submit" 
      className="btn btn-light" 
      onClick={() => {
        props.setShow(true);
        props.setStatus('');
      }}>
        Make Another Withdrawl
    </button>
  </>);
}

function WithdrawForm(props) {
  const ctx = React.useContext(UserContext);  
  const email = ctx.user.email;
  const [amount, setAmount] = React.useState('');
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
    fetch(`/users/update/${email}/-${amount}`)
    .then(response => response.text())
    .then(text => {
        try {
            const data = JSON.parse(text);
            props.setStatus(JSON.stringify(data.value));
            props.setShow(false);
            console.log('JSON:', data);
        } catch(err) {
            props.setStatus('Withdrawal failed')
            console.log('err:', text);
        }
    });
  }

  return(<>
    <h5>Current balance: ${parseFloat(balance).toFixed(2)}</h5>
    
    Amount to Withdraw<br/>
    <input type="number" 
      className="form-control" 
      placeholder="Enter total withdrawl amount" 
      value={amount} 
      onChange={e => setAmount(e.currentTarget.value)}/><br/>

    <button type="submit" 
      className="btn btn-light" 
      onClick={handle}>
        Withdraw
    </button>

  </>);
}
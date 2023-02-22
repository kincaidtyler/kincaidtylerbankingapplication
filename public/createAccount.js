function CreateAccount() {
  const [show, setShow]     = React.useState(true);
  const [status, setStatus] = React.useState('');
  const [loggedIn, setLoggedIn] = React.useState(false);

  return (
    <Card
      txtcolor="black"
      header="Create an Account"
      status={status}
      body={show ? 
        <SignUpForm setShow={setShow}/> : 
        <SignUpMsg setShow={setShow}/>}
    />
  )
}

function SignUpMsg(props) {
  return(<>
    <h5>Welcome to your new Account! Thank you for joining Capstone Bank.</h5>
    <h3>Return often as there are more features to come!</h3>
  </>);
}

function SignUpForm(props) {

  const ctx = React.useContext(UserContext);  

  const [name, setName]         = React.useState('');
  const [email, setEmail]       = React.useState('');
  const [password, setPassword] = React.useState('');

  function handleSignUp() {
    // GET HTML Elements
    const emailInput    = document.getElementById('emailInput');
    const passwordInput = document.getElementById('passwordInput');

    // firebase
    firebase.auth().createUserWithEmailAndPassword(
      emailInput.value,
      passwordInput.value
    )
    .then((user) => { 
      var user = firebase.auth().currentUser;
      ctx.user.email = user.email;
      var password = user.password; 
      // mongodb
      const url = `/users/create/${name}/${email}/${password}`;
      (async () => {
          var res  = await fetch(url);
          var data = await res.json();    
          console.log(data);        
      })();
      props.setShow(false);
    }, function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log('Error: ' + errorCode + ' ' + errorMessage);   
    });
  
  }
  
  return (<>
    Name<br/>
    <input type="input" 
      className="form-holder" 
      id="nameInput"
      placeholder="Enter name" 
      value={name} 
      onChange={e => setName(e.currentTarget.value)} /><br/>

    Email address<br/>
    <input type="input" 
      className="form-holder" 
      id="emailInput"
      placeholder="Enter email" 
      value={email} 
      onChange={e => setEmail(e.currentTarget.value)}/><br/>

    Password<br/>
    <input type="password" 
      className="form-holder" 
      id="passwordInput"
      placeholder="Enter password" 
      value={password} 
      onChange={e => setPassword(e.currentTarget.value)}/><br/>

    <button type="submit" 
      className="btn btn-primary" 
      onClick={handleSignUp}>Create Account</button>
  </>);
}
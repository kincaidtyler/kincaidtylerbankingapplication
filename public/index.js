const UserContext = React.createContext(null);

function Spa() {
  return (
    <HashRouter>
      <div>
        <NavBar/>  
        <UserContext.Provider value={{user:{}}}>
          <div className="container" style={{padding: "20px"}}>
            <Route path="/" exact component={Home} />
            <Route path="/createAccount/" component={CreateAccount} />
            <Route path="/login/" component={Login} />
            <Route path="/deposit/" component={Deposit} />
            <Route path="/withdraw/" component={Withdraw} />
            <Route path="/balance/" component={Balance} />
          </div>
        </UserContext.Provider>
      </div>
    </HashRouter>
  );
}

ReactDOM.render(
  <Spa/>,
  document.getElementById('root')
);
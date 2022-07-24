<script>

  import FruitsABI from "./contracts/Fruits.json"
  import Gooeys from "./Gooeys.svelte"
  import Fruits from "./Fruits.svelte"









  window.userAddress = null
  let wallet
  // $: if (wallet != window.userAddress) {
  //     wallet = window.userAddress
  // }

  const FRUIT_CONTRACT = "0x2375874eb409095efa6090bf7085ae3922543c72"
  let tokens = []
  let fruits = []
  let dg = 0
  let goo = 0


  







  window.onload = async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
    } else {
      alert("No ETH brower extension detected.")
    }
    window.userAddress = window.localStorage.getItem("userAddress")
    wallet = window.userAddress
  };

  function truncateAddress(address) {
    if (!address) {
      return ""
    }
    return `${address.substr(0, 5)}...${address.substr(
      address.length - 5,
      address.length
    )}`;
  }

  function logout() {
    window.userAddress = null;
    wallet = window.userAddress
    window.localStorage.removeItem("userAddress")
  }

  async function loginWithEth() {
    if (window.web3) {
        try {
          const selectedAccount = await window.ethereum
            .request({
              method: "eth_requestAccounts",
            })
            .then((accounts) => accounts[0])
            .catch(() => {
              throw Error("No account selected!")
            })
          window.userAddress = selectedAccount
          wallet = window.userAddress
          window.localStorage.setItem("userAddress", selectedAccount)
        } catch (error) {
          console.error(error)
        }
      } else {
        alert("No ETH brower extension detected.")
      }
  }





  $: if (wallet != null) {
        getWalletInfo()
      }

  // $: if (goo != 0 || dg != 0) {
  //   goo = goo
  //   dg = dg
  // }





  async function getWalletInfo() {
      const web3 = new Web3(window.ethereum)
      const contract = new web3.eth.Contract(FruitsABI, FRUIT_CONTRACT)

      const tokensAndFruits = await contract.methods.loadTokenAndFruitInfo(wallet, 14).call({ from: wallet })

      tokens.push(tokensAndFruits[0])
      fruits.push(tokensAndFruits[1])

      dg = tokens[0][2]
      dg = parseInt(dg)
      if (dg > 0 ) {
        dg = dg.toString().substr(0, dg.toString().length - 9)
        dg = dg.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
      }

      goo = tokens[0][1]
      goo = parseInt(goo)
      if (goo > 0 ) {
        goo = goo.toString().substr(0, goo.toString().length - 9)
        goo = goo.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
      }
  }





</script>

<main>

  <header>

      <div class="funds-container">
        <div id="Dogira">
          <p>Dogira:</p>
          <p>{dg}</p>
        </div>
        <div id="GOO">
          <p>GOO:</p>
          <p>{goo}</p>
        </div>
      </div>
  
      <div class="logo-container">
        <div>
          <img src="https://playgooeys.com/TemplateData/img/Logo.png" alt="Gooeys">
        </div>
      </div>

      {#if wallet != null }
      <div class="logout-container">
        <p id="userAddress">{truncateAddress(wallet)}</p>
        <button id="logoutButton" on:click="{logout}">
          Logout
        </button>
      </div>
      {/if}
      {#if wallet == null }
      <div class="login-container">
        <button id="loginButton" on:click="{loginWithEth}">
          Login
        </button>
      </div>
      {/if}

  </header>

  {#if wallet != null }
    <Gooeys />
    <Fruits />
  {/if}

</main>

<style>

      button {
        height:40px;
        width:max-content;
        background:rgb(30, 156, 160);
        text-transform:uppercase;
        color:rgb(245, 245, 245);
        font-weight:700;
        letter-spacing: 1px;
        border: 2.5px solid rgb(164, 81, 197);
        font-size: 15px;
        outline:none;
        cursor: pointer;
        border-radius: 10px;
        padding: 0px 10px;
      }

      button {
        transition:all .2s ease-in-out;
      }

      button:hover {
        background:rgb(46, 227, 233);
        text-shadow:
          (0 0 10px rgba(255,255,255, 1),
          0 0 50px rgba(255, 255, 255, .8),
          0 0 75px rgba(255, 255, 255, .6),
          0 0 76px rgba(255, 255, 255, .4),
          0 0 77px rgba(255, 255, 255, .5),
          0 0 78px rgba(255, 255, 255, .4),);
      }

      .funds-container {
        display: grid;
        justify-items: left;
        padding-left: 30px;
      }

      .funds-container > div:nth-child(1) {
        margin: 25px 0px;
        text-align: center;
      }

      .funds-container > div:nth-child(2) {
        margin: 0px;
        text-align: center;
      }

      #Dogira {
        color: white;
        font-size: 15px;
        font-weight: 700;
        text-shadow: -1px -1px 0 #17314f, 1px -1px 0 #17314f, -1px 1px 0 #17314f, 1px 1px 0 #17314f;
        margin-bottom: -15px;
      }

      #Dogira > p {
        margin: 7px;
        text-align: left;
      }

      #GOO {
        color: white;
        font-size: 15px;
        font-weight: 700;
        text-shadow: -1px -1px 0 #17314f, 1px -1px 0 #17314f, -1px 1px 0 #17314f, 1px 1px 0 #17314f;
        text-align: left;
        margin-top: -15px;
      }

      #GOO > p {
        margin: 7px;
      }

      .logo-container {
        display: flex;
        justify-content: center;
        margin: 25px 0px;
      }

      .logo-container > div > img {
        width: 240px;
        height: 140px;
      }

      .login-container {
        display: grid;
        justify-items: center;
        padding-right: 30px;
      }

      .login-container > button {
        margin: 75px 0px 0px 0px;
      }

      .logout-container {
        display: grid;
        justify-items: center;
        padding-right: 30px;
      }

      .logout-container > p {
        margin: 45px 0px 0px 0px;
        color: white;
        font-size: 15px;
        font-weight: 700;
        text-shadow: -1px -1px 0 #17314f, 1px -1px 0 #17314f, -1px 1px 0 #17314f, 1px 1px 0 #17314f;
      }

      .logout-container > button {
        margin: 0px 0px 75px 0px;
      }

      @media (min-width: 150px) and (max-width: 449px) {

        header {
          display: grid;
          justify-content: center;
        }

        .funds-container {
          display: grid !important;
          justify-items: center !important;
          align-items: center !important;
          grid-template-columns: auto auto !important;
          padding: 0px !important;
        }
        .funds-container > div {
          display: grid !important;
          justify-content: center !important;
          align-items: center !important;
          margin: 0px !important;
          /* grid-template-columns: auto auto; */
        }

        .login-container {
          padding: 0px;
        }
      }

</style>

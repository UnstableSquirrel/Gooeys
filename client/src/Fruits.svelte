<script>

import FruitsABI from "./contracts/Fruits.json"
import GooeyABI from "./contracts/Gooeys.json"
import Gooeys from "./Gooeys.svelte"

// Gooeys.feedForQuest0 = Gooeys.feedForQuest0
// $: Gooeys.feedForQuest0


const FRUIT_CONTRACT = "0x1e271BA89e811fa8145683652000414d15e38d22"
const GOOEY_CONTRACT = "0x3154D38F35febE08FD0afdc6c3A1B833a49F69de"
let wallet = window.localStorage.getItem("userAddress")
$: wallet
let gas = window.localStorage.getItem("gas")

// let wallet = "0x970006c8EC4f30905BEe133bf2018413066c26Fe"





let userFruits = []
let userGooeys = []
let GooeyId
let FruitId
let Amount





async function getFruitsData() {
    const contract = new window.web3.eth.Contract(FruitsABI, FRUIT_CONTRACT)
    const contract2 = new window.web3.eth.Contract(GooeyABI, GOOEY_CONTRACT)
    const tokensAndFruits = await contract.methods.loadTokenAndFruitInfo(wallet, 14).call({ from: wallet })
    const ids = await contract2.methods.tokensOfOwner(wallet).call({ from: wallet })
    userFruits.push(tokensAndFruits[1])
    userGooeys.push(ids)
    // console.log(ids)
}
// getData()





let modalSwtich4 = "close"

function closeModal4(i) {
    GooeyId = parseInt(i)
    gooeyConsumeFruitId = GooeyId
    // console.log(GooeyId)
    modalSwtich4 = "close"
    eatFruit()
}

function closeModal1() {
    modalSwtich4 = "close"
}

function showModal4(i) {
    FruitId = parseInt(i)
    fruitIdToConsume = FruitId
    // console.log(FruitId)
    modalSwtich4 = "open"
}





let modalSwtich5 = "close"

function closeModal5(i) {
    GooeyId = parseInt(i)
    gooeyConsumeFruitId2 = GooeyId
    parseInt(Amount)
    console.log(gooeyConsumeFruitId2)
    modalSwtich5 = "close"
    feedXTimes()
}

function closeModal2() {
    modalSwtich5 = "close"
}

function showModal5(i) {
    FruitId = parseInt(i)
    fruitIdToConsume2 = FruitId
    console.log(fruitIdToConsume2)
    modalSwtich5 = "open"
}





let gooeyConsumeFruitId
// let amountToConsume
let fruitIdToConsume
async function eatFruit() {
const contract = new window.web3.eth.Contract(GooeyABI, GOOEY_CONTRACT)
// console.log("Gooey:" + gooeyConsumeFruitId, "Amount: " + amountToConsume, "FruitID: " + fruitIdToConsume);

    const eat = await contract.methods.consumeFruit(gooeyConsumeFruitId, 1, fruitIdToConsume).send({ from: wallet, gasPrice : gas }) 
    console.log(eat)
}





let gooeyConsumeFruitId2
let fruitIdToConsume2
async function feedXTimes() {
const contract = new window.web3.eth.Contract(GooeyABI, GOOEY_CONTRACT);

let batch = new web3.BatchRequest()
  for (let i = 0; i < Amount; i++) {
    batch.add(contract.methods.consumeFruit(gooeyConsumeFruitId2, 1, fruitIdToConsume2).send({ from: wallet, gasPrice : gas }))
  }
  batch.execute()
  // console.log(batch)
}





function feedAll(i) {
    FruitId = parseInt(i)
    fruitIdToConsume3 = FruitId
    console.log(feedForQuest0)
    // feedAllGooeys()
}

let gooeyConsumeFruitId3
let fruitIdToConsume3
async function feedAllGooeys() {
const contract = new window.web3.eth.Contract(GooeyABI, GOOEY_CONTRACT)

let batch = new web3.BatchRequest()
  for (let i = 0; i < feedForQuest0.length; i++) {
    // gooeyConsumeFruitId3 = userGooeys[0][i]
    // console.log(gooeyConsumeFruitId3)
    batch.add(contract.methods.consumeFruit(feedForQuest0[i], 1, fruitIdToConsume3).send({ from: wallet, gasPrice : gas }))
  }
  batch.execute()
  // console.log(batch)
}

</script>

<main>

    <section id="Fruits"> 

      {#await getFruitsData() }
      {:then}
<!-- <span style="display: none;">{console.log(userGooeys[0].length)}</span> -->
      <div class="Fruits-Container">

        <div class="Fruit">
          <div>
            <img src="https://gooey-companion.vercel.app/apple.png" alt="Apple">
            <h3>Apple</h3>
            <p>7 Hours</p>
          </div>
          <div>
            <p>Nexus Bonus: 0</p>
            <p>Tumble Stat Bonus: 0%</p>
            <p>Extra Tumbles: 0</p>
          </div>
          <div>
            <p>Price: </p>
            <p>3,000 $GOO</p>
          </div>
          <div>
            <div style="display: grid; justify-items: center; margin-top: 10px;">
              <button id="0" on:click="{() => showModal4(0)}">Eat Fruit</button>
            </div>
            <!-- <div style="display: grid; justify-items: center;">
              <button id="0" on:click="{() => showModal5(0)}">Eat X Times</button>
            </div> -->
            <div style="display: grid; justify-items: center;">
              <button id="0"  on:click="{() => feedAll(0)}">Feed All</button>
            </div>
          </div>
          <div class="fruit-amount" id="fruit-amount-0">
            <p>Current Amount</p>
            <p>{userFruits[0][0]}</p>
          </div>
        </div>

        <div class="Fruit">
          <div>
            <img src="https://gooey-companion.vercel.app/orange.png" alt="Orange">
            <h3>Orange</h3>
            <p>10 Hours</p>
          </div>
          <div>
            <p>Nexus Bonus: 0</p>
            <p>Tumble Stat Bonus: 0%</p>
            <p>Extra Tumbles: 0</p>
          </div>
          <div>
            <p>Price: </p>
            <p>4,000 $GOO</p>
          </div>
          <div>
            <div style="display: grid; justify-items: center; margin-top: 10px;">
              <button id="1" on:click="{() => showModal4(1)}">Eat Fruit</button>
            </div>
            <!-- <div style="display: grid; justify-items: center;">
              <button id="1" on:click="{() => showModal5(1)}">Eat X Times</button>
            </div> -->
            <div style="display: grid; justify-items: center;">
              <button id="1" on:click="{() => feedAll(1)}">Feed All</button>
            </div>
          </div>
          <div class="fruit-amount" id="fruit-amount-1">
            <p>Current Amount</p>
            <p>{userFruits[0][1]}</p>
          </div>
        </div>

        <div class="Fruit">
          <div>
            <img src="https://gooey-companion.vercel.app/banana.jpg" alt="Banana">
            <h3>Banana</h3>
            <p>12 Hours</p>
          </div>
          <div>
            <p>Nexus Bonus: 0</p>
            <p>Tumble Stat Bonus: 0%</p>
            <p>Extra Tumbles: 0</p>
          </div>
          <div>
            <p>Price: </p>
            <p>4,800 $GOO</p>
          </div>
          <div>
            <div style="display: grid; justify-items: center; margin-top: 10px;">
              <button id="2" on:click="{() => showModal4(2)}">Eat Fruit</button>
            </div>
            <!-- <div style="display: grid; justify-items: center;">
              <button id="2" on:click="{() => showModal5(2)}">Eat X Times</button>
            </div> -->
            <div style="display: grid; justify-items: center;">
              <button id="2" on:click="{() => feedAll(2)}">Feed All</button>
            </div>
          </div>
          <div class="fruit-amount" id="fruit-amount-2">
            <p>Current Amount</p>
            <p>{userFruits[0][2]}</p>
          </div>
        </div>

        <div class="Fruit">
          <div>
            <img src="https://gooey-companion.vercel.app/strawberry.jpg" alt="Strawberry">
            <h3>Strawberry</h3>
            <p>20 Hours</p>
          </div>
          <div>
            <p>Nexus Bonus: 0</p>
            <p>Tumble Stat Bonus: 0%</p>
            <p>Extra Tumbles: 0</p>
          </div>
          <div>
            <p>Price: </p>
            <p>7,300 $GOO</p>
          </div>
          <div>
            <div style="display: grid; justify-items: center; margin-top: 10px;">
              <button id="3" on:click="{() => showModal4(3)}">Eat Fruit</button>
            </div>
            <!-- <div style="display: grid; justify-items: center;">
              <button id="3" on:click="{() => showModal5(3)}">Eat X Times</button>
            </div> -->
            <div style="display: grid; justify-items: center;">
              <button id="3" on:click="{() => feedAll(3)}">Feed All</button>
            </div>
          </div>
          <div class="fruit-amount" id="fruit-amount-3">
            <p>Current Amount</p>
            <p>{userFruits[0][3]}</p>
          </div>
        </div>

        <div class="Fruit">
          <div>
            <img src="https://gooey-companion.vercel.app/cherry.jpg" alt="Cherry">
            <h3>Cherry</h3>
            <p>27 Hours</p>
          </div>
          <div>
            <p>Nexus Bonus: 0</p>
            <p>Tumble Stat Bonus: 1%</p>
            <p>Extra Tumbles: 0</p>
          </div>
          <div>
            <p>Price: </p>
            <p>10,000 $GOO</p>
          </div>
          <div>
            <div style="display: grid; justify-items: center; margin-top: 10px;">
              <button id="4" on:click="{() => showModal4(4)}">Eat Fruit</button>
            </div>
            <!-- <div style="display: grid; justify-items: center;">
              <button id="4" on:click="{() => showModal5(4)}">Eat X Times</button>
            </div> -->
            <div style="display: grid; justify-items: center;">
              <button id="4" on:click="{() => feedAll(4)}">Feed All</button>
            </div>
          </div>
          <div class="fruit-amount" id="fruit-amount-4">
            <p>Current Amount</p>
            <p>{userFruits[0][4]}</p>
          </div>
        </div>

        <div class="Fruit">
          <div>
            <img src="https://gooey-companion.vercel.app/pineapple.jpg" alt="Pineapple">
            <h3>Pineapple</h3>
            <p>55 Hours</p>
          </div>
          <div>
            <p>Nexus Bonus: 1</p>
            <p>Tumble Stat Bonus: 2%</p>
            <p>Extra Tumbles: 0</p>
          </div>
          <div>
            <p>Price: </p>
            <p>20,000 $GOO</p>
          </div>
          <div>
            <div style="display: grid; justify-items: center; margin-top: 10px;">
              <button id="5" on:click="{() => showModal4(5)}">Eat Fruit</button>
            </div>
            <!-- <div style="display: grid; justify-items: center;">
              <button id="5" on:click="{() => showModal5(5)}">Eat X Times</button>
            </div> -->
            <div style="display: grid; justify-items: center;">
              <button id="5" on:click="{() => feedAll(5)}">Feed All</button>
            </div>
          </div>
          <div class="fruit-amount" id="fruit-amount-5">
            <p>Current Amount</p>
            <p>{userFruits[0][5]}</p>
          </div>
        </div>

        <div class="Fruit">
          <div>
            <img src="https://gooey-companion.vercel.app/coconut.jpg" alt="Coconut">
            <h3>Coconut</h3>
            <p>75 Hours</p>
          </div>
          <div>
            <p>Nexus Bonus: 2</p>
            <p>Tumble Stat Bonus: 2%</p>
            <p>Extra Tumbles: 0</p>
          </div>
          <div>
            <p>Price: </p>
            <p>27,500 $GOO</p>
          </div>
          <div>
            <div style="display: grid; justify-items: center; margin-top: 10px;">
              <button id="6" on:click="{() => showModal4(6)}">Eat Fruit</button>
            </div>
            <!-- <div style="display: grid; justify-items: center;">
              <button id="6" on:click="{() => showModal5(6)}">Eat X Times</button>
            </div> -->
            <div style="display: grid; justify-items: center;">
              <button id="6" on:click="{() => feedAll(6)}">Feed All</button>
            </div>
          </div>
          <div class="fruit-amount" id="fruit-amount-6">
            <p>Current Amount</p>
            <p>{userFruits[0][6]}</p>
          </div>
        </div>

        <div class="Fruit">
          <div>
            <img src="https://gooey-companion.vercel.app/foxtail.jpg" alt="Foxtail Fruit">
            <h3>Foxtail Fruit</h3>
            <p>125 Hours</p>
          </div>
          <div>
            <p>Nexus Bonus: 4</p>
            <p>Tumble Stat Bonus: 5%</p>
            <p>Extra Tumbles: 0</p>
          </div>
          <div>
            <p>Price: </p>
            <p>45,000 $GOO</p>
          </div>
          <div>
            <div style="display: grid; justify-items: center; margin-top: 10px;">
              <button id="7" on:click="{() => showModal4(7)}">Eat Fruit</button>
            </div>
            <!-- <div style="display: grid; justify-items: center;">
              <button id="7" on:click="{() => showModal5(7)}">Eat X Times</button>
            </div> -->
            <div style="display: grid; justify-items: center;">
              <button id="7" on:click="{() => feedAll(7)}">Feed All</button>
            </div>
          </div>
          <div class="fruit-amount" id="fruit-amount-7">
            <p>Current Amount</p>
            <p>{userFruits[0][7]}</p>
          </div>
        </div>

        <div class="Fruit">
          <div>
            <img src="https://gooey-companion.vercel.app/pancake.jpg" alt="Pancake Squash">
            <h3>Pancake Squash</h3>
            <p>155 Hours</p>
          </div>
          <div>
            <p>Nexus Bonus: 5</p>
            <p>Tumble Stat Bonus: 10%</p>
            <p>Extra Tumbles: 0</p>
          </div>
          <div>
            <p>Price: </p>
            <p>54,000 $GOO</p>
          </div>
          <div>
            <div style="display: grid; justify-items: center; margin-top: 10px;">
              <button id="8" on:click="{() => showModal4(8)}">Eat Fruit</button>
            </div>
            <!-- <div style="display: grid; justify-items: center;">
              <button id="8" on:click="{() => showModal5(8)}">Eat X Times</button>
            </div> -->
            <div style="display: grid; justify-items: center;">
              <button id="8" on:click="{() => feedAll(8)}">Feed All</button>
            </div>
          </div>
          <div class="fruit-amount" id="fruit-amount-8">
            <p>Current Amount</p>
            <p>{userFruits[0][8]}</p>
          </div>
        </div>

        <div class="Fruit">
          <div>
            <img src="https://gooey-companion.vercel.app/devil.jpg" alt="Devil's Pomegranate">
            <h3>Devil's Pomegranate</h3>
            <p>220 Hours</p>
          </div>
          <div>
            <p>Nexus Bonus: 50</p>
            <p>Tumble Stat Bonus: 18%</p>
            <p>Extra Tumbles: 1</p>
          </div>
          <div>
            <p>Price: </p>
            <p>800,000 $GOO</p>
          </div>
          <div>
            <div style="display: grid; justify-items: center; margin-top: 10px;">
              <button id="9" on:click="{() => showModal4(9)}">Eat Fruit</button>
            </div>
            <!-- <div style="display: grid; justify-items: center;">
              <button id="9" on:click="{() => showModal5(9)}">Eat X Times</button>
            </div> -->
            <div style="display: grid; justify-items: center;">
              <button id="9" on:click="{() => feedAll(9)}">Feed All</button>
            </div>
          </div>
          <div class="fruit-amount" id="fruit-amount-9">
            <p>Current Amount</p>
            <p>{userFruits[0][9]}</p>
          </div>
        </div>

        <div class="Fruit">
          <div>
            <img src="https://gooey-companion.vercel.app/moondrop.jpg" alt="Moondrop Fruit">
            <h3>Moondrop Fruit</h3>
            <p>330 Hours</p>
          </div>
          <div>
            <p>Nexus Bonus: 100</p>
            <p>Tumble Stat Bonus: 20%</p>
            <p>Extra Tumbles: 2</p>
          </div>
          <div>
            <p>Price: </p>
            <p>1,550,000 $GOO</p>
          </div>
          <div>
            <div style="display: grid; justify-items: center; margin-top: 10px;">
              <button id="10" on:click="{() => showModal4(10)}">Eat Fruit</button>
            </div>
            <!-- <div style="display: grid; justify-items: center;">
              <button id="10" on:click="{() => showModal5(10)}">Eat X Times</button>
            </div> -->
            <div style="display: grid; justify-items: center;">
              <button id="10" on:click="{() => feedAll(10)}">Feed All</button>
            </div>
          </div>
          <div class="fruit-amount" id="fruit-amount-10">
            <p>Current Amount</p>
            <p>{userFruits[0][10]}</p>
          </div>
        </div>

      </div>
      {/await}

    <div id="modal-container4" class="{"modal4 " + modalSwtich4}">
        <div class="modal-content4">
          <span on:click="{() => closeModal1()}" class="close4">x</span>

          <div>
            
            <div>
              <h4>Who eats the fruit?</h4>
              <div>
                <input id="eat-fruit-id" type="number" placeholder="Gooey ID" bind:value="{GooeyId}">
                <button on:click="{() => closeModal4(GooeyId)}">Confirm</button>
              </div>
            </div>
            
          </div>
          
        </div>
    </div>

    <div id="modal-container5" class="{"modal5 " + modalSwtich5}">
      <div class="modal-content5">
        <span on:click="{() => closeModal2()}" class="close5">x</span>

        <div>
          
          <div>
            <div>
              <label for="eat-fruit-id">Gooey ID</label>
              <input id="eat-fruit-id" type="number" placeholder="Gooey ID" bind:value="{GooeyId}">
              <label for="fruit-amount">Fruit Amount</label>
              <input id="fruit-amount" type="number" placeholder="Amount" bind:value="{Amount}">
              <button on:click="{() => closeModal5(GooeyId)}">Confirm</button>
            </div>
          </div>
          
        </div>
        
      </div>
    </div>

</section> 


</main>

<style>

    .close {
      display: none;
    }

    .open {
      display: block !important;
    }

    
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
          0 0 10px rgba(255,255,255, 1),
          0 0 50px rgba(255, 255, 255, .8),
          0 0 75px rgba(255, 255, 255, .6),
          0 0 76px rgba(255, 255, 255, .4),
          0 0 77px rgba(255, 255, 255, .5),
          0 0 78px rgba(255, 255, 255, .4),
      }

      .Fruits-Container {
        display: grid;
        justify-items: center;
        grid-template-columns: auto auto auto auto auto;
        grid-gap: 50px 10px;
        padding: 50px 10px;
      }

      @media (min-width: 850px) and (max-width: 1000px) {
        .Fruits-Container {
          grid-template-columns: auto auto auto auto;
          grid-gap: 50px 10px;
        }
      }

      @media (min-width: 630px) and (max-width: 849px) {
        .Fruits-Container {
          grid-template-columns: auto auto auto;
          grid-gap: 50px 10px;
        }
      }

      @media (min-width: 420px) and (max-width: 629px) {
        .Fruits-Container {
          grid-template-columns: auto auto;
          grid-gap: 50px 10px;
        }
      }

      @media (min-width: 120px) and (max-width: 419px) {
        .Fruits-Container {
          grid-template-columns: auto;
          grid-gap: 35px 0px;
        }
      }

      .Fruit {
        display: grid;
        justify-items: center;
        padding: 10px;
        background-color: rgb(175, 244, 247);
        border: 5px solid rgb(252, 252, 252);
        border-radius: 25px;
        font-size: 14px;
      }

      .Fruit > div > p {
        margin: 10px;
        font-weight: 600;
      }

      .Fruit > div {
        margin: 0px;
      }


      .Fruit > div:nth-child(1) {
        display: grid;
        justify-items: center;
      }

      .Fruit > div:nth-child(1) > img {
        width: 70px;
        height: 70px;
        border-radius: 50%;
        border: 2.5px solid #383838;
      }

      .Fruit > div:nth-child(3) {
        display: grid;
        justify-items: center;
      }

      .Fruit > div:nth-child(3) > p {
        margin: 2.5px;
      }

      .Fruit > div:nth-child(4) > button {
        margin-top: 20px;
        font-size: 14px;
      }

      .Fruit > div:nth-child(4) > div {
        margin-top: 7px;
      }

      .fruit-amount {
        display: grid;
        justify-items: center;
        padding-top: 10px;
      }

      .fruit-amount > p {
  	    margin: 2.5px;
      }

      .fruit-amount > p:nth-child(2) {
  	    font-size: 17px;
        font-weight: 700;
      }

/************** Modal4 ********************************************************************/

      /* The Modal (background) */
      .modal4 {
        position: fixed; /* Stay in place */
        z-index: 1; /* Sit on top */
        padding-top: 50px; /* Location of the box */
        left: 0;
        top: 0;
        width: 100%; /* Full width */
        height: 100%; /* Full height */
        overflow: auto; /* Enable scroll if needed */
        background-color: rgb(0,0,0); /* Fallback color */
        background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
      }

      /* Modal Content */
      .modal-content4 {
        background-color: #75f8dc;
        margin: auto;
        padding: 20px;
        border: 1px solid #888;
        width: 80%;
        border-radius: 20px;
      }

      /* The Close Button */
      .close4 {
        color: #000000;
        float: right;
        font-size: 30px;
        font-weight: 700;
        width: 35px;
        height: 33px;
        text-align: center;
        border: 2px solid black;
        background-color: red;
      }

      .close4:hover,
      .close4.hidden {
        background-color: rgb(223, 0, 0);
        cursor: pointer;
      }

      .modal-content4 > div > div {
        display: grid;
        justify-items: center;
      }

      .modal-content4 > div > div > div {
        display: grid;
        justify-items: center;
        grid-gap: 15px;
      }

      .modal-content4 > div > div > div > input {
        margin: 0px;
      }

      .modal-content4 > div > div > div > button {
        margin-top: 25px;
      }

/************** Modal4 ********************************************************************/


/************** Modal5 ********************************************************************/

      /* The Modal (background) */
      .modal5 {
        position: fixed; /* Stay in place */
        z-index: 1; /* Sit on top */
        padding-top: 50px; /* Location of the box */
        left: 0;
        top: 0;
        width: 100%; /* Full width */
        height: 100%; /* Full height */
        overflow: auto; /* Enable scroll if needed */
        background-color: rgb(0,0,0); /* Fallback color */
        background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
      }

      /* Modal Content */
      .modal-content5 {
        background-color: #75f8dc;
        margin: auto;
        padding: 20px;
        border: 1px solid #888;
        width: 80%;
        border-radius: 20px;
      }

      /* The Close Button */
      .close5 {
        color: #000000;
        float: right;
        font-size: 30px;
        font-weight: 700;
        width: 35px;
        height: 33px;
        text-align: center;
        border: 2px solid black;
        background-color: red;
      }

      .close5:hover,
      .close5.hidden {
        background-color: rgb(223, 0, 0);
        cursor: pointer;
      }

      .modal-content5 > div > div {
        display: grid;
        justify-items: center;
      }

      .modal-content5 > div > div > div {
        display: grid;
        justify-items: center;
        grid-gap: 15px;
      }

      .modal-content5 > div > div > div > input {
        margin: 0px;
      }

      .modal-content5 > div > div > div > button {
        margin-top: 25px;
      }

/************** Modal5 ********************************************************************/

</style>
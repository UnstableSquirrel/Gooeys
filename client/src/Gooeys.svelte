<script>

    // import { Web3 } from "svelte-web3"
    import FruitsABI from "./contracts/Fruits.json"
    import GooeyABI from "./contracts/Gooeys.json"
    import { writable, derived } from 'svelte/store';
    // import { wallet } from './App.svelte'





    const GOOEY_CONTRACT = "0x3154D38F35febE08FD0afdc6c3A1B833a49F69de"
    const FRUIT_CONTRACT = "0x1e271BA89e811fa8145683652000414d15e38d22"
    let gas = window.localStorage.getItem("gas")
    let wallet = window.localStorage.getItem("userAddress")
    $: wallet

    // let wallet = "0x970006c8EC4f30905BEe133bf2018413066c26Fe"
    




    let allStats = []
    let userGooeys = []
    let gooeyNumbers = []

    let latestBlock
    let gooeyLife = []
    let questTime = []
    let tumbleCoolDown = []

    let checkOnQuest = []
    let questBatchCompletion = []

    let questBatchSendingCheck0 = []
    let questBatchSendingCheck1 = []
    let questBatchSendingCheck2 = []
    let questBatchSendingCheck3 = []
    let questBatchSendingCheck4 = []
    let questBatchSendingCheck5 = []
    let questBatchSending = []

    // $: {
    //   let feedForQuest0 = []
    //   let feedForQuest1 = []
    //   let feedForQuest2 = []
    //   let feedForQuest3 = []
    //   let feedForQuest4 = []
    //   let feedForQuest5 = []
    // }
    export let feedForQuest0 = []
    export let feedForQuest1 = []
    export let feedForQuest2 = []
    export let feedForQuest3 = []
    export let feedForQuest4 = []
    export let feedForQuest5 = []

    let soonestReturner = []
    let comeBackIn = []





    async function getData() {
        const contract = new window.web3.eth.Contract(GooeyABI, GOOEY_CONTRACT)

        const ids = await contract.methods.tokensOfOwner(wallet).call({ from: wallet })
        // const tumbleFees = await contract2.methods.getTumblingFeesForGooeys("0xF3dA67F1Cfd5511f830C3a7e4b820a3b702746BA", 94).call({ from: wallet })

        userGooeys.push(ids)
        gooeyNumbers.push(userGooeys[0])
        // console.log(userGooeys)

          for (let i in userGooeys) {  
            
            if (userGooeys.hasOwnProperty(i)) {
              let value = userGooeys[i]
              for (const x of value) {
                const data = await contract.methods.gooeyAttributes(x).call({ from: wallet })
                const questData = await contract.methods.getCurrentQuestInfoABIv1(x).call({ from: wallet })
                const tumbleInfo = await contract.methods.getTumbleAvailabilityBlock(x).call({ from: wallet })
                latestBlock = await web3.eth.getBlockNumber()

                checkOnQuest.push(questData[0])
                allStats.push(data)

                let questTimeSeconds = (questData[2] - latestBlock) * 2
                parseInt(questTimeSeconds)
                if (questTimeSeconds < 0) { 
                  questTimeSeconds = 0
                }
                soonestReturner.push(questTimeSeconds)
                questTime.push({
                  "Days" : Math.floor(questTimeSeconds / (3600 * 24)), 
                  "Hours" : Math.floor(questTimeSeconds % (3600 * 24) / 3600), 
                  "Minutes" : Math.floor(questTimeSeconds % 3600 / 60), 
                  "Seconds" : Math.floor(questTimeSeconds % 60)
                })
                let tumbleAvailability = (tumbleInfo - latestBlock) * 2
                parseInt(tumbleAvailability)
                if (tumbleAvailability < 0) {
                  tumbleAvailability = 0
                }
                tumbleCoolDown.push({
                  "Days" : Math.floor(tumbleAvailability / (3600 * 24)), 
                  "Hours" : Math.floor(tumbleAvailability % (3600 * 24) / 3600), 
                  "Minutes" : Math.floor(tumbleAvailability % 3600 / 60), 
                  "Seconds" : Math.floor(tumbleAvailability % 60)
                })
              }
            }
          }
          for (let i in allStats) {  
            let foodStoreSeconds = (parseInt(allStats[i].life.foodStore) - (parseInt(latestBlock) - parseInt(allStats[i].lastUpdateBlock))) * 2
            parseInt(foodStoreSeconds)
            if (foodStoreSeconds < 0) { 
              foodStoreSeconds = 0
            }
            gooeyLife.push({
              "Days" : Math.floor(foodStoreSeconds / (3600 * 24)), 
              "Hours" : Math.floor(foodStoreSeconds % (3600 * 24) / 3600), 
              "Minutes" : Math.floor(foodStoreSeconds % 3600 / 60), 
              "Seconds" : Math.floor(foodStoreSeconds % 60)
            })
          }
        allStats = allStats
        // window.localStorage.deleteItem("selectedQuests")
        // console.log(questBatchCompletion)
        soonestReturner.sort((a, b) => a - b)
        comeBackIn = {
              "Days" : Math.floor(soonestReturner[0] / (3600 * 24)), 
              "Hours" : Math.floor(soonestReturner[0] % (3600 * 24) / 3600), 
              "Minutes" : Math.floor(soonestReturner[0] % 3600 / 60), 
              "Seconds" : Math.floor(soonestReturner[0] % 60)
            }
        // console.log(comeBackIn)
        // console.log(questBatchSending)
        // console.log(feedForQuest0, feedForQuest1, feedForQuest2, feedForQuest3, feedForQuest4, feedForQuest5)
        // console.log(tumbleCoolDown)
      }










      let questChance1 
      let questChance2 
      let questChance3 
      let questChance4 
      let questChance5 
      let questChance6 

      let modalSwtich1 = "close"

      function closeModal1() {
        modalSwtich1 = "close"
      }

      function openModal1() {
        modalSwtich1 = "open"
      }





      let modalSwtich2 = "close"

      function closeModal2() {
        modalSwtich2 = "close"
      }

      function openModal2() {
        modalSwtich2 = "open"
      }





      // let Modal2 = false
      // let modalSwtich2 = "close"

      // function closeModal2() {
      //   Modal2 = false
      //   modalSwtich2 = "close"
      // }

      // function openModal2() {
      //   Modal2 = true
      //   modalSwtich2 = "open"
      // }





      function getSendQuestId(btn) {
        let n = parseInt(btn)
        let checkId = allStats.filter(id => id.tokenId == n )
        let totalStats = parseInt(checkId[0][0].hp) + parseInt(checkId[0][0].atk) + parseInt(checkId[0][0].def) + parseInt(checkId[0][0].spd)
        console.log(totalStats)

        questChance1 = ((2000 - (1200 - totalStats)) / 2000 * 100).toFixed(2)
        if (questChance1 < 0 ) { questChance1 = "0"}
        if (questChance1 > 100 ) { questChance1 = "100"}

        questChance2 = ((2000 - (2000 - totalStats)) / 2000 * 100).toFixed(2)
        if (questChance2 < 0 ) { questChance2 = "0"}
        if (questChance2 > 100 ) { questChance1 = "100"}

        questChance3 = ((2000 - (2800 - totalStats)) / 2000 * 100).toFixed(2)
        if (questChance3 < 0 ) { questChance3 = "0"}
        if (questChance3 > 100 ) { questChance3 = "100"}

        questChance4 = ((2000 - (3600 - totalStats)) / 2000 * 100).toFixed(2)
        if (questChance4 < 0 ) { questChance4 = "0"}
        if (questChance4 > 100 ) { questChance4 = "100"}

        questChance5 = ((2000 - (4300 - totalStats)) / 2000 * 100).toFixed(2)
        if (questChance5 < 0 ) { questChance5 = "0"}
        if (questChance5 > 100 ) { questChance5 = "100"}

        questChance6 = ((2000 - (5000 - totalStats)) / 2000 * 100).toFixed(2)
        if (questChance6 < 0 ) { questChance6 = "0"}
        if (questChance6 > 100 ) { questChance6 = "100"}

        startQuestGooeyId = n
      }

      function getQuestId(btn) {
        let n = parseInt(btn)
        startQuestType = n
        // console.log(startQuestType)
        sendQuest()
      }





      function getCompleteQuestId(btn) {
        let n = parseInt(btn)
        // console.log(n)
        returnQuestGooeyId = n
        completeQuest()
      }

      function getCancelQuestId(btn) {
        let n = parseInt(btn)
        // console.log(n)
        cancelQuestGooeyId = n
        cancelQuest()
      }





      function getTransferId(btn) {
        let n = parseInt(btn)
        // console.log(n)
        transferTokenId = n
        transferGooey()
      }

      let gooeyReceiverWallet
      function getTransferWallet() {
        transferTo = gooeyReceiverWallet
        transferGooey()
      }









      /////////// Questing /////////////////////////////////////////////////////////////////////////////////////////////////

      let startQuestGooeyId 
      let startQuestType
      async function sendQuest() {
        const contract = new window.web3.eth.Contract(GooeyABI, GOOEY_CONTRACT)

        const questStart = await contract.methods.startQuest(startQuestGooeyId, startQuestType).send({ from: wallet, gasPrice : gas })
        console.log(questStart)
      }





      let returnQuestGooeyId
      async function completeQuest() {
        const contract = new window.web3.eth.Contract(GooeyABI, GOOEY_CONTRACT);

        const questReturn = await contract.methods.completeQuest(returnQuestGooeyId).send({ from: wallet, gasPrice : gas })
        // const info = await contract.methods.getCurrentQuestInfoABIv1(returnQuestGooeyId).call({ from: wallet, gasPrice : '52000000000' })
        // console.log(info)
        // const gwei = await contract.methods.maximumCallGwei().send({ from: wallet })
        console.log(questReturn)
      }





      async function completeAllQuests() {
        const contract = new window.web3.eth.Contract(GooeyABI, GOOEY_CONTRACT);
        
        let batch = new web3.BatchRequest()
        for (let i = 0; i < questBatchCompletion.length; i++) {
          batch.add(contract.methods.completeQuest(questBatchCompletion[i]).send.request({ from: wallet, gasPrice : gas }))
        }
        batch.execute()
        // console.log(batch)
      }

      async function sendAllToQuests() {
        const contract = new window.web3.eth.Contract(GooeyABI, GOOEY_CONTRACT);
        
        let batch = new web3.BatchRequest()
        for (let i = 0; i < questBatchSending.length; i++) {
          batch.add(contract.methods.startQuest(questBatchSending[i], parseInt(window.localStorage.getItem(questBatchSending[i]))).send.request({ from: wallet, gasPrice : gas }))
        }
        batch.execute()
        // console.log(batch)
      }




      let cancelQuestGooeyId
      async function cancelQuest() {
        const contract = new window.web3.eth.Contract(GooeyABI, GOOEY_CONTRACT)

        const questCancel = await contract.methods.cancelQuest(cancelQuestGooeyId).send({ from: wallet, gasPrice : gas })
        console.log(questCancel)
      }

      /////////// Questing END /////////////////////////////////////////////////////////////////////////////////////////////




      /////////// Transfer Gooeys /////////////////////////////////////////////////////////////////////////////////////////////////

      // let transferFrom
      let transferTo
      let transferTokenId
      async function transferGooey() {
        const contract = new window.web3.eth.Contract(GooeyABI, GOOEY_CONTRACT)

        const transfer = await contract.methods.safeTransferFrom(wallet, transferTo, transferTokenId).send({ from: wallet, gasPrice : gas })
        console.log(transfer)
      }

      /////////// Transfer Gooeys END /////////////////////////////////////////////////////////////////////////////////////////////





      function questIdToStore(i, d) {
        let GooeyId = d
        let QuestId = i.target.value
        // console.log(id)
        window.localStorage.setItem(GooeyId, QuestId)
      }










      /////////// Tumble Gooeys /////////////////////////////////////////////////////////////////////////////////////////////////////
      let tumbleA = null
      let tumbleB = null
      async function tumbleGooeys() {
        const contract = new window.web3.eth.Contract(GooeyABI, GOOEY_CONTRACT)

        const tumble = await contract.methods.tumble(tumbleA, tumbleB).send({ from: wallet, gasPrice : gas })
        console.log(tumble)
      }
      /////////// Tumble Gooeys END /////////////////////////////////////////////////////////////////////////////////////////////////




















/////////////////////////////////// Fruits /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

      let userFruits = []
      let GooeyId
      let FruitId
      let Amount





      async function getFruitsData() {
          const contract = new window.web3.eth.Contract(FruitsABI, FRUIT_CONTRACT)
          const contract2 = new window.web3.eth.Contract(GooeyABI, GOOEY_CONTRACT)
          const tokensAndFruits = await contract.methods.loadTokenAndFruitInfo(wallet, 14).call({ from: wallet })
          userFruits.push(tokensAndFruits[1])
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

      function closeModal0() {
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
          GooeyFruitArray = i
          console.log(GooeyFruitArray)
          modalSwtich5 = "close"
          feedAllGooeys()
      }

      function closeModal02() {
          modalSwtich5 = "close"
      }

      function showModal5(i, a) {
          FruitId = parseInt(i)
          FruitAmount = parseInt(a)
          fruitIdToConsume3 = FruitId
          console.log(fruitIdToConsume3, FruitAmount)
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

      // function feedAll(i) {
      //     FruitId = parseInt(i)
      //     fruitIdToConsume3 = FruitId
      //     console.log(feedForQuest0)
      //     // feedAllGooeys()
      // }

      let fillerArray = []
      let FruitAmount
      let GooeyFruitArray
      let fruitIdToConsume3
      async function feedAllGooeys() {
        const contract = new window.web3.eth.Contract(GooeyABI, GOOEY_CONTRACT)

        if (FruitAmount > GooeyFruitArray.length) {
          for (let i = 0; i < GooeyFruitArray.length; i++) {
            fillerArray.push(GooeyFruitArray[i])
          }
        }
        if (FruitAmount < GooeyFruitArray.length) {
          for (let i = 0; i < FruitAmount; i++) {
            fillerArray.push(GooeyFruitArray[i])
          }
        }
        if (FruitAmount == GooeyFruitArray.length) {
          for (let i = 0; i < FruitAmount; i++) {
            fillerArray.push(GooeyFruitArray[i])
          }
        }
        console.log(fillerArray)
        let batch = new web3.BatchRequest()
        for (let i = 0; i < fillerArray.length; i++) {
          batch.add(contract.methods.consumeFruit(fillerArray[i], 1, fruitIdToConsume3).send.request({ from: wallet, gasPrice : gas }), "latest", i)
        }
        batch.execute()
        // .then(res => console.log(res))
        // .catch(err => console.log(err))

        // const batchExecution = () => {
        //   try {
        //       return new Promise((resolve) => {
        //         for (let i = 0; i < fillerArray.length; i++) {
        //           batch.add(contract.methods.consumeFruit(fillerArray[i], 1, fruitIdToConsume3).send.request({ from: wallet, gasPrice : gas }))
        //         }
        //       })
        //       batch.execute()
        //   } 
        //   catch(e) {
        //         console.log("error")
        //   }
        // }
        // await batchExecution
      }

</script>

<main>

    {#await getData()}
    <p style="font-size: 25px; font-weight: 700; color: white; text-shadow: -1px -1px 0 #17314f, 1px -1px 0 #17314f, -1px 1px 0 #17314f, 1px 1px 0 #17314f;">Loading ...</p>
    {:then loaded}
    <div style="display: grid; justify-items: center; margin: 0px 0px 45px 0px; width: 240px;">
      <h3><span style="font-size: 20px; font-weight: 700;">Come back in</span></h3>
      <br>
      <div style="text-align: center; display: flex;">
        <div style="text-align: center; display: grid; margin-right: 10px;">
          <span style="font-size: 18px; font-weight: 700; color: white; text-shadow: -1px -1px 0 #17314f, 1px -1px 0 #17314f, -1px 1px 0 #17314f, 1px 1px 0 #17314f;">
            {comeBackIn.Days} 
          </span>
          <span>
            Days 
          </span>
        </div>
        <div style="text-align: center; display: grid; margin-right: 10px;">
          <span style="font-size: 18px; font-weight: 700; color: white; text-shadow: -1px -1px 0 #17314f, 1px -1px 0 #17314f, -1px 1px 0 #17314f, 1px 1px 0 #17314f;">
            {comeBackIn.Hours}
          </span>
          <span>
            Hours 
          </span>
        </div>
        <div style="text-align: center; display: grid; margin-right: 10px;">
          <span style="font-size: 18px; font-weight: 700; color: white; text-shadow: -1px -1px 0 #17314f, 1px -1px 0 #17314f, -1px 1px 0 #17314f, 1px 1px 0 #17314f;">
            {comeBackIn.Minutes} 
          </span>
          <span>
            Minutes
          </span>
        </div>
        <div style="text-align: center; display: grid;">
          <span style="font-size: 18px; font-weight: 700; color: white; text-shadow: -1px -1px 0 #17314f, 1px -1px 0 #17314f, -1px 1px 0 #17314f, 1px 1px 0 #17314f;">
            {comeBackIn.Seconds}
          </span>
          <span>
            Seconds
          </span>
        </div> 
      </div>
    </div>
    <div id="Gooey-Container">
      {#each allStats as stat, index}
      <div class="Gooey">
          <img src="https://gooeys.dogira.finance/{stat.tokenId}.jpg" alt="{stat.tokenId}">
        <div>
          <p>Gooey ID: #<span style="font-size: 12px;">{stat.tokenId}</span></p>
        </div>

        <div>
          <p>Health: <span>{stat.stats.hp}</span></p>
          <p>Attack: <span>{stat.stats.atk}</span></p>
          <p>Defense: <span>{stat.stats.def}</span></p>
          <p>Speed: <span>{stat.stats.spd}</span></p>
          <p>Total Strength: 
            <span id="total" style="font-size: 15px; font-weight: 700; color: rgb(211, 250, 255); text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;">
            {parseInt(stat.stats.hp) + parseInt(stat.stats.atk) + parseInt(stat.stats.def) + parseInt(stat.stats.spd)}
            </span>
          </p>
        </div>

        <div>
          <p>Gen: <span>{stat.life.generation}</span></p>
          <p>Tumble Bonus: <span>{stat.life.tumbleRollBonus}%</span></p>
          <p>Total Tumbles: <span>{stat.life.totalTumbles}</span></p>
          <p>Tumbles Left: <span>{stat.life.tumblesRemaining}</span></p>
          <p>Nexus: <span>{stat.life.bond}</span></p>
        </div>

        <div>
          <p>Food Store: </p>
          <p>{gooeyLife[index].Days} Days</p>
          <p>{gooeyLife[index].Hours} Hours</p>
          <p>{gooeyLife[index].Minutes} Minutes</p>
          <p>{gooeyLife[index].Seconds} Seconds</p>
        </div>

        {#if (questTime[index].Days > 0) || (questTime[index].Hours > 0) || (questTime[index].Minutes > 0) || (questTime[index].Seconds > 0) && (checkOnQuest[index] > 0)}
        <div>
          <p>Quest Time: </p>
          <p>{questTime[index].Days} Days</p>
          <p>{questTime[index].Hours} Hours</p>
          <p>{questTime[index].Minutes} Minutes</p>
          <p>{questTime[index].Seconds} Seconds</p>
        </div>
        {/if}

        {#if checkOnQuest[index] == 0}
        <div style="background-color: rgb(255, 144, 144); justify-content: center; height: 34px;">
          <p style="justify-content: center; font-size: 17px; font-weight: 700;">No Quest</p>
        </div>
        {/if}

        {#if (questTime[index].Days == 0) && (questTime[index].Hours == 0) && (questTime[index].Minutes == 0) && (questTime[index].Seconds == 0) && (checkOnQuest[index] > 0)}
        <div style="background-color: rgb(151, 255, 125); justify-content: center; height: 34px;">
          <p style="justify-content: center; font-size: 17px; font-weight: 700;"><span style="display: none; width: fit-content;">{questBatchCompletion.push(userGooeys[0][index])}</span>Quest Completed</p>
        </div>
        {/if}

        <div class="quest-button-area">
          {#if (checkOnQuest[index] > 0)}
          <button class="disabled" disabled="true">Send to Quest</button>
          {/if}
          {#if ((questTime[index].Days == 0) && (questTime[index].Hours == 0) && (questTime[index].Minutes == 0) && (questTime[index].Seconds == 0) && (checkOnQuest[index] == 0))}
          <button on:mouseup="{openModal1}" on:click="{getSendQuestId(stat.tokenId)}">Send to Quest</button>
          {/if}

          {#if !((questTime[index].Days == 0) && (questTime[index].Hours == 0) && (questTime[index].Minutes == 0) && (questTime[index].Seconds == 0) && (checkOnQuest[index] > 0))}
          <button class="disabled" disabled="true">Complete Quest</button>
          {/if}
          {#if (questTime[index].Days == 0) && (questTime[index].Hours == 0) && (questTime[index].Minutes == 0) && (questTime[index].Seconds == 0) && (checkOnQuest[index] > 0)}
          <button on:click="{getCompleteQuestId(stat.tokenId)}">Complete Quest</button>
          {/if}

          {#if checkOnQuest[index] == 0}
            <button class="disabled" disabled="true">Cancel Quest</button>
          {/if}
          {#if checkOnQuest[index] > 0}
          <button on:click="{getCancelQuestId(stat.tokenId)}">Cancel Quest</button>
          {/if}
        </div>

        <div class="transfer-button-container">
          <button on:click="{openModal2}" on:click="{getTransferId(stat.tokenId)}">Transfer</button>
        </div>

        <!-- {#if (tumbleCoolDown[index].Days == 0) && (tumbleCoolDown[index].Hours == 0) && (tumbleCoolDown[index].Minutes == 0) && (tumbleCoolDown[index].Seconds == 0)}
        <div style="background-color: rgb(206, 206, 206); justify-content: center; height: 34px;">
          <p style="justify-content: center; font-size: 17px; font-weight: 700;">Ready to Tumble</p>
        </div>
        {/if} -->
        <!-- {#if (tumbleCoolDown[index].Days > 0) && (tumbleCoolDown[index].Hours > 0) && (tumbleCoolDown[index].Minutes > 0) && (tumbleCoolDown[index].Seconds > 0)} -->
        <div class="tumble-time">
          <p>Tumble Cool down: </p>
          <p>{tumbleCoolDown[index].Days} Days</p>
          <p>{tumbleCoolDown[index].Hours} Hours</p>
          <p>{tumbleCoolDown[index].Minutes} Minutes</p>
          <p>{tumbleCoolDown[index].Seconds} Seconds</p>
        </div>
        <!-- {/if} -->

        <!-- {#if selectedQuests == undefined}
        <div class="batch-quest-container">
          <label for="batch-quests">Batch Quest:</label>
          <select id="batch-quests" on:load="{window.localStorage.setItem("selectedQuests", JSON.stringify(selectedQuests))}">
            {#each questOptions as o, i}
            <option value="0">{o[i]}</option>
            {/each}
          </select> 
        </div>
        {/if} -->

        {#if (window.localStorage.getItem(stat.tokenId) == undefined) || (window.localStorage.getItem(stat.tokenId) == null)}
        <div class="batch-quest-container">
          <label for="batch-quests">Batch Quest:</label>
          <select id="batch-quest">
            <span style="display: none;">{window.localStorage.setItem(stat.tokenId, 0)}</span>
            <option on:click="{(i) => questIdToStore(i, stat.tokenId)}" value={0}>Common</option>
            <option on:click="{(i) => questIdToStore(i, stat.tokenId)}" value={1}>Uncommon</option>
            <option on:click="{(i) => questIdToStore(i, stat.tokenId)}" value={2}>Rare</option>
            <option on:click="{(i) => questIdToStore(i, stat.tokenId)}" value={3}>Epic</option>
            <option on:click="{(i) => questIdToStore(i, stat.tokenId)}" value={4}>Legendary</option>
            <option on:click="{(i) => questIdToStore(i, stat.tokenId)}" value={5}>Mythical</option>
          </select> 
        </div>
        {/if}

        {#if (window.localStorage.getItem(stat.tokenId) != undefined) || (window.localStorage.getItem(stat.tokenId) != null)}
        <div class="batch-quest-container">
          <label for="batch-quests">Batch Quest:</label>
          <select value="{parseInt(window.localStorage.getItem(stat.tokenId))}" id="batch-quest">
            <option on:click="{(i) => questIdToStore(i, stat.tokenId)}" value={0}>Common</option>
            <option on:click="{(i) => questIdToStore(i, stat.tokenId)}" value={1}>Uncommon</option>
            <option on:click="{(i) => questIdToStore(i, stat.tokenId)}" value={2}>Rare</option>
            <option on:click="{(i) => questIdToStore(i, stat.tokenId)}" value={3}>Epic</option>
            <option on:click="{(i) => questIdToStore(i, stat.tokenId)}" value={4}>Legendary</option>
            <option on:click="{(i) => questIdToStore(i, stat.tokenId)}" value={5}>Mythical</option>
          </select> 
        </div>
        {/if}

      </div>

        {#if (window.localStorage.getItem(stat.tokenId) != undefined) || (window.localStorage.getItem(stat.tokenId) != null)}
          <span style="display: none;">{questBatchSendingCheck0.push(window.localStorage.getItem(stat.tokenId).indexOf(0))}</span>
          <span style="display: none;">{questBatchSendingCheck1.push(window.localStorage.getItem(stat.tokenId).indexOf(1))}</span>
          <span style="display: none;">{questBatchSendingCheck2.push(window.localStorage.getItem(stat.tokenId).indexOf(2))}</span>
          <span style="display: none;">{questBatchSendingCheck3.push(window.localStorage.getItem(stat.tokenId).indexOf(3))}</span>
          <span style="display: none;">{questBatchSendingCheck4.push(window.localStorage.getItem(stat.tokenId).indexOf(4))}</span>
          <span style="display: none;">{questBatchSendingCheck5.push(window.localStorage.getItem(stat.tokenId).indexOf(5))}</span>
          <!-- <span style="display: none;">{console.log(questBatchSendingCheck2)}</span> -->

          {#if ((gooeyLife[index].Days >= 1) || (gooeyLife[index].Hours >= 9)) && (checkOnQuest[index] == 0) && (questBatchSendingCheck0[index] == 0)}
            <span style="display: none;">{questBatchSending.push(stat.tokenId)}</span>
            <!-- <span style="display: none;">{console.log(questBatchSending)}</span> -->
          {/if}

          {#if ((gooeyLife[index].Days >= 1) || (gooeyLife[index].Hours >= 16)) && (checkOnQuest[index] == 0) && (questBatchSendingCheck1[index] == 0)}
            <span style="display: none;">{questBatchSending.push(stat.tokenId)}</span>
          {/if}

          {#if ((gooeyLife[index].Days >= 2) || ((gooeyLife[index].Days >= 1) && (gooeyLife[index].Hours >= 10))) && (checkOnQuest[index] == 0) && (questBatchSendingCheck2[index] == 0)}
            <span style="display: none;">{questBatchSending.push(stat.tokenId)}</span>
          {/if}

          {#if ((gooeyLife[index].Days >= 3) || ((gooeyLife[index].Days >= 2) && (gooeyLife[index].Hours >= 10))) && (checkOnQuest[index] == 0) && (questBatchSendingCheck3[index] == 0)}
            <span style="display: none;">{questBatchSending.push(stat.tokenId)}</span>
          {/if}

          {#if ((gooeyLife[index].Days >= 3) || ((gooeyLife[index].Days >= 2) && (gooeyLife[index].Hours >= 22))) && (checkOnQuest[index] == 0) && (questBatchSendingCheck4[index] == 0)}
            <span style="display: none;">{questBatchSending.push(stat.tokenId)}</span>
          {/if}

          {#if (gooeyLife[index].Days >= 5) && (checkOnQuest[index] == 0) && (questBatchSendingCheck5[index] == 0)}
            <span style="display: none;">{questBatchSending.push(stat.tokenId)}</span>
            <!-- <span style="display: none;">{questBatchSending.push(userGooeys[0][parseInt(questBatchSendingCheck5.indexOf(5))])}</span> -->
          {/if}





          {#if ((gooeyLife[index].Days == 0) && (gooeyLife[index].Hours < 9)) && (questBatchSendingCheck0[index] == 0)}
            <span style="display: none;">{feedForQuest0.push(stat.tokenId)}</span>
            <!-- <span style="display: none;">{console.log(questBatchSending)}</span> -->
          {/if}

          {#if ((gooeyLife[index].Days == 0) && (gooeyLife[index].Hours <= 16)) && (questBatchSendingCheck1[index] == 0)}
            <span style="display: none;">{feedForQuest1.push(stat.tokenId)}</span>
          {/if}

          {#if ((gooeyLife[index].Days < 1) || ((gooeyLife[index].Days == 1) && (gooeyLife[index].Hours < 10))) && (questBatchSendingCheck2[index] == 0)}
            <span style="display: none;">{feedForQuest2.push(stat.tokenId)}</span>
          {/if}

          {#if ((gooeyLife[index].Days < 2) || ((gooeyLife[index].Days == 2) && (gooeyLife[index].Hours < 10))) && (questBatchSendingCheck3[index] == 0)}
            <span style="display: none;">{feedForQuest3.push(stat.tokenId)}</span>
          {/if}

          {#if ((gooeyLife[index].Days < 3) || ((gooeyLife[index].Days == 2) && (gooeyLife[index].Hours < 22))) && (questBatchSendingCheck4[index] == 0)}
            <span style="display: none;">{feedForQuest4.push(stat.tokenId)}</span>
          {/if}

          {#if (gooeyLife[index].Days < 5) && (questBatchSendingCheck5[index] == 0)}
            <span style="display: none;">{feedForQuest5.push(stat.tokenId)}</span>
            <!-- <span style="display: none;">{questBatchSending.push(userGooeys[0][parseInt(questBatchSendingCheck5.indexOf(5))])}</span> -->
          {/if}

        {/if}

      {/each}
    </div>




    {#if questBatchCompletion.length == 0}
    <div style="margin: 70px 0px 25px 0px;">
      <button class="disabled" disabled="true">Complete All Quests</button>
    </div>
    {/if}
    {#if questBatchCompletion.length > 0}
    <div style="margin: 70px 0px 25px 0px;">
      <button on:click="{completeAllQuests}">Complete All Quests</button>
    </div>
    {/if}

    {#if questBatchSending.length == 0}
    <div style="margin: 0px 0px 50px 0px;">
      <button class="disabled" disabled="true">Send All To Quests</button>
    </div>
    {/if}
    {#if questBatchSending.length > 0}
    <div style="margin: 0px 0px 50px 0px;">
      <button on:click="{sendAllToQuests}">Send All To Quests</button>
    </div>
    {/if}





    <div style=" margin-top: 40px; text-align: center; display: grid; justify-items: center;">
      <div style="text-align: center; display: grid; justify-items: center; grid-template-columns: auto auto">
        <div>
          <label style="padding: 5px 0px; grid-gap: 5px; font-size: 14px; font-weight: 700; color: white; text-shadow: rgb(23, 49, 79) -1px -1px 0px, rgb(23, 49, 79) 1px -1px 0px, rgb(23, 49, 79) -1px 1px 0px, rgb(23, 49, 79) 1px 1px 0px;" for="gooeyA">Gooey A</label>
          <!-- <input type="number" name="gooeyA" bind:value="{tumbleA}"> -->
          <select style="margin-right: 5px; border-radius: 10px; background-color: azure; height: 30px;" bind:value="{tumbleA}">
            {#each userGooeys[0] as gooey, i}
            <option value={gooey}>{gooey}</option>
            {/each}
          </select>
        </div>
        <div>
          <label style="padding: 5px 0px; grid-gap: 5px; font-size: 14px; font-weight: 700; color: white; text-shadow: rgb(23, 49, 79) -1px -1px 0px, rgb(23, 49, 79) 1px -1px 0px, rgb(23, 49, 79) -1px 1px 0px, rgb(23, 49, 79) 1px 1px 0px;" for="gooeyB">Gooey B</label>
          <!-- <input type="number" name="gooeyB" bind:value="{tumbleB}"> -->
          <select style="margin-left: 5px; border-radius: 10px; background-color: azure; height: 30px;" bind:value="{tumbleB}">
            {#each userGooeys[0] as gooey, i}
            <option value={gooey}>{gooey}</option>
            {/each}
        </div>
      </div>
      <div style="margin-top: 15px;">
        <button on:click="{tumbleGooeys}">Tumble</button>
      </div>
    </div>





    {:catch error}
    <div id="Gooey-Container">
      <div id="No-Gooeys">You don't have any Gooeys in your Wallet. Get one at <a href="https://opensea.io/collection/gooeysp2e">Opensea!</a></div>
    </div>
    {/await}










    <div id="modal-container" class="{"modal " + modalSwtich1}">
        <div class="modal-content">
            <span on:click="{closeModal1}" class="close-button">×</span>

            <div class="Quests-Container">
              
              <div class="Quest">
                <h4>Common (10H)</h4>
                <div>
                  <p>$GOO Reward</p>
                  <p>3,780 - 4,536</p>
                </div>
                <div>
                  <p>Fruit Reward</p>
                  <p>0 - 1</p>
                </div>
                <div>
                  <p>Quest Difficulty</p>
                  <p>1200</p>
                  <p>Succes Chance</p>
                  <p id="chance1">{questChance1}%</p>
                </div>
                <div>
                  <button on:click="{() => getQuestId(0)}" on:mouseup="{closeModal1}">Send to Quest</button>
                </div>
              </div>

              <div class="Quest">
                <h4>Uncommon (18H)</h4>
                <div>
                  <p>$GOO Reward</p>
                  <p>9,504 - 11,232</p>
                </div>
                <div>
                  <p>Fruit Reward</p>
                  <p>0 - 2</p>
                </div>
                <div>
                  <p>Quest Difficulty</p>
                  <p>2000</p>
                  <p>Succes Chance</p>
                  <p id="chance2">{questChance2}%</p>
                </div>
                <div>
                  <button on:click="{() => getQuestId(1)}" on:mouseup="{closeModal1}">Send to Quest</button>
                </div>
              </div>

              <div class="Quest">
                <h4>Rare (36H)</h4>
                <div>
                  <p>$GOO Reward</p>
                  <p>25,872 - 32,928</p>
                </div>
                <div>
                  <p>Fruit Reward</p>
                  <p>1 - 2</p>
                </div>
                <div>
                  <p>Quest Difficulty</p>
                  <p>2800</p>
                  <p>Succes Chance</p>
                  <p id="chance3">{questChance3}%</p>
                </div>
                <div>
                  <button on:click="{() => getQuestId(2)}" on:mouseup="{closeModal1}">Send to Quest</button>
                </div>
              </div>

              <div class="Quest">
                <h4>Epic (60H)</h4>
                <div>
                  <p>$GOO Reward</p>
                  <p>57,024 - 71,280</p>
                </div>
                <div>
                  <p>Fruit Reward</p>
                  <p>1 - 3</p>
                </div>
                <div>
                  <p>Quest Difficulty</p>
                  <p>3600</p>
                  <p>Succes Chance</p>
                  <p id="chance4">{questChance4}%</p>
                </div>
                <div>
                  <button on:click="{() => getQuestId(3)}" on:mouseup="{closeModal1}">Send to Quest</button>
                </div>
              </div>

              <div class="Quest">
                <h4>Legendary (72H)</h4>
                <div>
                  <p>$GOO Reward</p>
                  <p>70,560 - 105,840</p>
                </div>
                <div>
                  <p>Fruit Reward</p>
                  <p>2 - 4</p>
                </div>
                <div>
                  <p>Quest Difficulty</p>
                  <p>4300</p>
                  <p>Succes Chance</p>
                  <p id="chance5">{questChance5}%</p>
                </div>
                <div>
                  <button on:click="{() => getQuestId(4)}" on:mouseup="{closeModal1}">Send to Quest</button>
                </div>
              </div>

              <div class="Quest">
                <h4>Mythical (120H)</h4>
                <div>
                  <p>$GOO Reward</p>
                  <p>164,346 - 227,556</p>
                </div>
                <div>
                  <p>Fruit Reward</p>
                  <p>4 - 8</p>
                </div>
                <div>
                  <p>Quest Difficulty</p>
                  <p>5000</p>
                  <p>Succes Chance</p>
                  <p id="chance6">{questChance6}%</p>
                </div>
                <div>
                  <button on:click="{() => getQuestId(5)}" on:mouseup="{closeModal0}">Send to Quest</button>
                </div>
              </div>
              
            </div>

      </div>
    </div>

    <div id="modal-container2" class="{"modal2 " + modalSwtich2}">
      <div class="modal-content2">
        <span on:click="{closeModal2}" class="close2">×</span>

        <div>
          <div>
            <h4>Receiving Wallet</h4>
            <div>
              <input id="gooey-receiver" bind:value="{gooeyReceiverWallet}" type="string" placeholder="Wallet Address">
              <button on:click="{getTransferWallet}" on:click="{closeModal2}">Transfer Gooey</button>
            </div>
          </div>
        </div>

      </div>
    </div>










<!------------------------------- Fruits -------------------------------------------------------------------------------------->

    <section id="Fruits"> 

        {#await getFruitsData() }
        {:then}
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
                <button id="0"  on:click="{() => showModal5(0,userFruits[0][0])}">Feed All</button>
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
              <p>Nexus Bonus: 1</p>
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
                <button id="1" on:click="{() => showModal5(1,userFruits[0][1])}">Feed All</button>
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
              <p>Nexus Bonus: 2</p>
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
                <button id="2" on:click="{() => showModal5(2,userFruits[0][2])}">Feed All</button>
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
              <p>Nexus Bonus: 4</p>
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
                <button id="3" on:click="{() => showModal5(3,userFruits[0][3])}">Feed All</button>
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
              <p>Nexus Bonus: 5</p>
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
                <button id="4" on:click="{() => showModal5(4,userFruits[0][4])}">Feed All</button>
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
              <p>Nexus Bonus: 10</p>
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
                <button id="5" on:click="{() => showModal5(5,userFruits[0][5])}">Feed All</button>
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
              <p>Nexus Bonus: 15</p>
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
                <button id="6" on:click="{() => showModal5(6,userFruits[0][6])}">Feed All</button>
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
              <p>Nexus Bonus: 25</p>
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
                <button id="7" on:click="{() => showModal5(7,userFruits[0][7])}">Feed All</button>
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
              <p>Nexus Bonus: 30</p>
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
                <button id="8" on:click="{() => showModal5(8,userFruits[0][8])}">Feed All</button>
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
              <p>Nexus Bonus: 300</p>
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
                <button id="9" on:click="{() => showModal5(9,userFruits[0][9])}">Feed All</button>
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
              <p>Nexus Bonus: 600</p>
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
                <button id="10" on:click="{() => showModal5(10,userFruits[0][10])}">Feed All</button>
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
            <span on:click="{() => closeModal0()}" class="close4">x</span>

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
          <span on:click="{() => closeModal02()}" class="close5">x</span>

          <div>
            
            <div>
              <div>
                <h2>Who to feed</h2>
                <div class="feed-classes" style="display: grid; grid-template-columns: auto auto; grid-gap: 10px;">
                  <div style="text-align: center; display: grid; max-width: 100px; border: solid 2px black; background-color:aquamarine; padding: 5px 10px; border-radius: 15px;">
                    <p style="font-weight: 700;">All Commons Below 9H</p>
                    <button style="width: 100px; height: 30px; font-size: 15px;" on:click="{() => closeModal5(feedForQuest0)}">Confirm</button>
                  </div>
                  <div style="text-align: center; display: grid; max-width: 100px; border: solid 2px black; background-color:aquamarine; padding: 5px 10px; border-radius: 15px;">
                    <p style="font-weight: 700;">All Uncommons Below 15H</p>
                    <button style="width: 100px; height: 30px; font-size: 15px;" on:click="{() => closeModal5(feedForQuest1)}">Confirm</button>
                  </div>
                  <div style="text-align: center; display: grid; max-width: 100px; border: solid 2px black; background-color:aquamarine; padding: 5px 10px; border-radius: 15px;">
                    <p style="font-weight: 700;">All Rares Below 34H</p>
                    <button style="width: 100px; height: 30px; font-size: 15px;" on:click="{() => closeModal5(feedForQuest2)}">Confirm</button>
                  </div>
                  <div style="text-align: center; display: grid; max-width: 100px; border: solid 2px black; background-color:aquamarine; padding: 5px 10px; border-radius: 15px;">
                    <p style="font-weight: 700;">All Epics Below 58H</p>
                    <button style="width: 100px; height: 30px; font-size: 15px;" on:click="{() => closeModal5(feedForQuest3)}">Confirm</button>
                  </div>
                  <div style="text-align: center; display: grid; max-width: 100px; border: solid 2px black; background-color:aquamarine; padding: 5px 10px; border-radius: 15px;">
                    <p style="font-weight: 700;">All Legendaries Below 72H</p>
                    <button style="width: 100px; height: 30px; font-size: 15px;" on:click="{() => closeModal5(feedForQuest4)}">Confirm</button>
                  </div>
                  <div style="text-align: center; display: grid; max-width: 100px; border: solid 2px black; background-color:aquamarine; padding: 5px 10px; border-radius: 15px;">
                    <p style="font-weight: 700;">All Mythicals Below 120H</p>
                    <button style="width: 100px; height: 30px; font-size: 15px;" on:click="{() => closeModal5(feedForQuest5)}">Confirm</button>
                  </div>
                </div>
              </div>
            </div>
            
          </div>
          
        </div>
      </div>

  </section> 




  
</main>

<style>

    main {
      margin-top: 70px;
      display: grid;
      justify-items: center;
    }

    #Gooey-Container {
      display: grid;
      grid-template-columns: auto auto auto auto auto;
      border: 5px solid rgba(49, 33, 63, 0.5);
      border-radius: 10px;
      background-color: rgba(173, 104, 236, 0.5);
      padding: 10px;
    }

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

    /************** Modal ********************************************************************/

      /* The Modal (background) */
      .modal {
        display: none; /* Hidden by default */
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
      .modal-content {
        background-color: #75f8dc;
        margin: auto;
        padding: 20px;
        border: 1px solid #888;
        width: 80%;
        border-radius: 20px;
      }

      /* The Close Button */
      .close-button {
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

      .close-button:hover,
      .close-button:focus {
        background-color: rgb(223, 0, 0);
        cursor: pointer;
      }

/************** Modal ********************************************************************/





      .Quests-Container {
        display: grid;
        grid-template-columns: auto auto auto;
        justify-items: center;
        padding: 10px;
      }

      @media (min-width: 530px) and (max-width: 785px) {
        .Quests-Container {
          padding: 50px 0px;
          grid-template-columns: auto auto !important;
        }
      }

      @media (min-width: 130px) and (max-width: 529px) {
        .Quests-Container {
          padding: 50px 0px;
          grid-template-columns: auto !important;
        }
      }

      .Quest {
        background-color: #707070;
        border: 2px solid rgb(31, 29, 29);
        border-radius: 10px;
        padding: 10px;
        font-size: 14px;
        font-weight: 500;
        color: aliceblue;
        text-shadow: 1px 1px 0 rgb(0, 0, 0);
      }

      .Quest:nth-child(2) {
        background-color: #698849;
      }

      .Quest:nth-child(3) {
        background-color: #516890;
      }

      .Quest:nth-child(4) {
        background-color: #6c5190;
      }

      .Quest:nth-child(5) {
        background-color: #b17a43;
      }

      .Quest:nth-child(6) {
        background-color: #b04845;
      }

      .Quest > h4 {
        font-size: 20px;
        text-align: center;
        margin: 0px 0px 10px 0px;
        text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;
      }

      .Quest > div {
        margin: 0px 0px 10px 0px;
      }
      
      .Quest > div > p {
        text-align: center;
        margin: 5px;
        text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;
      }

      .Quest > div > p:nth-child(1) {
        text-align: center;
        margin: 5px;
        color:#e0b3ff; 
        text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;
      }

      .Quest > div > p:nth-child(3) {
        text-align: center;
        margin: 5px;
        color:#e0b3ff; 
        text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;
      }

      .quest-img {
        margin: 0px 5px 0px 0px;
        width: 20px;
        height: 20px;
      }

      .Gooey {
        display: grid;
        justify-items: center;
        max-width: 200px;
        margin: 10px;
      }

      .Gooey > div {
        display: grid;
        grid-template-columns: auto auto;
        width: 99%;
        width: -webkit-fill-available;
        border-right: 1px solid rgba(0, 0, 0);
        border-left: 1px solid rgba(0, 0, 0);
        border-bottom: 1px solid rgba(0, 0, 0);
        background-color: rgb(243, 227, 247);
      }

      .Gooey > div:nth-child(2) {
        justify-content: center;
      }
      
      .Gooey > div > p {
        font-size: 10px;
        font-weight: 700;
        padding: 0px 5px;
        margin: 5px 0px;
      }

      .Gooey > div:nth-child(5) > p:nth-child(1) {
        font-size: 10px;
        font-weight: 700;
        margin: 0px;
      }

      .Gooey > div:nth-child(5) > p {
        padding: 5px 3px;
        margin: 0px;
      }

      .Gooey > div:nth-child(5) {
        border-top: none;
        grid-template-columns: auto auto auto auto auto;
        text-align: center; 
        height: 34px !important;
      }

      .Gooey > div:nth-child(6) > p:nth-child(1) {
        font-size: 10px;
        font-weight: 700;
        margin: 0px;
      }

      .Gooey > div:nth-child(6) > p {
        padding: 5px 3px;
        margin: 0px;
      }

      .Gooey > div:nth-child(6) {
        border-top: none;
        /* border-bottom: none; */
        grid-template-columns: auto auto auto auto auto;
        text-align: center; 
        display: grid;
        width: 99%;
        justify-items: center;
      }

      .Gooey > div:nth-child(7) {
        /* border-top: none; */
        display: grid;
        grid-template-columns: auto;
        justify-items: center;
        padding: 5px 0px;
        grid-gap: 5px;
        width: 99% !important;
      }

      .Gooey > div:nth-child(7) > button {
        width: 160px;
        height: 35px;
        font-size: 13px;
        font-weight: 700;
        margin: 5px 0px;
      }

      /* .Gooey > div:nth-child(3) > p:nth-child(5) {
        text-align: center;
        font-size: 11.7px;
        font-weight: 700;
        padding: 0px 10px;
        margin: 5px 0px;
        width: 150%;
      } */
/* 
      .quest-button-area {
        display: grid !important;
        padding: 5px 0px !important;
        max-width: 99% !important;
      } */

      .tumble-time {
        border-top: none !important;
        grid-template-columns: auto auto auto auto auto !important;
        text-align: center !important; 
        height: 34px !important;
      }

      .tumble-time > p {
        padding: 0px !important;
        margin: 5px 0px !important;
      }

      .tumble-time > p:nth-child(1) {
        text-align: left;
        padding-left: 5px !important;
        margin: 1px 0px !important;
        font-size: 9px;
      }

      #Gooey-Container > .Gooey > img {
        width: 200px;
        height: 200px;
        border: 1px solid black;
        border-radius: 10px 10px 0px 0px;
        margin: 0px;
      }

      @media (min-width: 945px) and (max-width: 1145px) {
        #Gooey-Container {
          grid-template-columns: auto auto auto auto !important;
        }
      }

      @media (min-width: 701px) and (max-width: 944px) {
        #Gooey-Container {
          grid-template-columns: auto auto auto !important;
        }
      }

      @media (min-width: 490px) and (max-width: 700px) {
        #Gooey-Container {
          grid-template-columns: auto auto;
        }
      }

      @media (min-width: 150px) and (max-width: 489px) {
        #Gooey-Container {
          grid-template-columns: auto;
        }
      }

      .Send-Quest-Container {
        margin-top: 100px;
        display: grid;
        justify-items: center;
      }

      .Send-Quest-Container > div {
        display: grid;
        justify-items: center;
        grid-template-columns: auto auto auto;
        grid-gap: 40px 80px;
      }

      .Send-Quest-Container > div > div {
        display: grid;
        justify-items: center;
        grid-gap: 20px 5px;
      }

      .Send-Quest-Container > div > div > div {
        display: grid;
        justify-items: center;
        grid-gap: 5px;
      }

      .transfer-button-container {
        display: flex !important;
        justify-content: center !important;
        padding: 5px;

        display: grid !important;
        justify-items: center;
        padding: 5px;
        width: 94% !important;
        grid-auto-columns: auto;
        justify-content: center;
      }

      .modal-content2 > div > div {
        display: grid;
        justify-items: center;
      }

      .modal-content2 > div > div > div {
        display: grid;
        justify-items: center;
        grid-gap: 15px;
      }





      /************** Modal2 ********************************************************************/

      /* The Modal (background) */
      .modal2 {
        display: none; /* Hidden by default */
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
      .modal-content2 {
        background-color: #75f8dc;
        margin: auto;
        padding: 20px;
        border: 1px solid #888;
        width: 80%;
        border-radius: 20px;
      }

      /* The Close Button */
      .close2 {
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

      .close2:hover,
      .close2.hidden {
        background-color: rgb(223, 0, 0);
        cursor: pointer;
      }

/************** Modal2 ********************************************************************/










      .button-82-container { 
        margin-top: 50px;
        display: flex;
        justify-content: center;
      }
      
      .button-82-pushable {
        position: relative;
        border: none;
        background: transparent;
        padding: 0;
        cursor: pointer;
        outline-offset: 4px;
        transition: filter 250ms;
        user-select: none;
        -webkit-user-select: none;
        touch-action: manipulation;
      }

      .button-82-shadow {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border-radius: 12px;
        background: hsl(0deg 0% 0% / 0.25);
        will-change: transform;
        transform: translateY(2px);
        transition:
          transform
          600ms
          cubic-bezier(.3, .7, .4, 1);
      }

      .button-82-edge {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border-radius: 12px;
        background: linear-gradient(
          to left,
          hsl(340deg 100% 16%) 0%,
          hsl(340deg 100% 32%) 8%,
          hsl(340deg 100% 32%) 92%,
          hsl(340deg 100% 16%) 100%
        );
      }

      .button-82-front {
        display: block;
        position: relative;
        padding: 12px 27px;
        border-radius: 12px;
        font-size: 1.1rem;
        color: white;
        background: hsl(345deg 100% 47%);
        will-change: transform;
        transform: translateY(-4px);
        transition:
          transform
          600ms
          cubic-bezier(.3, .7, .4, 1);
      }

      @media (min-width: 351px) {
        .button-82-front {
          font-size: 1.25rem;
          padding: 7px 12px;
        }
      }

      @media (min-width: 50px) and (max-width: 350px) {
        .button-82-front {
          font-size: 1rem !important;
          padding: 8px 12px;
        }
      }

      .button-82-pushable:hover {
        filter: brightness(110%);
        -webkit-filter: brightness(110%);
      }

      .button-82-pushable:focus:not(:focus-visible) {
        outline: none;
      }

      .batch-quest-container > label {
        justify-content: center;
        align-items: center;
        font-size: 12px;
        font-weight: 700;
        margin: 10px;
      }

      .batch-quest-container > select {
        justify-content: center;
        align-items: center;
        font-size: 12px;
        font-weight: 700;
        border-radius: 10px;
        margin: 5px;
      }

      .batch-quest-container > select > option {
        justify-content: center;
        align-items: center;
        font-size: 12px;
        font-weight: 700;
        border-radius: 10px;
        margin: 5px;
      }

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

        .feed-classes > div {
          max-width: 80px;
        }

        .feed-classes > div > p {
          font-size: 12px;
          font-weight: bold;
        }

        .feed-classes > div > button {
          width: 50px;
          height: 20px;
          font-size: 12px !important;
          font-weight: bold;
          padding: 2px 5px;
        }

      }

      @media (min-width: 120px) and (max-width: 300px) {
        .feed-classes {
          grid-template-columns: auto !important;
        }

        .modal-content5 > div > div {
          margin: 35px 0px 40px 0px; 
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
        font-size: 27px;
        font-weight: 700;
        width: 35px;
        height: 33px;
        text-align: center;
        border: 2px solid black;
        background-color: red;
        z-index: 5;
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
        font-size: 27px;
        font-weight: 700;
        width: 35px;
        height: 33px;
        text-align: center;
        border: 2px solid black;
        background-color: red;
        z-index: 5;
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
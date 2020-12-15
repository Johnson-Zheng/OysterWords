<template>
  <div id="main">
    <header>
      <h1>Battle</h1>
      <h2>单词对战</h2>

    </header>
    <div id="form" style="background-color: #98d4f3;height: 100vh;width: 100vw">
      <div class="fish" id="fish"></div>
      <div class="fish" id="fish2"></div>
      <div class="fish" id="fish3"></div>
      <div>

      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "battle"
    }
</script>

<style scoped>
  h1{
    font-weight: bold;
    font-size: 3.6em;
    font-family: 'Raleway', sans-serif;
    margin: 0 auto;
    margin-top: 30px;
    width: 500px;
    color: #F90;
    text-align: center;
  }
  h2{
    font-weight: 700;
    font-size: 2em;
    letter-spacing: 10px;
    margin: 0 auto;
    color: #F90;
    text-align: center;
  }

  /* Animation webkit */
  @-webkit-keyframes myfirst
  {
    0% {
      margin-left: -235px;
      transform: scale(1.2);
    }
    90% {
      margin-left: 100%;
      transform: scale(1.0);
    }
    100% {
      margin-left: 100%;
    }
  }

  /* Animation */
  @keyframes myfirst
  {
    0% {margin-left: -235px}
    70% {margin-left: 100%;}
    100% {margin-left: 100%;}
  }

  .fish{
    background:url("../assets/fish.png");
    width: 235px;
    height: 104px;
    margin-left: -235px;
    position: absolute;
    animation: myfirst 12s;
    -webkit-animation: myfirst 12s;
    animation-iteration-count: infinite;
    -webkit-animation-iteration-count: infinite;
    animation-timing-function: ease-in-out;
    -webkit-animation-timing-function: ease-in-out;
  }

  #fish{
    top: 30%;
  }

  #fish2{
    top: 50%;
    animation-delay: 3s;
    -webkit-animation-delay: 3s;
  }

  #fish3{
    top: 80%;
    animation-delay: 8s;
    -webkit-animation-delay: 8s;
  }


  header{
    height: 160px;
    background: url('../assets/golf.png') repeat-x bottom;
  }
</style>

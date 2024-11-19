<template>
    <div class="einDiv">
          <div class="einContent flex flex-col items-center justify-center w-[80%] lg:w-[50%]">
            <slot name="body"></slot>
          </div>
        </div> 
</template>
<script>
</script>
<style>
.einDiv {
    position: fixed; /* Stay in place */
    z-index: 1; /* Sit on top */
    left: 0;
    top: 0;
    width: 100%; /* Full width */
    height: 100%; /* Full height */
    overflow: auto; /* Enable scroll if needed */
    background-color: rgb(0,0,0); /* Fallback color */
    background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
  }
  .einContent {
    background-color: #fefefe;
    margin: 5% auto; /* 15% from the top and centered */
    padding: 20px;
    border: 1px solid #888;
    overflow: auto;
  }
</style>
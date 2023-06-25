<template>
    <div
      class="bg-black border border-black float-left p-1  rounded-xl"
    >
      <div class="text-center">
        <img
          class="w-full mx-auto"
          :src="collectionImg"
          alt="Collection image"
        />
        
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { reactive } from 'vue';
  
  export default {
    props: {
      collectionImg: {
        type: String,
        default: () => '/evolvnft-collection-logo.svg',
        required: false,
      },
      }
}
    
   
    
  
  </script>
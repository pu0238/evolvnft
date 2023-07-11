<template>
  <div class="rounded-xl w-72 pt-5 shadow-md shadow-zinc-300/50">
    <div class="pl-5">
      <h1 class="text-xl font-cal">Choose a wallet to connect</h1>

      <p1 class="text-md text-zinc-500 font-josefin">
        Select from the supported wallets to get started.</p1
      >
    </div>
    <div class="pt-5 pb-10 grid gap-y-3 place-content-center">
      <button
        class="bg-white w-60 h-12 hover:border-indigo-500 duration-700 border-b-2 rounded-full text-md font-josefin pt-3 shadow-2xl shadow-zinc-200"
      >
        <p1 class="pr-32">ArchX</p1>
        <a class="float-left pl-5 select-none cursor-pointer">
          <img src="/icons/wallets/archx.svg" class="w-5" />
        </a>
      </button>
      <button
        class="bg-white w-60 h-12 hover:border-indigo-500 duration-700 border-b-2 rounded-full text-md font-josefin pt-3 shadow-2xl shadow-zinc-200"
      >
        <p1 class="pr-36 pl-2">Keplr</p1>
        <a class="float-left pl-5 select-none cursor-pointer">
          <img src="/icons/wallets/keplr.svg" class="w-5" />
        </a>
      </button>
      <button
        class="bg-white w-60 h-12 hover:border-indigo-500 duration-700 border-b-2 rounded-full text-md font-josefin pt-3 shadow-2xl shadow-zinc-200"
      >
        <p1 class="pr-20">Cosmostation</p1>
        <a class="float-left pl-5 select-none cursor-pointer">
          <img src="/icons/wallets/cosmostation.svg" class="w-5" />
        </a>
      </button>
      <button
        class="bg-white w-60 h-12 hover:border-indigo-500 duration-700 border-b-2 rounded-full text-md font-josefin pt-3 shadow-2xl shadow-zinc-200"
      >
        <p1 class="pr-36 pl-2">Leap</p1>
        <a class="float-left pl-5 select-none cursor-pointer">
          <img src="/icons/wallets/leap.svg" class="w-6" />
        </a>
      </button>
    </div>
  </div>
</template>

<template>
  <div>
    <div
      v-if="openToken"
      class="bg-black/30 text-white w-full h-full fixed top-0 left-0 z-20 backdrop-blur-sm cursor-pointer"
      @click="toogleOpen"
    ></div>
    <ProductsCart
      v-if="collectionData"
      :open="openToken"
      :title="`${collectionData.name} #${openTokenData?.tokenId}`"
      @close="toogleOpen"
      class="overflow-auto"
    >
      <div class="flex flex-1 flex-col justify-between">
        <div>
          <img
            v-if="openTokenMetadata && openTokenMetadata.image"
            draggable="false"
            class="w-44 mx-auto sm:w-72 md:w-96 rounded-2xl"
            :src="openTokenMetadata && openTokenMetadata.image"
          />
          <img
            v-else
            draggable="false"
            class="w-44 mx-auto sm:w-72 md:w-96 rounded-2xl p-8"
            src="/evolvnft-collection-logo.svg"
          />
          <div class="text-white flex font-josefin mt-4">
            <div class="grid w-full">
              <span class="mb-3" v-if="openTokenData?.owner">
                owner
                <a
                  class="text-indigo-500 font-semibold ease-out duration-300 hover:text-indigo-600"
                  :href="`${blockchainScan}${openTokenData?.owner}`"
                  target="_blank"
                >
                  {{ shortenArchAddress(openTokenData?.owner) }}
                </a>
              </span>
              <div class="flex mb-2 border-b-2 border-zinc-900">
                <span
                  @click="openTokenSubPage = 'details'"
                  class="group hover:border-b-2 border-indigo-500"
                  :class="{
                    'border-indigo-500 text-indigo-500 border-b-2':
                      openTokenSubPage === 'details',
                  }"
                >
                  <span
                    class="px-2 pb-1 ease-out duration-3200 group-hover:text-indigo-500"
                  >
                    details
                  </span>
                </span>
                <span
                  @click="openTokenSubPage = 'offers'"
                  class="group hover:border-b-2 border-indigo-500"
                  :class="{
                    'border-indigo-500 text-indigo-500 border-b-2':
                      openTokenSubPage === 'offers',
                  }"
                >
                  <span
                    class="px-2 pb-1 ease-out duration-300 group-hover:text-indigo-500"
                  >
                    offers
                  </span>
                </span>
              </div>
              <div v-if="openTokenSubPage === 'offers'">
                <div
                  v-if="openTokenOffers?.length === 0"
                  class="mt-4 text-center"
                >
                  offers not found
                </div>
                <div
                  v-else
                  v-for="offer in openTokenOffers"
                  class="flex items-center justify-between bg-zinc-900 py-2 px-4 rounded-xl"
                >
                  <a
                    class="text-indigo-500 font-semibold ease-out duration-300 hover:text-indigo-600"
                    :href="`${blockchainScan}${openTokenData?.owner}`"
                    target="_blank"
                  >
                    {{ shortenArchAddress(offer.from) }}
                  </a>
                  <div class="flex items-center">
                    <div class="flex items-center">
                      <img
                        draggable="false"
                        :src="denomLogo"
                        class="w-4 mx-1 my-2"
                      />
                      <p>{{ aarchToArch(Number(offer.offer.amount)) }}</p>
                    </div>
                    <div class="border-l-2 pl-2 border-black ml-2 h-full">
                      <svg
                        width="15"
                        height="15"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                        class="flex fill-white hover:fill-indigo-500 ease-out duration-200"
                        v-if="offer.from && offer.from === walletSignerAddress"
                        @click="cancelOfferForToken(offer.from)"
                      >
                        <path
                          d="M19.557 0.458161C19.4167 0.317531 19.25 0.20596 19.0665 0.129836C18.8829 0.0537112 18.6862 0.0145271 18.4875 0.0145271C18.2889 0.0145271 18.0921 0.0537112 17.9086 0.129836C17.7251 0.20596 17.5584 0.317531 17.4181 0.458161L10 7.86105L2.58194 0.442991C2.4415 0.302545 2.27476 0.191138 2.09126 0.115129C1.90776 0.0391207 1.71109 1.47983e-09 1.51247 0C1.31385 -1.47983e-09 1.11717 0.0391207 0.93367 0.115129C0.750169 0.191138 0.583436 0.302545 0.442991 0.442991C0.302545 0.583436 0.191138 0.750169 0.115129 0.93367C0.0391207 1.11717 -1.47983e-09 1.31385 0 1.51247C1.47983e-09 1.71109 0.0391207 1.90776 0.115129 2.09126C0.191138 2.27476 0.302545 2.4415 0.442991 2.58194L7.86105 10L0.442991 17.4181C0.302545 17.5585 0.191138 17.7252 0.115129 17.9087C0.0391207 18.0922 0 18.2889 0 18.4875C0 18.6862 0.0391207 18.8828 0.115129 19.0663C0.191138 19.2498 0.302545 19.4166 0.442991 19.557C0.583436 19.6975 0.750169 19.8089 0.93367 19.8849C1.11717 19.9609 1.31385 20 1.51247 20C1.71109 20 1.90776 19.9609 2.09126 19.8849C2.27476 19.8089 2.4415 19.6975 2.58194 19.557L10 12.1389L17.4181 19.557C17.5585 19.6975 17.7252 19.8089 17.9087 19.8849C18.0922 19.9609 18.2889 20 18.4875 20C18.6862 20 18.8828 19.9609 19.0663 19.8849C19.2498 19.8089 19.4166 19.6975 19.557 19.557C19.6975 19.4166 19.8089 19.2498 19.8849 19.0663C19.9609 18.8828 20 18.6862 20 18.4875C20 18.2889 19.9609 18.0922 19.8849 17.9087C19.8089 17.7252 19.6975 17.5585 19.557 17.4181L12.1389 10L19.557 2.58194C20.1335 2.00549 20.1335 1.03462 19.557 0.458161Z"
                        ></path>
                      </svg>
                      <svg
                        width="17"
                        height="13"
                        viewBox="0 0 17 13"
                        class="flex stroke-white hover:stroke-indigo-500 ease-out duration-200"
                        v-if="walletSignerAddress === openTokenData?.owner"
                        @click="acceptOfferForToken(offer.from)"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M1 7.11116L6.76921 12L16 1"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
              <div v-if="openTokenSubPage === 'details'">
                <span class="flex items-center text-xl mb-2">
                  <svg
                    width="18"
                    height="20"
                    viewBox="0 0 18 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-8"
                  >
                    <path
                      d="M9.00008 19.7179C8.65063 19.7234 8.30584 19.6372 8.00008 19.4679L7.70008 19.2979C5.36335 17.9759 3.41934 16.0574 2.06655 13.7383C0.713767 11.4193 0.000670048 8.78274 8.0152e-05 6.09795V5.95795C-0.00308979 5.60384 0.0878186 5.25523 0.263514 4.94777C0.439209 4.6403 0.693391 4.385 1.00008 4.20795L8.00008 0.267949C8.30412 0.0924127 8.64901 0 9.00008 0C9.35115 0 9.69604 0.0924127 10.0001 0.267949L17.0001 4.20795C17.3068 4.385 17.561 4.6403 17.7366 4.94777C17.9123 5.25523 18.0033 5.60384 18.0001 5.95795V6.09795C17.9975 8.78472 17.2814 11.4226 15.925 13.7418C14.5686 16.0611 12.6205 17.9785 10.2801 19.2979L9.98008 19.4679C9.68023 19.6339 9.34277 19.72 9.00008 19.7179ZM9.00008 2.01795L2.00008 5.95795V6.09795C2.00176 8.42905 2.62308 10.7178 3.80038 12.7298C4.97769 14.7417 6.66866 16.4046 8.70008 17.5479L9.00008 17.7179L9.30008 17.5479C11.3315 16.4046 13.0225 14.7417 14.1998 12.7298C15.3771 10.7178 15.9984 8.42905 16.0001 6.09795V5.95795L9.00008 2.01795Z"
                      fill="#6366F1"
                    />
                  </svg>
                  <span>attributes</span>
                </span>
                <div class="flex">
                  <div
                    v-if="openTokenMetadata"
                    v-for="attribute in openTokenMetadata.attributes"
                    class="flex flex-col bg-zinc-900 mx-1 px-3 py-2 rounded-2xl justify-between"
                  >
                    <span class="flex flex-col">
                      <span class="text-xs">{{ attribute.trait_type }}</span>
                      <span class="text-sm font-cal">{{
                        attribute.value
                      }}</span>
                    </span>
                    <!--
                    <span
                      class="text-xs bg-indigo-200 text-indigo-500 w-fit font-extrabold py-1 px-2 rounded-2xl mt-1"
                    >
                      12%
                    </span>
                  --></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          v-if="
            openTokenData?.owner && openTokenData.owner === walletSignerAddress
          "
          class="text-white"
        >
          <button
            class="w-full bg-indigo-500 p-2 rounded-full my-1 hover:bg-indigo-700 ease-out duration-300 disabled:bg-indigo-700 font-josefin text-lg"
            :disabled="buyInProgress"
            @click="closeNFTListing"
          >
            {{ closingInProgress ? 'closing in progress...' : 'close listing' }}
          </button>
        </div>
        <div class="text-white font-josefin text-lg" v-else>
          <span class="font-cal flex justify-between mb-2">
            <span class="text-xl">price:</span>
            <span class="flex items-center text-2xl">
              <img draggable="false" :src="denomLogo" class="w-6 mx-1" />
              <p>
                {{ openTokenData?.normalizedPrice || openTokenData?.price }}
              </p>
            </span>
          </span>
          <span
            v-if="openTokenOffers && openTokenOffers?.length > 0"
            class="font-josefin flex justify-between mb-2"
          >
            <span class="text-sm">highest offer:</span>
            <span class="flex items-center text-base">
              <img draggable="false" :src="denomLogo" class="w-4 mx-1" />
              <p>
                {{
                  aarchToArch(
                    Math.max(
                      openTokenOffers.map((o) => Number(o.offer.amount)) as any,
                    ),
                  )
                }}
              </p>
            </span>
          </span>
          <button
            class="w-full bg-indigo-500 p-2 rounded-full my-1 hover:bg-indigo-700 ease-out duration-300 disabled:bg-indigo-700"
            :disabled="buyInProgress"
            @click="buyNFT"
          >
            {{ buyInProgress ? 'sale in progress...' : 'buy now' }}
          </button>
          <template v-if="openTokenData?.openForOffers">
            <div class="text-center">or</div>
            <div
              v-if="openOfferInput"
              class="my-2 flex bg-zinc-900 rounded-2xl w-full min-w-[6rem]"
            >
              <img draggable="false" :src="denomLogo" class="w-4 mx-4 my-2" />
              <code
                class="flex-1 bg-zinc-900 w-full min-w-[6rem] pr-4 py-2 rounded-r-2xl"
              >
                <input
                  class="bg-zinc-900 w-full focus:outline-none"
                  type="number"
                  v-model="offerPrice"
                  id="rangenumber"
                  max="100"
                  min="0"
                />
              </code>
            </div>
            <button
              @click="makeOffer"
              class="w-full ease-out duration-300 bg-transparent p-2 my-1 border-white text-white disabled:border-zinc-300 border-4 rounded-full disabled:text-zinc-300 hover:text-indigo-500 hover:border-indigo-500"
            >
              make offer
            </button>
          </template>
          <div class="mt-2 text-sm">buy NFT or make a reseller offer</div>
          <p
            class="text-center font-josefin text-sm my-2 text-indigo-500 hover:text-indigo-400 ease-out duration-300"
            @click="openToken = false"
          >
            back to collection >
          </p>
        </div>
      </div>
    </ProductsCart>
    <CollectionMarketplaceHeader
      v-if="collectionData"
      :collectionData="collectionData"
      :floor="floor"
      :listed="collectionListings?.length"
    />
    <div v-if="listingsMetadata.length > 0">
      <div class="flex font-josefin font-semibold mt-16 text-lg">
        <button
          class="px-4 py-2 ease-out duration-300 hover:text-indigo-500 border-b-4 hover:border-indigo-500"
          :class="{
            'text-indigo-500 border-indigo-500': active === 'listings',
          }"
          @click="active = 'listings'"
        >
          listings
        </button>
        <!--
        <button
          class="px-4 py-2 ease-out duration-300 hover:text-indigo-500 border-b-4 hover:border-indigo-500"
          :class="{
            'text-indigo-500 border-indigo-500': active === 'activity',
          }"
          @click="active = 'activity'"
        >
          activity
        </button>-->
      </div>
      <div class="grid border-t-2 border-black pt-4">
        <div class="grid sm:flex mb-6 gap-2 items-center">
          <div class="flex-1 flex mx-auto">
            <button class="bg-black px-[10px] rounded-full mr-2 group">
              <svg
                width="25"
                height="25"
                viewBox="0 0 25 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                class="fill-white ease-out duration-300 group-hover:-rotate-180 group-hover:fill-indigo-500"
              >
                <path
                  d="M8.64683 8.34181H3.40347C3.25043 8.34189 3.09888 8.31182 2.95747 8.25329C2.81606 8.19477 2.68758 8.10894 2.57936 8.00073C2.47115 7.89251 2.38532 7.76403 2.3268 7.62262C2.26827 7.48121 2.23819 7.32966 2.23828 7.17662V1.93326C2.23828 1.62423 2.36104 1.32786 2.57956 1.10934C2.79807 0.890827 3.09444 0.768066 3.40347 0.768066C3.7125 0.768066 4.00887 0.890827 4.22739 1.10934C4.4459 1.32786 4.56866 1.62423 4.56866 1.93326V6.01143H8.64683C8.95586 6.01143 9.25223 6.13419 9.47075 6.3527C9.68926 6.57122 9.81202 6.86759 9.81202 7.17662C9.81202 7.48564 9.68926 7.78201 9.47075 8.00053C9.25223 8.21905 8.95586 8.34181 8.64683 8.34181Z"
                />
                <path
                  d="M23.0717 13.5852C22.9186 13.5853 22.7671 13.5552 22.6257 13.4967C22.4843 13.4381 22.3558 13.3523 22.2476 13.2441C22.1394 13.1359 22.0535 13.0074 21.995 12.866C21.9365 12.7246 21.9064 12.573 21.9065 12.42C21.9078 10.3684 21.2318 8.37373 19.9834 6.74565C18.735 5.11757 16.9841 3.94713 15.0024 3.41602C13.0207 2.8849 10.9192 3.02282 9.02391 3.80836C7.12864 4.59391 5.5457 5.98313 4.5208 7.7604C4.36598 8.02778 4.11128 8.22271 3.81273 8.3023C3.51419 8.38189 3.19626 8.33962 2.92888 8.1848C2.66149 8.02998 2.46657 7.77528 2.38698 7.47674C2.30738 7.17819 2.34965 6.86026 2.50447 6.59288C3.78622 4.37184 5.76522 2.63596 8.13436 1.6546C10.5035 0.67324 13.1303 0.501279 15.6072 1.1654C18.084 1.82952 20.2724 3.29259 21.8328 5.32757C23.3932 7.36255 24.2382 9.85565 24.2369 12.42C24.237 12.573 24.2069 12.7246 24.1484 12.866C24.0898 13.0074 24.004 13.1359 23.8958 13.2441C23.7876 13.3523 23.6591 13.4381 23.5177 13.4967C23.3763 13.5552 23.2247 13.5853 23.0717 13.5852ZM21.7609 24.0719C21.6078 24.072 21.4563 24.0419 21.3148 23.9834C21.1734 23.9249 21.045 23.839 20.9367 23.7308C20.8285 23.6226 20.7427 23.4941 20.6842 23.3527C20.6257 23.2113 20.5956 23.0598 20.5957 22.9067V18.8285H16.5175C16.2085 18.8285 15.9121 18.7058 15.6936 18.4873C15.4751 18.2688 15.3523 17.9724 15.3523 17.6634C15.3523 17.3543 15.4751 17.058 15.6936 16.8394C15.9121 16.6209 16.2085 16.4982 16.5175 16.4982H21.7609C21.9139 16.4981 22.0654 16.5282 22.2069 16.5867C22.3483 16.6452 22.4767 16.731 22.585 16.8392C22.6932 16.9475 22.779 17.0759 22.8375 17.2174C22.896 17.3588 22.9261 17.5103 22.926 17.6634V22.9067C22.9261 23.0598 22.896 23.2113 22.8375 23.3527C22.779 23.4941 22.6932 23.6226 22.585 23.7308C22.4767 23.839 22.3483 23.9249 22.2069 23.9834C22.0654 24.0419 21.9139 24.072 21.7609 24.0719Z"
                />
                <path
                  d="M12.5777 24.0717C9.48853 24.0681 6.52693 22.8393 4.34256 20.655C2.15818 18.4706 0.929411 15.509 0.925781 12.4198C0.925781 12.1108 1.04854 11.8144 1.26706 11.5959C1.48557 11.3774 1.78194 11.2546 2.09097 11.2546C2.4 11.2546 2.69637 11.3774 2.91489 11.5959C3.1334 11.8144 3.25616 12.1108 3.25616 12.4198C3.25488 14.4714 3.93089 16.4661 5.17927 18.0942C6.42765 19.7223 8.17857 20.8927 10.1602 21.4238C12.1419 21.9549 14.2435 21.817 16.1388 21.0315C18.034 20.2459 19.617 18.8567 20.6419 17.0794C20.7967 16.812 21.0514 16.6171 21.3499 16.5375C21.6485 16.4579 21.9664 16.5002 22.2338 16.655C22.5012 16.8098 22.6961 17.0645 22.7757 17.3631C22.8553 17.6616 22.813 17.9796 22.6582 18.2469C21.6334 20.014 20.1634 21.4816 18.3947 22.5036C16.626 23.5256 14.6204 24.0663 12.5777 24.0717Z"
                />
              </svg>
            </button>
            <div
              class="text-white font-josefin bg-black group hover:bg-black focus:outline-none font-medium rounded-full min-w-[14rem] px-5 py-2.5 text-left flex items-center max-w-[15rem]"
            >
              <input
                placeholder="search items"
                class="w-full bg-black focus:outline-none"
                v-model="search"
              />
              <svg
                width="19"
                height="19"
                viewBox="0 0 19 19"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                class="ml-2 cursor-pointer fill-white ease-out duration-300 group-hover:scale-125 group-hover:fill-indigo-500"
              >
                <path
                  d="M17.71 16.29L14.31 12.9C15.407 11.5025 16.0022 9.77666 16 8C16 6.41775 15.5308 4.87103 14.6518 3.55544C13.7727 2.23985 12.5233 1.21447 11.0615 0.608967C9.59966 0.00346625 7.99113 -0.15496 6.43928 0.153721C4.88743 0.462403 3.46197 1.22433 2.34315 2.34315C1.22433 3.46197 0.462403 4.88743 0.153721 6.43928C-0.15496 7.99113 0.00346625 9.59966 0.608967 11.0615C1.21447 12.5233 2.23985 13.7727 3.55544 14.6518C4.87103 15.5308 6.41775 16 8 16C9.77666 16.0022 11.5025 15.407 12.9 14.31L16.29 17.71C16.383 17.8037 16.4936 17.8781 16.6154 17.9289C16.7373 17.9797 16.868 18.0058 17 18.0058C17.132 18.0058 17.2627 17.9797 17.3846 17.9289C17.5064 17.8781 17.617 17.8037 17.71 17.71C17.8037 17.617 17.8781 17.5064 17.9289 17.3846C17.9797 17.2627 18.0058 17.132 18.0058 17C18.0058 16.868 17.9797 16.7373 17.9289 16.6154C17.8781 16.4936 17.8037 16.383 17.71 16.29ZM2 8C2 6.81332 2.3519 5.65328 3.01119 4.66658C3.67047 3.67989 4.60755 2.91085 5.7039 2.45673C6.80026 2.0026 8.00666 1.88378 9.17055 2.11529C10.3344 2.3468 11.4035 2.91825 12.2426 3.75736C13.0818 4.59648 13.6532 5.66558 13.8847 6.82946C14.1162 7.99335 13.9974 9.19975 13.5433 10.2961C13.0892 11.3925 12.3201 12.3295 11.3334 12.9888C10.3467 13.6481 9.18669 14 8 14C6.4087 14 4.88258 13.3679 3.75736 12.2426C2.63214 11.1174 2 9.5913 2 8Z"
                />
              </svg>
            </div>
          </div>
          <div class="relative">
            <button
              data-dropdown-toggle="dropdown"
              class="text-white font-josefin bg-black focus:outline-none font-medium rounded-full min-w-[14rem] px-5 py-2.5 text-left flex items-center group relative z-[12] mx-auto"
              type="button"
              @click="openSort = !openSort"
            >
              <span
                class="flex-1 group-hover:text-indigo-500 ease-out duration-300"
              >
                {{ sortItems[0].title }}
              </span>
              <svg
                width="14"
                height="9"
                viewBox="0 0 14 9"
                xmlns="http://www.w3.org/2000/svg"
                class="ease-out duration-300 fill-white group-hover:fill-indigo-500 group-hover:scale-125"
                :class="{ 'rotate-180': openSort }"
              >
                <path
                  d="M6.62073 8.125C6.84752 8.125 7.07398 8.07401 7.27953 7.97329C7.29801 7.96557 7.3153 7.95586 7.33283 7.94628C7.3357 7.94473 7.33722 7.94316 7.33992 7.94161C7.35948 7.9308 7.37915 7.91875 7.39906 7.90701C7.41813 7.8962 7.43591 7.88414 7.45404 7.87193L7.4569 7.87043C7.51343 7.83181 7.56852 7.78993 7.62002 7.74281C7.63719 7.72705 7.65451 7.71038 7.6707 7.69416L12.7129 3.0752C13.2624 2.57183 13.2624 1.76167 12.7129 1.2583C12.1634 0.754931 11.2781 0.754931 10.7286 1.2583L8.01493 3.74416L6.625 5.125L5.22374 3.72979L2.52052 1.25349C1.97103 0.750121 1.08662 0.750121 0.537127 1.25349C-0.0123675 1.75686 -0.01238 2.56782 0.537115 3.07119L5.52962 7.64461L5.53282 7.64772C5.56264 7.68155 5.59399 7.71475 5.62834 7.74611C5.90309 7.9978 6.26216 8.12501 6.62073 8.125Z"
                ></path>
              </svg>
            </button>
            <div
              v-if="openSort"
              class="bg-black text-white font-josefin px-5 py-2.5 text-left grid gap-2 absolute z-[11] w-full top-0 pt-12 pb-4 rounded-3xl"
            >
              <p
                v-for="(item, index) in sortItems.slice(1)"
                class="hover:text-indigo-500 ease-out duration-300"
                @click="chooseSortItem(item, index)"
              >
                {{ item.title }}
              </p>
            </div>
          </div>
        </div>
        <div class="flex flex-wrap justify-center gap-y-2">
          <OfferBox
            v-for="offer in filteredListings"
            :tokenId="offer.listing.tokenId"
            :price="offer.listing.normalizedPrice || offer.listing.price"
            :collection="offer.listing.collection"
            :metadata="offer.metadata"
            class="drop-shadow-2xl"
            @click="toogleOpen(offer.metadata, offer.listing)"
            :marketplace="false"
          />
        </div>
      </div>
    </div>
    <div v-else class="mt-6 text-center" v-if="collectionData">
      <p class="text-2xl font-cal">no tokens for sale</p>
    </div>
  </div>
</template>

<script lang="ts">
import {
  acceptOffer,
  cancelOffer,
  closeTokenListing,
  getCollection,
  getCollectionListings,
  getNftInfo,
  getTokenOffers,
  placeOffer,
  purchaseToken,
} from '../utils/evolve';
import CollectionMarketplaceHeader from './CollectionMarketplaceHeader.vue';
import type { CollectionEntitie } from '../utils/types/CollectionItem';
import type { RecentListings } from '../utils/types/RecentListings';
import OfferBox from './OfferBox.vue';
import {
  aarchToArch,
  archToAarch,
  shortenArchAddress,
  toFixed,
} from '../utils/arch';
import { swapElements } from '../utils/schared';
import ProductsCart from './ProductsCart.vue';
import { BLOCKCHAIN_SCAN_ACCOUNT } from '../utils/constant';
import { useStore } from '@nanostores/vue';
import { walletSignerAddress } from '../state/walletState';
import { computed } from 'vue';
import { getMetadata } from '../utils/utils';

export default {
  components: { CollectionMarketplaceHeader, OfferBox, ProductsCart },
  data() {
    return {
      collectionData: undefined as undefined | CollectionEntitie,
      collectionListings: [] as RecentListings[],
      active: 'listings',
      search: '',
      floor: undefined as undefined | number,
      sort: '',
      openSort: false,
      sortItems: [
        { title: 'ricently listed', value: '' },
        { title: 'price: low to high', value: 'desc' },
        { title: 'price: high to low', value: 'asc' },
      ],
      openToken: false,
      openTokenData: undefined as undefined | RecentListings,
      openTokenMetadata: undefined as undefined | any,
      buyInProgress: false,
      offerPrice: undefined as undefined | any,
      openOfferInput: false,
      openTokenOffers: undefined as undefined | any[],
      openTokenSubPage: 'details',
      paginator: 10,
      listingsMetadata: [] as { listing: RecentListings; metadata: any }[],
      closingInProgress: false,
    };
  },
  props: {
    collectionAddress: {
      type: String,
      required: true,
    },
    denomLogo: {
      type: String,
      default: () => '/arch-logo.svg',
    },
  },
  computed: {
    filteredListings() {
      if (this.listingsMetadata.length > 0) {
        const searchResult = this.listingsMetadata.filter((listing) =>
          listing.listing.tokenId
            .toLowerCase()
            .includes(this.search.toLowerCase()),
        );
        if (this.sort === 'desc')
          return searchResult.sort(
            (l1, l2) => Number(l1.listing.price) - Number(l2.listing.price),
          );
        else if (this.sort === 'asc')
          return searchResult.sort(
            (l1, l2) => Number(l2.listing.price) - Number(l1.listing.price),
          );
        return searchResult;
      }
    },
    blockchainScan() {
      return BLOCKCHAIN_SCAN_ACCOUNT;
    },
  },
  methods: {
    toFixed,
    shortenArchAddress,
    aarchToArch,
    async closeNFTListing() {
      if (this.openTokenData && this.openTokenData?.tokenId) {
        this.closingInProgress = true;
        await closeTokenListing(
          this.collectionAddress,
          this.openTokenData?.tokenId,
        );
        this.closingInProgress = false;
      }
    },
    async makeOffer() {
      if (this.openOfferInput) {
        await this.makeAnOffer();
        this.openOfferInput = false;
        this.openTokenData?.normalizedPrice &&
          (this.offerPrice = this.openTokenData?.normalizedPrice);
      } else {
        this.openTokenData?.normalizedPrice &&
          (this.offerPrice = this.openTokenData?.normalizedPrice);
        this.openOfferInput = true;
      }
    },
    async realoadListings() {
      this.collectionListings = await getCollectionListings(
        this.collectionAddress,
      );
    },
    chooseSortItem(item: any, index: number) {
      swapElements(this.sortItems, 0, index + 1);
      this.sort = item.value;
    },
    async toogleOpen(metadata?: any, offer?: RecentListings) {
      if (this.openToken) {
        this.openTokenMetadata = undefined;
        this.openTokenData = undefined;
        const body = document.querySelector('body');
        body && (body.style.overflow = 'auto');
      } else {
        if (offer) {
          this.openTokenData = offer;
          this.openTokenMetadata = metadata;
          const body = document.querySelector('body');
          body && (body.style.overflow = 'hidden');
          this.listOffers();
        }
      }
      this.openToken = !this.openToken;
    },
    async buyNFT() {
      if (this.openTokenData && this.openTokenData?.tokenId) {
        this.buyInProgress = true;
        await purchaseToken(
          this.collectionAddress,
          this.openTokenData?.tokenId,
          this.openTokenData?.price,
          this.openTokenData?.denom,
        );
      }
      await this.loadMarketData();
      this.buyInProgress = false;
    },
    async makeAnOffer() {
      if (this.openTokenData && this.openTokenData?.tokenId) {
        const price = archToAarch(this.offerPrice);
        await placeOffer(
          this.collectionAddress,
          this.openTokenData?.tokenId,
          price,
          this.openTokenData?.denom,
        );
        const newOffer = {
          from: this.walletSignerAddress,
          offer: { denom: this.openTokenData?.denom, amount: price },
        };
        if (this.openTokenOffers) this.openTokenOffers.push(newOffer);
        else this.openTokenOffers = [newOffer];
      }
    },
    async listOffers() {
      if (
        this.openTokenData?.collection &&
        this.openTokenData?.tokenId &&
        this.openTokenData?.openForOffers
      ) {
        this.openTokenOffers = await getTokenOffers(
          this.openTokenData?.collection,
          this.openTokenData?.tokenId,
        );
      }
    },
    async loadMarketData() {
      const [collectionData, listings] = await Promise.all([
        getCollection(this.collectionAddress),
        getCollectionListings(this.collectionAddress),
      ]);

      this.collectionData = collectionData;
      this.collectionListings = listings.map((listing) => {
        listing.normalizedPrice = aarchToArch(Number(listing.price));
        return listing;
      });

      //console.log('collectionListings', this.collectionListings);
      //listings.forEach((a) => console.log(a.offers));
      /*
      const a = listings.map(async listing => await getNftInfo(listing.collection, listing.tokenId))
      const tokensMetadata = await Promise.all(a);
      console.log(a)
*/
      if (Object.keys(this.collectionListings).length === 0) return;
      this.floor = Math.min(
        ...this.collectionListings.map((item) => Number(item.price)),
      );
    },
    async cancelOfferForToken(offerOwner: string) {
      if (
        this.openTokenData?.collection &&
        this.openTokenData?.tokenId &&
        this.openTokenOffers
      ) {
        await cancelOffer(
          this.openTokenData?.collection,
          this.openTokenData?.tokenId,
        );
        this.openTokenOffers = this.openTokenOffers.filter(function (obj) {
          return obj.from !== offerOwner;
        });
      }
    },
    async acceptOfferForToken(offerOwner: string) {
      if (
        this.openTokenData?.collection &&
        this.openTokenData?.tokenId &&
        this.openTokenOffers
      ) {
        await acceptOffer(
          this.openTokenData?.collection,
          this.openTokenData?.tokenId,
          offerOwner,
        );
        this.openTokenOffers = this.openTokenOffers.filter(function (obj) {
          return obj.from !== offerOwner;
        });
      }
    },
    async getTokenMetadata(collection: string, tokenId: string) {
      const metadataUrl = await getNftInfo(collection, tokenId);
      return await getMetadata(metadataUrl);
    },
    async dynamicLoadOffers() {
      for (
        let index = this.paginator;
        index <= this.collectionListings.length ||
        (this.collectionListings.length <= this.paginator &&
          this.paginator === index);
        index += this.paginator
      ) {
        const paginRecentListings = this.collectionListings.slice(
          index - this.paginator,
          index,
        );

        const fiveListingsMetadata = await Promise.all(
          paginRecentListings.map((listing) =>
            this.getTokenMetadata(listing.collection, listing.tokenId),
          ),
        );
        this.listingsMetadata.push(
          ...paginRecentListings.map((listing, index) => ({
            listing,
            metadata: fiveListingsMetadata[index],
          })),
        );
      }
    },
  },
  async mounted() {
    await this.loadMarketData();
    await this.dynamicLoadOffers();
  },
  setup() {
    const $walletSignerAddress = useStore(walletSignerAddress);

    return {
      walletSignerAddress: computed(() => $walletSignerAddress.value),
    };
  },
};
</script>

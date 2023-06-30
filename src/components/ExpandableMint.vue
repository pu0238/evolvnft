<template>
  <BlackExpandable title="mint nft">
    <div class="mx-4 my-6">
      <p class="font-josefin font-normal text-sm">
        Here you can pre-mint some tokens to your collection. They will
        immediately get transferred to your wallet. Preminted tokens count
        towards your collection's total supply and they will NOT be available
        for use in launchpad.
      </p>
      <Uploader
        class="float-left mt-8 w-full"
        heading="drop files below: (max 100kb)"
        :acceptedTypes="acceptedTypes"
        @acceptFiles="(acceptFiles: any[]) => joinMetadata(acceptFiles)"
      />
    </div>
  </BlackExpandable>
</template>

<script lang="ts">
import Button from './Button.vue';
import BlackExpandable from './BlackExpandable.vue';
import { buildMintObject, joinMetadataAndImages } from '../utils/metadata';
import { getArchwaySigner } from '../utils/wallet';
import type { CollectionEntitie } from '../utils/types/CollectionItem';
import { getCollectionManager } from '../utils/evolve';
import Uploader from './Uploader.vue';

export default {
  components: {
    Button,
    BlackExpandable,
    Uploader,
  },
  data() {
    const imgTypes = ['image/jpeg', 'image/png', 'image/gif'];
    const jsonTypes = ['application/json'];
    return {
      mintingnProgress: false,
      jsonTypes,
      imgTypes,
      acceptedTypes: [...imgTypes, ...jsonTypes],
      filesToUpload: {} as { [key: string]: { image?: any; metadata?: any } },
    };
  },
  props: {
    collectionAddress: {
      type: String,
      required: true,
    },
    collection: {
      type: Object,
      required: true,
    },
  },
  methods: {
    async mintNFTs() {
      this.mintingnProgress = true;
      const { signerAddress, archwaySigner } = await getArchwaySigner();
      const tokens = await buildMintObject(
        signerAddress,
        this.filesToUpload,
        this.collection as CollectionEntitie,
      );
      if (!tokens) return console.error('Failed to mint NFTs');
      const mint_tokens = {
        address: this.collectionAddress,
        tokens,
      };

      const collectionManagerContract = await getCollectionManager();
      const { transactionHash } = await archwaySigner.execute(
        signerAddress,
        collectionManagerContract,
        { mint_tokens },
        'auto',
      );
      console.log(
        `https://testnet.mintscan.io/archway-testnet/txs/${transactionHash}`,
      );
      this.$emit('afterMint');
      this.filesToUpload = {};
      this.mintingnProgress = false;
    },
    joinMetadata(acceptFiles: any[]) {
      this.filesToUpload = joinMetadataAndImages(
        acceptFiles,
        this.imgTypes,
        this.jsonTypes,
      );
    },
  },
};
</script>

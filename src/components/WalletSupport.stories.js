import WalletSupport from './WalletSupport.vue';

export default {
  component: WalletSupport,
  //👇 Our exports that end in "Data" are not stories.
  excludeStories: /.*Data$/,
  title: 'WalletSupport',
};

const Template = (args) => ({
  components: { WalletSupport },
  template: '<WalletSupport />',
});
export const Default = Template.bind({});
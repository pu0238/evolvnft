import OfferBox from './OfferBox.vue';

export default {
  component: OfferBox,
  //👇 Our exports that end in "Data" are not stories.
  excludeStories: /.*Data$/,
  title: 'OfferBox',
};

const Template = (args) => ({
  components: { OfferBox },
  template: '<OfferBox />',
});
export const Default = Template.bind({});

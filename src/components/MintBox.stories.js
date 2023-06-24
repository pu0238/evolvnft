import MintBox from './MintBox.vue';

export default {
  component: MintBox,
  //👇 Our exports that end in "Data" are not stories.
  excludeStories: /.*Data$/,
  title: 'MintBox',
};

const Template = (args) => ({
  components: { MintBox },
  template: '<MintBox />',
});
export const Default = Template.bind({});

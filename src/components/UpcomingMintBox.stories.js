import UpcomingMintBox from './UpcomingMintBox.vue';

export default {
  component: UpcomingMintBox,
  //👇 Our exports that end in "Data" are not stories.
  excludeStories: /.*Data$/,
  title: 'UpcomingMintBox',
};

const Template = (args) => ({
  components: { UpcomingMintBox },
  template: '<UpcomingMintBox />',
});
export const Default = Template.bind({});

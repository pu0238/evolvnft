import InfoBox from './InfoBox.vue';

export default {
  component: InfoBox,
  //👇 Our exports that end in "Data" are not stories.
  excludeStories: /.*Data$/,
  title: 'InfoBox',
};

const Template = (args) => ({
  components: { InfoBox },
  template: '<InfoBox />',
});
export const Default = Template.bind({});

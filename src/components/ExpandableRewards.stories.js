import ExpandableRewards from './ExpandableRewards.vue';

export default {
  component: ExpandableRewards,
  //👇 Our exports that end in "Data" are not stories.
  excludeStories: /.*Data$/,
  title: 'ExpandableRewards',
};

const Template = (args) => ({
  components: { ExpandableRewards },
  template: '<ExpandableRewards />',
});
export const Default = Template.bind({});

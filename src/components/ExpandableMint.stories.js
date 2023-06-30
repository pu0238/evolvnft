import ExpandableMint from './ExpandableMint.vue';

export default {
  component: ExpandableMint,
  //👇 Our exports that end in "Data" are not stories.
  excludeStories: /.*Data$/,
  title: 'ExpandableMint',
};

const Template = (args) => ({
  components: { ExpandableMint },
  template: '<ExpandableMint />',
});
export const Default = Template.bind({});

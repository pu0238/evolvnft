import EvolvMetadata from './EvolvMetadata.vue';

export default {
  component: EvolvMetadata,
  //👇 Our exports that end in "Data" are not stories.
  excludeStories: /.*Data$/,
  title: 'EvolvMetadata'
};

const Template = args => ({
  components: { EvolvMetadata },
  template: '<EvolvMetadata />',
});
export const Default = Template.bind({});
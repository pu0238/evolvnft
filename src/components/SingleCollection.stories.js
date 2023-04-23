import SingleCollection from './SingleCollection.vue';

export default {
  component: SingleCollection,
  //👇 Our exports that end in "Data" are not stories.
  excludeStories: /.*Data$/,
  title: 'SingleCollection'
};

const Template = args => ({
  components: { SingleCollection },
  template: '<SingleCollection />',
});
export const Default = Template.bind({});
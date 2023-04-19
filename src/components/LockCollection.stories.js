import LockCollection from './LockCollection.vue';

export default {
  component: LockCollection,
  //👇 Our exports that end in "Data" are not stories.
  excludeStories: /.*Data$/,
  title: 'LockCollection'
};

const Template = args => ({
  components: { LockCollection },
  template: '<LockCollection />',
});
export const Default = Template.bind({});
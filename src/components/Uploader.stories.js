import Uploader from './Uploader.vue';

export default {
  component: Uploader,
  //👇 Our exports that end in "Data" are not stories.
  excludeStories: /.*Data$/,
  title: 'Uploader',
};

const Template = (args) => ({
  components: { Uploader },
  template: '<Uploader />',
});
export const Default = Template.bind({});

import MetadataEditor from './MetadataEditor.vue';

export default {
  component: MetadataEditor,
  //👇 Our exports that end in "Data" are not stories.
  excludeStories: /.*Data$/,
  title: 'MetadataEditor',
};

const Template = (args) => ({
  components: { MetadataEditor },
  template: '<MetadataEditor />',
});
export const Default = Template.bind({});

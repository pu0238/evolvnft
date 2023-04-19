import InputArea from './InputArea.vue';

export default {
  component: InputArea,
  //👇 Our exports that end in "Data" are not stories.
  excludeStories: /.*Data$/,
  title: 'InputArea'
};

const Template = args => ({
  components: { InputArea },
  template: '<InputArea />',
});
export const Default = Template.bind({});
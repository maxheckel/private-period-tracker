<template>
  <div :class="getClassList()">
    <div class="text-2xl mb-4">{{ questionNumber ? questionNumber + '.' : '' }} {{ questionText }}</div>
    <input
      v-if="questionType === 'text' || questionType === 'number' || questionType === 'date'"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      id="password"
      class="rounded-md text-xl shadow-sm border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 block mt-1 w-full"
      :type="questionType"

      required
    />
    <select
      v-if="questionType === 'boolean'"
      @input="$emit('update:modelValue', $event.target.value === 'true')"
      class="rounded-3xl w-full"
      :value="modelValue"
    >
      <option :value="true">Yes</option>
      <option :value="false">No</option>
    </select>
  </div>
</template>


<script>
export default {
  name: "SetupQuestion",
  emits: ["update:modelValue"],
  props: ["modelValue", "questionType", "questionText", "questionNumber"],
  data() {
    return {
      value: "",
    };
  },
  methods: {
    getClassList(){
      if (this.questionNumber){
        return 'mb-8 p-8 bg-white rounded-2xl w-full text-black shadow-md';
      }
      return 'mb-8 p-8 bg-white bg-opacity-80 rounded-2xl  text-black shadow-md ml-10';
    }
  }
};
</script>

<style scoped></style>

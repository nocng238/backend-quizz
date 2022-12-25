const ob = { a: 1, b: [1, 2] };
const questions = {
  answers: [
    {
      title: 'he',
      isTrue: false,
      _id: '638b854f8827409c2750889f',
    },
    {
      title: 'ha',
      isTrue: false,
      _id: '638b854f8827409c275088a0',
    },
    {
      title: 'ho',
      isTrue: false,
      _id: '638b854f8827409c275088a1',
    },
  ],
  title: 'as',
};
const edit = [
  { _id: '63878dc62f7c8bd41dd8243a', title: 'ANSWER 1' },
  { _id: '63878dc62f7c8bd41dd8243b', title: 'ANSWER1' },
  { _id: '638b83a98827409c275087d2', title: 'hehe' },
];
// const arr = edit.filter((an) => {
//   return an._id;
// });
// console.log(arr.entries());

// const title = "asda"
// if(true){
//   const {title }
// }
const array = [
  { _id: '63878dc62f7c8bd41dd8243a', title: 'ANSWER 1' },
  { _id: '63878dc62f7c8bd41dd8243b', title: 'ANSWER1' },
  { _id: '638b83a98827409c275087d2', title: 'hehe2' },
  { _id: '638b83a98827409c275087d2', title: 'hehe3' },
  { _id: '638b83a98827409c275087d2', title: 'hehe4' },
  { _id: '638b83a98827409c275087d2', title: 'hehe5' },
  { _id: '638b83a98827409c275087d2', title: 'hehe6' },
  { _id: '638b83a98827409c275087d2', title: 'hehe7' },
  { _id: '638b83a98827409c275087d2', title: 'hehe8' },
];
array.sort((a, b) => 0.5 - Math.random());
console.log(array);

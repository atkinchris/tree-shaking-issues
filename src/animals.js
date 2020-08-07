import { compose } from 'recompose'

// Should be included in bundle
function cat() {
  return "🐈"
}

cat.noise = "meow"

const Cat = compose()(cat)

// Should not be included in bundle, but will be as our test case
function dog() {
  return "🐕"
}

dog.noise = "woof"

const Dog = compose()(dog)

// Should not be included in bundle, but will be because of static property assignment
function cow() {
  return "🐄"
}

cow.noise = "moo"

const Cow = cow

// Should not be included in bundle, but will be because of side effect ambiguity
function horse() {
  return "🐎"
}

const Horse = compose()(horse)

// Will not be included in bundle, because no static property and PURE annotation for function call
function sheep() {
  return "🐑"
}

const Sheep = /*#__PURE__*/compose()(sheep)

export { Cat, Dog, Cow, Horse, Sheep }

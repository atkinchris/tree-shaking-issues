const { minify } = require('terser')

it('successfully minifies without static and assignment', async () => {
  const result = await minify(`
    (function() {
      function cat() { return "🐈" }
      cat.noise = "meow"
      const Cat = cat

      function dog() { return "🐕" }
      // dog.noise = "woof"
      const Dog = dog

      console.log(Cat.noise)
    })()
  `)

  expect(result.code).toMatch(/🐈/)
  expect(result.code).not.toMatch(/🐕/)
})

it('successfully minifies with static property only', async () => {
  const result = await minify(`
    (function() {
      function cat() { return "🐈" }
      cat.noise = "meow"
      const Cat = cat

      function Dog() { return "🐕" }
      Dog.noise = "woof"
      // const Dog = dog

      console.log(Cat.noise)
    })()
  `)

  expect(result.code).toMatch(/🐈/)
  expect(result.code).not.toMatch(/🐕/)
})

it('successfully minifies with assignment only', async () => {
  const result = await minify(`
    (function() {
      function cat() { return "🐈" }
      cat.noise = "meow"
      const Cat = cat

      function dog() { return "🐕" }
      // dog.noise = "woof"
      const Dog = dog

      console.log(Cat.noise)
    })()
  `)

  expect(result.code).toMatch(/🐈/)
  expect(result.code).not.toMatch(/🐕/)
})

it('fails to minify with static property and assignment', async () => {
  const result = await minify(`
    (function() {
      function cat() { return "🐈" }
      cat.noise = "meow"
      const Cat = cat

      function dog() { return "🐕" }
      dog.noise = "woof"
      const Dog = dog

      console.log(Cat.noise)
    })()
  `)

  expect(result.code).toMatch(/🐈/)
  expect(result.code).not.toMatch(/🐕/)
})

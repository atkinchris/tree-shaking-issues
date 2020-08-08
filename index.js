const { minify } = require('terser')

async function test() {
  // Test Case: Passing
  let result = await minify(`
    (function() {
      function cat() { return "🐈" }
      // cat.noise = "meow"
      // const Cat = cat
    })()
  `)

  console.log('minifies without static and assignment', !result.code.includes('🐈'))

  // Test Case: Passing
  result = await minify(`
    (function() {
      function cat() { return "🐈" }
      cat.noise = "meow"
      // const Cat = cat
    })()
  `)

  console.log('minifies with static property only', !result.code.includes('🐈'))

  // Test Case: Passing
  result = await minify(`
    (function() {
      function cat() { return "🐈" }
      // cat.noise = "meow"
      const Cat = cat
    })()
  `)

  console.log('minifies with assignment only', !result.code.includes('🐈'))

  // Test Case: Failing
  result = await minify(`
    (function() {
      function cat() { return "🐈" }
      cat.noise = "meow"
      const Cat = cat
    })()
  `)

  console.log('minifies with both static property and assignment', !result.code.includes('🐈'))

  // Test Case: Failed
  result = await minify(`
    (function() {
      function cat() { return "🐈" }
      cat.noise = "meow"
      cat.name = "Catrick"
      // const Cat = cat
    })()
  `)

  console.log('minifies with multiple static properties', !result.code.includes('🐈'))
}

test().catch(console.error)

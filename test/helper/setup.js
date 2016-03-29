/**
 * Setup fixtures.
 *
 * @param {String} fixture Fixture file to load (defaults to default.html).
 */
function setup(fixture) {
  const content = document.createElement('div')

  switch (fixture) {
    default:
      content.innerHTML = require('../fixtures/default.html')
  }

  document.body.appendChild(content)
}

export default setup

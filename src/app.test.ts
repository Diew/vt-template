import { expect, test, describe } from 'vitest'
import { getByText } from '@testing-library/dom'

describe('Application Template Tests', () => {
  test('TDD System Check: Logic', () => {
    expect(1 + 1).toBe(2)
  })

  test('TDD System Check: DOM', () => {
    document.body.innerHTML = `
      <div id="app">
        <h1>Hello TDD</h1>
      </div>
    `
    const app = document.getElementById('app')
    expect(app).not.toBeNull()
    expect(getByText(document.body, 'Hello TDD')).toBeDefined()
  })
})

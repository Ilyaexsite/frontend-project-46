import { fileURLToPath } from 'url'
import path from 'path'
import fs from 'fs'
import genDiff from '../src/gendiff.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename)

test('gendiff yaml files', () => {
  const file1 = getFixturePath('file1.yml')
  const file2 = getFixturePath('file2.yml')
  
  const expected = `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`

  expect(genDiff(file1, file2)).toBe(expected);
})

test('gendiff json and yaml files', () => {
  const jsonFile = getFixturePath('file1.json')
  const yamlFile = getFixturePath('file1.yml')
  const result = genDiff(jsonFile, yamlFile)
  expect(result).toContain('host: hexlet.io')
  expect(result).toContain('timeout: 50')
})

test('throws error for unsupported format', () => {
  const unsupportedFile = getFixturePath('file1.txt')
  const jsonFile = getFixturePath('file1.json')
  
  expect(() => genDiff(unsupportedFile, jsonFile)).toThrow('Unsupported file format')
})

export default {
  '**/*.{ts,tsx}': ['eslint --fix', 'prettier --write'],
  '**/*.{json,md}': ['prettier --write'],
};

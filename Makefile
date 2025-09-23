test:
	npx jest

test-coverage:
	npx jest --coverage --coverageProvider=v8

lint:
	npx eslint .

lint-fix:
	npx eslint --fix .

install:
	npm install

publish:
	npm publish --dry-run
	
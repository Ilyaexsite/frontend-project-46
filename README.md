### Hexlet tests and linter status:
[![Actions Status](https://github.com/Ilyaexsite/frontend-project-46/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/Ilyaexsite/frontend-project-46/actions)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=Ilyaexsite_frontend-project-46&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=Ilyaexsite_frontend-project-46)
[![Bugs](https://sonarcloud.io/api/project_badges/measure?project=Ilyaexsite_frontend-project-46&metric=bugs)](https://sonarcloud.io/summary/new_code?id=Ilyaexsite_frontend-project-46)
[![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=Ilyaexsite_frontend-project-46&metric=code_smells)](https://sonarcloud.io/summary/new_code?id=Ilyaexsite_frontend-project-46)
[![Duplicated Lines (%)](https://sonarcloud.io/api/project_badges/measure?project=Ilyaexsite_frontend-project-46&metric=duplicated_lines_density)](https://sonarcloud.io/summary/new_code?id=Ilyaexsite_frontend-project-46)
[![Test Coverage](https://sonarcloud.io/api/project_badges/measure?project=Ilyaexsite_frontend-project-46&metric=coverage)](https://sonarcloud.io/summary/new_code?id=Ilyaexsite_frontend-project-46)
[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=Ilyaexsite_frontend-project-46&metric=sqale_rating)](https://sonarcloud.io/summary/new_code?id=Ilyaexsite_frontend-project-46)
[![Technical Debt](https://sonarcloud.io/api/project_badges/measure?project=Ilyaexsite_frontend-project-46&metric=sqale_index)](https://sonarcloud.io/summary/new_code?id=Ilyaexsite_frontend-project-46)
[![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=Ilyaexsite_frontend-project-46&metric=security_rating)](https://sonarcloud.io/summary/new_code?id=Ilyaexsite_frontend-project-46)
[![Reliability Rating](https://sonarcloud.io/api/project_badges/measure?project=Ilyaexsite_frontend-project-46&metric=reliability_rating)](https://sonarcloud.io/summary/new_code?id=Ilyaexsite_frontend-project-46)

## Минимальные требования
    Node.js (версия 18 или выше)
    npm v9+

## Установка

```bash
make install
```

## Тест

```bash
make test
```

## link proj

```bash
make link
```

# Запуск тестов с покрытием

```bash
make test-coverage
```

# Запуск в watch режиме

```bash
npm run test:watch
```

## Supported Formats
- JSON (.json)
- YAML (.yml, .yaml)

## Examples

# Compare two YAML files
```bash
gendiff __fixtures__/file1.yml __fixtures__/file2.yml
```

# Compare JSON and YAML
```bash
gendiff __fixtures__/file1.json __fixtures__/file2.yml
```

# Compare YAML and JSON
```bash
gendiff __fixtures__/file1.yml __fixtures__/file2.json
```
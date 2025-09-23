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

## Supported Formats
- JSON (.json)
- YAML (.yml, .yaml)

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
make run test:watch
```

# Вывод справки
```bash
gendiff -h
(https://github.com/Ilyaexsite/frontend-project-46/blob/main/screenshots/%D0%92%D1%8B%D0%B2%D0%BE%D0%B4%20%D1%81%D0%BF%D1%80%D0%B0%D0%B2%D0%BA%D0%B8.jpg)
```

## Examples

# Compare two YAML files
```bash
gendiff __fixtures__/file1_flat.yml __fixtures__/file2_flat.yml
(https://github.com/Ilyaexsite/frontend-project-46/blob/main/screenshots/%D0%A1%D1%80%D0%B0%D0%B2%D0%BD%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%B4%D0%B2%D1%83%D1%85%20%D1%84%D0%B0%D0%B9%D0%BB%D0%BE%D0%B2%20YAML.jpg)
```

# Compare JSON and YAML
```bash
gendiff __fixtures__/file1_flat.json __fixtures__/file2_flat.yml
(https://github.com/Ilyaexsite/frontend-project-46/blob/main/screenshots/%D0%A1%D1%80%D0%B0%D0%B2%D0%BD%D0%B8%D1%82%D0%B5%20JSON%20%D0%B8%20YAML.png)
```

# Compare YAML and JSON
```bash
gendiff __fixtures__/file1_nested.yaml __fixtures__/file2_nested.json
(https://github.com/Ilyaexsite/frontend-project-46/blob/main/screenshots/%D0%A1%D1%80%D0%B0%D0%B2%D0%BD%D0%B8%D1%82%D0%B5%20YAML%20%D0%B8%20JSON.jpg)
```

## JSON Output Example
```bash
gendiff --format json __fixtures__/file1_flat.json __fixtures__/file2_flat.json
(https://github.com/Ilyaexsite/frontend-project-46/blob/main/screenshots/%D0%9F%D1%80%D0%B8%D0%BC%D0%B5%D1%80%20%D0%B2%D1%8B%D0%B2%D0%BE%D0%B4%D0%B0%20JSON.jpg)
```
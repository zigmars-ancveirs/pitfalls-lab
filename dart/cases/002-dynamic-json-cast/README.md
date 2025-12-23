# 002 — `dynamic` JSON casts fail at runtime (validate at boundary)

## Pitfall
Parsing JSON to `dynamic` / `Map` and assuming fields exist with correct types.
Runtime casts blow up or logic silently breaks.

## Symptoms
- `type 'int' is not a subtype of type 'String'`
- crashes deep inside logic, far from IO boundary

## Root cause
No runtime validation at boundary; `dynamic` postpones errors.

## Fix
- Parse as `Object?` and validate shape explicitly
- Provide clear errors (`FormatException`)
- In production apps, consider codegen (`json_serializable`) for scale

## Evidence
- invalid payload is rejected with `FormatException`
- valid payload parses correctly

## Run
```bash
cd repro && dart pub get && dart test
cd ../fix && dart pub get && dart test
```

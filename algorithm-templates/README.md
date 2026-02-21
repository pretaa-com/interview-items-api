# Algorithm templates: same structure

This folder contains **alternative language tracks** for the algorithm segment of the interview. The **default** is Node/Bun: implement `sameStructureAs` in `backend/src/sameStructureAs.ts` and run the full-stack app. If you prefer another language for the algorithm only, use one of the templates here.

## Spec (same in all languages)

Implement a function that returns **true** if and only if `other` is an array and has the **same nesting structure and same lengths of nested arrays** as `thisArray`. Element values do not matter; only the shapes of the arrays do.

- **Same structure:** same number of elements at each level, and each element is either both primitives (or non-arrays) or both arrays with the same structure recursively.
- **Not same structure:** different lengths at any level, or one is an array and the other isn’t, or structure/nesting differs.

See the root [README.md](../README.md) for examples and the full problem statement.

## Languages and how to run tests

| Language | Directory | Run tests |
|----------|-----------|-----------|
| **Python** | `python/` | `cd python && pip install pytest && pytest` |
| **Kotlin** | `kotlin/` | `cd kotlin && ./gradlew test` |
| **Java** | `java/` | `cd java && ./gradlew test` |
| **C#** | `csharp/` | `cd csharp && dotnet test` |
| **Go** | `go/` | `cd go && go test ./...` |
| **Swift** | `swift/` | `cd swift && swift test` |
| **Rust** | `rust/` | `cd rust && cargo test` |

Each subfolder has a stub implementation and the same 25 test cases. Implement the function so all tests pass.

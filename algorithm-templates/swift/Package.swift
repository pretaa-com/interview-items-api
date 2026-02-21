// swift-tools-version: 5.9
import PackageDescription

let package = Package(
    name: "SameStructureAs",
    targets: [
        .target(name: "SameStructureAs"),
        .testTarget(
            name: "SameStructureAsTests",
            dependencies: ["SameStructureAs"]
        ),
    ]
)

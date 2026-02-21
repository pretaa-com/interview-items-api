import XCTest
@testable import SameStructureAs

final class SameStructureAsTests: XCTestCase {

    func testFlatThreeVsThreeTrue() {
        XCTAssertTrue(sameStructureAs([1, 1, 1], other: [2, 2, 2]))
    }

    func testNestedOnePlusTwoVsSameTrue() {
        XCTAssertTrue(sameStructureAs([1, [1, 1]], other: [2, [2, 2]]))
    }

    func testNestedDifferentOrderFalse() {
        XCTAssertFalse(sameStructureAs([1, [1, 1]], other: [[2, 2], 2]))
    }

    func testNestedDifferentInnerLengthFalse() {
        XCTAssertFalse(sameStructureAs([1, [1, 1]], other: [2, [2]]))
    }

    func testDoubleEmptyPairsTrue() {
        XCTAssertTrue(sameStructureAs([[[], []]], other: [[[], []]]))
    }

    func testDoubleEmptyVsTwoPrimitivesFalse() {
        XCTAssertFalse(sameStructureAs([[[], []]], other: [[1, 1]]))
    }

    func testDeepTripleNestedTrue() {
        XCTAssertTrue(sameStructureAs([1, [[[1]]]], other: [2, [[[2]]]]))
    }

    func testEmptyVsIntFalse() {
        XCTAssertFalse(sameStructureAs([], other: 1))
    }

    func testEmptyVsDictFalse() {
        XCTAssertFalse(sameStructureAs([], other: [String: Int]()))
    }

    func testFlatWithStringsSameLengthTrue() {
        XCTAssertTrue(sameStructureAs([1, "[", "]"], other: ["[", "]", 1]))
    }

    func testFlatVsNestedFirstFalse() {
        XCTAssertFalse(sameStructureAs([1, 2], other: [[3], 3]))
    }

    func testStringVsArrayInSameSlotFalse() {
        XCTAssertFalse(sameStructureAs([1, "[1,2]"], other: [2, [4, 5]]))
    }

    func testStringifiedValuesSameStructureTrue() {
        XCTAssertTrue(sameStructureAs([1, "[1,2,3]", "{}"], other: [2, "[4,5,6]", "[]"]))
    }

    func testArrayVsStringifiedArrayFalse() {
        XCTAssertFalse(sameStructureAs([1, 2, 3], other: "[1,2,3]"))
    }

    func testStringBracketsVsRealArrayFalse() {
        XCTAssertFalse(sameStructureAs(["[]", 1], other: [[], 1]))
    }

    func testBothSingleNonArrayTrue() {
        XCTAssertTrue(sameStructureAs(["{}"], other: ["[]"]))
    }

    func testFlatLengthThreeTrue() {
        XCTAssertTrue(sameStructureAs(["a", "b", "c"], other: ["x", "y", "z"]))
    }

    func testNestedPrimPrimArrayTrue() {
        XCTAssertTrue(sameStructureAs([1, "x", [2, "y"]], other: [0, "a", [1, "b"]]))
    }

    func testSingleElementArraysTrue() {
        XCTAssertTrue(sameStructureAs(["only"], other: [1]))
    }

    func testDeepSingleChainFiveLevelsTrue() {
        XCTAssertTrue(sameStructureAs([[[[[1]]]]], other: [[[[[2]]]]]))
    }

    func testThreeByTwoMatrixTrue() {
        XCTAssertTrue(sameStructureAs(
            [[1, 2], [3, 4], [5, 6]],
            other: [[7, 8], [9, 10], [11, 12]]
        ))
    }

    func testTreeTwoBranchesTrue() {
        XCTAssertTrue(sameStructureAs(
            [[[1], [2, 3]], [[4], [5, 6]]],
            other: [[[7], [8, 9]], [[10], [11, 12]]]
        ))
    }

    func testTreeOneInnerWrongLengthFalse() {
        XCTAssertFalse(sameStructureAs(
            [[[1], [2, 3]], [[4], [5, 6]]],
            other: [[[7], [8, 9]], [[10], [11, 12, 13]]]
        ))
    }

    func testDeepEmptyArraysMultipleLevelsTrue() {
        XCTAssertTrue(sameStructureAs(
            [1, [2, [], [3, []]]],
            other: [4, [5, [], [6, []]]]
        ))
    }

    func testFiveEmptyArraysTrue() {
        XCTAssertTrue(sameStructureAs([[], [], [], [], []], other: [[], [], [], [], []]))
    }

    func testSingleChainDepthFiveSameTrue() {
        XCTAssertTrue(sameStructureAs(
            [1, [2, [3, [4, [5]]]]],
            other: [6, [7, [8, [9, [10]]]]]
        ))
    }

    func testSingleChainDepthFiveExtraAtLeafFalse() {
        XCTAssertFalse(sameStructureAs(
            [1, [2, [3, [4, [5]]]]],
            other: [6, [7, [8, [9, [10, 11]]]]]
        ))
    }

    func testTwoByTwoMatrixOfArraysTrue() {
        XCTAssertTrue(sameStructureAs(
            [[[1, 2], [3, 4]], [[5, 6], [7, 8]]],
            other: [[[9, 10], [11, 12]], [[13, 14], [15, 16]]]
        ))
    }

    func testBranchingWithEmptyAtTipTrue() {
        XCTAssertTrue(sameStructureAs(
            [[1, [2, []]], [3, 4]],
            other: [[5, [6, []]], [7, 8]]
        ))
    }
}

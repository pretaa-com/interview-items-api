package algorithm;

import org.junit.jupiter.api.Test;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;

class SameStructureAsTest {

    @Test
    void flatThreeVsThreeTrue() {
        assertEquals(true, SameStructureAs.sameStructureAs(List.of(1, 1, 1), List.of(2, 2, 2)));
    }

    @Test
    void nestedOnePlusTwoVsSameTrue() {
        assertEquals(true, SameStructureAs.sameStructureAs(List.of(1, List.of(1, 1)), List.of(2, List.of(2, 2))));
    }

    @Test
    void nestedDifferentOrderFalse() {
        assertEquals(false, SameStructureAs.sameStructureAs(List.of(1, List.of(1, 1)), List.of(List.of(2, 2), 2)));
    }

    @Test
    void nestedDifferentInnerLengthFalse() {
        assertEquals(false, SameStructureAs.sameStructureAs(List.of(1, List.of(1, 1)), List.of(2, List.of(2))));
    }

    @Test
    void doubleEmptyPairsTrue() {
        assertEquals(true, SameStructureAs.sameStructureAs(
            List.of(List.of(List.of(), List.of())),
            List.of(List.of(List.of(), List.of()))
        ));
    }

    @Test
    void doubleEmptyVsTwoPrimitivesFalse() {
        assertEquals(false, SameStructureAs.sameStructureAs(
            List.of(List.of(List.of(), List.of())),
            List.of(List.of(1, 1))
        ));
    }

    @Test
    void deepTripleNestedTrue() {
        assertEquals(true, SameStructureAs.sameStructureAs(
            List.of(1, List.of(List.of(List.of(1)))),
            List.of(2, List.of(List.of(List.of(2))))
        ));
    }

    @Test
    void emptyVsIntFalse() {
        assertEquals(false, SameStructureAs.sameStructureAs(List.of(), 1));
    }

    @Test
    void emptyVsMapFalse() {
        assertEquals(false, SameStructureAs.sameStructureAs(List.of(), new java.util.HashMap<>()));
    }

    @Test
    void flatWithStringsSameLengthTrue() {
        assertEquals(true, SameStructureAs.sameStructureAs(List.of(1, "[", "]"), List.of("[", "]", 1)));
    }

    @Test
    void flatVsNestedFirstFalse() {
        assertEquals(false, SameStructureAs.sameStructureAs(List.of(1, 2), List.of(List.of(3), 3)));
    }

    @Test
    void stringVsArrayInSameSlotFalse() {
        assertEquals(false, SameStructureAs.sameStructureAs(List.of(1, "[1,2]"), List.of(2, List.of(4, 5))));
    }

    @Test
    void stringifiedValuesSameStructureTrue() {
        assertEquals(true, SameStructureAs.sameStructureAs(
            List.of(1, "[1,2,3]", "{}"),
            List.of(2, "[4,5,6]", "[]")
        ));
    }

    @Test
    void arrayVsStringifiedArrayFalse() {
        assertEquals(false, SameStructureAs.sameStructureAs(List.of(1, 2, 3), "[1,2,3]"));
    }

    @Test
    void stringBracketsVsRealArrayFalse() {
        assertEquals(false, SameStructureAs.sameStructureAs(List.of("[]", 1), List.of(List.of(), 1)));
    }

    @Test
    void bothSingleNonArrayTrue() {
        assertEquals(true, SameStructureAs.sameStructureAs(List.of("{}"), List.of("[]")));
    }

    @Test
    void flatLengthThreeTrue() {
        assertEquals(true, SameStructureAs.sameStructureAs(List.of("a", "b", "c"), List.of("x", "y", "z")));
    }

    @Test
    void nestedPrimPrimArrayTrue() {
        assertEquals(true, SameStructureAs.sameStructureAs(
            List.of(1, "x", List.of(2, "y")),
            List.of(0, "a", List.of(1, "b"))
        ));
    }

    @Test
    void singleElementArraysTrue() {
        assertEquals(true, SameStructureAs.sameStructureAs(List.of("only"), List.of(1)));
    }

    @Test
    void deepSingleChainFiveLevelsTrue() {
        assertEquals(true, SameStructureAs.sameStructureAs(
            List.of(List.of(List.of(List.of(List.of(1))))),
            List.of(List.of(List.of(List.of(List.of(2)))))
        ));
    }

    @Test
    void threeByTwoMatrixTrue() {
        assertEquals(true, SameStructureAs.sameStructureAs(
            List.of(List.of(1, 2), List.of(3, 4), List.of(5, 6)),
            List.of(List.of(7, 8), List.of(9, 10), List.of(11, 12))
        ));
    }

    @Test
    void treeTwoBranchesTrue() {
        assertEquals(true, SameStructureAs.sameStructureAs(
            List.of(List.of(List.of(1), List.of(2, 3)), List.of(List.of(4), List.of(5, 6))),
            List.of(List.of(List.of(7), List.of(8, 9)), List.of(List.of(10), List.of(11, 12)))
        ));
    }

    @Test
    void treeOneInnerWrongLengthFalse() {
        assertEquals(false, SameStructureAs.sameStructureAs(
            List.of(List.of(List.of(1), List.of(2, 3)), List.of(List.of(4), List.of(5, 6))),
            List.of(List.of(List.of(7), List.of(8, 9)), List.of(List.of(10), List.of(11, 12, 13)))
        ));
    }

    @Test
    void deepEmptyArraysMultipleLevelsTrue() {
        assertEquals(true, SameStructureAs.sameStructureAs(
            List.of(1, List.of(2, List.of(), List.of(3, List.of()))),
            List.of(4, List.of(5, List.of(), List.of(6, List.of())))
        ));
    }

    @Test
    void fiveEmptyArraysTrue() {
        assertEquals(true, SameStructureAs.sameStructureAs(
            List.of(List.of(), List.of(), List.of(), List.of(), List.of()),
            List.of(List.of(), List.of(), List.of(), List.of(), List.of())
        ));
    }

    @Test
    void singleChainDepthFiveSameTrue() {
        assertEquals(true, SameStructureAs.sameStructureAs(
            List.of(1, List.of(2, List.of(3, List.of(4, List.of(5))))),
            List.of(6, List.of(7, List.of(8, List.of(9, List.of(10)))))
        ));
    }

    @Test
    void singleChainDepthFiveExtraAtLeafFalse() {
        assertEquals(false, SameStructureAs.sameStructureAs(
            List.of(1, List.of(2, List.of(3, List.of(4, List.of(5))))),
            List.of(6, List.of(7, List.of(8, List.of(9, List.of(10, 11)))))
        ));
    }

    @Test
    void twoByTwoMatrixOfArraysTrue() {
        assertEquals(true, SameStructureAs.sameStructureAs(
            List.of(List.of(List.of(1, 2), List.of(3, 4)), List.of(List.of(5, 6), List.of(7, 8))),
            List.of(List.of(List.of(9, 10), List.of(11, 12)), List.of(List.of(13, 14), List.of(15, 16)))
        ));
    }

    @Test
    void branchingWithEmptyAtTipTrue() {
        assertEquals(true, SameStructureAs.sameStructureAs(
            List.of(List.of(1, List.of(2, List.of())), List.of(3, 4)),
            List.of(List.of(5, List.of(6, List.of())), List.of(7, 8))
        ));
    }
}

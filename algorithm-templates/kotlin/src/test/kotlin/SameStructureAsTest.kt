import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Test
import algorithm.sameStructureAs

class SameStructureAsTest {

    @Test
    fun flatThreeVsThreeTrue() {
        assertEquals(true, sameStructureAs(listOf(1, 1, 1), listOf(2, 2, 2)))
    }

    @Test
    fun nestedOnePlusTwoVsSameTrue() {
        assertEquals(true, sameStructureAs(listOf(1, listOf(1, 1)), listOf(2, listOf(2, 2))))
    }

    @Test
    fun nestedDifferentOrderFalse() {
        assertEquals(false, sameStructureAs(listOf(1, listOf(1, 1)), listOf(listOf(2, 2), 2)))
    }

    @Test
    fun nestedDifferentInnerLengthFalse() {
        assertEquals(false, sameStructureAs(listOf(1, listOf(1, 1)), listOf(2, listOf(2))))
    }

    @Test
    fun doubleEmptyPairsTrue() {
        assertEquals(true, sameStructureAs(listOf(listOf(listOf<Any?>(), listOf<Any?>())), listOf(listOf(listOf<Any?>(), listOf<Any?>()))))
    }

    @Test
    fun doubleEmptyVsTwoPrimitivesFalse() {
        assertEquals(false, sameStructureAs(listOf(listOf(listOf<Any?>(), listOf<Any?>())), listOf(listOf(1, 1))))
    }

    @Test
    fun deepTripleNestedTrue() {
        assertEquals(true, sameStructureAs(listOf(1, listOf(listOf(listOf(1)))), listOf(2, listOf(listOf(listOf(2))))))
    }

    @Test
    fun emptyVsIntFalse() {
        assertEquals(false, sameStructureAs(emptyList(), 1))
    }

    @Test
    fun emptyVsMapFalse() {
        assertEquals(false, sameStructureAs(emptyList<Any?>(), emptyMap<Any, Any>()))
    }

    @Test
    fun flatWithStringsSameLengthTrue() {
        assertEquals(true, sameStructureAs(listOf(1, "[", "]"), listOf("[", "]", 1)))
    }

    @Test
    fun flatVsNestedFirstFalse() {
        assertEquals(false, sameStructureAs(listOf(1, 2), listOf(listOf(3), 3)))
    }

    @Test
    fun stringVsArrayInSameSlotFalse() {
        assertEquals(false, sameStructureAs(listOf(1, "[1,2]"), listOf(2, listOf(4, 5))))
    }

    @Test
    fun stringifiedValuesSameStructureTrue() {
        assertEquals(true, sameStructureAs(listOf(1, "[1,2,3]", "{}"), listOf(2, "[4,5,6]", "[]")))
    }

    @Test
    fun arrayVsStringifiedArrayFalse() {
        assertEquals(false, sameStructureAs(listOf(1, 2, 3), "[1,2,3]"))
    }

    @Test
    fun stringBracketsVsRealArrayFalse() {
        assertEquals(false, sameStructureAs(listOf("[]", 1), listOf(emptyList<Any?>(), 1)))
    }

    @Test
    fun bothSingleNonArrayTrue() {
        assertEquals(true, sameStructureAs(listOf("{}"), listOf("[]")))
    }

    @Test
    fun flatLengthThreeTrue() {
        assertEquals(true, sameStructureAs(listOf("a", "b", "c"), listOf("x", "y", "z")))
    }

    @Test
    fun nestedPrimPrimArrayTrue() {
        assertEquals(true, sameStructureAs(listOf(1, "x", listOf(2, "y")), listOf(0, "a", listOf(1, "b"))))
    }

    @Test
    fun singleElementArraysTrue() {
        assertEquals(true, sameStructureAs(listOf("only"), listOf(1)))
    }

    @Test
    fun deepSingleChainFiveLevelsTrue() {
        assertEquals(true, sameStructureAs(listOf(listOf(listOf(listOf(listOf(1))))), listOf(listOf(listOf(listOf(listOf(2))))))))
    }

    @Test
    fun threeByTwoMatrixTrue() {
        assertEquals(true, sameStructureAs(
            listOf(listOf(1, 2), listOf(3, 4), listOf(5, 6)),
            listOf(listOf(7, 8), listOf(9, 10), listOf(11, 12))
        ))
    }

    @Test
    fun treeTwoBranchesTrue() {
        assertEquals(true, sameStructureAs(
            listOf(listOf(listOf(1), listOf(2, 3)), listOf(listOf(4), listOf(5, 6))),
            listOf(listOf(listOf(7), listOf(8, 9)), listOf(listOf(10), listOf(11, 12)))
        ))
    }

    @Test
    fun treeOneInnerWrongLengthFalse() {
        assertEquals(false, sameStructureAs(
            listOf(listOf(listOf(1), listOf(2, 3)), listOf(listOf(4), listOf(5, 6))),
            listOf(listOf(listOf(7), listOf(8, 9)), listOf(listOf(10), listOf(11, 12, 13)))
        ))
    }

    @Test
    fun deepEmptyArraysMultipleLevelsTrue() {
        assertEquals(true, sameStructureAs(
            listOf(1, listOf(2, listOf<Any?>(), listOf(3, listOf<Any?>()))),
            listOf(4, listOf(5, listOf<Any?>(), listOf(6, listOf<Any?>())))
        ))
    }

    @Test
    fun fiveEmptyArraysTrue() {
        assertEquals(true, sameStructureAs(
            listOf(emptyList<Any?>(), emptyList(), emptyList(), emptyList(), emptyList()),
            listOf(emptyList<Any?>(), emptyList(), emptyList(), emptyList(), emptyList())
        ))
    }

    @Test
    fun singleChainDepthFiveSameTrue() {
        assertEquals(true, sameStructureAs(
            listOf(1, listOf(2, listOf(3, listOf(4, listOf(5))))),
            listOf(6, listOf(7, listOf(8, listOf(9, listOf(10)))))
        ))
    }

    @Test
    fun singleChainDepthFiveExtraAtLeafFalse() {
        assertEquals(false, sameStructureAs(
            listOf(1, listOf(2, listOf(3, listOf(4, listOf(5))))),
            listOf(6, listOf(7, listOf(8, listOf(9, listOf(10, 11)))))
        ))
    }

    @Test
    fun twoByTwoMatrixOfArraysTrue() {
        assertEquals(true, sameStructureAs(
            listOf(listOf(listOf(1, 2), listOf(3, 4)), listOf(listOf(5, 6), listOf(7, 8))),
            listOf(listOf(listOf(9, 10), listOf(11, 12)), listOf(listOf(13, 14), listOf(15, 16)))
        ))
    }

    @Test
    fun branchingWithEmptyAtTipTrue() {
        assertEquals(true, sameStructureAs(
            listOf(listOf(1, listOf(2, listOf<Any?>())), listOf(3, 4)),
            listOf(listOf(5, listOf(6, listOf<Any?>())), listOf(7, 8))
        ))
    }
}

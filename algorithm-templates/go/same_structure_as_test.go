package same_structure_as

import (
	"testing"
)

func TestFlatThreeVsThreeTrue(t *testing.T) {
	if !SameStructureAs([]interface{}{1, 1, 1}, []interface{}{2, 2, 2}) {
		t.Error("expected true")
	}
}

func TestNestedOnePlusTwoVsSameTrue(t *testing.T) {
	if !SameStructureAs([]interface{}{1, []interface{}{1, 1}}, []interface{}{2, []interface{}{2, 2}}) {
		t.Error("expected true")
	}
}

func TestNestedDifferentOrderFalse(t *testing.T) {
	if SameStructureAs([]interface{}{1, []interface{}{1, 1}}, []interface{}{[]interface{}{2, 2}, 2}) {
		t.Error("expected false")
	}
}

func TestNestedDifferentInnerLengthFalse(t *testing.T) {
	if SameStructureAs([]interface{}{1, []interface{}{1, 1}}, []interface{}{2, []interface{}{2}}) {
		t.Error("expected false")
	}
}

func TestDoubleEmptyPairsTrue(t *testing.T) {
	if !SameStructureAs(
		[]interface{}{[]interface{}{[]interface{}{}, []interface{}{}}},
		[]interface{}{[]interface{}{[]interface{}{}, []interface{}{}}},
	) {
		t.Error("expected true")
	}
}

func TestDoubleEmptyVsTwoPrimitivesFalse(t *testing.T) {
	if SameStructureAs(
		[]interface{}{[]interface{}{[]interface{}{}, []interface{}{}}},
		[]interface{}{[]interface{}{1, 1}},
	) {
		t.Error("expected false")
	}
}

func TestDeepTripleNestedTrue(t *testing.T) {
	if !SameStructureAs(
		[]interface{}{1, []interface{}{[]interface{}{[]interface{}{1}}}},
		[]interface{}{2, []interface{}{[]interface{}{[]interface{}{2}}}},
	) {
		t.Error("expected true")
	}
}

func TestEmptyVsIntFalse(t *testing.T) {
	if SameStructureAs([]interface{}{}, 1) {
		t.Error("expected false")
	}
}

func TestEmptyVsMapFalse(t *testing.T) {
	if SameStructureAs([]interface{}{}, map[string]int{}) {
		t.Error("expected false")
	}
}

func TestFlatWithStringsSameLengthTrue(t *testing.T) {
	if !SameStructureAs([]interface{}{1, "[", "]"}, []interface{}{"[", "]", 1}) {
		t.Error("expected true")
	}
}

func TestFlatVsNestedFirstFalse(t *testing.T) {
	if SameStructureAs([]interface{}{1, 2}, []interface{}{[]interface{}{3}, 3}) {
		t.Error("expected false")
	}
}

func TestStringVsArrayInSameSlotFalse(t *testing.T) {
	if SameStructureAs([]interface{}{1, "[1,2]"}, []interface{}{2, []interface{}{4, 5}}) {
		t.Error("expected false")
	}
}

func TestStringifiedValuesSameStructureTrue(t *testing.T) {
	if !SameStructureAs(
		[]interface{}{1, "[1,2,3]", "{}"},
		[]interface{}{2, "[4,5,6]", "[]"},
	) {
		t.Error("expected true")
	}
}

func TestArrayVsStringifiedArrayFalse(t *testing.T) {
	if SameStructureAs([]interface{}{1, 2, 3}, "[1,2,3]") {
		t.Error("expected false")
	}
}

func TestStringBracketsVsRealArrayFalse(t *testing.T) {
	if SameStructureAs([]interface{}{"[]", 1}, []interface{}{[]interface{}{}, 1}) {
		t.Error("expected false")
	}
}

func TestBothSingleNonArrayTrue(t *testing.T) {
	if !SameStructureAs([]interface{}{"{}"}, []interface{}{"[]"}) {
		t.Error("expected true")
	}
}

func TestFlatLengthThreeTrue(t *testing.T) {
	if !SameStructureAs([]interface{}{"a", "b", "c"}, []interface{}{"x", "y", "z"}) {
		t.Error("expected true")
	}
}

func TestNestedPrimPrimArrayTrue(t *testing.T) {
	if !SameStructureAs(
		[]interface{}{1, "x", []interface{}{2, "y"}},
		[]interface{}{0, "a", []interface{}{1, "b"}},
	) {
		t.Error("expected true")
	}
}

func TestSingleElementArraysTrue(t *testing.T) {
	if !SameStructureAs([]interface{}{"only"}, []interface{}{1}) {
		t.Error("expected true")
	}
}

func TestDeepSingleChainFiveLevelsTrue(t *testing.T) {
	if !SameStructureAs(
		[]interface{}{[]interface{}{[]interface{}{[]interface{}{[]interface{}{1}}}}},
		[]interface{}{[]interface{}{[]interface{}{[]interface{}{[]interface{}{2}}}}},
	) {
		t.Error("expected true")
	}
}

func TestThreeByTwoMatrixTrue(t *testing.T) {
	if !SameStructureAs(
		[]interface{}{[]interface{}{1, 2}, []interface{}{3, 4}, []interface{}{5, 6}},
		[]interface{}{[]interface{}{7, 8}, []interface{}{9, 10}, []interface{}{11, 12}},
	) {
		t.Error("expected true")
	}
}

func TestTreeTwoBranchesTrue(t *testing.T) {
	if !SameStructureAs(
		[]interface{}{[]interface{}{[]interface{}{1}, []interface{}{2, 3}}, []interface{}{[]interface{}{4}, []interface{}{5, 6}}},
		[]interface{}{[]interface{}{[]interface{}{7}, []interface{}{8, 9}}, []interface{}{[]interface{}{10}, []interface{}{11, 12}}},
	) {
		t.Error("expected true")
	}
}

func TestTreeOneInnerWrongLengthFalse(t *testing.T) {
	if SameStructureAs(
		[]interface{}{[]interface{}{[]interface{}{1}, []interface{}{2, 3}}, []interface{}{[]interface{}{4}, []interface{}{5, 6}}},
		[]interface{}{[]interface{}{[]interface{}{7}, []interface{}{8, 9}}, []interface{}{[]interface{}{10}, []interface{}{11, 12, 13}}},
	) {
		t.Error("expected false")
	}
}

func TestDeepEmptyArraysMultipleLevelsTrue(t *testing.T) {
	if !SameStructureAs(
		[]interface{}{1, []interface{}{2, []interface{}{}, []interface{}{3, []interface{}{}}}},
		[]interface{}{4, []interface{}{5, []interface{}{}, []interface{}{6, []interface{}{}}}},
	) {
		t.Error("expected true")
	}
}

func TestFiveEmptyArraysTrue(t *testing.T) {
	empty := []interface{}{}
	if !SameStructureAs(
		[]interface{}{empty, empty, empty, empty, empty},
		[]interface{}{empty, empty, empty, empty, empty},
	) {
		t.Error("expected true")
	}
}

func TestSingleChainDepthFiveSameTrue(t *testing.T) {
	if !SameStructureAs(
		[]interface{}{1, []interface{}{2, []interface{}{3, []interface{}{4, []interface{}{5}}}}},
		[]interface{}{6, []interface{}{7, []interface{}{8, []interface{}{9, []interface{}{10}}}}},
	) {
		t.Error("expected true")
	}
}

func TestSingleChainDepthFiveExtraAtLeafFalse(t *testing.T) {
	if SameStructureAs(
		[]interface{}{1, []interface{}{2, []interface{}{3, []interface{}{4, []interface{}{5}}}}},
		[]interface{}{6, []interface{}{7, []interface{}{8, []interface{}{9, []interface{}{10, 11}}}}},
	) {
		t.Error("expected false")
	}
}

func TestTwoByTwoMatrixOfArraysTrue(t *testing.T) {
	if !SameStructureAs(
		[]interface{}{[]interface{}{[]interface{}{1, 2}, []interface{}{3, 4}}, []interface{}{[]interface{}{5, 6}, []interface{}{7, 8}}},
		[]interface{}{[]interface{}{[]interface{}{9, 10}, []interface{}{11, 12}}, []interface{}{[]interface{}{13, 14}, []interface{}{15, 16}}},
	) {
		t.Error("expected true")
	}
}

func TestBranchingWithEmptyAtTipTrue(t *testing.T) {
	if !SameStructureAs(
		[]interface{}{[]interface{}{1, []interface{}{2, []interface{}{}}}, []interface{}{3, 4}},
		[]interface{}{[]interface{}{5, []interface{}{6, []interface{}{}}}, []interface{}{7, 8}},
	) {
		t.Error("expected true")
	}
}

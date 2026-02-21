using System;
using System.Collections.Generic;
using Algorithm;
using Xunit;

public class SameStructureAsTests
{
    [Fact]
    public void FlatThreeVsThreeTrue()
    {
        Assert.True(SameStructureAs.Run(new object[] { 1, 1, 1 }, new object[] { 2, 2, 2 }));
    }

    [Fact]
    public void NestedOnePlusTwoVsSameTrue()
    {
        Assert.True(SameStructureAs.Run(new object[] { 1, new object[] { 1, 1 } }, new object[] { 2, new object[] { 2, 2 } }));
    }

    [Fact]
    public void NestedDifferentOrderFalse()
    {
        Assert.False(SameStructureAs.Run(new object[] { 1, new object[] { 1, 1 } }, new object[] { new object[] { 2, 2 }, 2 }));
    }

    [Fact]
    public void NestedDifferentInnerLengthFalse()
    {
        Assert.False(SameStructureAs.Run(new object[] { 1, new object[] { 1, 1 } }, new object[] { 2, new object[] { 2 } }));
    }

    [Fact]
    public void DoubleEmptyPairsTrue()
    {
        Assert.True(SameStructureAs.Run(
            new object[] { new object[] { new object[] { }, new object[] { } } },
            new object[] { new object[] { new object[] { }, new object[] { } } }));
    }

    [Fact]
    public void DoubleEmptyVsTwoPrimitivesFalse()
    {
        Assert.False(SameStructureAs.Run(
            new object[] { new object[] { new object[] { }, new object[] { } } },
            new object[] { new object[] { 1, 1 } }));
    }

    [Fact]
    public void DeepTripleNestedTrue()
    {
        Assert.True(SameStructureAs.Run(
            new object[] { 1, new object[] { new object[] { new object[] { 1 } } } },
            new object[] { 2, new object[] { new object[] { new object[] { 2 } } } }));
    }

    [Fact]
    public void EmptyVsIntFalse()
    {
        Assert.False(SameStructureAs.Run(Array.Empty<object>(), 1));
    }

    [Fact]
    public void EmptyVsDictFalse()
    {
        Assert.False(SameStructureAs.Run(Array.Empty<object>(), new Dictionary<string, int>()));
    }

    [Fact]
    public void FlatWithStringsSameLengthTrue()
    {
        Assert.True(SameStructureAs.Run(new object[] { 1, "[", "]" }, new object[] { "[", "]", 1 }));
    }

    [Fact]
    public void FlatVsNestedFirstFalse()
    {
        Assert.False(SameStructureAs.Run(new object[] { 1, 2 }, new object[] { new object[] { 3 }, 3 }));
    }

    [Fact]
    public void StringVsArrayInSameSlotFalse()
    {
        Assert.False(SameStructureAs.Run(new object[] { 1, "[1,2]" }, new object[] { 2, new object[] { 4, 5 } }));
    }

    [Fact]
    public void StringifiedValuesSameStructureTrue()
    {
        Assert.True(SameStructureAs.Run(
            new object[] { 1, "[1,2,3]", "{}" },
            new object[] { 2, "[4,5,6]", "[]" }));
    }

    [Fact]
    public void ArrayVsStringifiedArrayFalse()
    {
        Assert.False(SameStructureAs.Run(new object[] { 1, 2, 3 }, "[1,2,3]"));
    }

    [Fact]
    public void StringBracketsVsRealArrayFalse()
    {
        Assert.False(SameStructureAs.Run(new object[] { "[]", 1 }, new object[] { Array.Empty<object>(), 1 }));
    }

    [Fact]
    public void BothSingleNonArrayTrue()
    {
        Assert.True(SameStructureAs.Run(new object[] { "{}" }, new object[] { "[]" }));
    }

    [Fact]
    public void FlatLengthThreeTrue()
    {
        Assert.True(SameStructureAs.Run(new object[] { "a", "b", "c" }, new object[] { "x", "y", "z" }));
    }

    [Fact]
    public void NestedPrimPrimArrayTrue()
    {
        Assert.True(SameStructureAs.Run(
            new object[] { 1, "x", new object[] { 2, "y" } },
            new object[] { 0, "a", new object[] { 1, "b" } }));
    }

    [Fact]
    public void SingleElementArraysTrue()
    {
        Assert.True(SameStructureAs.Run(new object[] { "only" }, new object[] { 1 }));
    }

    [Fact]
    public void DeepSingleChainFiveLevelsTrue()
    {
        Assert.True(SameStructureAs.Run(
            new object[] { new object[] { new object[] { new object[] { new object[] { 1 } } } } },
            new object[] { new object[] { new object[] { new object[] { new object[] { 2 } } } } }));
    }

    [Fact]
    public void ThreeByTwoMatrixTrue()
    {
        Assert.True(SameStructureAs.Run(
            new object[] { new object[] { 1, 2 }, new object[] { 3, 4 }, new object[] { 5, 6 } },
            new object[] { new object[] { 7, 8 }, new object[] { 9, 10 }, new object[] { 11, 12 } }));
    }

    [Fact]
    public void TreeTwoBranchesTrue()
    {
        Assert.True(SameStructureAs.Run(
            new object[] { new object[] { new object[] { 1 }, new object[] { 2, 3 } }, new object[] { new object[] { 4 }, new object[] { 5, 6 } } },
            new object[] { new object[] { new object[] { 7 }, new object[] { 8, 9 } }, new object[] { new object[] { 10 }, new object[] { 11, 12 } } }));
    }

    [Fact]
    public void TreeOneInnerWrongLengthFalse()
    {
        Assert.False(SameStructureAs.Run(
            new object[] { new object[] { new object[] { 1 }, new object[] { 2, 3 } }, new object[] { new object[] { 4 }, new object[] { 5, 6 } } },
            new object[] { new object[] { new object[] { 7 }, new object[] { 8, 9 } }, new object[] { new object[] { 10 }, new object[] { 11, 12, 13 } } }));
    }

    [Fact]
    public void DeepEmptyArraysMultipleLevelsTrue()
    {
        Assert.True(SameStructureAs.Run(
            new object[] { 1, new object[] { 2, Array.Empty<object>(), new object[] { 3, Array.Empty<object>() } } },
            new object[] { 4, new object[] { 5, Array.Empty<object>(), new object[] { 6, Array.Empty<object>() } } }));
    }

    [Fact]
    public void FiveEmptyArraysTrue()
    {
        Assert.True(SameStructureAs.Run(
            new object[] { Array.Empty<object>(), Array.Empty<object>(), Array.Empty<object>(), Array.Empty<object>(), Array.Empty<object>() },
            new object[] { Array.Empty<object>(), Array.Empty<object>(), Array.Empty<object>(), Array.Empty<object>(), Array.Empty<object>() }));
    }

    [Fact]
    public void SingleChainDepthFiveSameTrue()
    {
        Assert.True(SameStructureAs.Run(
            new object[] { 1, new object[] { 2, new object[] { 3, new object[] { 4, new object[] { 5 } } } } },
            new object[] { 6, new object[] { 7, new object[] { 8, new object[] { 9, new object[] { 10 } } } } }));
    }

    [Fact]
    public void SingleChainDepthFiveExtraAtLeafFalse()
    {
        Assert.False(SameStructureAs.Run(
            new object[] { 1, new object[] { 2, new object[] { 3, new object[] { 4, new object[] { 5 } } } } },
            new object[] { 6, new object[] { 7, new object[] { 8, new object[] { 9, new object[] { 10, 11 } } } } }));
    }

    [Fact]
    public void TwoByTwoMatrixOfArraysTrue()
    {
        Assert.True(SameStructureAs.Run(
            new object[] { new object[] { new object[] { 1, 2 }, new object[] { 3, 4 } }, new object[] { new object[] { 5, 6 }, new object[] { 7, 8 } } },
            new object[] { new object[] { new object[] { 9, 10 }, new object[] { 11, 12 } }, new object[] { new object[] { 13, 14 }, new object[] { 15, 16 } } }));
    }

    [Fact]
    public void BranchingWithEmptyAtTipTrue()
    {
        Assert.True(SameStructureAs.Run(
            new object[] { new object[] { 1, new object[] { 2, Array.Empty<object>() } }, new object[] { 3, 4 } },
            new object[] { new object[] { 5, new object[] { 6, Array.Empty<object>() } }, new object[] { 7, 8 } }));
    }
}

import pytest
from same_structure_as import same_structure_as


class TestSameStructureAs:
    def test_flat_three_vs_three_true(self):
        assert same_structure_as([1, 1, 1], [2, 2, 2]) is True

    def test_nested_one_plus_two_vs_same_true(self):
        assert same_structure_as([1, [1, 1]], [2, [2, 2]]) is True

    def test_nested_different_order_false(self):
        assert same_structure_as([1, [1, 1]], [[2, 2], 2]) is False

    def test_nested_different_inner_length_false(self):
        assert same_structure_as([1, [1, 1]], [2, [2]]) is False

    def test_double_empty_pairs_true(self):
        assert same_structure_as([[[], []]], [[[], []]]) is True

    def test_double_empty_vs_two_primitives_false(self):
        assert same_structure_as([[[], []]], [[1, 1]]) is False

    def test_deep_triple_nested_true(self):
        assert same_structure_as([1, [[[1]]]], [2, [[[2]]]]) is True

    def test_empty_vs_int_false(self):
        assert same_structure_as([], 1) is False

    def test_empty_vs_dict_false(self):
        assert same_structure_as([], {}) is False

    def test_flat_with_strings_same_length_true(self):
        assert same_structure_as([1, "[", "]"], ["[", "]", 1]) is True

    def test_flat_vs_nested_first_false(self):
        assert same_structure_as([1, 2], [[3], 3]) is False

    def test_string_vs_array_in_same_slot_false(self):
        assert same_structure_as([1, "[1,2]"], [2, [4, 5]]) is False

    def test_stringified_values_same_structure_true(self):
        assert same_structure_as([1, "[1,2,3]", "{}"], [2, "[4,5,6]", "[]"]) is True

    def test_array_vs_stringified_array_false(self):
        assert same_structure_as([1, 2, 3], "[1,2,3]") is False

    def test_string_brackets_vs_real_array_false(self):
        assert same_structure_as(["[]", 1], [[], 1]) is False

    def test_both_single_non_array_true(self):
        assert same_structure_as(["{}"], ["[]"]) is True

    def test_flat_length_three_true(self):
        assert same_structure_as(["a", "b", "c"], ["x", "y", "z"]) is True

    def test_nested_prim_prim_array_true(self):
        assert same_structure_as([1, "x", [2, "y"]], [0, "a", [1, "b"]]) is True

    def test_single_element_arrays_true(self):
        assert same_structure_as(["only"], [1]) is True

    def test_deep_single_chain_five_levels_true(self):
        assert same_structure_as([[[[[1]]]]], [[[[[2]]]]]) is True

    def test_three_by_two_matrix_true(self):
        assert same_structure_as(
            [[1, 2], [3, 4], [5, 6]], [[7, 8], [9, 10], [11, 12]]
        ) is True

    def test_tree_two_branches_true(self):
        assert same_structure_as(
            [[[1], [2, 3]], [[4], [5, 6]]],
            [[[7], [8, 9]], [[10], [11, 12]]],
        ) is True

    def test_tree_one_inner_wrong_length_false(self):
        assert same_structure_as(
            [[[1], [2, 3]], [[4], [5, 6]]],
            [[[7], [8, 9]], [[10], [11, 12, 13]]],
        ) is False

    def test_deep_empty_arrays_multiple_levels_true(self):
        assert same_structure_as(
            [1, [2, [], [3, []]]], [4, [5, [], [6, []]]]
        ) is True

    def test_five_empty_arrays_true(self):
        assert same_structure_as(
            [[], [], [], [], []], [[], [], [], [], []]
        ) is True

    def test_single_chain_depth_five_same_true(self):
        assert same_structure_as(
            [1, [2, [3, [4, [5]]]]], [6, [7, [8, [9, [10]]]]]
        ) is True

    def test_single_chain_depth_five_extra_at_leaf_false(self):
        assert same_structure_as(
            [1, [2, [3, [4, [5]]]]], [6, [7, [8, [9, [10, 11]]]]]
        ) is False

    def test_two_by_two_matrix_of_arrays_true(self):
        assert same_structure_as(
            [[[1, 2], [3, 4]], [[5, 6], [7, 8]]],
            [[[9, 10], [11, 12]], [[13, 14], [15, 16]]],
        ) is True

    def test_branching_with_empty_at_tip_true(self):
        assert same_structure_as(
            [[1, [2, []]], [3, 4]], [[5, [6, []]], [7, 8]]
        ) is True

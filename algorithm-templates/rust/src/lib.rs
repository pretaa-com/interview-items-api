//! Return true if and only if other is an array and has the same nesting
//! structure and same lengths of nested arrays as this_array.

/// Represents a value in the structure: either an array or a non-array (primitive).
#[derive(Debug, Clone)]
pub enum Value {
    Array(Vec<Value>),
    Primitive,
}

/// Returns true iff other has the same structure as this_array (same lengths and nesting).
pub fn same_structure_as(this_array: &[Value], other: &Value) -> bool {
    // TODO: implement
    false
}

#[cfg(test)]
mod tests {
    use super::{Value, same_structure_as};

    fn arr(v: &[Value]) -> Value {
        Value::Array(v.to_vec())
    }

    fn p() -> Value {
        Value::Primitive
    }

    #[test]
    fn flat_three_vs_three_true() {
        assert!(same_structure_as(
            &[p(), p(), p()],
            &arr(&[p(), p(), p()])
        ));
    }

    #[test]
    fn nested_one_plus_two_vs_same_true() {
        assert!(same_structure_as(
            &[p(), arr(&[p(), p()])],
            &arr(&[p(), arr(&[p(), p()])])
        ));
    }

    #[test]
    fn nested_different_order_false() {
        assert!(!same_structure_as(
            &[p(), arr(&[p(), p()])],
            &arr(&[arr(&[p(), p()]), p()])
        ));
    }

    #[test]
    fn nested_different_inner_length_false() {
        assert!(!same_structure_as(
            &[p(), arr(&[p(), p()])],
            &arr(&[p(), arr(&[p()])])
        ));
    }

    #[test]
    fn double_empty_pairs_true() {
        assert!(same_structure_as(
            &[arr(&[arr(&[]), arr(&[])])],
            &arr(&[arr(&[arr(&[]), arr(&[])])])
        ));
    }

    #[test]
    fn double_empty_vs_two_primitives_false() {
        assert!(!same_structure_as(
            &[arr(&[arr(&[]), arr(&[])])],
            &arr(&[arr(&[p(), p()])])
        ));
    }

    #[test]
    fn deep_triple_nested_true() {
        assert!(same_structure_as(
            &[p(), arr(&[arr(&[arr(&[p()])])])],
            &arr(&[p(), arr(&[arr(&[arr(&[p()])])])])
        ));
    }

    #[test]
    fn empty_vs_primitive_false() {
        assert!(!same_structure_as(&[], &p()));
    }

    #[test]
    fn array_vs_primitive_false() {
        assert!(!same_structure_as(&[p(), p(), p()], &p()));
    }

    #[test]
    fn flat_with_strings_same_length_true() {
        assert!(same_structure_as(
            &[p(), p(), p()],
            &arr(&[p(), p(), p()])
        ));
    }

    #[test]
    fn flat_vs_nested_first_false() {
        assert!(!same_structure_as(
            &[p(), p()],
            &arr(&[arr(&[p()]), p()])
        ));
    }

    #[test]
    fn string_vs_array_in_same_slot_false() {
        assert!(!same_structure_as(
            &[p(), p()],
            &arr(&[p(), arr(&[p(), p()])])
        ));
    }

    #[test]
    fn stringified_values_same_structure_true() {
        assert!(same_structure_as(
            &[p(), p(), p()],
            &arr(&[p(), p(), p()])
        ));
    }

    #[test]
    fn string_brackets_vs_real_array_false() {
        assert!(!same_structure_as(
            &[p(), p()],
            &arr(&[arr(&[]), p()])
        ));
    }

    #[test]
    fn both_single_non_array_true() {
        assert!(same_structure_as(&[p()], &arr(&[p()])));
    }

    #[test]
    fn flat_length_three_true() {
        assert!(same_structure_as(
            &[p(), p(), p()],
            &arr(&[p(), p(), p()])
        ));
    }

    #[test]
    fn nested_prim_prim_array_true() {
        assert!(same_structure_as(
            &[p(), p(), arr(&[p(), p()])],
            &arr(&[p(), p(), arr(&[p(), p()])])
        ));
    }

    #[test]
    fn single_element_arrays_true() {
        assert!(same_structure_as(&[p()], &arr(&[p()])));
    }

    #[test]
    fn deep_single_chain_five_levels_true() {
        assert!(same_structure_as(
            &[arr(&[arr(&[arr(&[arr(&[p()])])])])],
            &arr(&[arr(&[arr(&[arr(&[arr(&[p()])])])])])
        ));
    }

    #[test]
    fn three_by_two_matrix_true() {
        assert!(same_structure_as(
            &[arr(&[p(), p()]), arr(&[p(), p()]), arr(&[p(), p()])],
            &arr(&[arr(&[p(), p()]), arr(&[p(), p()]), arr(&[p(), p()])])
        ));
    }

    #[test]
    fn tree_two_branches_true() {
        assert!(same_structure_as(
            &[
                arr(&[arr(&[p()]), arr(&[p(), p()])]),
                arr(&[arr(&[p()]), arr(&[p(), p()])]),
            ],
            &arr(&[
                arr(&[arr(&[p()]), arr(&[p(), p()])]),
                arr(&[arr(&[p()]), arr(&[p(), p()])]),
            ])
        ));
    }

    #[test]
    fn tree_one_inner_wrong_length_false() {
        assert!(!same_structure_as(
            &[
                arr(&[arr(&[p()]), arr(&[p(), p()])]),
                arr(&[arr(&[p()]), arr(&[p(), p()])]),
            ],
            &arr(&[
                arr(&[arr(&[p()]), arr(&[p(), p()])]),
                arr(&[arr(&[p()]), arr(&[p(), p(), p()])]),
            ])
        ));
    }

    #[test]
    fn deep_empty_arrays_multiple_levels_true() {
        assert!(same_structure_as(
            &[p(), arr(&[p(), arr(&[]), arr(&[p(), arr(&[])])])],
            &arr(&[p(), arr(&[p(), arr(&[]), arr(&[p(), arr(&[])])])])
        ));
    }

    #[test]
    fn five_empty_arrays_true() {
        let empty: Vec<Value> = vec![];
        assert!(same_structure_as(
            &[arr(&empty), arr(&empty), arr(&empty), arr(&empty), arr(&empty)],
            &arr(&[arr(&empty), arr(&empty), arr(&empty), arr(&empty), arr(&empty)])
        ));
    }

    #[test]
    fn single_chain_depth_five_same_true() {
        assert!(same_structure_as(
            &[p(), arr(&[p(), arr(&[p(), arr(&[p(), arr(&[p()])])])])],
            &arr(&[p(), arr(&[p(), arr(&[p(), arr(&[p(), arr(&[p()])])])])])
        ));
    }

    #[test]
    fn single_chain_depth_five_extra_at_leaf_false() {
        assert!(!same_structure_as(
            &[p(), arr(&[p(), arr(&[p(), arr(&[p(), arr(&[p()])])])])],
            &arr(&[p(), arr(&[p(), arr(&[p(), arr(&[p(), arr(&[p(), p()])])])])])
        ));
    }

    #[test]
    fn two_by_two_matrix_of_arrays_true() {
        assert!(same_structure_as(
            &[
                arr(&[arr(&[p(), p()]), arr(&[p(), p()])]),
                arr(&[arr(&[p(), p()]), arr(&[p(), p()])]),
            ],
            &arr(&[
                arr(&[arr(&[p(), p()]), arr(&[p(), p()])]),
                arr(&[arr(&[p(), p()]), arr(&[p(), p()])]),
            ])
        ));
    }

    #[test]
    fn branching_with_empty_at_tip_true() {
        assert!(same_structure_as(
            &[arr(&[p(), arr(&[p(), arr(&[])])]), arr(&[p(), p()])],
            &arr(&[arr(&[p(), arr(&[p(), arr(&[])])]), arr(&[p(), p()])])
        ));
    }
}

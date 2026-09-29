import pytest
from app.algorithms.heaps.binary_heap import BinaryHeap
from app.algorithms.heaps.binomial_heap import BinomialHeap
from app.algorithms.heaps.fibonacci_heap import FibonacciHeap

def test_binary_heap():
    heap = BinaryHeap(is_min_heap=True)
    items = [50, 20, 80, 10, 30, 70]
    for x in items:
        heap.insert(x)

    extracted = []
    while heap.size() > 0:
        extracted.append(heap.extract_top())

    assert extracted == [10, 20, 30, 50, 70, 80]

def test_binomial_heap():
    bh = BinomialHeap()
    for x in [45, 12, 89, 5, 23, 67]:
        bh.insert(x)

    min_node = bh.extract_min()
    assert min_node.key == 5
    second_min = bh.extract_min()
    assert second_min.key == 12

def test_fibonacci_heap():
    fh = FibonacciHeap()
    for x in [100, 40, 80, 15, 60]:
        fh.insert(x)

    min_node = fh.extract_min()
    assert min_node.key == 15
    second_min = fh.extract_min()
    assert second_min.key == 40

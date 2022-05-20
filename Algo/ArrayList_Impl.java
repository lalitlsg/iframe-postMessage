class MyArrayList<T> {
	private T arr[];
	private int s;
	private int capacity;

	MyArrayList() {
		capacity = 10;
		s = 0;
		arr = (T[]) new Object[capacity];
	}

	MyArrayList(int c) {
		capacity = c;
		s = 0;
		arr = (T[]) new Object[capacity];
	}

	private void grow() {
		capacity = capacity * 3 / 2 + 1;
		T[] newArr = (T[]) new Object[capacity];
		for (int i=0; i<s; i++) {
			newArr[i] = arr[i];
		}
		arr = newArr;
	}

	boolean add(T item) {
		if (s == capacity) {
			grow();
		}
		arr[s++] = item;
		return true;
	}

	void add(int index, T item) {
		if (index < 0 || index > s) {
			throw new ArrayIndexOutOfBoundsException(index);
		}
		if (s == capacity) {
			grow();
		}
		for (int i=s; i>index; i--) {
			arr[i] = arr[i-1];
		}
		arr[index] = item;
		s++;
	}

	T get(int index) {
		if (index < 0 || index >= s) {
			throw new ArrayIndexOutOfBoundsException(index);
		}
		return arr[index];
	}

	int indexOf(T item) {
		if (item != null) {
			for (int i=0; i<s; i++) {
				if (arr[i] == item) {
					return i;
				}
			}
		}
		return -1;
	}

	T remove(int index) {
		if (index < 0 || index >= s) {
			throw new IndexOutOfBoundsException(index);
		}
		T item = arr[index];
		for (int i=index+1; i<s; i++) {
			arr[i-1] = arr[i];
		}
		s--;
		return item;
	}

	T set(int index, T item) {
		if (index < 0 || index >= s) {
			throw new IndexOutOfBoundsException(index);
		}
		T old  = arr[index];
		arr[index] = item;
		return old;
	}

	int size() {
		return s;
	}

	boolean isEmpty() {
		return s == 0;
	}

	int currCap() {
		return capacity;
	}
}

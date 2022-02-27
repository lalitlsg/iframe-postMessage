class MyHashMap<K, V> {
	private static int INITIAL_CAP = 4;
	private static double REHASH_THRESHOLD = 2.0;

	private class Entry {
		K key;
		V value;
		Entry(K key, V value) {
			this.key = key;
			this.value = value;
		}

		@Override
		public String toString() {
			return "{" +
					"key=" + key +
					", value=" + value +
					'}';
		}
	}
	private int size;
	private LinkedList<Entry>[] buckets;

	MyHashMap() {
		initBuckets(INITIAL_CAP);
		size = 0;
	}

	private void initBuckets(int cap) {
		buckets = new LinkedList[cap];
		for (int i=0; i<buckets.length; i++) buckets[i] = new LinkedList<>();
	}

	private int hash(K key) {
		int hashCode = key.hashCode();
		return Math.abs(hashCode) % buckets.length;
	}

	private void reHash() {
		LinkedList<Entry>[] oldBuckets = buckets;
		initBuckets(oldBuckets.length * 2);
		size = 0;

		for (LinkedList<Entry> list : oldBuckets) {
			for (Entry e: list) {
				put(e.key, e.value);
			}
		}
	}

	private int getIndex(K key, LinkedList<Entry> currList) {
		for (int i=0; i<currList.size(); i++) {
			if (currList.get(i).key.equals(key)) return i;
		}
		return -1;
	}

	public void put(K key, V value) {
		int bucket = hash(key);
		LinkedList<Entry> currList = buckets[bucket];
		int index = getIndex(key, currList);
		if (index != -1) {
			currList.get(index).value = value;
			return;
		}
		currList.add(new Entry(key, value));
		size++;

		double lambda = size * 1.0 / buckets.length;
		if (lambda > REHASH_THRESHOLD) {
			reHash();
		}
	}

	public boolean containsKey(K key) {
		int bucket = hash(key);
		LinkedList<Entry> currList = buckets[bucket];
		int index = getIndex(key, currList);
		return index != -1;
	}

	public V get(K key) {
		int bucket = hash(key);
		LinkedList<Entry> currList = buckets[bucket];
		int index = getIndex(key, currList);
		return index != -1 ? currList.get(index).value : null;
	}

	public V remove(K key) {
		int bucket = hash(key);
		LinkedList<Entry> currList = buckets[bucket];
		int index = getIndex(key, currList);
		if (index != -1) {
			Entry node = currList.remove(index);
			size--;
			return node.value;
		}
		return null;
	}

	public int size() {
		return size;
	}

	public List<K> keySet() {
		List<K> keys = new ArrayList<>();
		for (LinkedList<Entry> list: buckets) {
			for (Entry e: list) {
				keys.add(e.key);
			}
		}
		return keys;
	}

	public void printMap() {
		List<Entry> entries = new ArrayList<>();
		for (LinkedList<Entry> list: buckets) {
			for (Entry e: list) {
				entries.add(e);
			}
		}
		System.out.println(entries);
	}

}


MyHashMap<String, Integer> map = new MyHashMap<>();
map.put("Lalit", 1);
map.put("Vishal", 2);
map.put("Nikhil", 3);
map.printMap();
System.out.println(map.get("Lalit"));
map.put("Lalit", 5);
map.printMap();
map.remove("Nikhil");
map.printMap();
System.out.println(map.containsKey("Vishal"));
map.put("Lalit1", 1);
map.put("Vishal1", 2);
map.put("Nikhil1", 3);
map.put("Lalit2", 1);
map.put("Vishal2", 2);
map.put("Nikhil2", 3);
map.printMap();

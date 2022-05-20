package com.company;
import java.util.*;

/*
java.util.vector;
java.util.Date;
org.json.JSONObject
java.util.regex.Pattern
org.writequit.Strings

print given java packages in following format

-java
	-util
		-vector
		-Date
		-regex
			-Pattern
-org
	-json
		-JSONObject
	-writequit
		-Strings
*/

// DFS Solution.

class Solution {
    private List<String> list;
    private Set<String> set;

    public Solution() {
        list = new ArrayList<>();
        list.add("java.util.vector");
        list.add("java.util.Date");
        list.add("org.json.JSONObject");
        list.add("java.util.regex.Pattern");
        list.add("org.writequit.Strings");
    }

    public Map<String, List<String>> processData(List<String> strs) {
        Map<String, List<String>> graph = new HashMap<>();
         set = new HashSet<>();

        strs.forEach(str -> {
            String[] strArr = str.split("\\.");
            String parent = null;

            for (int i=0; i<strArr.length; i++) {
                if (i == 0) set.add(strArr[i]);

                if (!graph.containsKey(strArr[i])) {
                    graph.put(strArr[i], new ArrayList<>());
                    if (parent != null) {
                        graph.get(parent).add(strArr[i]);
                    }
                }

                parent = strArr[i];
            }
        });

        return graph;
    }

    public void dfs(String node, int level, Map<String, List<String>> graph) {
        for (int i=0; i<level; i++) {
            System.out.print("  ");
        }
        System.out.println("-" + node);

        for (String nei: graph.get(node)) {
            dfs(nei, level + 1, graph);
        }
    }

    public void solve() {
        Map<String, List<String>> graph = processData(list);

        for (String node: set) {
            dfs(node, 0, graph);
        }
    }
}

dist:
	cat lib/jquery.value.js | java -jar ~/tmp/compiler.jar --compilation_level SIMPLE_OPTIMIZATIONS > lib/jquery.value.min.js
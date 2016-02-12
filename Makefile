# Here's the file

default:
	echo "Hello world"

oneweek:
	date -d "+ 7 days"

tenweeks:
	date -d "+ 10 weeks"

lab1:
	awk -f lab1_example/sample.awk lab1_example/data.csv

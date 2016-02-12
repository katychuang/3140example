# Reads data.csv

BEGIN {
  # Splitting fields https://www.gnu.org/software/gawk/manual/html_node/Splitting-By-Content.html
  FPAT = "([^,]+)|(\"[^\"]+\")"
}

# Pattern match on fields with Column3 = Fruit
# https://www.gnu.org/software/gawk/manual/html_node/Patterns-and-Actions.html
$3 ~ /fruit/ { 
  arr[NR] = $2; 
  print $2;
}

END {
    print "\nDone reading file. Printing contents of the fruit array";
    print "id string";
    for (x = 1; x <= length(arr); x++) {
        print x, arr[x]
    }
}

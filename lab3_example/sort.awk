# This program sorts input by a specified column
# Author: Katherine Chuang (@katychuang on Github)
# 
# truncated version; personal stylistic preferences

# BEGIN pattern matches to before input is read.
BEGIN {
    if(!column) print "-----> no column value defined, setting to default 1"; column = 1
    print "_Input File, read in line by line_"
}

# Reads in every line and store into array of arrays
# no pattern specified; read every single line of input
{ for (f = 1; f <= NF; f++) a[FNR][f] = $f; show_row(a[FNR], ("Line " FNR )) }

END {
  print "Done reading file, begin sorting"; sort_by_col(a,column)
  printf("\n_Final result, sorted by col %s_\n", col); show_matrix(a,column)
}

# sort so that the rows are in ascending order by specified column
# this is an implementation of bubblesort
function sort_by_col(arr, col) {
  for(idx=1; idx<=length(arr); idx++){
   for(left=1; left<=length(arr)-idx; left++)
    right = left + 1; if(arr[left][col] > arr[right][col]) swap_rows(arr[left], arr[right]);
  }
}

# swaps two rows, each is an array
function swap_rows(A,B){
  for(i in A) temp[i] = A[i]
  for(i in B) A[i] = B[i]; B[i] = temp[i]
}

# print output
function show_matrix(matrix, col){
  for(i in matrix) show_row(matrix[i], "Line " i)
}
  
# show items in an array and the line number in question
function show_row(myarray, rowid){
  printf("%s: ", rowid); for(e in myarray) printf("%s ",myarray[e]); printf("\n")
}

# 
# arrays are passed by reference https://www.gnu.org/software/gawk/manual/html_node/Pass-By-Value_002fReference.html
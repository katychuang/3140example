# This program calculates a total score per record and ranks the output of top ranked by the classes
# Author: Katherine Chuang (@katychuang on Github)
# example awk -f prog.awk data.csv

BEGIN {
    FS=","  # set file format delimiter
    PROCINFO["sorted_in"]="@val_num_desc"
     
    print "_Input File, read in line by line_"
}

# Reads in every line after header line and store into array of arrays
FNR > 1 {
  # randomly generated 'total' value per record
  # TODO: calculate the correct total per row
  total = int(NF * rand()) 
  
  cars[$5][$7] = total 
}

END {
  printf("\n_Final result", col)
  show_classes(cars)
}

function show_classes(matrix){
  for(i in matrix){
    counter = 1
    n = asort(matrix[i], ranked)
    printf("\n__%s__\n", i)
    
    for(e in ranked){
      # print output showing the ranking and also the total score
      # TODO: ranking, car_id, year, car make, car model
      printf("%s: %spts\n", counter, ranked[e])
      counter++;
    }
  }
}

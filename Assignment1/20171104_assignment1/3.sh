awk '{printf substr($0,1,4); for(c=5;c<=length($0);c++) printf "#"; printf "\n"}' $1
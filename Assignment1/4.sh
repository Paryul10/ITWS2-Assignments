cat $1 | cut -d ':' -f1 | awk '{printf "USER #"; printf NR; printf "="; printf $0; printf "\n"}'
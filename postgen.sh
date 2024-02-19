# !/bin/bash


# Display help message
# TODO support option
# -d use designated date
# -t tag can be applied multiple times
help() {
    echo "Generate a post template"
}

# Main 

# Ask for title from input
echo "Enter the title:"
read title

# convert title into - sepearted
ftitle=$(echo "${title}" | sed 's/ /-/')

# determine date
date="$(date '+%Y-%m-%d %H:%M:%S %z')"

# create post file
filename="$(date '+%Y-%m-%d')-${ftitle}.markdown"
echo "filename: ${filename}, continue? [y/n]"
read -r choice
choice=$(echo "$choice" | tr 'a-z' 'A-Z')
if [ "${choice}" != "Y" ]; then
    exit 0
fi
file="$(pwd)/_posts/${filename}"
touch "${file}"

# write template to post file
echo "---" >> $file
echo "layout: post" >> $file
echo "title: \"${title}\"" >> $file
echo "date: ${date}" >> $file
echo "tag: " >> $file
echo "---" >> $file

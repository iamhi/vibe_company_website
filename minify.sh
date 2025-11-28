#!/bin/bash

# Simple CSS minification
minify_css() {
    local input="$1"
    local output="$2"
    
    # Remove comments, newlines, and extra whitespace
    sed -e '/\/\*/d; s/\/\*.*\*\///g' \
        -e 's/^[ \t]*//' \
        -e 's/[ \t]*$//' \
        -e '/^$/d' \
        -e 's/;[ \t]*}/}/g' \
        -e 's/[ \t]*{/{/g' \
        -e 's/[ \t]*}/}/g' \
        -e 's/[ \t]*;[ \t]*;/;/g' \
        -e 's/[ \t]*:[ \t]*/:/g' \
        -e 's/[ \t]*,[ \t]*/,/g' \
        "$input" > "$output"
}

# Simple JS minification
minify_js() {
    local input="$1"
    local output="$2"
    
    # Remove comments (except // comments that might be in strings)
    sed -e '/\/\*/d; s/\/\*.*\*\///g' \
        -e 's|//.*$||' \
        -e '/^[ \t]*$/d' \
        -e 's/^[ \t]*//' \
        -e 's/[ \t]*$//' \
        "$input" > "$output"
}

echo "Minifying CSS..."
minify_css "css/style.css" "css/style.min.css"

echo "Minifying JavaScript..."
minify_js "js/main.js" "js/main.min.js"

echo "Minification complete!"

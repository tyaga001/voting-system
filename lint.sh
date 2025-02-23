#!/bin/bash
# Initialize arrays for different file types
css_files=()
ts_files=()
js_files=()

# Sort files into appropriate arrays
for arg in "$@"; do
  if [[ $arg == *.css ]]; then
    css_files+=("$arg")
  elif [[ $arg == *.ts || $arg == *.tsx ]]; then
    ts_files+=("$arg")
  else
    js_files+=("$arg")
  fi
done

# Function to handle error output formatting
format_error() {
  local error_msg="$1"
  local file_name="$2"
  echo "<<<<<< CODE_ERROR_START $file_name"
  echo "$error_msg"
  echo "CODE_ERROR_END >>>>>>"
}

# Run TypeScript check if there are any TS files
if [ ${#ts_files[@]} -gt 0 ]; then
  # Run tsc with project flag to use tsconfig.json
  output=$(npx tsc --noEmit --project tsconfig.json 2>&1)
  exit_status=$?

  if [ $exit_status -ne 0 ]; then
    format_error "FAILED BUILD CRITICAL in TypeScript check
$output" "${ts_files[0]}"
    exit $exit_status
  else
    echo "✓ Successfully type checked TypeScript files"
  fi
fi

# Run ESLint on all non-CSS files if there are any
if [ ${#js_files[@]} -gt 0 ] || [ ${#ts_files[@]} -gt 0 ]; then
  all_js_files=("${js_files[@]}" "${ts_files[@]}")
  eslint_output=$(npx eslint "${all_js_files[@]}" 2>&1)
  exit_status=$?

  if [ $exit_status -ne 0 ]; then
    format_error "FAILED BUILD CRITICAL in ESLint check
$eslint_output" "${all_js_files[0]}"
    exit $exit_status
  fi
fi

# Run Stylelint on CSS files if there are any
if [ ${#css_files[@]} -gt 0 ]; then
  stylelint_output=$(npx stylelint "${css_files[@]}" 2>&1)
  exit_status=$?

  if [ $exit_status -ne 0 ]; then
    format_error "FAILED BUILD CRITICAL in Stylelint check
$stylelint_output" "${css_files[0]}"
    exit $exit_status
  fi

  # Run Tailwind and capture both output and exit status
  if [ -n "${css_files[0]}" ]; then
    # Get the current file being processed
    current_file="${css_files[0]}"

    # Redirect stderr to stdout and capture both in a variable
    output=$(npx tailwindcss -i "$current_file" 2>&1)
    exit_status=$?

    # Check if the command failed
    if [ $exit_status -ne 0 ]; then
      format_error "FAILED BUILD CRITICAL in file: $current_file
$output" "$current_file"
      exit $exit_status
    else
      echo "✓ Successfully processed Tailwind CSS for: $current_file"
    fi
  fi
fi

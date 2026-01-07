#!/bin/bash

# 移除所有 border-thin 类
find src/app -name "*.tsx" -type f -exec sed -i '' 's/border-thin //g' {} \;
find src/app -name "*.tsx" -type f -exec sed -i '' 's/border-thin//g' {} \;
find src/app -name "*.tsx" -type f -exec sed -i '' 's/border-l-thin //g' {} \;
find src/app -name "*.tsx" -type f -exec sed -i '' 's/border-l-thin//g' {} \;
find src/app -name "*.tsx" -type f -exec sed -i '' 's/border-b- //g' {} \;
find src/app -name "*.tsx" -type f -exec sed -i '' 's/border-t- //g' {} \;
find src/app -name "*.tsx" -type f -exec sed -i '' 's/border-l- //g' {} \;

echo "边框类已移除"

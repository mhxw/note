#yarn build

cd docs/.vuepress/dist

git init
git add .
git commit -m "first commit"
git branch -M web
git remote add origin https://github.com/mhxw/note.git
git push -u -f origin web

cd ../../
rm -rf docs/.vuepress/dist

npm run build

cd public

git init
git add -A
git commit -m 'deploy'

git push -f git@github.com:recoluan/vuepress-reco-doc.git master

git push -f git@git.coding.net:recoluan/vuepress-theme-reco-doc.git master

cd ../
rm -rf public

yarn build

cd docs/.vuepress/dist

git init
git add .
git commit -m "first commit"
git branch -M web
git remote add origin https://github.com/mhxw/note.git
git push -u -f origin web

cd ../../../
rm -rf docs/.vuepress/dist



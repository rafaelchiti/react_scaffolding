run:
	node ./node_modules/webpack-dev-server/bin/webpack-dev-server --port 9898 --host 0.0.0.0 --config webpack.config.dev.js --hot --progress --inline

run-prod:
	WEBPACK_DEV_SERVER=true node ./node_modules/webpack-dev-server/bin/webpack-dev-server --port 9898 --config webpack.config.prod.js --progress --inline

install-githooks:
	rm -f .git/hooks/pre-push
	ln -s ../../scripts/pre-push ./.git/hooks/pre-push
	chmod +x .git/hooks/pre-push

lint:
	./node_modules/.bin/eslint ./app


#
# Production build
bundle-prod:
	# IMPORTANT --bail will ensure that the process exits with an error code
	# causing any other command consuming this to fail if there is an error bundling.
	node ./node_modules/webpack/bin/webpack --config webpack.config.prod.js -p --progress --bail

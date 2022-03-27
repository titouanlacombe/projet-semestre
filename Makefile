.PHONY: npm-rm-proxy install-dependencies setup build clean
.DEFAULT_GOAL := build

PKGMNG_UPDATE=apt update && apt upgrade -y
PKGMNG_INSTALL=apt install -y

# If npm is having trouble in wsl
npm-rm-proxy:
	npm config rm proxy
	npm config rm https-proxy

install-dependencies:
	${PKGMNG_UPDATE}
	${PKGMNG_INSTALL} curl npm nodejs

setup:
	npm install

build:
	npx electron-forge import
	npm run make

clean:
	rm -dR node_modules
	rm package-lock.json
